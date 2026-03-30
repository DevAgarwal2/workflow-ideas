import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Cache for leaderboard
let leaderboardCache: { data: any | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 60 * 1000; // 1 minute

export async function GET() {
  try {
    // Return cached data if valid
    if (leaderboardCache.data && Date.now() - leaderboardCache.timestamp < CACHE_TTL) {
      return NextResponse.json(leaderboardCache.data, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
          "X-Cache": "HIT",
        },
      });
    }

    // Top 10 most liked ideas
    const topIdeas = await prisma.workflow.findMany({
      take: 10,
      orderBy: [{ votes: "desc" }, { id: "asc" }],
      select: {
        id: true,
        idea: true,
        votes: true,
        complexity: true,
        useCase: true,
        categoryId: true,
        category: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    });

    // Most active (most total votes) - fetch workflows with vote counts
    const workflowsWithVoteCounts = await prisma.workflow.findMany({
      select: {
        id: true,
        idea: true,
        votes: true,
        category: {
          select: {
            name: true,
            color: true,
          },
        },
        voteRecords: {
          select: {
            voteType: true,
          },
        },
      },
    });

    const mostVoted = workflowsWithVoteCounts
      .map((w) => ({
        id: w.id,
        idea: w.idea,
        votes: w.votes,
        total_votes: w.voteRecords.length,
        up_votes: w.voteRecords.filter((v) => v.voteType === "up").length,
        down_votes: w.voteRecords.filter((v) => v.voteType === "down").length,
        category_name: w.category.name,
        category_color: w.category.color,
      }))
      .filter((w) => w.total_votes > 0)
      .sort((a, b) => b.total_votes - a.total_votes)
      .slice(0, 10);

    // Category stats
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        color: true,
        workflows: {
          select: {
            votes: true,
          },
        },
      },
    });

    const categoryStats = categories
      .map((cat) => {
        const totalVotes = cat.workflows.reduce((sum, w) => sum + w.votes, 0);
        const avgVotes = cat.workflows.length > 0
          ? Math.round((totalVotes / cat.workflows.length) * 10) / 10
          : 0;
        return {
          category_id: cat.id,
          category_name: cat.name,
          category_color: cat.color,
          total_votes: totalVotes,
          avg_votes: avgVotes,
        };
      })
      .sort((a, b) => b.total_votes - a.total_votes);

    // Transform topIdeas response
    const transformedTopIdeas = topIdeas.map((idea) => ({
      id: idea.id,
      idea: idea.idea,
      votes: idea.votes,
      complexity: idea.complexity,
      use_case: idea.useCase,
      category_id: idea.categoryId,
      category_name: idea.category.name,
      category_color: idea.category.color,
    }));

    const data = {
      topIdeas: transformedTopIdeas,
      mostVoted,
      categoryStats,
    };

    // Store in cache
    leaderboardCache = { data, timestamp: Date.now() };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
