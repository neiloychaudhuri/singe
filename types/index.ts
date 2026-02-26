export interface FormInputs {
  sleepHours: number;
  coffees: number;
  tabs: number;
  hoursToDeadline: number;
  hoursSinceGrass: number;
  vibeCheck: 1 | 2 | 3 | 4 | 5;
}

export interface Tier {
  label: string;
  emoji: string;
  min: number;
  max: number;
  color: string;
  tone: string;
}

export interface ScoredResult {
  inputs: FormInputs;
  score: number;
  tier: Tier;
  readout?: string;
}

export interface LeaderboardEntry {
  rank: number;
  device_id: string;
  score: number;
  tier: string;
  created_at: string;
  username?: string;
}

export interface StreakEntry {
  date: string;
  score: number;
  tier: string;
}

export interface StreakLog {
  entries: StreakEntry[];
}
