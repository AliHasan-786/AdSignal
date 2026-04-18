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

const CaseStudy = dynamic(() => import("@/components/CaseStudy"), { ssr: false });

const ABTestDesigner = dynamic(() => import("@/components/ABTestDesigner"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-sm" style={{ color: "var(--text-3)" }}>
      Loading…
    </div>
  ),
});

const TABS = [
  { id: "simulator", label: "Simulator" },
  { id: "case-study", label: "Case Study" },
  { id: "ab-test", label: "A/B Test Designer" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// Signal bars logo mark — 4 bars of increasing height
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("simulator");

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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
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
                className="text-base leading-relaxed"
                style={{ color: "var(--text-2)", maxWidth: "52ch" }}
              >
                Predict engagement decay, CTR, completion rate, and ad fatigue
                for any CTV format — before committing budget.
              </p>
            </div>

            {/* Stat trio */}
            <div
              className="flex items-center gap-6 shrink-0 rounded-xl px-6 py-4"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)" }}
            >
              {[
                { value: "10×", label: "CTR lift", sub: "interactive vs. standard" },
                { value: "47%", label: "churn risk", sub: "if ad load increases" },
                { value: "$0", label: "tools exist", sub: "pre-campaign today" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-start gap-6">
                  {i > 0 && (
                    <div className="w-px h-10 self-center" style={{ background: "var(--border-2)" }} />
                  )}
                  <div className="text-center">
                    <p
                      className="font-extrabold tabular-nums leading-none mb-1"
                      style={{ fontSize: "1.5rem", color: "var(--text)", letterSpacing: "-0.03em" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
                      {s.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>
                      {s.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-20">

        {/* Tab context strip */}
        {activeTab === "simulator" && (
          <div
            className="flex items-start gap-3 px-4 py-3 my-6 rounded-lg text-sm"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "1rem", lineHeight: 1.4 }}>①</span>
            <span style={{ color: "var(--text-2)" }}>
              <span style={{ color: "var(--text)", fontWeight: 500 }}>Choose a format and category on the left.</span>
              {" "}The chart updates live — watch how attention drops over time, and check the CTR and completion rate predictions at the top. When you&apos;re ready, hit <strong style={{ color: "var(--text)" }}>Generate</strong> for an AI recommendation.
            </span>
          </div>
        )}

        {activeTab === "case-study" && (
          <div
            className="flex items-start gap-3 px-4 py-3 my-6 rounded-lg text-sm"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "1rem", lineHeight: 1.4 }}>②</span>
            <span style={{ color: "var(--text-2)" }}>
              <span style={{ color: "var(--text)", fontWeight: 500 }}>The PM thinking behind AdSignal.</span>
              {" "}The problem statement, market research, feature prioritization (RICE), competitive teardown, and success metrics.
            </span>
          </div>
        )}

        {activeTab === "ab-test" && (
          <div
            className="flex items-start gap-3 px-4 py-3 my-6 rounded-lg text-sm"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "1rem", lineHeight: 1.4 }}>③</span>
            <span style={{ color: "var(--text-2)" }}>
              <span style={{ color: "var(--text)", fontWeight: 500 }}>Design a statistically valid A/B test before committing budget.</span>
              {" "}Set your baseline metric, the lift you need to detect, and your traffic — the calculator tells you how long the test needs to run.
            </span>
          </div>
        )}

        {activeTab === "simulator" && <FormatSimulator />}
        {activeTab === "case-study" && <CaseStudy />}
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
