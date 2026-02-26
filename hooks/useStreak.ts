"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStreakLog,
  saveStreakEntry,
  calculateStreak,
  getHighestScore,
  getLast7Days,
} from "@/lib/streak";
import { StreakEntry, StreakLog } from "@/types";

export function useStreak() {
  const [log, setLog] = useState<StreakLog>({ entries: [] });
  const [streak, setStreak] = useState(0);
  const [highest, setHighest] = useState<{
    score: number;
    date: string;
  } | null>(null);
  const [last7Days, setLast7Days] = useState<(StreakEntry | null)[]>([]);

  const refresh = useCallback(() => {
    const currentLog = getStreakLog();
    setLog(currentLog);
    setStreak(calculateStreak(currentLog));
    setHighest(getHighestScore(currentLog));
    setLast7Days(getLast7Days(currentLog));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addEntry = useCallback(
    (entry: StreakEntry) => {
      const updated = saveStreakEntry(entry);
      setLog(updated);
      setStreak(calculateStreak(updated));
      setHighest(getHighestScore(updated));
      setLast7Days(getLast7Days(updated));
    },
    []
  );

  return { log, streak, highest, last7Days, addEntry, refresh };
}
