import benchmarks from "@/data/benchmarks.json";

export type FormatKey = keyof typeof benchmarks.formats;
export type CategoryKey = keyof typeof benchmarks.categoryMultipliers;

export interface SimulatorInputs {
  format: FormatKey;
  category: CategoryKey;
  adLength: number; // seconds, 15–60
  interactivityLevel: number; // 1–5 slider
  targetFrequency: number; // impressions per day
}

export interface SimulatorOutput {
  predictedCTR: number;
  completionRate: number;
  fatigueScore: number;
  fatigueLabel: string;
  fatigueColor: string;
  fatigueDescription: string;
  engagementCurve: { second: number; attention: number }[];
  ctrFormatted: string;
  completionFormatted: string;
}

function interpolateDecayCurve(
  baseCurve: number[],
  targetLength: number
): number[] {
  const result: number[] = [];
  for (let i = 0; i < targetLength; i++) {
    const position = (i / (targetLength - 1)) * (baseCurve.length - 1);
    const lower = Math.floor(position);
    const upper = Math.min(Math.ceil(position), baseCurve.length - 1);
    const frac = position - lower;
    result.push(baseCurve[lower] * (1 - frac) + baseCurve[upper] * frac);
  }
  return result;
}

export function predict(inputs: SimulatorInputs): SimulatorOutput {
  const fmt = benchmarks.formats[inputs.format];
  const cat = benchmarks.categoryMultipliers[inputs.category];

  // CTR: base × category multiplier × interactivity boost
  const interactivityBoost = 1 + (inputs.interactivityLevel - 1) * 0.12;
  const rawCTR = fmt.baseCTR * cat.ctr * interactivityBoost;

  // Completion: base × category × length penalty (longer = lower completion)
  const lengthPenalty = inputs.adLength <= 15 ? 1.08 : inputs.adLength <= 30 ? 1.0 : 0.88;
  const rawCompletion = Math.min(fmt.baseCompletion * cat.completion * lengthPenalty, 0.99);

  // Fatigue: base × category × frequency multiplier × length factor
  const freqMultiplier = 1 + (inputs.targetFrequency - 1) * 0.18;
  const lengthFatigueBoost = inputs.adLength <= 15 ? 0.80 : inputs.adLength <= 30 ? 1.0 : 1.25;
  const rawFatigue = Math.min(
    fmt.baseFatigue * cat.fatigue * freqMultiplier * lengthFatigueBoost,
    10.0
  );

  // Engagement decay curve — interpolate to match adLength
  const baseCurve = fmt.decayCurve;
  const curve = interpolateDecayCurve(baseCurve, inputs.adLength);

  // Apply interactivity boost to curve (higher interactivity = shallower decay)
  const interactivityRetentionBoost = (inputs.interactivityLevel - 1) * 0.8;
  const adjustedCurve = curve.map((val, i) => {
    const decay = 100 - val;
    const boostedDecay = decay * (1 - interactivityRetentionBoost / 100);
    return Math.min(100, Math.max(0, 100 - boostedDecay));
  });

  // Map to output format
  const engagementCurve = adjustedCurve.map((attention, i) => ({
    second: i + 1,
    attention: Math.round(attention * 10) / 10,
  }));

  // Determine fatigue tier
  let fatigueLabel = "Low Risk";
  let fatigueColor = "green";
  let fatigueDescription = benchmarks.fatigueThresholds.low.description;

  if (rawFatigue > benchmarks.fatigueThresholds.moderate.max) {
    fatigueLabel = benchmarks.fatigueThresholds.high.label;
    fatigueColor = "red";
    fatigueDescription = benchmarks.fatigueThresholds.high.description;
  } else if (rawFatigue > benchmarks.fatigueThresholds.low.max) {
    fatigueLabel = benchmarks.fatigueThresholds.moderate.label;
    fatigueColor = "yellow";
    fatigueDescription = benchmarks.fatigueThresholds.moderate.description;
  }

  return {
    predictedCTR: rawCTR,
    completionRate: rawCompletion,
    fatigueScore: Math.round(rawFatigue * 10) / 10,
    fatigueLabel,
    fatigueColor,
    fatigueDescription,
    engagementCurve,
    ctrFormatted: (rawCTR * 100).toFixed(2) + "%",
    completionFormatted: Math.round(rawCompletion * 100) + "%",
  };
}

export function getFormatOptions() {
  return Object.entries(benchmarks.formats).map(([key, val]) => ({
    value: key as FormatKey,
    label: val.label,
  }));
}

export function getCategoryOptions() {
  return Object.entries(benchmarks.categoryMultipliers).map(([key, val]) => ({
    value: key as CategoryKey,
    label: val.label,
  }));
}
