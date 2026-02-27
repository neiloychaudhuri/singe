"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormInputs, Tier } from "@/types";
import { getTier } from "@/lib/tiers";
import { posthog } from "@/lib/posthog";
import { useStreak } from "@/hooks/useStreak";
import { useDeviceId } from "@/hooks/useDeviceId";
import SingeMeter from "@/components/result/SingeMeter";
import TierBadge from "@/components/result/TierBadge";
import AIReadout from "@/components/result/AIReadout";
import StreakWidget from "@/components/result/StreakWidget";
import ExportCard from "@/components/result/ExportCard";
import ShareButton from "@/components/shared/ShareButton";
import Link from "next/link";

function ResultContent() {
  const searchParams = useSearchParams();
  const deviceId = useDeviceId();
  const { streak, last7Days, highest, addEntry } = useStreak();

  const [readout, setReadout] = useState<string | null>(null);
  const [loadingReadout, setLoadingReadout] = useState(true);
  const [username, setUsername] = useState("");
  const [leaderboardSubmitted, setLeaderboardSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const score = parseInt(searchParams.get("score") || "0");
  const tier: Tier = getTier(score);

  const inputs: FormInputs = {
    sleepHours: parseFloat(searchParams.get("sleepHours") || "6"),
    coffees: parseInt(searchParams.get("coffees") || "2"),
    tabs: parseInt(searchParams.get("tabs") || "10"),
    hoursToDeadline: parseInt(searchParams.get("hoursToDeadline") || "12"),
    hoursSinceGrass: parseInt(searchParams.get("hoursSinceGrass") || "4"),
    vibeCheck: parseInt(searchParams.get("vibeCheck") || "3") as
      | 1
      | 2
      | 3
      | 4
      | 5,
  };

  const saveStreak = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    addEntry({ date: today, score, tier: tier.label });
  }, [score, tier.label, addEntry]);

  useEffect(() => {
    saveStreak();
  }, [saveStreak]);

  useEffect(() => {
    async function fetchReadout() {
      setLoadingReadout(true);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputs, score, tier }),
        });
        const data = await res.json();
        if (data.readout) {
          setReadout(data.readout);
          posthog.capture("score_generated", {
            score,
            tier: tier.label,
          });
        }
      } catch (err) {
        console.error("Failed to generate readout:", err);
        setReadout(
          "The AI got cooked trying to roast you. That's actually kind of impressive. Try again in a sec."
        );
      } finally {
        setLoadingReadout(false);
      }
    }

    fetchReadout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeaderboardSubmit = async () => {
    if (!deviceId || leaderboardSubmitted) return;
    setSubmitting(true);
    try {
      await fetch("/api/leaderboard/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_id: deviceId,
          score,
          tier: tier.label,
          username: username.trim() || null,
        }),
      });
      setLeaderboardSubmitted(true);
    } catch (err) {
      console.error("Failed to submit to leaderboard:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const milestones = [3, 7, 14, 30];
    if (milestones.includes(streak)) {
      posthog.capture("streak_milestone", { days: streak });
    }
  }, [streak]);

  return (
    <div className="flex flex-col items-center gap-8 px-4 py-12 min-h-[calc(100vh-65px)]">
      <div className="animate-fade-in-up">
        <SingeMeter score={score} color={tier.color} />
      </div>

      <TierBadge tier={tier} />

      <div className="mt-4">
        <AIReadout text={readout} loading={loadingReadout} />
      </div>

      <div className="mt-4">
        <StreakWidget streak={streak} last7Days={last7Days} highest={highest} />
      </div>

      {!leaderboardSubmitted ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm flex flex-col items-center gap-4">
          <h3 className="font-bold text-sm">
            <span className="syntax-fn">submit</span>
            <span className="text-zinc-400">(</span>
            <span className="syntax-string">leaderboard</span>
            <span className="text-zinc-400">)</span>
            <span className="text-zinc-500">?</span>
          </h3>
          <input
            type="text"
            placeholder="Username (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
          />
          <p className="text-zinc-600 text-xs text-center">
            Leave blank to stay anonymous
          </p>
          <button
            onClick={handleLeaderboardSubmit}
            disabled={submitting || !deviceId}
            className="w-full px-6 py-2.5 bg-zinc-100 hover:bg-white disabled:opacity-50 text-zinc-950 font-bold rounded-lg transition-colors text-sm"
          >
            {submitting ? "Submitting..." : "Submit Score"}
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-yellow-400/30 rounded-xl px-5 py-3 text-sm text-yellow-400 font-medium">
          Score submitted to leaderboard!
        </div>
      )}

      <ShareButton disabled={!readout} />

      <Link
        href="/leaderboard"
        className="text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors mt-2"
      >
        View Leaderboard
      </Link>

      <Link
        href="/"
        className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
      >
        Take it again
      </Link>

      <p className="text-zinc-700 text-xs text-center max-w-sm mt-4">
        Your scores are saved anonymously to this device. Clearing browser data
        will reset your streak and leaderboard history.
      </p>

      <ExportCard
        score={score}
        tier={tier}
        readout={readout || ""}
        streak={streak}
        format="square"
        username={username.trim() || undefined}
      />
      <ExportCard
        score={score}
        tier={tier}
        readout={readout || ""}
        streak={streak}
        format="story"
        username={username.trim() || undefined}
      />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
          <div className="text-zinc-500">Loading...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
