"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const TheBrief = dynamic(() => import("@/components/TheBrief"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-sm" style={{ color: "var(--text-3)" }}>
      Loading…
    </div>
  ),
});

const FormatSpec = dynamic(() => import("@/components/FormatSpec"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-sm" style={{ color: "var(--text-3)" }}>
      Loading…
    </div>
  ),
});

const FormatSimulator = dynamic(() => import("@/components/FormatSimulator"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center text-sm" style={{ color: "var(--text-3)" }}>
      Loading…
    </div>
  ),
});

const CaseStudy = dynamic(() => import("@/components/CaseStudy"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-sm" style={{ color: "var(--text-3)" }}>
      Loading…
    </div>
  ),
});

const ABTestDesigner = dynamic(() => import("@/components/ABTestDesigner"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-sm" style={{ color: "var(--text-3)" }}>
      Loading…
    </div>
  ),
});

const TABS = [
  {
    id: "brief",
    label: "The Brief",
    step: "01",
    description: "PRD — problem, user stories, acceptance criteria, rollout",
  },
  {
    id: "format-spec",
    label: "Format Spec",
    step: "02",
    description: "UX states, interactions, device behavior — the engineering handoff",
  },
  {
    id: "simulator",
    label: "Simulate",
    step: "03",
    description: "Live prototype — engagement decay, CTR, fatigue score",
  },
  {
    id: "research",
    label: "Research",
    step: "04",
    description: "Market data, competitive teardown, RICE prioritization",
  },
  {
    id: "measure",
    label: "Measure",
    step: "05",
    description: "A/B test design — sample size, duration, statistical power",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

function LogoMark() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden="true">
      <rect x="0" y="10" width="3" height="5" rx="0.75" fill="white" fillOpacity="0.35" />
      <rect x="5" y="6.5" width="3" height="8.5" rx="0.75" fill="white" fillOpacity="0.55" />
      <rect x="10" y="3" width="3" height="12" rx="0.75" fill="white" fillOpacity="0.8" />
      <rect x="15" y="0" width="3" height="15" rx="0.75" fill="white" />
    </svg>
  );
}

function NextStepButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mt-12 pt-8 flex justify-end" style={{ borderTop: "1px solid var(--border)" }}>
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          color: "var(--text-2)",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.color = "var(--text)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-2)";
          e.currentTarget.style.color = "var(--text-2)";
        }}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("brief");

  const currentIndex = TABS.findIndex((t) => t.id === activeTab);
  const nextTab = TABS[currentIndex + 1];
  const activeTabData = TABS[currentIndex];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center h-[52px] gap-5">

            <a href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "var(--accent)" }}
              >
                <LogoMark />
              </div>
              <span
                className="font-bold text-sm tracking-tight"
                style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
              >
                AdSignal
              </span>
            </a>

            <div className="h-4 w-px shrink-0" style={{ background: "var(--border-2)" }} />

            <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-3 py-1.5 rounded-md text-sm transition-all whitespace-nowrap shrink-0"
                  style={{
                    color: activeTab === tab.id ? "var(--text)" : "var(--text-2)",
                    background: activeTab === tab.id ? "var(--surface-2)" : "transparent",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    border: activeTab === tab.id ? "1px solid var(--border-2)" : "1px solid transparent",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    className="mr-1.5 text-xs tabular-nums"
                    style={{ color: activeTab === tab.id ? "var(--accent)" : "var(--text-3)" }}
                  >
                    {tab.step}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>

            <a
              href="https://github.com/AliHasan-786/AdSignal"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs shrink-0 transition-colors"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                APM Portfolio · Ad Experiences
              </p>
              <h1
                className="font-extrabold leading-tight mb-2"
                style={{ fontSize: "1.875rem", letterSpacing: "-0.035em", color: "var(--text)" }}
              >
                ShopPause — Shoppable Pause Ad
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)", maxWidth: "52ch" }}>
                A product concept for Roku&apos;s OneView Ad Manager: a non-intrusive shoppable overlay triggered by viewer pause intent. Full PM artifact — PRD, UX spec, prototype, research, and measurement plan.
              </p>
            </div>

            {/* Step progress */}
            <div
              className="flex flex-col gap-1 shrink-0 rounded-xl p-4"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)", minWidth: "220px" }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2.5 text-left w-full px-2 py-1.5 rounded-lg transition-colors"
                  style={{
                    background: activeTab === tab.id ? "var(--accent-dim)" : "transparent",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    className="text-xs tabular-nums font-semibold shrink-0"
                    style={{ color: activeTab === tab.id ? "var(--accent)" : "var(--text-3)", minWidth: "18px" }}
                  >
                    {tab.step}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: activeTab === tab.id ? "var(--text)" : "var(--text-3)" }}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active tab context */}
          {activeTabData && (
            <div
              className="mt-5 pt-4 flex items-center gap-2"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span
                className="text-xs font-semibold tabular-nums px-2 py-0.5 rounded"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              >
                {activeTabData.step}
              </span>
              <span className="text-xs" style={{ color: "var(--text-3)" }}>
                {activeTabData.description}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-20">
        {activeTab === "brief" && (
          <>
            <TheBrief />
            {nextTab && (
              <NextStepButton
                label={`Next: ${nextTab.step} ${nextTab.label} — ${nextTab.description}`}
                onClick={() => setActiveTab(nextTab.id)}
              />
            )}
          </>
        )}
        {activeTab === "format-spec" && (
          <>
            <FormatSpec />
            {nextTab && (
              <NextStepButton
                label={`Next: ${nextTab.step} ${nextTab.label} — ${nextTab.description}`}
                onClick={() => setActiveTab(nextTab.id)}
              />
            )}
          </>
        )}
        {activeTab === "simulator" && (
          <>
            <FormatSimulator />
            {nextTab && (
              <NextStepButton
                label={`Next: ${nextTab.step} ${nextTab.label} — ${nextTab.description}`}
                onClick={() => setActiveTab(nextTab.id)}
              />
            )}
          </>
        )}
        {activeTab === "research" && (
          <>
            <CaseStudy />
            {nextTab && (
              <NextStepButton
                label={`Next: ${nextTab.step} ${nextTab.label} — ${nextTab.description}`}
                onClick={() => setActiveTab(nextTab.id)}
              />
            )}
          </>
        )}
        {activeTab === "measure" && <ABTestDesigner />}
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            Built by{" "}
            <a
              href="https://github.com/AliHasan-786"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: "var(--text-2)" }}
            >
              Ali Hasan
            </a>
            {" "}· Next.js · Recharts · Claude API · Vercel
          </p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
