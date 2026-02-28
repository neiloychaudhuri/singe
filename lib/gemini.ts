import { FormInputs, Tier } from "@/types";

export function buildPrompt(inputs: FormInputs, score: number, tier: Tier): string {
  return `Gen Alpha friend. ONE snarky sentence (15-25 words).

Stats: ${inputs.sleepHours}h sleep, ${inputs.coffees} coffees, ${inputs.tabs} tabs, ${inputs.hoursToDeadline}h to deadline, ${inputs.hoursSinceGrass}h no outside.
Score: ${score}/100 — ${tier.label}. Tone: ${tier.tone}.

Rules: ref at least 1 stat, Comedy Central roast energy, don't use the phrase "no cap", employ the modern use of ebonics, Gen Alpha brainrot slang naturally, never start with "I"/"Wow"/"It sounds like", no generic advice.

Reply with only the sentence.`.trim();
}
