"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";

interface DataPoint {
  second: number;
  attention: number;
}

interface EngagementCurveProps {
  data: DataPoint[];
  formatLabel: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-sm"
        style={{
          background: "#160d2a",
          border: "1px solid rgba(124,58,237,0.35)",
          boxShadow: "0 4px 16px rgba(109,40,217,0.20)",
        }}
      >
        <p style={{ color: "#9B8EC4", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Second {label}
        </p>
        <p style={{ color: "#A855F7", fontWeight: 700, fontSize: "1rem", marginTop: "2px" }}>
          {payload[0].value.toFixed(1)}%
        </p>
        <p style={{ color: "#5B4F7A", fontSize: "0.65rem" }}>attention retained</p>
      </div>
    );
  }
  return null;
};

export default function EngagementCurve({
  data,
  formatLabel,
}: EngagementCurveProps) {
  const midpoint = data.length > 0 ? Math.floor(data.length / 2) : 15;
  const endAttention =
    data.length > 0 ? data[data.length - 1].attention : 0;

  // Determine end-state color for the stat badge
  const endColor =
    endAttention >= 70
      ? "#34D399"
      : endAttention >= 45
      ? "#FBBF24"
      : "#F87171";

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#5B4F7A" }}
          >
            Attention Retention Curve
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#3D2D5C" }}>
            Predicted attention drop-off over ad duration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#9B8EC4",
            }}
          >
            {formatLabel}
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-bold tabular-nums"
            style={{
              background: `${endColor}15`,
              border: `1px solid ${endColor}40`,
              color: endColor,
            }}
          >
            {endAttention.toFixed(0)}% end
          </span>
        </div>
      </div>

      {/* Chart — taller to act as visual hero */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 5 }}>
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A855F7" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#A855F7" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(109,40,217,0.10)"
            vertical={false}
          />
          <XAxis
            dataKey="second"
            tick={{ fill: "#3D2D5C", fontSize: 11, fontWeight: 600 }}
            tickLine={false}
            axisLine={{ stroke: "#1E1340" }}
            label={{
              value: "second",
              position: "insideBottomRight",
              offset: -5,
              fill: "#3D2D5C",
              fontSize: 10,
            }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#3D2D5C", fontSize: 11, fontWeight: 600 }}
            tickLine={false}
            axisLine={{ stroke: "#1E1340" }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={midpoint}
            stroke="#2D1B56"
            strokeDasharray="4 4"
            label={{
              value: "midpoint",
              fill: "#3D2D5C",
              fontSize: 10,
              position: "insideTopLeft",
            }}
          />
          {/* 50% attention warning line */}
          <ReferenceLine
            y={50}
            stroke="rgba(251,191,36,0.20)"
            strokeDasharray="3 3"
            label={{
              value: "50%",
              fill: "#5B4F7A",
              fontSize: 10,
              position: "right",
            }}
          />
          <Area
            type="monotone"
            dataKey="attention"
            stroke="#A855F7"
            strokeWidth={2.5}
            fill="url(#curveGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#A855F7",
              stroke: "#6B21A8",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Footer */}
      <div
        className="flex justify-between text-xs mt-2 px-1 pt-2"
        style={{
          borderTop: "1px solid rgba(109,40,217,0.12)",
          color: "#3D2D5C",
        }}
      >
        <span>Ad start → 100% attention</span>
        <span
          style={{ color: endAttention >= 50 ? "#34D399" : "#F87171", fontWeight: 700 }}
        >
          {endAttention.toFixed(0)}% retained at close
        </span>
      </div>
    </div>
  );
}
