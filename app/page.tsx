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

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("simulator");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center h-14 gap-6">

            {/* Wordmark */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 10L4.5 5.5L7 8L9.5 3.5L12.5 7"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--text)" }}>
                AdSignal
              </span>
            </div>

            {/* Divider */}
            <div className="h-4 w-px" style={{ background: "var(--border-2)" }} />

            {/* Tab nav */}
            <nav className="flex items-center gap-0.5 flex-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={{
                    color: activeTab === tab.id ? "var(--text)" : "var(--text-2)",
                    background: activeTab === tab.id ? "var(--surface-2)" : "transparent",
                    fontWeight: activeTab === tab.id ? 500 : 400,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Right: data provenance */}
            <p className="hidden md:block text-xs shrink-0" style={{ color: "var(--text-3)" }}>
              IAB CTV 2024 · Deloitte 2025
            </p>
          </div>
        </div>
      </header>

      {/* Subheader */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <p className="text-sm" style={{ color: "var(--text-2)", maxWidth: "56ch" }}>
            Pre-campaign CTV ad format intelligence. Predict engagement decay, CTR, completion rate, and ad fatigue before committing budget.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 pb-20">
        {activeTab === "simulator" && <FormatSimulator />}
        {activeTab === "case-study" && <CaseStudy />}
        {activeTab === "ab-test" && <ABTestDesigner />}
      </main>

      {/* Footer */}
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
