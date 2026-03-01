"use client";

import { useStreak } from "@/hooks/useStreak";
import StreakWidget from "@/components/result/StreakWidget";
import Link from "next/link";

export default function StreakPage() {
  const { streak, last7Days, highest } = useStreak();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12 gap-6">
      <h1 className="text-zinc-100 font-bold text-2xl">your streak</h1>
      <StreakWidget streak={streak} last7Days={last7Days} highest={highest} />
      <Link
        href="/"
        className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
      >
        take it again
      </Link>
    </div>
  );
}
