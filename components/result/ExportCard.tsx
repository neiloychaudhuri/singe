"use client";

import { FormInputs, Tier } from "@/types";

interface Props {
  score: number;
  tier: Tier;
  readout: string;
  streak: number;
  inputs: FormInputs;
  format: "square" | "story";
  username?: string;
}

export default function ExportCard({
  score,
  tier,
  readout,
  streak,
  inputs,
  format,
  username,
}: Props) {
  const width = 540;
  const height = format === "square" ? 540 : 960;
  const isStory = format === "story";
  const truncatedReadout =
    readout.length > (isStory ? 180 : 100)
      ? readout.slice(0, isStory ? 180 : 100) + "..."
      : readout;

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const stats = [
    { label: "Sleep", value: `${inputs.sleepHours}h`, icon: "🛏️" },
    { label: "Coffees", value: `${inputs.coffees}`, icon: "☕" },
    { label: "Tabs", value: `${inputs.tabs}`, icon: "🗂️" },
    {
      label: "Deadline",
      value: inputs.hoursToDeadline >= 48 ? "48+h" : `${inputs.hoursToDeadline}h`,
      icon: "⏰",
    },
    { label: "Grass", value: `${inputs.hoursSinceGrass}h`, icon: "🌿" },
  ];

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
        padding: isStory ? "48px 40px" : "40px",
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: `radial-gradient(circle at 30% 20%, ${tier.color}44 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${tier.color}33 0%, transparent 50%)`,
        }}
      />

      {/* Top: Branding */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#52525b",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
          }}
        >
          SINGE
        </span>
        <span
          style={{
            color: "#3f3f46",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {today}
        </span>
      </div>

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: isStory ? "36px" : "28px",
        }}
      >
        {/* Username */}
        {username && (
          <span
            style={{
              color: "#71717a",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            @{username}
          </span>
        )}

        {/* Score */}
        <span
          style={{
            color: tier.color,
            fontWeight: 900,
            fontSize: isStory ? "128px" : "88px",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
            textAlign: "center" as const,
            width: "100%",
          }}
        >
          {score}
        </span>

        {/* Tier badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: isStory ? "8px" : "6px",
            width: "100%",
          }}
        >
          <span style={{ fontSize: isStory ? "28px" : "22px" }}>
            {tier.emoji}
          </span>
          <span
            style={{
              fontSize: isStory ? "22px" : "18px",
              fontWeight: 700,
              color: tier.color,
              letterSpacing: "0.01em",
            }}
          >
            {tier.label}
          </span>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: "60px",
            height: "2px",
            background: `${tier.color}33`,
            borderRadius: "1px",
            margin: isStory ? "4px 0" : "2px 0",
          }}
        />

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isStory ? "28px" : "20px",
            width: "100%",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: isStory ? "6px" : "4px",
                minWidth: isStory ? "60px" : "50px",
              }}
            >
              <span style={{ fontSize: isStory ? "20px" : "16px" }}>
                {stat.icon}
              </span>
              <span
                style={{
                  color: "#e4e4e7",
                  fontSize: isStory ? "17px" : "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  color: "#52525b",
                  fontSize: isStory ? "10px" : "9px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* AI readout */}
        {readout && (
          <p
            style={{
              color: "#71717a",
              fontSize: isStory ? "14px" : "12px",
              textAlign: "center" as const,
              lineHeight: 1.7,
              maxWidth: "420px",
              marginTop: isStory ? "8px" : "4px",
              fontStyle: "italic",
            }}
          >
            &ldquo;{truncatedReadout}&rdquo;
          </p>
        )}
      </div>

      {/* Bottom footer */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: "#3f3f46",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {streak > 0 ? `Day ${streak} streak` : ""}
        </span>
        <span
          style={{
            color: "#27272a",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          getsinged.com
        </span>
      </div>
    </div>
  );
}
