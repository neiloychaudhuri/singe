"use client";

import { useEffect, useState } from "react";

interface Props {
  score: number;
  color: string;
}

export default function SingeMeter({ score, color }: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1500;
    const increment = score / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(timer);
      }
      setDisplayScore(Math.round(current));
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" className="-rotate-90">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth="12"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-6xl font-black tabular-nums"
          style={{ color }}
        >
          {displayScore}
        </span>
        <span className="text-zinc-500 text-sm font-medium tracking-wider uppercase mt-1">
          Singe Score
        </span>
      </div>
    </div>
  );
}
