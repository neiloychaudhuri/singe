"use client";

import { Tier } from "@/types";

interface Props {
  score: number;
  tier: Tier;
  readout: string;
  streak: number;
  format: "square" | "story";
  username?: string;
}

export default function ExportCard({
  score,
  tier,
  readout,
  streak,
  format,
  username,
}: Props) {
  const width = 540;
  const height = format === "square" ? 540 : 960;
  const truncatedReadout =
    readout.length > 140 ? readout.slice(0, 140) + "..." : readout;

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      id={`export-card-${format}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        left: "-9999px",
        top: 0,
        background: "#09090b",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          backgroundImage: `radial-gradient(circle at 30% 20%, ${tier.color}33 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${tier.color}22 0%, transparent 50%)`,
        }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>
        <span
          style={{
            color: "#71717a",
            fontWeight: 900,
            fontSize: "14px",
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
          }}
        >
          SINGE
        </span>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {username && (
          <span
            style={{
              color: "#a1a1aa",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            @{username}
          </span>
        )}
        <span
          style={{
            color: tier.color,
            fontWeight: 900,
            fontSize: format === "story" ? "120px" : "96px",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {score}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "24px" }}>{tier.emoji}</span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: tier.color,
            }}
          >
            {tier.label}
          </span>
        </div>
        {readout && (
          <p
            style={{
              color: "#a1a1aa",
              fontSize: "14px",
              textAlign: "center" as const,
              lineHeight: 1.6,
              maxWidth: "400px",
              marginTop: "8px",
            }}
          >
            &ldquo;{truncatedReadout}&rdquo;
          </p>
        )}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "#71717a", fontSize: "14px" }}>
          {streak > 0 && <span>Day {streak} streak</span>}
        </div>
        <div
          style={{
            color: "#52525b",
            fontSize: "12px",
            textAlign: "center" as const,
            flex: 1,
          }}
        >
          singe.app
        </div>
        <div style={{ color: "#71717a", fontSize: "14px" }}>{today}</div>
      </div>
    </div>
  );
}
