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
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-gray-400">Second {label}</p>
        <p className="text-blue-400 font-semibold">
          {payload[0].value.toFixed(1)}% attention retained
        </p>
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
          Attention Retention Curve
        </h3>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
          {formatLabel}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="second"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#374151" }}
            label={{
              value: "Second",
              position: "insideBottomRight",
              offset: -5,
              fill: "#4b5563",
              fontSize: 11,
            }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#374151" }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={midpoint}
            stroke="#374151"
            strokeDasharray="4 4"
            label={{
              value: "midpoint",
              fill: "#4b5563",
              fontSize: 10,
              position: "top",
            }}
          />
          <Line
            type="monotone"
            dataKey="attention"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#3b82f6", stroke: "#1d4ed8" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        <span>Ad start → 100% attention</span>
        <span>End: {endAttention.toFixed(0)}% retained</span>
      </div>
    </div>
  );
}
