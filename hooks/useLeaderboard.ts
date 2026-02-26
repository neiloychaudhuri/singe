"use client";

import { useCallback, useEffect, useState } from "react";
import { LeaderboardEntry } from "@/types";

export function useLeaderboard(deviceId: string) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leaderboard/fetch");
      const data = await res.json();
      if (data.entries) {
        setEntries(data.entries);
        if (deviceId) {
          const userEntry = data.entries.find(
            (e: LeaderboardEntry) => e.device_id === deviceId
          );
          setUserRank(userEntry || null);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const submitScore = useCallback(
    async (score: number, tier: string) => {
      if (!deviceId) return;
      try {
        await fetch("/api/leaderboard/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ device_id: deviceId, score, tier }),
        });
      } catch (err) {
        console.error("Failed to submit score:", err);
      }
    },
    [deviceId]
  );

  return { entries, loading, userRank, submitScore, fetchLeaderboard };
}
