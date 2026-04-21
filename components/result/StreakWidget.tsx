"use client";

import { StreakEntry } from "@/types";
import { getTier } from "@/lib/tiers";

interface Props {
  streak: number;
  last7Days: (StreakEntry | null)[];
  highest: { score: number; date: string } | null;
}

function formatDateStr(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function ScoreGraph({ last7Days }: { last7Days: (StreakEntry | null)[] }) {
  const W = 280;
  const H = 84;
  const padX = 10;
  const padYTop = 18; // extra room for score labels above dots
  const padYBot = 8;
  const plotW = W - padX * 2;
  const plotH = H - padYTop - padYBot;

  const points = last7Days.map((entry, i) => {
    if (!entry) return null;
    const x = padX + (i / 6) * plotW;
    const y = padYTop + (1 - entry.score / 100) * plotH;
    return { x, y, score: entry.score, color: getTier(entry.score).color };
  });

  // Build path segments connecting consecutive non-null points
  const segments: string[] = [];
  let seg: { x: number; y: number }[] = [];
  for (const pt of points) {
    if (pt) {
      seg.push(pt);
    } else {
      if (seg.length >= 2) {
        segments.push(
          seg
            .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
            .join(" ")
        );
      }
      seg = [];
    }
  }
  if (seg.length >= 2) {
    segments.push(
      seg
        .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join(" ")
    );
  }

  const hasAnyData = points.some(Boolean);

  return (
    <div className="w-full mb-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 84 }}>
        {/* Subtle dashed grid lines at 25, 50, 75 */}
        {[25, 50, 75].map((val) => {
          const y = padYTop + (1 - val / 100) * plotH;
          return (
            <line
              key={val}
              x1={padX}
              x2={W - padX}
              y1={y}
              y2={y}
              stroke="#27272a"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Empty state label */}
        {!hasAnyData && (
          <text
            x={W / 2}
            y={H / 2 + 4}
            textAnchor="middle"
            fill="#3f3f46"
            fontSize="11"
          >
            Complete days to see your trend
          </text>
        )}

        {/* Line segments in yellow */}
        {segments.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Data point dots (tier color) + score labels above */}
        {points.map((pt, i) =>
          pt ? (
            <g key={i}>
              <text
                x={pt.x}
                y={pt.y - 8}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="9"
                fontWeight="600"
              >
                {pt.score}
              </text>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={4}
                fill={pt.color}
                stroke="#18181b"
                strokeWidth="1.5"
              />
            </g>
          ) : (
            <circle
              key={i}
              cx={padX + (i / 6) * plotW}
              cy={padYTop + plotH / 2}
              r={2}
              fill="#27272a"
            />
          )
        )}
      </svg>
    </div>
  );
}

export default function StreakWidget({ streak, last7Days, highest }: Props) {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date();
  const startDayIdx = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  ).getDay();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm">
      <ScoreGraph last7Days={last7Days} />

      <div className="flex items-center justify-between mb-4">
        <span className="text-zinc-100 font-bold text-lg">
          {streak > 0 ? `${streak} day streak` : "No streak yet"}
        </span>
      </div>

      <div className="flex justify-between gap-2 mb-4">
        {last7Days.map((entry, i) => {
          const dayIdx = (startDayIdx + i) % 7;
          const color = entry ? getTier(entry.score).color : "#3f3f46";
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full transition-colors"
                style={{ backgroundColor: color }}
                title={entry ? `Score: ${entry.score}` : "No entry"}
              />
              <span className="text-zinc-500 text-xs font-medium">
                {dayLabels[(dayIdx + 6) % 7]}
              </span>
            </div>
          );
        })}
      </div>

      {highest && (
        <div className="text-zinc-500 text-sm border-t border-zinc-800 pt-3">
          All-time best:{" "}
          <span className="text-zinc-300 font-bold">{highest.score}</span>
          <span className="text-zinc-600 ml-1">
            ({formatDateStr(highest.date)})
          </span>
        </div>
      )}
    </div>
  );
}
