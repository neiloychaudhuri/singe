"use client";

import { StreakEntry } from "@/types";
import { getTier } from "@/lib/tiers";

interface Props {
  streak: number;
  last7Days: (StreakEntry | null)[];
  highest: { score: number; date: string } | null;
}

export default function StreakWidget({ streak, last7Days, highest }: Props) {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date();
  const startDayIdx = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  ).getDay();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-zinc-100 font-bold text-lg">
          {streak > 0 ? `${streak} day streak` : "No streak yet"}
        </span>
        {streak > 0 && <span className="text-2xl">🔥</span>}
      </div>

      <div className="flex justify-between gap-2 mb-4">
        {last7Days.map((entry, i) => {
          const dayIdx = (startDayIdx + i) % 7;
          const color = entry ? getTier(entry.score).color : "#3f3f46";
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full transition-colors"
                style={{ backgroundColor: color }}
                title={entry ? `Score: ${entry.score}` : "No entry"}
              />
              <span className="text-zinc-500 text-xs font-medium">
                {dayLabels[dayIdx]}
              </span>
            </div>
          );
        })}
      </div>

      {highest && (
        <div className="text-zinc-500 text-sm border-t border-zinc-800 pt-3">
          All-time best:{" "}
          <span className="text-zinc-300 font-bold">{highest.score}</span>
          <span className="text-zinc-600 ml-1">({highest.date})</span>
        </div>
      )}
    </div>
  );
}
