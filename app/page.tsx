"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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
    id: "case-study",
    label: "The Problem",
    step: "01",
    hint: "Why this exists",
  },
  {
    id: "simulator",
    label: "Simulate",
    step: "02",
    hint: "Try the tool",
  },
  {
    id: "ab-test",
    label: "Run a Test",
    step: "03",
    hint: "Design an experiment",
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

function NextStepButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className="mt-12 pt-8 flex justify-end"
      style={{ borderTop: "1px solid var(--border)" }}
    >
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
  const [activeTab, setActiveTab] = useState<TabId>("case-study");

  const currentIndex = TABS.findIndex((t) => t.id === activeTab);
  const nextTab = TABS[currentIndex + 1];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center h-[52px] gap-5">

            {/* Wordmark */}
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

            {/* Divider */}
            <div className="h-4 w-px shrink-0" style={{ background: "var(--border-2)" }} />

            {/* Tabs */}
            <nav className="flex items-center gap-0.5 flex-1" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-3 py-1.5 rounded-md text-sm transition-all"
                  style={{
                    color: activeTab === tab.id ? "var(--text)" : "var(--text-2)",
                    background: activeTab === tab.id ? "var(--surface-2)" : "transparent",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    border: activeTab === tab.id
                      ? "1px solid var(--border-2)"
                      : "1px solid transparent",
                  }}
                >
                  <span
                    className="mr-1.5 text-xs tabular-nums"
                    style={{
                      color: activeTab === tab.id ? "var(--accent)" : "var(--text-3)",
                    }}
                  >
                    {tab.step}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* GitHub */}
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
        <div className="max-w-5xl mx-auto px-6 py-10">

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            CTV Ad Format Intelligence
          </p>
          <h1
            className="font-extrabold leading-tight mb-3"
            style={{ fontSize: "2.25rem", letterSpacing: "-0.04em", color: "var(--text)" }}
          >
            Know before you spend.
          </h1>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--text-2)", maxWidth: "52ch" }}
          >
            CTV advertisers commit real budget to ad formats with no way to predict performance
            before launch. AdSignal simulates engagement decay, CTR, completion rate, and fatigue
            risk — so you can optimize format selection before the campaign goes live.
          </p>

          {/* 3-step story flow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}>
            {[
              {
                step: "01",
                tab: "case-study" as TabId,
                title: "Understand the problem",
                body: "IAB and Deloitte data show CTV advertisers are flying blind — no pre-campaign format prediction tools exist.",
                cta: "Read the case →",
              },
              {
                step: "02",
                tab: "simulator" as TabId,
                title: "Simulate your format",
                body: "Configure format type, ad length, and frequency. See predicted CTR, completion rate, and engagement decay update live.",
                cta: "Try the simulator →",
              },
              {
                step: "03",
                tab: "ab-test" as TabId,
                title: "Design a valid test",
                body: "Once you've picked a format, calculate the sample size and test duration you need for a statistically rigorous result.",
                cta: "Build the test →",
              },
            ].map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActiveTab(s.tab)}
                className="text-left p-5 transition-colors"
                style={{
                  background: activeTab === s.tab ? "var(--surface-2)" : "var(--surface)",
                  borderLeft: i > 0 ? "1px solid var(--border)" : undefined,
                  borderBottom: "none",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== s.tab) e.currentTarget.style.background = "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== s.tab) e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <p
                  className="text-xs font-semibold tabular-nums mb-2"
                  style={{ color: activeTab === s.tab ? "var(--accent)" : "var(--text-3)" }}
                >
                  {s.step}
                </p>
                <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>
                  {s.title}
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-2)" }}>
                  {s.body}
                </p>
                <p
                  className="text-xs font-medium"
                  style={{ color: activeTab === s.tab ? "var(--accent)" : "var(--text-3)" }}
                >
                  {s.cta}
                </p>
              </button>
            ))}
          </div>

          {/* Source bar */}
          <div
            className="flex items-center gap-2 mt-6 pt-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>
              Data sources:
            </span>
            {[
              "IAB CTV Benchmarks 2024",
              "Deloitte Digital Media Trends 2025",
              "Roku Shoptalk 2025",
              "Marketing Brew May 2025",
            ].map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: "var(--surface-3)",
                  color: "var(--text-3)",
                  border: "1px solid var(--border)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-20">
        {activeTab === "case-study" && (
          <>
            <CaseStudy />
            {nextTab && (
              <NextStepButton
                label={`Next: ${nextTab.label} — ${nextTab.hint}`}
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
                label={`Next: ${nextTab.label} — ${nextTab.hint}`}
                onClick={() => setActiveTab(nextTab.id)}
              />
            )}
          </>
        )}
        {activeTab === "ab-test" && <ABTestDesigner />}
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
              className="underline underline-offset-2 transition-colors"
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
