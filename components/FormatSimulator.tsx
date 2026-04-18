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
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <label className="text-sm text-gray-400">{label}</label>
        <span className="text-sm font-semibold text-white tabular-nums">
          {formatValue ? formatValue(value) : value}
          {unit && !formatValue ? unit : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

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
      {/* Controls */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Ad Configuration
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">
                Format Type
              </label>
              <select
                value={inputs.format}
                onChange={(e) => set("format")(e.target.value as FormatKey)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                {formatOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1.5">
                Product Category
              </label>
              <select
                value={inputs.category}
                onChange={(e) =>
                  set("category")(e.target.value as CategoryKey)
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

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

        {/* Benchmarks source */}
        <div className="text-xs text-gray-600 px-1 space-y-1">
          <p className="font-medium text-gray-500">Data sources</p>
          <p>
            IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 ·
            Roku Shoptalk 2025 · Marketing Brew (May 2025)
          </p>
        </div>
      </div>

      {/* Outputs */}
      <div className="lg:col-span-2 space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Predicted CTR
            </p>
            <p className="text-3xl font-bold text-white tabular-nums">
              {output.ctrFormatted}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              vs. 0.30% standard avg — IAB 2024
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Completion Rate
            </p>
            <p className="text-3xl font-bold text-white tabular-nums">
              {output.completionFormatted}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              CTV avg 78% for 30s · IAB 2024
            </p>
          </div>
        </div>

        {/* Engagement curve */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
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
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              AI Format Recommendation
            </h3>
            <button
              onClick={fetchAIRecommendation}
              disabled={ai.loading}
              className="text-xs text-blue-400 hover:text-blue-300 border border-blue-800 hover:border-blue-600 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ai.loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {ai.loading && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Analyzing format parameters against benchmark data...
            </div>
          )}

          {!ai.loading && ai.text && (
            <p
              className={`text-sm leading-relaxed ${
                ai.error ? "text-gray-500" : "text-gray-300"
              }`}
            >
              {ai.text}
            </p>
          )}

          {!ai.loading && !ai.text && (
            <p className="text-sm text-gray-600">
              Click Generate to get a data-grounded format recommendation from
              Claude based on your current inputs.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
