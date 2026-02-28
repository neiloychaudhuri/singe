import { StreakEntry, StreakLog } from "@/types";

const KEY = "singe_streak_log";

function toLocalDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getLocalDateStr(): string {
  return toLocalDateStr(new Date());
}

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

// Parse "YYYY-MM-DD" as local noon — avoids UTC off-by-one and DST midnight edge cases
function localNoon(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0).getTime();
}

export function calculateStreak(log: StreakLog): number {
  if (log.entries.length === 0) return 0;

  const todayStr = toLocalDateStr(new Date());
  const dates = log.entries.map((e) => e.date).sort().reverse();

  const diffFromToday = Math.round(
    (localNoon(todayStr) - localNoon(dates[0])) / (1000 * 60 * 60 * 24)
  );

  if (diffFromToday > 1) return 0;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const diff = Math.round(
      (localNoon(dates[i]) - localNoon(dates[i + 1])) / (1000 * 60 * 60 * 24)
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
    const dateStr = toLocalDateStr(d);
    const entry = log.entries.find((e) => e.date === dateStr) || null;
    days.push(entry);
  }
  return days;
}
