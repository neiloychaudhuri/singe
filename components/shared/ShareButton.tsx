"use client";

import { useState } from "react";
import { exportCard } from "@/lib/exportCard";
import { posthog } from "@/lib/posthog";

interface Props {
  disabled?: boolean;
}

export default function ShareButton({ disabled }: Props) {
  const [format, setFormat] = useState<"square" | "story">("square");
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportCard(`export-card-${format}`, `singe-${format}`);
      posthog.capture("card_exported", { format });
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <button
          onClick={() => setFormat("square")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            format === "square"
              ? "bg-zinc-100 text-zinc-950"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
          }`}
        >
          Square
        </button>
        <button
          onClick={() => setFormat("story")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            format === "story"
              ? "bg-zinc-100 text-zinc-950"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
          }`}
        >
          Story
        </button>
      </div>
      <button
        onClick={handleExport}
        disabled={disabled || exporting}
        className="px-8 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold rounded-lg transition-colors text-lg"
      >
        {exporting ? "Exporting..." : "Export Card"}
      </button>
    </div>
  );
}
