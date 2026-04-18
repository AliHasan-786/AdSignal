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

// ── Shared sub-components ────────────────────────────────────
function PanelCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h3
        className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        <span
          className="inline-block w-1 h-4 rounded-full"
          style={{ background: "var(--accent-purple)" }}
          aria-hidden="true"
        />
        {title}
      </h3>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="text-xs font-semibold uppercase tracking-widest block mb-2"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-input)",
  border: "1px solid var(--border-default)",
  color: "var(--text-primary)",
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};

function SliderWithValue({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <FieldLabel>{label}</FieldLabel>
        <span
          className="text-sm font-bold tabular-nums px-2 py-0.5 rounded-md"
          style={{
            color: "var(--accent-purple-light)",
            background: "rgba(124,58,237,0.12)",
          }}
        >
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
        className="w-full appearance-none cursor-pointer"
        style={{ accentColor: "var(--accent-purple)" }}
        aria-label={label}
      />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
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
    { name: "Control", value: baselineVal, color: "#2D1B56" },
    { name: "Treatment", value: +(baselineVal * (1 + config.mde / 100)).toFixed(2), color: "#7C3AED" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-xl font-extrabold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          A/B Test Designer
        </h2>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Configure experiment parameters for a statistically valid CTV format test.
          Sample size calculations use the two-tailed z-test formula standard in
          industry experimentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Config panel */}
        <div className="space-y-5">
          <PanelCard title="Variants">
            <div className="space-y-4">
              <div>
                <FieldLabel>Control Format</FieldLabel>
                <input
                  type="text"
                  value={config.controlFormat}
                  onChange={(e) => set("controlFormat")(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
                />
              </div>
              <div>
                <FieldLabel>Treatment Format</FieldLabel>
                <input
                  type="text"
                  value={config.treatmentFormat}
                  onChange={(e) => set("treatmentFormat")(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
                />
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Experiment Parameters">
            <div className="space-y-5">
              <div>
                <FieldLabel>Primary Metric</FieldLabel>
                <select
                  value={config.primaryMetric}
                  onChange={(e) => set("primaryMetric")(e.target.value)}
                  style={selectStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
                >
                  <option value="ctr">Click-Through Rate (CTR)</option>
                  <option value="completion">Completion Rate</option>
                </select>
              </div>

              <SliderWithValue
                label={`Baseline ${config.primaryMetric === "ctr" ? "CTR (%)" : "Completion (%)"}`}
                value={baselineVal}
                min={config.primaryMetric === "ctr" ? 0.1 : 40}
                max={config.primaryMetric === "ctr" ? 5 : 99}
                step={config.primaryMetric === "ctr" ? 0.05 : 1}
                display={`${baselineVal}%`}
                onChange={(v) =>
                  set(config.primaryMetric === "ctr" ? "baselineCTR" : "baselineCompletion")(v)
                }
              />

              <div>
                <SliderWithValue
                  label="Minimum Detectable Effect (MDE)"
                  value={config.mde}
                  min={5}
                  max={50}
                  step={5}
                  display={`+${config.mde}%`}
                  onChange={(v) => set("mde")(v)}
                />
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  Smallest lift worth detecting
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Significance (α)</FieldLabel>
                  <select
                    value={config.alpha}
                    onChange={(e) => set("alpha")(Number(e.target.value))}
                    style={selectStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
                  >
                    <option value={0.10}>90% (α=0.10)</option>
                    <option value={0.05}>95% (α=0.05)</option>
                    <option value={0.01}>99% (α=0.01)</option>
                  </select>
                </div>
                <div>
                  <FieldLabel>Statistical Power</FieldLabel>
                  <select
                    value={config.power}
                    onChange={(e) => set("power")(Number(e.target.value))}
                    style={selectStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
                  >
                    <option value={0.70}>70%</option>
                    <option value={0.80}>80% (standard)</option>
                    <option value={0.90}>90%</option>
                  </select>
                </div>
              </div>

              <SliderWithValue
                label="Daily Impressions (total)"
                value={config.dailyImpressions}
                min={5000}
                max={500000}
                step={5000}
                display={config.dailyImpressions.toLocaleString()}
                onChange={(v) => set("dailyImpressions")(v)}
              />

              <SliderWithValue
                label="Traffic Split (% to experiment)"
                value={config.trafficSplit}
                min={10}
                max={100}
                step={10}
                display={`${config.trafficSplit}%`}
                onChange={(v) => set("trafficSplit")(v)}
              />
            </div>
          </PanelCard>
        </div>

        {/* Results panel */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Sample / variant */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                Sample / Variant
              </p>
              <p
                className="font-extrabold tabular-nums leading-none"
                style={{ fontSize: "2rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {results.n.toLocaleString()}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                impressions needed
              </p>
            </div>

            {/* Total impressions */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                Total Impressions
              </p>
              <p
                className="font-extrabold tabular-nums leading-none"
                style={{ fontSize: "2rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {results.totalImpressions.toLocaleString()}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                both variants combined
              </p>
            </div>

            {/* Test duration — hero stat */}
            <div
              className="col-span-2 rounded-xl p-5"
              style={{
                background: "rgba(124,58,237,0.10)",
                border: "1px solid rgba(124,58,237,0.35)",
                boxShadow: "0 0 0 1px rgba(124,58,237,0.10), 0 4px 24px rgba(109,40,217,0.12)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#A855F7" }}>
                Projected Test Duration
              </p>
              <p
                className="font-extrabold tabular-nums leading-none"
                style={{ fontSize: "3rem", color: "var(--text-primary)", letterSpacing: "-0.03em" }}
              >
                {results.days}{" "}
                <span
                  className="text-xl font-normal"
                  style={{ color: "var(--text-secondary)" }}
                >
                  days
                </span>
              </p>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                at {config.dailyImpressions.toLocaleString()} impressions/day ·{" "}
                {config.trafficSplit}% traffic allocated
              </p>
            </div>
          </div>

          {/* Bar chart */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Control vs. Treatment — Projected {metricLabel}
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(109,40,217,0.10)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9B8EC4", fontSize: 12, fontWeight: 600 }}
                  tickLine={false}
                  axisLine={{ stroke: "#1E1340" }}
                />
                <YAxis
                  tick={{ fill: "#5B4F7A", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#1E1340" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, metricLabel]}
                  contentStyle={{
                    backgroundColor: "#160d2a",
                    border: "1px solid rgba(124,58,237,0.30)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#F1EEF9",
                  }}
                  labelStyle={{ color: "#9B8EC4", fontWeight: 700 }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              className="mt-3 pt-3 grid grid-cols-2 gap-4 text-xs"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <div>
                <p style={{ color: "var(--text-muted)" }}>Control ({config.controlFormat})</p>
                <p className="font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>{baselineVal}%</p>
              </div>
              <div>
                <p style={{ color: "var(--text-muted)" }}>Treatment ({config.treatmentFormat})</p>
                <p className="font-semibold mt-0.5" style={{ color: "#A855F7" }}>
                  {(baselineVal * (1 + config.mde / 100)).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Experiment summary */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Experiment Design Summary
            </h3>
            <div className="space-y-2.5 text-sm">
              {[
                ["Hypothesis", `${config.treatmentFormat} will improve ${metricLabel} by ≥${config.mde}% vs. ${config.controlFormat}`],
                ["Randomization unit", "Device ID (household-level)"],
                ["Guard rail metric", "Ad completion rate — must not decrease"],
                ["Significance threshold", `α = ${config.alpha} (${Math.round((1 - config.alpha) * 100)}% confidence)`],
                ["Statistical power", `${Math.round(config.power * 100)}% (β = ${1 - config.power})`],
                ["Test type", "Two-tailed — detecting both lifts and drops"],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-3">
                  <span
                    className="text-xs font-bold uppercase tracking-widest shrink-0 pt-0.5"
                    style={{ color: "var(--accent-purple-light)", minWidth: "130px" }}
                  >
                    {key}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
