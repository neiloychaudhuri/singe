import { Tier } from "@/types";

export const TIERS: Tier[] = [
  {
    label: "Somehow Thriving",
    emoji: "🌱",
    min: 0,
    max: 14,
    color: "#4ade80",
    tone: "warm, slightly suspicious of how well they're doing",
  },
  {
    label: "Lightly Toasted",
    emoji: "☀️",
    min: 15,
    max: 29,
    color: "#facc15",
    tone: "chill, encouraging, light teasing",
  },
  {
    label: "Medium Rare",
    emoji: "🥩",
    min: 30,
    max: 44,
    color: "#fb923c",
    tone: "casual, supportive, honest",
  },
  {
    label: "Getting There",
    emoji: "🌡️",
    min: 45,
    max: 59,
    color: "#f97316",
    tone: "honest, motivational, acknowledge the grind",
  },
  {
    label: "Well Done",
    emoji: "🔥",
    min: 60,
    max: 74,
    color: "#ef4444",
    tone: "concerned but hype, urgency creeping in",
  },
  {
    label: "Charred",
    emoji: "💀",
    min: 75,
    max: 89,
    color: "#dc2626",
    tone: "chaotic, unhinged hype, almost mythologizing",
  },
  {
    label: "Fully Incinerated",
    emoji: "☢️",
    min: 90,
    max: 100,
    color: "#7c3aed",
    tone: "legendary, the person has transcended normal human suffering",
  },
];

export function getTier(score: number): Tier {
  return TIERS.find((t) => score >= t.min && score <= t.max)!;
}
