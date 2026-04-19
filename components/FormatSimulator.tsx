"use client";

import { useState, useEffect, useCallback } from "react";
import EngagementCurve from "./EngagementCurve";
import FatigueScore from "./FatigueScore";
import TVPrototype from "./TVPrototype";
import {
  predict,
  getFormatOptions,
  getCategoryOptions,
  type FormatKey,
  type CategoryKey,
  type SimulatorOutput,
} from "@/lib/formatPredictor";

const DEFAULT_INPUTS = {
  format: "interactive_choice" as FormatKey,
  category: "retail" as CategoryKey,
  adLength: 30,
  interactivityLevel: 3,
  targetFrequency: 3,
};

// ── Sub-components ────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium mb-2" style={{ color: "var(--text-3)" }}>
      {children}
    </p>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-2)",
          color: "var(--text)",
          fontFamily: "inherit",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
      >
        {children}
      </select>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  formatValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
}) {
  const display = formatValue ? formatValue(value) : `${value}${unit ?? ""}`;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <FieldLabel>{label}</FieldLabel>
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ color: "var(--accent)" }}
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
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </div>
  );
}

// Inline stat pill — used inside chart header
function InlineStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-end"
    >
      <span
        className="font-extrabold tabular-nums leading-none"
        style={{ fontSize: "1.5rem", color, letterSpacing: "-0.03em" }}
      >
        {value}
      </span>
      <span className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
        {label}
      </span>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────

export default function FormatSimulator() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [output, setOutput] = useState<SimulatorOutput>(() => predict(DEFAULT_INPUTS));
  const [ai, setAI] = useState({ text: "", loading: false, error: false });

  const formatOptions = getFormatOptions();
  const categoryOptions = getCategoryOptions();

  useEffect(() => {
    setOutput(predict(inputs));
  }, [inputs]);

  const fetchAI = useCallback(async () => {
    setAI({ text: "", loading: true, error: false });
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, output }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAI({ text: data.recommendation, loading: false, error: false });
    } catch {
      setAI({
        text: "Unable to reach the API. Based on your inputs, review the engagement curve for drop-off risk and consider frequency capping if fatigue score exceeds 6.",
        loading: false,
        error: true,
      });
    }
  }, [inputs, output]);

  const set = (key: keyof typeof inputs) => (v: number | string) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const selectedFormat = formatOptions.find((f) => f.value === inputs.format);

  return (
    <div className="space-y-10">

      {/* ── PROTOTYPE ── */}
      <div
        className="rounded-xl p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <TVPrototype format={inputs.format} category={inputs.category} />
      </div>

      {/* ── PERFORMANCE PROJECTIONS ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-base font-semibold" style={{ color: "var(--text)" }}>
            Performance projections
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded font-medium"
            style={{ background: "rgba(251,191,36,0.10)", color: "var(--amber)", border: "1px solid rgba(251,191,36,0.2)" }}
          >
            Modeled data
          </span>
          <span className="text-xs" style={{ color: "var(--text-3)" }}>
            Estimates derived from IAB CTV Benchmarks 2024 (not Roku internal data)
          </span>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

      {/* ── LEFT: Controls ── */}
      <aside className="space-y-4">
        <div
          className="rounded-xl p-5 space-y-5"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-3)" }}
          >
            Configuration
          </p>

          <SelectField
            label="Format type"
            value={inputs.format}
            onChange={(v) => set("format")(v as FormatKey)}
          >
            {formatOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Product category"
            value={inputs.category}
            onChange={(v) => set("category")(v as CategoryKey)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectField>

          <div className="pt-1" style={{ borderTop: "1px solid var(--border)" }} />

          <SliderField
            label="Ad length"
            value={inputs.adLength}
            min={15}
            max={60}
            step={5}
            unit="s"
            onChange={(v) => set("adLength")(v)}
          />

          <SliderField
            label="Interactivity level"
            value={inputs.interactivityLevel}
            min={1}
            max={5}
            step={1}
            onChange={(v) => set("interactivityLevel")(v)}
            formatValue={(v) => ["None", "Low", "Medium", "High", "Full"][v - 1]}
          />

          <SliderField
            label="Target frequency"
            value={inputs.targetFrequency}
            min={1}
            max={10}
            step={1}
            unit="×/day"
            onChange={(v) => set("targetFrequency")(v)}
          />
        </div>

        {/* AI Recommendation */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
              AI recommendation
            </p>
            <button
              onClick={fetchAI}
              disabled={ai.loading}
              className="text-xs px-2.5 py-1 rounded-md transition-all disabled:opacity-50"
              style={{
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              {ai.loading ? "…" : "Generate"}
            </button>
          </div>

          {ai.loading && (
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-3)" }}>
              <div
                className="w-3 h-3 border-2 rounded-full animate-spin shrink-0"
                style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
              />
              Analyzing benchmark data…
            </div>
          )}

          {!ai.loading && ai.text && (
            <p
              className="text-xs leading-relaxed"
              style={{ color: ai.error ? "var(--text-3)" : "var(--text-2)" }}
            >
              {ai.text}
            </p>
          )}

          {!ai.loading && !ai.text && (
            <p className="text-xs" style={{ color: "var(--text-3)" }}>
              Data-grounded format recommendation from Claude based on your inputs.
            </p>
          )}
        </div>
      </aside>

      {/* ── RIGHT: Output ── */}
      <div className="space-y-4">

        {/* Chart card — the hero element */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {/* Chart header with inline KPIs */}
          <div
            className="px-5 pt-5 pb-0 flex items-start justify-between"
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "var(--text-3)" }}
              >
                Attention retention curve
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--text-2)" }}>
                {selectedFormat?.label ?? ""}
              </p>
            </div>

            {/* Inline KPI stats */}
            <div className="flex items-start gap-6">
              <InlineStat
                label="Predicted CTR"
                value={output.ctrFormatted}
                color="var(--accent)"
              />
              <div
                className="w-px h-8 self-center"
                style={{ background: "var(--border-2)" }}
              />
              <InlineStat
                label="Completion rate"
                value={output.completionFormatted}
                color="var(--green)"
              />
            </div>
          </div>

          {/* Chart */}
          <div className="px-2 pt-2 pb-4">
            <EngagementCurve
              data={output.engagementCurve}
              formatLabel={selectedFormat?.label ?? ""}
            />
          </div>

          {/* Benchmark context */}
          <div
            className="px-5 pb-4 flex items-center gap-4 text-xs"
            style={{ color: "var(--text-3)" }}
          >
            <span>vs. 0.30% standard CTR avg (IAB 2024)</span>
            <span>·</span>
            <span>CTV avg 78% completion for 30s (IAB 2024)</span>
          </div>
        </div>

        {/* Fatigue score */}
        <FatigueScore
          score={output.fatigueScore}
          label={output.fatigueLabel}
          color={output.fatigueColor}
          description={output.fatigueDescription}
        />
      </div>{/* end right column */}
      </div>{/* end grid */}
      </div>{/* end performance projections */}
    </div>
  );
}
