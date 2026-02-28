"use client";

import { useEffect, useState } from "react";
import SingeForm from "@/components/form/SingeForm";
import dynamic from "next/dynamic";

const ASCIIText = dynamic(() => import("@/components/shared/ASCIIText"), {
  ssr: false,
});

interface LeaderboardEntry {
  rank: number;
  username: string | null;
  score: number;
  tier: string;
}

const medals = ["🥇", "🥈", "🥉"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [top3, setTop3] = useState<LeaderboardEntry[]>([]);
  const [loadingBoard, setLoadingBoard] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard/fetch")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.entries)) setTop3(data.entries.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoadingBoard(false));
  }, []);

  useEffect(() => {
    if (started) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") setStarted(true);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started]);

  if (started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] py-4 md:py-8">
        <SingeForm />
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[calc(100vh-65px)] py-4 md:py-8 overflow-visible">
      <div className="text-center mb-4 overflow-visible">
        <div className="relative w-[100vw] h-[30vh] md:h-[40vh] mb-2 overflow-visible">
          <ASCIIText
            text=" Singe "
            enableWaves
            asciiFontSize={6}
            textFontSize={420}
            textColor="#FFD54F"
            planeBaseHeight={14}
          />
        </div>
        <p className="text-zinc-600 text-xs mb-2 tracking-wide">
          made by{" "}
          <a
            href="https://www.neiloy.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-400 transition-colors"
          >
            neiloy chaudhuri
          </a>
        </p>
        <p className="text-zinc-500 text-base max-w-lg mx-auto leading-relaxed">
          <span className="syntax-comment">// answer </span>
          <span className="syntax-number">5</span>
          <span className="syntax-comment"> quick questions</span>
          <br />
          <span className="syntax-comment">
            // brutally honest AI-reviewed score + leaderboard
          </span>
        </p>
      </div>

      {/* Top 3 leaderboard — always reserves space to prevent layout shift */}
      <div className="w-full max-w-xs mb-5">
        <p className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-2 text-center">
          🔥 most cooked of all time
        </p>
        <div key={loadingBoard ? "loading" : "loaded"} className={`space-y-0.5 ${!loadingBoard ? "animate-fade-in" : ""}`} style={!loadingBoard ? { animationDuration: "0.6s" } : undefined}>
          {loadingBoard
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-900/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-5 text-center">{medals[i]}</span>
                    <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-6 bg-zinc-800 rounded animate-pulse" />
                </div>
              ))
            : top3.map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg ${
                    i === 0
                      ? "bg-yellow-400/5 border border-yellow-400/10"
                      : "bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm w-5 text-center shrink-0">
                      {medals[i]}
                    </span>
                    <span className="text-zinc-300 text-xs truncate">
                      {entry.username || "unknown singe"}
                    </span>
                  </div>
                  <span className="text-yellow-400 font-bold text-xs font-mono tabular-nums shrink-0 ml-3">
                    {entry.score}
                  </span>
                </div>
              ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-zinc-300 text-base font-semibold">
          Let&apos;s find out how cooked you are.
        </p>
        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span>🔥 Daily streaks tracked</span>
          <span>·</span>
          <span>🏆 Global leaderboard</span>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors text-sm"
        >
          Enter
        </button>
        <p className="text-zinc-700 text-xs">or press Enter ↵</p>
      </div>
    </div>
  );
}
