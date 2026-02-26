"use client";

import { useEffect, useState } from "react";
import { Tier } from "@/types";

interface Props {
  tier: Tier;
}

export default function TierBadge({ tier }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        borderColor: tier.color + "40",
        backgroundColor: tier.color + "10",
      }}
    >
      <span className="text-3xl">{tier.emoji}</span>
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color: tier.color }}
      >
        {tier.label}
      </span>
    </div>
  );
}
