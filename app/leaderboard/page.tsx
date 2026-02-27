"use client";

import { useEffect } from "react";
import { useDeviceId } from "@/hooks/useDeviceId";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { posthog } from "@/lib/posthog";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import UserRankBadge from "@/components/leaderboard/UserRankBadge";

export default function LeaderboardPage() {
  const deviceId = useDeviceId();
  const { entries, loading, userRank } = useLeaderboard(deviceId);

  useEffect(() => {
    posthog.capture("leaderboard_viewed");
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 px-4 py-12 min-h-[calc(100vh-65px)]">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          <span className="syntax-fn">leaderboard</span>
          <span className="text-zinc-400">()</span>
        </h1>
        <p className="text-zinc-500 text-sm">
          <span className="syntax-comment">// top 50 most cooked humans, sorted by score desc</span>
        </p>
      </div>

      {userRank && (
        <UserRankBadge entry={userRank} />
      )}

      {loading ? (
        <div className="space-y-2 w-full max-w-2xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-14 bg-zinc-900 rounded-xl animate-pulse border border-zinc-800/50"
            />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="text-zinc-600 text-center py-12">
          <p className="text-lg mb-2">No scores yet.</p>
          <p className="text-sm">Be the first to get singed.</p>
        </div>
      ) : (
        <LeaderboardTable entries={entries} currentDeviceId={deviceId} />
      )}

      {!loading && userRank === null && entries.length > 0 && deviceId && (
        <div className="text-zinc-600 text-sm text-center">
          Your score hasn&apos;t cracked the top 50 yet. Keep getting cooked.
        </div>
      )}
    </div>
  );
}
