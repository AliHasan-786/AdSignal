"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function calcSampleSize(
  baselineRate: number,
  mde: number,
  alpha: number,
  power: number
): number {
  // Two-tailed z-scores
  const zAlpha = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
  const zBeta = power === 0.8 ? 0.842 : power === 0.9 ? 1.282 : 0.674;
  const p1 = baselineRate;
  const p2 = baselineRate * (1 + mde / 100);
  const pBar = (p1 + p2) / 2;
  const n =
    Math.ceil(
      (Math.pow(zAlpha * Math.sqrt(2 * pBar * (1 - pBar)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2)) /
        Math.pow(p2 - p1, 2)
    );
  return n;
}

function calcDays(samplePerVariant: number, dailyImpressions: number): number {
  return Math.ceil((samplePerVariant * 2) / dailyImpressions);
}

export default function ABTestDesigner() {
  const [config, setConfig] = useState({
    controlFormat: "Standard 30s",
    treatmentFormat: "Interactive Choice Ad",
    primaryMetric: "ctr",
    baselineCTR: 0.30,
    baselineCompletion: 78,
    mde: 15,
    alpha: 0.05,
    power: 0.80,
    dailyImpressions: 50000,
    trafficSplit: 50,
  });

  const set = (key: keyof typeof config) => (v: number | string) =>
    setConfig((prev) => ({ ...prev, [key]: v }));

  const results = useMemo(() => {
    const baseline =
      config.primaryMetric === "ctr"
        ? config.baselineCTR / 100
        : config.baselineCompletion / 100;
    const n = calcSampleSize(baseline, config.mde, config.alpha, config.power);
    const days = calcDays(n, config.dailyImpressions * (config.trafficSplit / 100));
    const totalImpressions = n * 2;
    const projectedLift = baseline * (1 + config.mde / 100);

    return { n, days, totalImpressions, projectedLift };
  }, [config]);

  const metricLabel = config.primaryMetric === "ctr" ? "CTR" : "Completion Rate";
  const baselineVal =
    config.primaryMetric === "ctr"
      ? config.baselineCTR
      : config.baselineCompletion;

  const barData = [
    {
      name: "Control",
      value: baselineVal,
      color: "#374151",
    },
    {
      name: "Treatment",
      value: +(baselineVal * (1 + config.mde / 100)).toFixed(2),
      color: "#3b82f6",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">A/B Test Designer</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure experiment parameters for a statistically valid CTV format test.
          Sample size calculations use the two-tailed z-test formula standard in
          industry experimentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Config panel */}
        <div className="space-y-5">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Variants
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">
                  Control Format
                </label>
                <input
                  type="text"
                  value={config.controlFormat}
                  onChange={(e) => set("controlFormat")(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">
                  Treatment Format
                </label>
                <input
                  type="text"
                  value={config.treatmentFormat}
                  onChange={(e) => set("treatmentFormat")(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Experiment Parameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">
                  Primary Metric
                </label>
                <select
                  value={config.primaryMetric}
                  onChange={(e) => set("primaryMetric")(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="ctr">Click-Through Rate (CTR)</option>
                  <option value="completion">Completion Rate</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm text-gray-400">
                    Baseline{" "}
                    {config.primaryMetric === "ctr" ? "CTR (%)" : "Completion (%)"}
                  </label>
                  <span className="text-sm font-semibold text-white tabular-nums">
                    {baselineVal}%
                  </span>
                </div>
                <input
                  type="range"
                  min={config.primaryMetric === "ctr" ? 0.1 : 40}
                  max={config.primaryMetric === "ctr" ? 5 : 99}
                  step={config.primaryMetric === "ctr" ? 0.05 : 1}
                  value={baselineVal}
                  onChange={(e) =>
                    set(
                      config.primaryMetric === "ctr"
                        ? "baselineCTR"
                        : "baselineCompletion"
                    )(Number(e.target.value))
                  }
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm text-gray-400">
                    Minimum Detectable Effect (MDE)
                  </label>
                  <span className="text-sm font-semibold text-white tabular-nums">
                    +{config.mde}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={config.mde}
                  onChange={(e) => set("mde")(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Smallest lift worth detecting
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    Significance (α)
                  </label>
                  <select
                    value={config.alpha}
                    onChange={(e) => set("alpha")(Number(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={0.10}>90% (α=0.10)</option>
                    <option value={0.05}>95% (α=0.05)</option>
                    <option value={0.01}>99% (α=0.01)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    Statistical Power
                  </label>
                  <select
                    value={config.power}
                    onChange={(e) => set("power")(Number(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={0.70}>70%</option>
                    <option value={0.80}>80% (standard)</option>
                    <option value={0.90}>90%</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm text-gray-400">
                    Daily Impressions (total)
                  </label>
                  <span className="text-sm font-semibold text-white tabular-nums">
                    {config.dailyImpressions.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={config.dailyImpressions}
                  onChange={(e) => set("dailyImpressions")(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm text-gray-400">
                    Traffic Split (% to experiment)
                  </label>
                  <span className="text-sm font-semibold text-white tabular-nums">
                    {config.trafficSplit}%
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={10}
                  value={config.trafficSplit}
                  onChange={(e) => set("trafficSplit")(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Sample / Variant
              </p>
              <p className="text-2xl font-bold text-white tabular-nums">
                {results.n.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1">impressions needed</p>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Total Impressions
              </p>
              <p className="text-2xl font-bold text-white tabular-nums">
                {results.totalImpressions.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1">both variants combined</p>
            </div>
            <div className="bg-blue-900/30 rounded-xl border border-blue-800/50 p-4 col-span-2">
              <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">
                Projected Test Duration
              </p>
              <p className="text-3xl font-bold text-white tabular-nums">
                {results.days}{" "}
                <span className="text-lg text-gray-400 font-normal">days</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                at {config.dailyImpressions.toLocaleString()} impressions/day ·{" "}
                {config.trafficSplit}% traffic allocated
              </p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Control vs. Treatment — Projected {metricLabel}
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#374151" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#374151" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, metricLabel]}
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500">Control ({config.controlFormat})</p>
                <p className="text-white font-semibold">{baselineVal}%</p>
              </div>
              <div>
                <p className="text-gray-500">Treatment ({config.treatmentFormat})</p>
                <p className="text-blue-400 font-semibold">
                  {(baselineVal * (1 + config.mde / 100)).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Test plan summary */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Experiment Design Summary
            </h3>
            <div className="space-y-2 text-sm">
              {[
                ["Hypothesis", `${config.treatmentFormat} will improve ${metricLabel} by ≥${config.mde}% vs. ${config.controlFormat}`],
                ["Randomization unit", "Device ID (household-level)"],
                ["Guard rail metric", "Ad completion rate — must not decrease"],
                ["Significance threshold", `α = ${config.alpha} (${Math.round((1 - config.alpha) * 100)}% confidence)`],
                ["Statistical power", `${Math.round(config.power * 100)}% (β = ${1 - config.power})`],
                ["Test type", "Two-tailed — detecting both lifts and drops"],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <span className="text-gray-500 min-w-36 shrink-0">{key}</span>
                  <span className="text-gray-300">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
