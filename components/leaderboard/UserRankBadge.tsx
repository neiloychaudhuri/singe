"use client";

import { LeaderboardEntry } from "@/types";
import { TIERS } from "@/lib/tiers";

interface Props {
  entry: LeaderboardEntry;
}

export default function UserRankBadge({ entry }: Props) {
  const tier = TIERS.find((t) => t.label === entry.tier);
  const color = tier?.color || "#ef4444";

  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-xl border"
      style={{
        borderColor: color + "40",
        backgroundColor: color + "10",
      }}
    >
      <span className="text-zinc-400 font-bold text-sm">Your best:</span>
      <span className="text-xl">{tier?.emoji}</span>
      <span className="font-black text-xl" style={{ color }}>
        {entry.score}
      </span>
      <span className="text-zinc-500 text-sm">Rank #{entry.rank}</span>
    </div>
  );
}
