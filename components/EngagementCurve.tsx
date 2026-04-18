"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface DataPoint {
  second: number;
  attention: number;
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
        className="text-sm rounded-lg px-3 py-2"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-2)",
        }}
      >
        <p className="text-xs mb-0.5" style={{ color: "var(--text-3)" }}>
          Second {label}
        </p>
        <p className="font-semibold" style={{ color: "var(--accent)" }}>
          {payload[0].value.toFixed(1)}% retained
        </p>
      </div>
    );
  }
  return null;
};

export default function EngagementCurve({
  data,
  formatLabel,
}: {
  data: DataPoint[];
  formatLabel: string;
}) {
  const midpoint = data.length > 0 ? Math.floor(data.length / 2) : 15;
  const endAttention = data.length > 0 ? data[data.length - 1].attention : 0;
  const endColor = endAttention >= 50 ? "var(--green)" : "var(--red)";

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
          Attention retention curve
        </p>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-3)" }}>
          <span>{formatLabel}</span>
          <span
            className="font-semibold tabular-nums"
            style={{ color: endColor }}
          >
            {endAttention.toFixed(0)}% at close
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="second"
            tick={{ fill: "#52525b", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#52525b", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={midpoint}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={50}
            stroke="rgba(251,191,36,0.12)"
            strokeDasharray="3 3"
            label={{
              value: "50%",
              position: "right",
              fill: "#52525b",
              fontSize: 10,
            }}
          />
          <Area
            type="monotone"
            dataKey="attention"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#areaGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#8b5cf6", stroke: "var(--bg)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div
        className="flex justify-between text-xs mt-3 pt-3"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
      >
        <span>Ad start → 100% attention</span>
        <span style={{ color: endColor, fontWeight: 600 }}>
          {endAttention.toFixed(0)}% retained at close
        </span>
      </div>
    </div>
  );
}
