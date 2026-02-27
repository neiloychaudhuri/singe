import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(255,213,79,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(239,68,68,0.06) 0%, transparent 50%)",
          }}
        />

        {/* SINGE wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "160px",
              fontWeight: 900,
              color: "#FFD54F",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            SINGE
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#52525b",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            HOW COOKED ARE YOU?
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
              fontSize: "18px",
              color: "#3f3f46",
              letterSpacing: "0.04em",
            }}
          >
            <span>getsinged.vercel.app</span>
          </div>
        </div>

        {/* Decorative score badges */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            display: "flex",
            gap: "24px",
          }}
        >
          {[
            { score: 12, label: "Fully Cooked", color: "#ef4444" },
            { score: 47, label: "Mid", color: "#f97316" },
            { score: 88, label: "Thriving", color: "#22c55e" },
          ].map(({ score, label, color }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "36px", fontWeight: 900, color, lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ fontSize: "12px", color: "#52525b", letterSpacing: "0.06em" }}>
                {label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
