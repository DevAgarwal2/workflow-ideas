"use client";

import { useState, useEffect } from "react";
import { Trophy, TrendingUp, Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TopIdea {
  id: number;
  idea: string;
  votes: number;
  complexity: string;
  use_case: string;
  category_id: string;
  category_name: string;
  category_color: string;
}

interface MostVoted {
  id: number;
  idea: string;
  votes: number;
  total_votes: number;
  up_votes: number;
  down_votes: number;
  category_name: string;
  category_color: string;
}

interface CategoryStat {
  category_id: string;
  category_name: string;
  category_color: string;
  total_votes: number;
  avg_votes: number;
}

interface LeaderboardData {
  topIdeas: TopIdea[];
  mostVoted: MostVoted[];
  categoryStats: CategoryStat[];
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"top" | "hot" | "categories">("top");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
        <div className="text-zinc-500 text-sm">Loading leaderboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
        <div className="text-zinc-500 text-sm">Failed to load leaderboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link 
              href="/"
              className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Leaderboard
            </h1>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("top")}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === "top"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Top 10</span>
            </button>
            <button
              onClick={() => setActiveTab("hot")}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === "hot"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Active</span>
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === "categories"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Categories</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-5 py-6">
        {activeTab === "top" && (
          <div className="space-y-3">
            <p className="text-zinc-500 text-sm mb-5">Top rated workflow ideas by community votes</p>
            {data.topIdeas.map((idea, index) => (
              <div
                key={idea.id}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 hover:border-zinc-700/50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Rank badge */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                    index === 0 ? "bg-yellow-500 text-black" :
                    index === 1 ? "bg-zinc-300 text-black" :
                    index === 2 ? "bg-amber-700 text-white" :
                    "bg-zinc-800 text-zinc-400"
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium leading-snug mb-3">
                      {idea.idea}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-md text-xs font-medium text-white"
                        style={{ backgroundColor: idea.category_color }}
                      >
                        {idea.category_name}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs text-zinc-400 bg-zinc-800 capitalize">
                        {idea.complexity}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs text-zinc-400 bg-zinc-800 capitalize">
                        {idea.use_case}
                      </span>
                    </div>
                  </div>
                  
                  {/* Vote count */}
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className={`text-2xl font-bold ${idea.votes > 0 ? "text-green-500" : idea.votes < 0 ? "text-red-500" : "text-zinc-500"}`}>
                      {idea.votes > 0 ? "+" : ""}{idea.votes}
                    </div>
                    <div className="text-xs text-zinc-500">votes</div>
                  </div>
                </div>
              </div>
            ))}
            {data.topIdeas.length === 0 && (
              <div className="text-center py-16 text-zinc-500">
                No votes yet. Start voting to see the leaderboard!
              </div>
            )}
          </div>
        )}

        {activeTab === "hot" && (
          <div className="space-y-3">
            <p className="text-zinc-500 text-sm mb-5">Ideas with the most voting activity</p>
            {data.mostVoted.map((idea) => (
              <div
                key={idea.id}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 hover:border-zinc-700/50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium leading-snug mb-3">
                      {idea.idea}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-md text-xs font-medium text-white"
                        style={{ backgroundColor: idea.category_color }}
                      >
                        {idea.category_name}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium text-green-400 bg-green-500/10">
                        +{idea.up_votes} likes
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium text-red-400 bg-red-500/10">
                        -{idea.down_votes} dislikes
                      </span>
                    </div>
                  </div>
                  
                  {/* Total votes */}
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-2xl font-bold text-orange-500">
                      {idea.total_votes}
                    </div>
                    <div className="text-xs text-zinc-500">total</div>
                  </div>
                </div>
              </div>
            ))}
            {data.mostVoted.length === 0 && (
              <div className="text-center py-16 text-zinc-500">
                No votes yet. Start voting to see activity!
              </div>
            )}
          </div>
        )}

        {activeTab === "categories" && (
          <div className="space-y-3">
            <p className="text-zinc-500 text-sm mb-5">Category performance by total votes</p>
            {data.categoryStats.map((cat, index) => (
              <div
                key={cat.category_id}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 hover:border-zinc-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Rank with category color */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: cat.category_color }}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Category info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">
                      {cat.category_name}
                    </p>
                    <p className="text-sm text-zinc-500">
                      Avg: {cat.avg_votes} votes per idea
                    </p>
                  </div>
                  
                  {/* Total votes */}
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className={`text-2xl font-bold ${cat.total_votes > 0 ? "text-green-500" : cat.total_votes < 0 ? "text-red-500" : "text-zinc-500"}`}>
                      {cat.total_votes > 0 ? "+" : ""}{cat.total_votes}
                    </div>
                    <div className="text-xs text-zinc-500">total</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <Link
            href="/"
            className="block w-full py-4 bg-white text-black text-center font-semibold rounded-2xl hover:bg-zinc-200 transition-colors shadow-lg"
          >
            Vote on Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
