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

function calcSampleSize(baselineRate: number, mde: number, alpha: number, power: number): number {
  const zAlpha = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
  const zBeta = power === 0.8 ? 0.842 : power === 0.9 ? 1.282 : 0.674;
  const p1 = baselineRate;
  const p2 = baselineRate * (1 + mde / 100);
  const pBar = (p1 + p2) / 2;
  return Math.ceil(
    Math.pow(
      zAlpha * Math.sqrt(2 * pBar * (1 - pBar)) +
        zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)),
      2
    ) / Math.pow(p2 - p1, 2)
  );
}

function calcDays(n: number, dailyImpressions: number): number {
  return Math.ceil((n * 2) / dailyImpressions);
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm mb-2" style={{ color: "var(--text-2)" }}>
      {children}
    </p>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {children}
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
};

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  note,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  note?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <Label>{label}</Label>
        <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text)" }}>
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      {note && (
        <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
          {note}
        </p>
      )}
    </div>
  );
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
    return { n, days, totalImpressions: n * 2 };
  }, [config]);

  const metricLabel = config.primaryMetric === "ctr" ? "CTR" : "Completion Rate";
  const baselineVal = config.primaryMetric === "ctr" ? config.baselineCTR : config.baselineCompletion;
  const treatmentVal = +(baselineVal * (1 + config.mde / 100)).toFixed(2);

  const barData = [
    { name: "Control", value: baselineVal, color: "#3f3f46" },
    { name: "Treatment", value: treatmentVal, color: "#8b5cf6" },
  ];

  const focusStyle = (e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--accent)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold mb-1.5" style={{ color: "var(--text)" }}>
          A/B Test Designer
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)", maxWidth: "60ch" }}>
          Configure experiment parameters for a statistically valid CTV format test.
          Sample size uses the two-tailed z-test formula standard in industry experimentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: config */}
        <div className="space-y-4">
          <Card>
            <p className="text-sm font-medium mb-4" style={{ color: "var(--text)" }}>Variants</p>
            <div className="space-y-4">
              <div>
                <Label>Control format</Label>
                <input
                  type="text"
                  value={config.controlFormat}
                  onChange={(e) => set("controlFormat")(e.target.value)}
                  style={fieldStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
              <div>
                <Label>Treatment format</Label>
                <input
                  type="text"
                  value={config.treatmentFormat}
                  onChange={(e) => set("treatmentFormat")(e.target.value)}
                  style={fieldStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-medium mb-4" style={{ color: "var(--text)" }}>
              Experiment parameters
            </p>
            <div className="space-y-5">
              <div>
                <Label>Primary metric</Label>
                <select
                  value={config.primaryMetric}
                  onChange={(e) => set("primaryMetric")(e.target.value)}
                  style={{ ...fieldStyle, cursor: "pointer" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                >
                  <option value="ctr">Click-Through Rate (CTR)</option>
                  <option value="completion">Completion Rate</option>
                </select>
              </div>

              <SliderField
                label={`Baseline ${config.primaryMetric === "ctr" ? "CTR (%)" : "completion (%)"}`}
                value={baselineVal}
                min={config.primaryMetric === "ctr" ? 0.1 : 40}
                max={config.primaryMetric === "ctr" ? 5 : 99}
                step={config.primaryMetric === "ctr" ? 0.05 : 1}
                display={`${baselineVal}%`}
                onChange={(v) =>
                  set(config.primaryMetric === "ctr" ? "baselineCTR" : "baselineCompletion")(v)
                }
              />

              <SliderField
                label="Minimum detectable effect (MDE)"
                value={config.mde}
                min={5}
                max={50}
                step={5}
                display={`+${config.mde}%`}
                note="Smallest lift worth detecting"
                onChange={(v) => set("mde")(v)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Significance (α)</Label>
                  <select
                    value={config.alpha}
                    onChange={(e) => set("alpha")(Number(e.target.value))}
                    style={{ ...fieldStyle, cursor: "pointer" }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  >
                    <option value={0.10}>90% (α=0.10)</option>
                    <option value={0.05}>95% (α=0.05)</option>
                    <option value={0.01}>99% (α=0.01)</option>
                  </select>
                </div>
                <div>
                  <Label>Statistical power</Label>
                  <select
                    value={config.power}
                    onChange={(e) => set("power")(Number(e.target.value))}
                    style={{ ...fieldStyle, cursor: "pointer" }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  >
                    <option value={0.70}>70%</option>
                    <option value={0.80}>80% (standard)</option>
                    <option value={0.90}>90%</option>
                  </select>
                </div>
              </div>

              <SliderField
                label="Daily impressions (total)"
                value={config.dailyImpressions}
                min={5000}
                max={500000}
                step={5000}
                display={config.dailyImpressions.toLocaleString()}
                onChange={(v) => set("dailyImpressions")(v)}
              />

              <SliderField
                label="Traffic allocated to experiment"
                value={config.trafficSplit}
                min={10}
                max={100}
                step={10}
                display={`${config.trafficSplit}%`}
                onChange={(v) => set("trafficSplit")(v)}
              />
            </div>
          </Card>
        </div>

        {/* Right: results */}
        <div className="space-y-4">

          {/* Output stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Sample / variant</p>
              <p
                className="font-bold tabular-nums leading-none mb-1"
                style={{ fontSize: "1.875rem", color: "var(--text)", letterSpacing: "-0.025em" }}
              >
                {results.n.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>impressions needed</p>
            </Card>
            <Card>
              <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Total impressions</p>
              <p
                className="font-bold tabular-nums leading-none mb-1"
                style={{ fontSize: "1.875rem", color: "var(--text)", letterSpacing: "-0.025em" }}
              >
                {results.totalImpressions.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>both variants</p>
            </Card>
          </div>

          {/* Duration — hero */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <p className="text-xs mb-2" style={{ color: "var(--accent)" }}>
              Projected test duration
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="font-bold tabular-nums"
                style={{ fontSize: "3rem", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {results.days}
              </span>
              <span className="text-xl" style={{ color: "var(--text-2)" }}>days</span>
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--text-3)" }}>
              at {config.dailyImpressions.toLocaleString()} impressions/day · {config.trafficSplit}% traffic allocated
            </p>
          </div>

          {/* Bar chart */}
          <Card>
            <p className="text-sm font-medium mb-4" style={{ color: "var(--text)" }}>
              Control vs. treatment — projected {metricLabel}
            </p>
            <div style={{ background: "var(--surface)", borderRadius: "8px" }}>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={barData}
                margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
                style={{ background: "transparent" }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#8b8ba7", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.5 * 10) / 10]}
                  tick={{ fill: "#8b8ba7", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  width={40}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, metricLabel]}
                  contentStyle={{
                    background: "#1e1e28",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#f0effe",
                  }}
                  labelStyle={{ color: "#8b8ba7" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={80}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
            <div
              className="mt-3 pt-3 grid grid-cols-2 gap-4 text-xs"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div>
                <p style={{ color: "var(--text-3)" }}>{config.controlFormat}</p>
                <p className="font-semibold mt-0.5 tabular-nums" style={{ color: "var(--text)" }}>
                  {baselineVal}%
                </p>
              </div>
              <div>
                <p style={{ color: "var(--text-3)" }}>{config.treatmentFormat}</p>
                <p className="font-semibold mt-0.5 tabular-nums" style={{ color: "var(--accent)" }}>
                  {treatmentVal}%
                </p>
              </div>
            </div>
          </Card>

          {/* Experiment design summary */}
          <Card>
            <p className="text-sm font-medium mb-4" style={{ color: "var(--text)" }}>
              Experiment design summary
            </p>
            <div className="space-y-2.5 text-sm">
              {[
                ["Hypothesis", `${config.treatmentFormat} will improve ${metricLabel} by ≥${config.mde}% vs. ${config.controlFormat}`],
                ["Randomization unit", "Device ID (household-level)"],
                ["Guard rail metric", "Ad completion rate — must not decrease"],
                ["Significance threshold", `α = ${config.alpha} (${Math.round((1 - config.alpha) * 100)}% confidence)`],
                ["Statistical power", `${Math.round(config.power * 100)}% (β = ${(1 - config.power).toFixed(2)})`],
                ["Test type", "Two-tailed — detecting both lifts and drops"],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-3">
                  <span
                    className="shrink-0 font-medium"
                    style={{ color: "var(--text)", minWidth: "140px", fontSize: "0.8125rem" }}
                  >
                    {key}
                  </span>
                  <span style={{ color: "var(--text-2)", fontSize: "0.8125rem" }}>{val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
