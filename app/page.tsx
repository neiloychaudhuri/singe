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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [top5, setTop5] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard/fetch")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTop5(data.slice(0, 5));
      })
      .catch(() => {});
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

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 mb-6">
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

      {/* Top 5 leaderboard preview */}
      {top5.length > 0 && (
        <div className="mt-10 w-full max-w-sm">
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">
            Most Cooked Today
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {top5.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-xs w-4 text-right font-mono">
                    {entry.rank}
                  </span>
                  <span className="text-zinc-300 text-sm font-medium truncate max-w-[140px]">
                    {entry.username || "Unknown Singe"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-xs">{entry.tier}</span>
                  <span className="text-yellow-400 font-bold text-sm font-mono">
                    {entry.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
