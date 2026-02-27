"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FormInputs } from "@/types";
import { calculateSingeScore } from "@/lib/scoring";
import { getTier } from "@/lib/tiers";
import { posthog } from "@/lib/posthog";
import StepSleep from "./StepSleep";
import StepCaffeine from "./StepCaffeine";
import StepTabs from "./StepTabs";
import StepDeadline from "./StepDeadline";
import StepGrass from "./StepGrass";
import StepVibe from "./StepVibe";

const TOTAL_STEPS = 6;

export default function SingeForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<FormInputs>({
    sleepHours: 6,
    coffees: 2,
    tabs: 10,
    hoursToDeadline: 12,
    hoursSinceGrass: 4,
    vibeCheck: 3,
  });

  const nextStep = useCallback(() => {
    if (step === 0) {
      posthog.capture("form_started");
    }
    posthog.capture("form_step_completed", { step: step + 1 });
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [step]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleSubmit = useCallback(() => {
    posthog.capture("form_step_completed", { step: 6 });
    const score = calculateSingeScore(inputs);
    const tier = getTier(score);

    const params = new URLSearchParams({
      score: score.toString(),
      tier: tier.label,
      sleepHours: inputs.sleepHours.toString(),
      coffees: inputs.coffees.toString(),
      tabs: inputs.tabs.toString(),
      hoursToDeadline: inputs.hoursToDeadline.toString(),
      hoursSinceGrass: inputs.hoursSinceGrass.toString(),
      vibeCheck: inputs.vibeCheck.toString(),
    });

    router.push(`/result?${params.toString()}`);
  }, [inputs, router]);

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="w-full h-1 bg-zinc-800 rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="min-h-[320px] flex items-center justify-center">
        {step === 0 && (
          <StepSleep
            value={inputs.sleepHours}
            onChange={(v) => setInputs({ ...inputs, sleepHours: v })}
            onNext={nextStep}
          />
        )}
        {step === 1 && (
          <StepCaffeine
            value={inputs.coffees}
            onChange={(v) => setInputs({ ...inputs, coffees: v })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 2 && (
          <StepTabs
            value={inputs.tabs}
            onChange={(v) => setInputs({ ...inputs, tabs: v })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <StepDeadline
            value={inputs.hoursToDeadline}
            onChange={(v) => setInputs({ ...inputs, hoursToDeadline: v })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
          <StepGrass
            value={inputs.hoursSinceGrass}
            onChange={(v) => setInputs({ ...inputs, hoursSinceGrass: v })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 5 && (
          <StepVibe
            value={inputs.vibeCheck}
            onChange={(v) => setInputs({ ...inputs, vibeCheck: v })}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        )}
      </div>

      <p className="text-center text-zinc-600 text-sm mt-8">
        Step {step + 1} of {TOTAL_STEPS}
      </p>
    </div>
  );
}
