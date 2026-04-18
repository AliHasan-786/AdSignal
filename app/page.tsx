"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports with ssr:false to avoid Recharts hydration warnings in Next.js App Router
const FormatSimulator = dynamic(() => import("@/components/FormatSimulator"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
      Loading simulator...
    </div>
  ),
});

const CaseStudy = dynamic(() => import("@/components/CaseStudy"), {
  ssr: false,
});

const ABTestDesigner = dynamic(() => import("@/components/ABTestDesigner"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
      Loading A/B designer...
    </div>
  ),
});

const TABS = [
  { id: "simulator", label: "Format Simulator", icon: "◈" },
  { id: "case-study", label: "Case Study", icon: "◉" },
  { id: "ab-test", label: "A/B Test Designer", icon: "⊞" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("simulator");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* ── TOP ACCENT BAR ── */}
      <div className="hero-gradient-bar h-[3px] w-full" />

      {/* ── HEADER ── */}
      <header
        className="px-6 py-5"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background: "linear-gradient(180deg, rgba(109,33,168,0.08) 0%, transparent 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Wordmark */}
          <div className="flex items-center gap-3">
            {/* Logo mark — signal waveform in purple */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6B21A8, #7C3AED)",
                boxShadow: "0 0 18px rgba(124,58,237,0.45)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M2 13L5.5 7L8.5 10.5L12 4L16 9L18 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="18" cy="7" r="1.5" fill="#F5E642" />
              </svg>
            </div>
            <div>
              <h1
                className="font-extrabold text-xl leading-none tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                AdSignal
              </h1>
              <p
                className="text-xs mt-0.5 font-medium"
                style={{ color: "var(--accent-purple-light)" }}
              >
                CTV Ad Format Intelligence
              </p>
            </div>
          </div>

          {/* Data source badges */}
          <div className="hidden sm:flex items-center gap-2">
            {["IAB CTV 2024", "Deloitte DM 2025", "Roku Shoptalk 2025"].map((src) => (
              <span
                key={src}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(109,40,217,0.12)",
                  border: "1px solid rgba(109,40,217,0.25)",
                  color: "var(--text-secondary)",
                }}
              >
                {src}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO STAT BANNER ── */}
      <div
        className="px-6 py-6"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background: "linear-gradient(180deg, rgba(109,33,168,0.06) 0%, transparent 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          {/* Primary stat */}
          <div className="flex items-baseline gap-4">
            <div>
              <span
                className="text-hero-num"
                style={{ color: "var(--accent-yellow)" }}
              >
                10×
              </span>
            </div>
            <div>
              <p
                className="text-base font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                higher CTR for interactive formats
                <br />
                <span style={{ color: "var(--text-secondary)" }}>
                  vs. standard 30s pre-roll
                </span>
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                IAB CTV Benchmarks 2024 · 3.01% vs 0.30% baseline
              </p>
            </div>
          </div>

          {/* Secondary stats row */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p
                className="text-2xl font-bold tabular-nums"
                style={{ color: "var(--accent-yellow)" }}
              >
                47%
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                would cancel if<br />ad load increases
              </p>
            </div>
            <div
              className="w-px h-10 hidden sm:block"
              style={{ background: "var(--border-subtle)" }}
            />
            <div className="text-center">
              <p
                className="text-2xl font-bold tabular-nums"
                style={{ color: "var(--state-success)" }}
              >
                78%
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                CTV completion<br />rate avg
              </p>
            </div>
            <div
              className="w-px h-10 hidden sm:block"
              style={{ background: "var(--border-subtle)" }}
            />
            <div className="text-center hidden md:block">
              <p
                className="text-2xl font-bold tabular-nums"
                style={{ color: "var(--accent-purple-light)" }}
              >
                $0
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                pre-campaign<br />tooling today
              </p>
            </div>
          </div>

        </div>

        {/* Tagline */}
        <div className="max-w-6xl mx-auto mt-4">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Input your ad parameters — see predicted{" "}
            <span style={{ color: "var(--text-primary)" }}>engagement decay</span>,{" "}
            <span style={{ color: "var(--text-primary)" }}>CTR</span>,{" "}
            <span style={{ color: "var(--text-primary)" }}>completion rate</span>, and{" "}
            <span style={{ color: "var(--text-primary)" }}>ad fatigue score</span>{" "}
            before committing budget.
          </p>
        </div>
      </div>

      {/* ── TAB NAVIGATION — pill style ── */}
      <div
        className="px-6 py-3"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-base)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="inline-flex rounded-xl p-1 gap-1"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
            role="tablist"
            aria-label="Navigation tabs"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #6B21A8, #7C3AED)",
                          color: "#fff",
                          boxShadow: "0 0 14px rgba(124,58,237,0.45)",
                        }
                      : {
                          color: "var(--text-secondary)",
                          background: "transparent",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(109,40,217,0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }
                  }}
                >
                  <span aria-hidden="true" className="text-xs opacity-70">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "simulator" && <FormatSimulator />}
          {activeTab === "case-study" && <CaseStudy />}
          {activeTab === "ab-test" && <ABTestDesigner />}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 py-5 mt-12"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <p>
            Built by{" "}
            <a
              href="https://github.com/AliHasan-786"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-purple-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Ali Hasan
            </a>{" "}
            · Next.js · Recharts · Claude API · Vercel
          </p>
          <p>IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025</p>
        </div>
      </footer>
    </div>
  );
}
