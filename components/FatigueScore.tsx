"use client";

interface FatigueScoreProps {
  score: number;
  label: string;
  color: string;
  description: string;
}

const colorMap = {
  green: {
    bg: "bg-emerald-900/30",
    border: "border-emerald-700/50",
    text: "text-emerald-400",
    bar: "bg-emerald-500",
    dot: "bg-emerald-400",
  },
  yellow: {
    bg: "bg-amber-900/30",
    border: "border-amber-700/50",
    text: "text-amber-400",
    bar: "bg-amber-500",
    dot: "bg-amber-400",
  },
  red: {
    bg: "bg-red-900/30",
    border: "border-red-700/50",
    text: "text-red-400",
    bar: "bg-red-500",
    dot: "bg-red-400",
  },
};

export default function FatigueScore({
  score,
  label,
  color,
  description,
}: FatigueScoreProps) {
  const c = colorMap[color as keyof typeof colorMap] || colorMap.green;
  const pct = (score / 10) * 100;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
            Ad Fatigue Score
          </h3>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold tabular-nums ${c.text}`}>
            {score.toFixed(1)}
          </span>
          <span className="text-gray-500 text-sm">/10</span>
        </div>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${c.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-start gap-2">
        <span className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>
          {label}
        </span>
        <span className="text-gray-500 text-xs">—</span>
        <span className="text-gray-400 text-xs leading-snug">{description}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800">
        <p className="text-xs text-gray-600">
          Source: Deloitte Digital Media Trends 2025 · IAB CTV Benchmarks 2024
        </p>
      </div>
    </div>
  );
}
