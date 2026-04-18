"use client";

interface FatigueScoreProps {
  score: number;
  label: string;
  color: string;
  description: string;
}

const states = {
  green: {
    accent: "var(--green)",
    bg: "rgba(74, 222, 128, 0.05)",
    border: "rgba(74, 222, 128, 0.15)",
  },
  yellow: {
    accent: "var(--amber)",
    bg: "rgba(251, 191, 36, 0.05)",
    border: "rgba(251, 191, 36, 0.15)",
  },
  red: {
    accent: "var(--red)",
    bg: "rgba(248, 113, 113, 0.05)",
    border: "rgba(248, 113, 113, 0.15)",
  },
};

export default function FatigueScore({
  score,
  label,
  color,
  description,
}: FatigueScoreProps) {
  const s = states[color as keyof typeof states] ?? states.green;
  const pct = (score / 10) * 100;

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs mb-1.5" style={{ color: "var(--text-3)" }}>
            Ad fatigue score
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: s.accent }}
          >
            {label}
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="font-bold tabular-nums"
            style={{ fontSize: "2.5rem", color: s.accent, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {score.toFixed(1)}
          </span>
          <span className="text-sm" style={{ color: "var(--text-3)" }}>
            /10
          </span>
        </div>
      </div>

      <div
        className="w-full h-1 rounded-full mb-4 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-label={`Fatigue score: ${score.toFixed(1)} out of 10`}
      >
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: s.accent }}
        />
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-2)" }}
      >
        {description}
      </p>

      <p className="text-xs mt-3" style={{ color: "var(--text-3)" }}>
        Source: Deloitte Digital Media Trends 2025 · IAB CTV Benchmarks 2024
      </p>
    </div>
  );
}
