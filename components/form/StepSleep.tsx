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
      <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
        How many hours did you sleep last night?
      </h2>
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
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="mt-4 text-center">
          <span className="text-5xl font-black text-zinc-100 tabular-nums">
            {local}
          </span>
          <span className="text-xl text-zinc-400 ml-2">hours</span>
        </div>
      </div>
      <button
        onClick={onNext}
        className="mt-4 px-8 py-3 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold rounded-lg transition-colors text-lg"
      >
        Next
      </button>
    </div>
  );
}
