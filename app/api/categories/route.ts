import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// In-memory cache for categories
let categoriesCache: { data: any[] | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    // Return cached data if valid
    if (categoriesCache.data && Date.now() - categoriesCache.timestamp < CACHE_TTL) {
      return NextResponse.json(categoriesCache.data, {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
          "X-Cache": "HIT",
        },
      });
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { workflows: true },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    // Sort by predefined order
    const order = [
      "when-then", "human-gate", "self-heal", "smart-context",
      "domino", "bridge", "clockwork", "instant-react",
      "shape-shift", "content-machine", "watchdog", "swarm",
    ];

    const sortedCategories = categories
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color,
        count: cat._count.workflows,
      }))
      .sort((a, b) => {
        const aIndex = order.indexOf(a.id);
        const bIndex = order.indexOf(b.id);
        return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
      });

    // Store in cache
    categoriesCache = { data: sortedCategories, timestamp: Date.now() };

    return NextResponse.json(sortedCategories, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
