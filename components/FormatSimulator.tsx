"use client";

import { useState, useEffect, useCallback } from "react";
import EngagementCurve from "./EngagementCurve";
import FatigueScore from "./FatigueScore";
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm mb-2" style={{ color: "var(--text-2)" }}>
      {children}
    </p>
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
      <div className="flex justify-between items-baseline mb-2">
        <FieldLabel>{label}</FieldLabel>
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
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
      <div className="flex justify-between mt-1.5 text-xs" style={{ color: "var(--text-3)" }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
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
        className="w-full text-sm rounded-lg px-3 py-2.5 focus:outline-none transition-colors"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        {children}
      </select>
    </div>
  );
}

function KpiCard({
  label,
  value,
  subtext,
  color,
}: {
  label: string;
  value: string;
  subtext: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs mb-3" style={{ color: "var(--text-3)" }}>
        {label}
      </p>
      <p
        className="font-bold tabular-nums leading-none mb-2"
        style={{ fontSize: "2.25rem", color, letterSpacing: "-0.03em" }}
      >
        {value}
      </p>
      <p className="text-xs" style={{ color: "var(--text-3)" }}>
        {subtext}
      </p>
    </div>
  );
}

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
        text: "Unable to reach the API. Based on your inputs, review the engagement curve for drop-off risk and consider frequency capping if your fatigue score exceeds 6.",
        loading: false,
        error: true,
      });
    }
  }, [inputs, output]);

  const set = (key: keyof typeof inputs) => (v: number | string) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const selectedFormat = formatOptions.find((f) => f.value === inputs.format);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

      {/* Controls panel */}
      <div className="space-y-5">
        <div
          className="rounded-xl p-5 space-y-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <SelectField
            label="Format type"
            value={inputs.format}
            onChange={(v) => set("format")(v as FormatKey)}
          >
            {formatOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </SelectField>

          <SelectField
            label="Product category"
            value={inputs.category}
            onChange={(v) => set("category")(v as CategoryKey)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </SelectField>

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

        <p className="text-xs leading-relaxed px-0.5" style={{ color: "var(--text-3)" }}>
          IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 · Roku Shoptalk 2025 · Marketing Brew May 2025
        </p>
      </div>

      {/* Output panel */}
      <div className="space-y-4">

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-4">
          <KpiCard
            label="Predicted CTR"
            value={output.ctrFormatted}
            subtext="vs. 0.30% standard avg — IAB 2024"
            color="var(--accent)"
          />
          <KpiCard
            label="Completion rate"
            value={output.completionFormatted}
            subtext="CTV avg 78% for 30s · IAB 2024"
            color="var(--green)"
          />
        </div>

        {/* Engagement curve */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <EngagementCurve
            data={output.engagementCurve}
            formatLabel={selectedFormat?.label ?? ""}
          />
        </div>

        {/* Fatigue score */}
        <FatigueScore
          score={output.fatigueScore}
          label={output.fatigueLabel}
          color={output.fatigueColor}
          description={output.fatigueDescription}
        />

        {/* AI recommendation */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
              AI format recommendation
            </p>
            <button
              onClick={fetchAI}
              disabled={ai.loading}
              className="text-xs px-3 py-1.5 rounded-md transition-opacity disabled:opacity-50"
              style={{ background: "var(--accent)", color: "#fff", fontWeight: 500 }}
            >
              {ai.loading ? "Generating…" : "Generate"}
            </button>
          </div>

          {ai.loading && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-2)" }}>
              <div
                className="w-3.5 h-3.5 border-2 rounded-full animate-spin shrink-0"
                style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
              />
              Analyzing against benchmark data…
            </div>
          )}

          {!ai.loading && ai.text && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: ai.error ? "var(--text-3)" : "var(--text-2)" }}
            >
              {ai.text}
            </p>
          )}

          {!ai.loading && !ai.text && (
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Get a data-grounded recommendation from Claude based on your current inputs and benchmark data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
