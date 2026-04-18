"use client";

interface FatigueScoreProps {
  score: number;
  label: string;
  color: string;
  description: string;
}

// Token maps per severity state
const colorMap = {
  green: {
    bg: "rgba(52,211,153,0.06)",
    border: "rgba(52,211,153,0.25)",
    textAccent: "#34D399",
    bar: "linear-gradient(90deg, #059669, #34D399)",
    badgeBg: "rgba(52,211,153,0.12)",
    icon: "✓",
    isPulse: false,
  },
  yellow: {
    bg: "rgba(251,191,36,0.06)",
    border: "rgba(251,191,36,0.25)",
    textAccent: "#FBBF24",
    bar: "linear-gradient(90deg, #D97706, #FBBF24)",
    badgeBg: "rgba(251,191,36,0.12)",
    icon: "⚠",
    isPulse: false,
  },
  red: {
    bg: "rgba(239,68,68,0.07)",
    border: "rgba(239,68,68,0.30)",
    textAccent: "#F87171",
    bar: "linear-gradient(90deg, #DC2626, #F87171)",
    badgeBg: "rgba(239,68,68,0.15)",
    icon: "!",
    isPulse: true,
  },
};

export default function FatigueScore({
  score,
  label,
  color,
  description,
}: FatigueScoreProps) {
  const c = colorMap[color as keyof typeof colorMap] ?? colorMap.green;
  const pct = (score / 10) * 100;

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: c.isPulse ? `0 0 24px ${c.border}` : undefined,
      }}
    >
      {/* Top row: label + score number */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {/* State icon */}
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 ${c.isPulse ? "danger-pulse" : ""}`}
            style={{
              background: c.badgeBg,
              color: c.textAccent,
              border: `1px solid ${c.border}`,
            }}
            aria-hidden="true"
          >
            {c.icon}
          </span>
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Ad Fatigue Score
            </h3>
            <p
              className={`text-xs font-bold uppercase tracking-wide mt-0.5 ${c.isPulse ? "danger-pulse" : ""}`}
              style={{ color: c.textAccent }}
            >
              {label}
            </p>
          </div>
        </div>

        {/* Score number — big and prominent */}
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span
              className="font-extrabold tabular-nums leading-none"
              style={{
                fontSize: "3rem",
                color: c.textAccent,
                letterSpacing: "-0.03em",
                textShadow: c.isPulse ? `0 0 20px ${c.textAccent}` : undefined,
              }}
            >
              {score.toFixed(1)}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              /10
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full rounded-full h-2.5 mb-4 overflow-hidden"
        style={{ background: "rgba(0,0,0,0.25)" }}
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-label={`Fatigue score: ${score.toFixed(1)} out of 10`}
      >
        <div
          className="h-2.5 rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: c.bar,
            boxShadow: c.isPulse ? `0 0 8px ${c.textAccent}` : undefined,
          }}
        />
      </div>

      {/* Scale markers */}
      <div
        className="flex justify-between text-xs mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        <span>Low (1)</span>
        <span>Moderate (5)</span>
        <span>High (10)</span>
      </div>

      {/* Description */}
      <div
        className="rounded-lg px-4 py-3 text-sm leading-relaxed"
        style={{
          background: "rgba(0,0,0,0.20)",
          border: `1px solid ${c.border}`,
          color: "var(--text-secondary)",
        }}
      >
        {description}
      </div>

      {/* Source */}
      <p
        className="text-xs mt-3"
        style={{ color: "var(--text-muted)" }}
      >
        Source: Deloitte Digital Media Trends 2025 · IAB CTV Benchmarks 2024
      </p>
    </div>
  );
}
