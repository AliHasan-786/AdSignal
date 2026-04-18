"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports with ssr:false to avoid Recharts hydration warnings in Next.js App Router
const FormatSimulator = dynamic(() => import("@/components/FormatSimulator"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center text-gray-600 text-sm">
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
    <div className="h-64 flex items-center justify-center text-gray-600 text-sm">
      Loading A/B designer...
    </div>
  ),
});

const TABS = [
  { id: "simulator", label: "Format Simulator" },
  { id: "case-study", label: "Case Study" },
  { id: "ab-test", label: "A/B Test Designer" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("simulator");

  return (
    <div className="min-h-screen" style={{ background: "#09090f" }}>
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#2563eb" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12L6 6L9 9L12 4L14 8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg leading-none">
                AdSignal
              </h1>
              <p className="text-gray-500 text-xs mt-0.5">
                CTV Ad Format Intelligence
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600">
            <span>IAB CTV Benchmarks 2024</span>
            <span>·</span>
            <span>Deloitte DM Trends 2025</span>
          </div>
        </div>
      </header>

      {/* Hero tagline */}
      <div
        className="border-b px-6 py-4"
        style={{ borderColor: "#1f2937", background: "rgba(17,24,39,0.3)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-400 max-w-2xl">
            Pre-campaign intelligence for CTV ad format selection. Input your
            ad parameters — see predicted{" "}
            <span className="text-white">engagement decay</span>,{" "}
            <span className="text-white">CTR</span>,{" "}
            <span className="text-white">completion rate</span>, and{" "}
            <span className="text-white">ad fatigue score</span> before
            committing budget.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 px-6">
        <div className="max-w-6xl mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-white"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "simulator" && <FormatSimulator />}
          {activeTab === "case-study" && <CaseStudy />}
          {activeTab === "ab-test" && <ABTestDesigner />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>
            Built by{" "}
            <a
              href="https://github.com/AliHasan-786"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              Ali Hasan
            </a>{" "}
            · Next.js · Recharts · Claude API · Vercel
          </p>
          <p>
            Data: IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
