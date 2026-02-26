"use client";

interface Props {
  value: number;
  onChange: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function StepCaffeine({
  value,
  onChange,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
        How many coffees have you had today?
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-sm">
        {OPTIONS.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-14 h-14 rounded-xl text-lg font-bold transition-all ${
              value === n
                ? "bg-orange-500 text-zinc-950 scale-110"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {n === 8 ? "8+" : n}
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
          onClick={onNext}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold rounded-lg transition-colors text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
