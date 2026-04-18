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

interface AIRecommendation {
  text: string;
  loading: boolean;
  error: boolean;
}

// ── Slider row ──────────────────────────────────────────────
function SliderRow({
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
  const displayVal = formatValue ? formatValue(value) : `${value}${unit ?? ""}`;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          {label}
        </label>
        <span
          className="text-sm font-bold tabular-nums px-2 py-0.5 rounded-md"
          style={{
            color: "var(--accent-purple-light)",
            background: "rgba(124,58,237,0.12)",
          }}
        >
          {displayVal}
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
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={displayVal}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

// ── Select ───────────────────────────────────────────────────
function StyledSelect({
  value,
  onChange,
  children,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <label
        className="text-xs font-semibold uppercase tracking-widest block mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none transition-colors"
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border-default)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
      >
        {children}
      </select>
    </div>
  );
}

// ── KPI card ─────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  subtext,
  accentColor,
  isHero = false,
}: {
  label: string;
  value: string;
  subtext: string;
  accentColor: string;
  isHero?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{
        background: "var(--bg-surface)",
        border: `1px solid ${isHero ? "rgba(124,58,237,0.40)" : "var(--border-subtle)"}`,
        boxShadow: isHero
          ? "0 0 0 1px rgba(124,58,237,0.20), 0 4px 24px rgba(109,40,217,0.15)"
          : undefined,
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <p
        className="font-extrabold tabular-nums leading-none"
        style={{ fontSize: "2.5rem", color: accentColor, letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
        {subtext}
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function FormatSimulator() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [output, setOutput] = useState<SimulatorOutput>(() =>
    predict(DEFAULT_INPUTS)
  );
  const [ai, setAI] = useState<AIRecommendation>({
    text: "",
    loading: false,
    error: false,
  });

  const formatOptions = getFormatOptions();
  const categoryOptions = getCategoryOptions();

  useEffect(() => {
    setOutput(predict(inputs));
  }, [inputs]);

  const fetchAIRecommendation = useCallback(async () => {
    setAI({ text: "", loading: true, error: false });
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, output }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setAI({ text: data.recommendation, loading: false, error: false });
    } catch {
      setAI({
        text: "Unable to generate AI recommendation. Based on your inputs, the predicted CTR and fatigue score suggest this format has moderate-to-good performance potential for this category. Review the engagement curve for drop-off risk.",
        loading: false,
        error: true,
      });
    }
  }, [inputs, output]);

  const set = (key: keyof typeof inputs) => (v: number | string) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const selectedFormat = formatOptions.find((f) => f.value === inputs.format);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── LEFT: Controls ── */}
      <div className="lg:col-span-1 space-y-5">
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="inline-block w-1.5 h-4 rounded-full"
              style={{ background: "var(--accent-purple)" }}
              aria-hidden="true"
            />
            Ad Configuration
          </h2>

          <div className="space-y-5">
            <StyledSelect
              label="Format Type"
              value={inputs.format}
              onChange={(v) => set("format")(v as FormatKey)}
            >
              {formatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </StyledSelect>

            <StyledSelect
              label="Product Category"
              value={inputs.category}
              onChange={(v) => set("category")(v as CategoryKey)}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </StyledSelect>

            <SliderRow
              label="Ad Length"
              value={inputs.adLength}
              min={15}
              max={60}
              step={5}
              unit="s"
              onChange={(v) => set("adLength")(v)}
            />

            <SliderRow
              label="Interactivity Level"
              value={inputs.interactivityLevel}
              min={1}
              max={5}
              step={1}
              onChange={(v) => set("interactivityLevel")(v)}
              formatValue={(v) =>
                ["None", "Low", "Medium", "High", "Full"][v - 1]
              }
            />

            <SliderRow
              label="Target Frequency"
              value={inputs.targetFrequency}
              min={1}
              max={10}
              step={1}
              unit="x/day"
              onChange={(v) => set("targetFrequency")(v)}
            />
          </div>
        </div>

        {/* Data sources */}
        <div className="px-1 space-y-1">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Data sources
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 ·
            Roku Shoptalk 2025 · Marketing Brew May 2025
          </p>
        </div>
      </div>

      {/* ── RIGHT: Outputs ── */}
      <div className="lg:col-span-2 space-y-5">

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-4">
          <KpiCard
            label="Predicted CTR"
            value={output.ctrFormatted}
            subtext="vs. 0.30% standard avg — IAB 2024"
            accentColor="var(--accent-yellow)"
            isHero
          />
          <KpiCard
            label="Completion Rate"
            value={output.completionFormatted}
            subtext="CTV avg 78% for 30s · IAB 2024"
            accentColor="var(--state-success)"
          />
        </div>

        {/* Engagement curve — HERO */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            boxShadow: "0 0 0 1px rgba(124,58,237,0.15), 0 8px 32px rgba(109,40,217,0.12)",
          }}
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
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-4 rounded-full"
                style={{ background: "linear-gradient(to bottom, #A855F7, #F5E642)" }}
                aria-hidden="true"
              />
              <h3
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                AI Format Recommendation
              </h3>
            </div>

            <button
              onClick={fetchAIRecommendation}
              disabled={ai.loading}
              className="text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: ai.loading
                  ? "rgba(124,58,237,0.15)"
                  : "linear-gradient(135deg, #6B21A8, #7C3AED)",
                color: "#fff",
                boxShadow: ai.loading ? "none" : "0 0 12px rgba(124,58,237,0.40)",
                border: "1px solid rgba(124,58,237,0.40)",
              }}
            >
              {ai.loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {ai.loading && (
            <div
              className="flex items-center gap-3 text-sm py-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <div
                className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin flex-shrink-0"
                style={{ borderColor: "var(--accent-purple)", borderTopColor: "transparent" }}
              />
              Analyzing format parameters against benchmark data...
            </div>
          )}

          {!ai.loading && ai.text && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: ai.error ? "var(--text-muted)" : "var(--text-secondary)" }}
            >
              {ai.text}
            </p>
          )}

          {!ai.loading && !ai.text && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Click Generate to get a data-grounded format recommendation from
              Claude based on your current inputs and benchmark data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
