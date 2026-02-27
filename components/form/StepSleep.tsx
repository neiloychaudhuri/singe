"use client";

import { useState } from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
  onNext: () => void;
}

export default function StepSleep({ value, onChange, onNext }: Props) {
  const [local, setLocal] = useState(value);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="syntax-fn">sleep</span>
          <span className="text-zinc-400">(</span>
          <span className="syntax-string">hours</span>
          <span className="text-zinc-400">)</span>
          <span className="text-zinc-600"> — </span>
          <span className="text-zinc-300">last night?</span>
        </h2>
        <p className="text-zinc-600 text-sm mt-2">How many hours did you sleep last night?</p>
      </div>
      <div className="relative w-full max-w-sm">
        <input
          type="range"
          min={0}
          max={12}
          step={0.5}
          value={local}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setLocal(v);
            onChange(v);
          }}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
        />
        <div className="mt-4 text-center">
          <span className="text-5xl font-black text-zinc-100 tabular-nums">
            {local === 12 ? "12+" : local}
          </span>
          <span className="text-xl text-zinc-400 ml-2">hours</span>
        </div>
      </div>
      <button
        onClick={onNext}
        className="mt-4 px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors text-lg"
      >
        Next
      </button>
    </div>
  );
}
