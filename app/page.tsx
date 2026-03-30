"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ThumbsUp, ThumbsDown, Trophy } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface Workflow {
  id: number;
  category_id: string;
  idea: string;
  complexity: string;
  use_case: string;
  platforms: string;
  votes: number;
}

// Card background colors - vibrant but not too bright
const cardColors = [
  "from-rose-950 to-zinc-900",
  "from-orange-950 to-zinc-900", 
  "from-amber-950 to-zinc-900",
  "from-emerald-950 to-zinc-900",
  "from-teal-950 to-zinc-900",
  "from-cyan-950 to-zinc-900",
  "from-sky-950 to-zinc-900",
  "from-indigo-950 to-zinc-900",
  "from-violet-950 to-zinc-900",
  "from-fuchsia-950 to-zinc-900",
];

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [loading, setLoading] = useState(true);
  const [votedCount, setVotedCount] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory 
      ? `/api/workflows?category=${selectedCategory}&limit=1000`
      : "/api/workflows?limit=1000";
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWorkflows(data.workflows);
        setCurrentIndex(0);
        setVotedCount(0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const currentWorkflow = workflows[currentIndex];

  const handleVote = useCallback(async (direction: "left" | "right") => {
    if (!currentWorkflow || isVoting) return;
    
    setIsVoting(true);
    setSwipeDirection(direction);
    setDragX(0);

    fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflowId: currentWorkflow.id,
        voteType: direction === "right" ? "up" : "down",
      }),
    }).catch(console.error);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setVotedCount((prev) => prev + 1);
      setSwipeDirection(null);
      setIsVoting(false);
    }, 200);
  }, [currentWorkflow, isVoting]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isVoting) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isVoting) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = Math.abs(currentY - startY.current);
    
    // Only allow horizontal swipe if it's more horizontal than vertical
    if (Math.abs(diffX) > diffY) {
      setDragX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (dragX > threshold) {
      handleVote("right");
    } else if (dragX < -threshold) {
      handleVote("left");
    } else {
      setDragX(0);
    }
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleVote("left");
      if (e.key === "ArrowRight") handleVote("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleVote]);

  const getCategoryColor = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.color || "#6b7280";
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Other";
  };

  const getCardColor = (index: number) => {
    return cardColors[index % cardColors.length];
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#09090b]">
        <div className="text-zinc-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (!currentWorkflow) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#09090b] px-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-2">{votedCount}</div>
          <div className="text-zinc-500 mb-8">ideas reviewed</div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentIndex(0);
              setVotedCount(0);
            }}
            className="px-6 py-3 bg-white text-black text-sm font-medium rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Review More Ideas
          </button>
        </div>
      </div>
    );
  }

  const progress = (currentIndex / workflows.length) * 100;
  const rotation = isDragging ? dragX * 0.05 : 0;
  const opacity = isDragging ? Math.max(0.5, 1 - Math.abs(dragX) / 300) : 1;

  return (
    <div className="h-screen bg-[#09090b] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-zinc-800/50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-white">Workflow Ideas</h1>
            <div className="flex items-center gap-4 text-sm">
              <Link 
                href="/leaderboard"
                className="flex items-center gap-1.5 text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                <span className="font-medium">Leaderboard</span>
              </Link>
              <span className="text-zinc-500">
                <span className="text-white font-semibold">{votedCount}</span> reviewed
              </span>
              <span className="text-zinc-500">
                <span className="text-white font-semibold">{workflows.length - currentIndex}</span> left
              </span>
            </div>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content - card area */}
      <main className="flex-1 flex items-center justify-center px-5 py-4 min-h-0">
        <div className="w-full max-w-2xl">
          <div 
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`bg-gradient-to-br ${getCardColor(currentIndex)} rounded-3xl border border-zinc-800/50 p-8 transition-all select-none touch-pan-y ${
              swipeDirection === "left" 
                ? "-translate-x-full opacity-0 rotate-[-12deg] duration-200" 
                : swipeDirection === "right" 
                ? "translate-x-full opacity-0 rotate-[12deg] duration-200" 
                : isDragging ? "" : "duration-200"
            }`}
            style={{
              transform: isDragging 
                ? `translateX(${dragX}px) rotate(${rotation}deg)` 
                : swipeDirection 
                ? undefined 
                : 'translateX(0) rotate(0deg)',
              opacity: isDragging ? opacity : undefined,
            }}
          >
            {/* Swipe indicators */}
            {isDragging && (
              <>
                <div 
                  className="absolute top-8 left-8 px-4 py-2 bg-red-500 text-white font-bold rounded-lg transition-opacity"
                  style={{ opacity: dragX < -30 ? Math.min(1, Math.abs(dragX) / 100) : 0 }}
                >
                  NOPE
                </div>
                <div 
                  className="absolute top-8 right-8 px-4 py-2 bg-green-500 text-white font-bold rounded-lg transition-opacity"
                  style={{ opacity: dragX > 30 ? Math.min(1, dragX / 100) : 0 }}
                >
                  LIKE
                </div>
              </>
            )}

            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span 
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                style={{ backgroundColor: getCategoryColor(currentWorkflow.category_id) }}
              >
                {getCategoryName(currentWorkflow.category_id)}
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/30 text-zinc-300 capitalize backdrop-blur-sm">
                {currentWorkflow.complexity}
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/30 text-zinc-300 capitalize backdrop-blur-sm">
                {currentWorkflow.use_case}
              </span>
            </div>

            {/* Main idea */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed mb-6">
              {currentWorkflow.idea}
            </h1>

            {/* Platform */}
            <div className="text-sm text-zinc-400">
              Platform: <span className="text-zinc-200">{currentWorkflow.platforms}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Voting buttons - center */}
      <div className="flex-shrink-0 py-6">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => handleVote("left")}
            disabled={isVoting}
            className="rounded-full bg-[#dc2626] hover:bg-[#b91c1c] transition-all duration-150 hover:scale-110 active:scale-95 disabled:opacity-40 flex items-center justify-center shadow-lg shadow-red-500/30"
            style={{ width: '72px', height: '72px' }}
          >
            <ThumbsDown className="w-8 h-8 text-white" strokeWidth={2} />
          </button>

          <button
            onClick={() => handleVote("right")}
            disabled={isVoting}
            className="rounded-full bg-[#22c55e] hover:bg-[#16a34a] transition-all duration-150 hover:scale-110 active:scale-95 disabled:opacity-40 flex items-center justify-center shadow-lg shadow-green-500/30"
            style={{ width: '72px', height: '72px' }}
          >
            <ThumbsUp className="w-8 h-8 text-white" strokeWidth={2} />
          </button>
        </div>
        
        <div className="text-center mt-4 text-xs text-zinc-600">
          Swipe or use ← → keys
        </div>
      </div>

      {/* Footer - categories */}
      <footer className="flex-shrink-0 border-t border-zinc-800/50 bg-zinc-900/30">
        <div className="overflow-x-auto">
          <div className="flex gap-1 px-4 py-4 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat.id ? cat.color : undefined,
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
