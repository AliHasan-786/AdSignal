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
}: {
  data: DataPoint[];
  formatLabel: string;
}) {
  const midpoint = data.length > 0 ? Math.floor(data.length / 2) : 15;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c6af5" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#7c6af5" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.04)"
          vertical={false}
        />
        <XAxis
          dataKey="second"
          tick={{ fill: "#4a4a60", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          interval={4}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#4a4a60", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          x={midpoint}
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="4 4"
        />
        <ReferenceLine
          y={50}
          stroke="rgba(251,191,36,0.10)"
          strokeDasharray="3 3"
          label={{
            value: "50%",
            position: "right",
            fill: "#4a4a60",
            fontSize: 10,
          }}
        />
        <Area
          type="monotone"
          dataKey="attention"
          stroke="#7c6af5"
          strokeWidth={2}
          fill="url(#areaGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#7c6af5", stroke: "#0c0c10", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
