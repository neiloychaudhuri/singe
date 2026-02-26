"use client";

import { LeaderboardEntry } from "@/types";
import { TIERS } from "@/lib/tiers";

interface Props {
  entries: LeaderboardEntry[];
  currentDeviceId: string;
}

function getTierEmoji(tierLabel: string): string {
  const tier = TIERS.find((t) => t.label === tierLabel);
  return tier?.emoji || "🔥";
}

function getTierColor(tierLabel: string): string {
  const tier = TIERS.find((t) => t.label === tierLabel);
  return tier?.color || "#ef4444";
}

function maskDeviceId(id: string): string {
  if (id.length < 8) return id;
  return `${id.slice(0, 3)}...${id.slice(-3)}`;
}

function relativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export default function LeaderboardTable({
  entries,
  currentDeviceId,
}: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-2">
        {entries.map((entry) => {
          const isCurrentUser = entry.device_id === currentDeviceId;
          const displayName = entry.username
            ? `@${entry.username}`
            : maskDeviceId(entry.device_id);

          return (
            <div
              key={`${entry.rank}-${entry.device_id}`}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                isCurrentUser
                  ? "bg-orange-500/10 border border-orange-500/30"
                  : "bg-zinc-900 border border-zinc-800/50"
              }`}
            >
              <span className="text-zinc-500 font-bold text-sm w-8 text-right tabular-nums">
                #{entry.rank}
              </span>
              <span className="text-xl">{getTierEmoji(entry.tier)}</span>
              <span
                className="font-black text-2xl tabular-nums"
                style={{ color: getTierColor(entry.tier) }}
              >
                {entry.score}
              </span>
              <span className="text-zinc-400 text-sm flex-1 truncate">
                {displayName}
                {isCurrentUser && (
                  <span className="text-orange-400 ml-2 font-bold">
                    (you)
                  </span>
                )}
              </span>
              <span className="text-zinc-600 text-sm">
                {relativeTime(entry.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
