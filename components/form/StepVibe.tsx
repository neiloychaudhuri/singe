"use client";

interface Props {
  value: 1 | 2 | 3 | 4 | 5;
  onChange: (val: 1 | 2 | 3 | 4 | 5) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const VIBES: { value: 1 | 2 | 3 | 4 | 5; label: string; emoji: string }[] = [
  { value: 1, label: "Dying", emoji: "💀" },
  { value: 2, label: "Rough", emoji: "😵‍💫" },
  { value: 3, label: "Mid", emoji: "😐" },
  { value: 4, label: "Decent", emoji: "😊" },
  { value: 5, label: "Thriving", emoji: "✨" },
];

export default function StepVibe({
  value,
  onChange,
  onSubmit,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="syntax-keyword">return</span>{" "}
          <span className="syntax-fn">vibeCheck</span>
          <span className="text-zinc-400">(</span>
          <span className="syntax-string">self</span>
          <span className="text-zinc-400">);</span>
        </h2>
        <p className="text-zinc-600 text-sm mt-2">How are you actually doing right now?</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-md">
        {VIBES.map((v) => (
          <button
            key={v.value}
            onClick={() => onChange(v.value)}
            className={`flex flex-col items-center gap-1 px-5 py-4 rounded-xl transition-all ${
              value === v.value
                ? "bg-yellow-400 text-black scale-110"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            <span className="text-2xl">{v.emoji}</span>
            <span className="text-sm font-bold">{v.label}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors text-lg"
        >
          Get Singed
        </button>
      </div>
    </div>
  );
}
