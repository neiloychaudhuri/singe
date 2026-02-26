import { StreakEntry, StreakLog } from "@/types";

const KEY = "singe_streak_log";

export function getStreakLog(): StreakLog {
  if (typeof window === "undefined") return { entries: [] };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { entries: [] };
  try {
    return JSON.parse(raw) as StreakLog;
  } catch {
    return { entries: [] };
  }
}

export function saveStreakEntry(entry: StreakEntry): StreakLog {
  const log = getStreakLog();
  const idx = log.entries.findIndex((e) => e.date === entry.date);
  if (idx >= 0) {
    log.entries[idx] = entry;
  } else {
    log.entries.push(entry);
  }
  log.entries.sort((a, b) => a.date.localeCompare(b.date));
  localStorage.setItem(KEY, JSON.stringify(log));
  return log;
}

export function calculateStreak(log: StreakLog): number {
  if (log.entries.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = log.entries.map((e) => e.date).sort().reverse();

  const latestDate = new Date(dates[0] + "T00:00:00");
  const diffFromToday = Math.floor(
    (today.getTime() - latestDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffFromToday > 1) return 0;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i] + "T00:00:00");
    const prev = new Date(dates[i + 1] + "T00:00:00");
    const diff = Math.floor(
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function getHighestScore(
  log: StreakLog
): { score: number; date: string } | null {
  if (log.entries.length === 0) return null;
  return log.entries.reduce((best, entry) =>
    entry.score > best.score ? entry : best
  );
}

export function getLast7Days(log: StreakLog): (StreakEntry | null)[] {
  const days: (StreakEntry | null)[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const entry = log.entries.find((e) => e.date === dateStr) || null;
    days.push(entry);
  }
  return days;
}
