import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// In-memory cache
let workflowsCache: {
  data: Map<string, { workflows: any[]; total: number; timestamp: number }>;
} = { data: new Map() };

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    
    // Validate and sanitize inputs
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");
    
    // Parse with bounds checking to prevent abuse
    const limit = Math.min(Math.max(1, parseInt(limitParam || "50", 10) || 50), 1000);
    const offset = Math.max(0, parseInt(offsetParam || "0", 10) || 0);

    // Validate category if provided (alphanumeric and hyphens only)
    if (category && !/^[a-z0-9-]+$/i.test(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Create cache key
    const cacheKey = `${category || "all"}-${limit}-${offset}`;
    const cached = workflowsCache.data.get(cacheKey);

    // Return cached data if valid
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(
        {
          workflows: cached.workflows,
          total: cached.total,
          limit,
          offset,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            "X-Cache": "HIT",
          },
        }
      );
    }

    // Build where clause
    const where = category ? { categoryId: category } : {};

    // Fetch workflows using Prisma
    const [workflows, total] = await Promise.all([
      prisma.workflow.findMany({
        where,
        select: {
          id: true,
          categoryId: true,
          idea: true,
          complexity: true,
          useCase: true,
          platforms: true,
          votes: true,
        },
        orderBy: [{ votes: "desc" }, { id: "asc" }],
        take: limit,
        skip: offset,
      }),
      prisma.workflow.count({ where }),
    ]);

    // Transform to match expected API response format
    const transformedWorkflows = workflows.map((w) => ({
      id: w.id,
      category_id: w.categoryId,
      idea: w.idea,
      complexity: w.complexity,
      use_case: w.useCase,
      platforms: w.platforms,
      votes: w.votes,
    }));

    // Store in cache
    workflowsCache.data.set(cacheKey, {
      workflows: transformedWorkflows,
      total,
      timestamp: Date.now(),
    });

    // Limit cache size (keep last 20 queries)
    if (workflowsCache.data.size > 20) {
      const firstKey = workflowsCache.data.keys().next().value;
      if (firstKey) workflowsCache.data.delete(firstKey);
    }

    return NextResponse.json(
      {
        workflows: transformedWorkflows,
        total,
        limit,
        offset,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 });
  }
}
