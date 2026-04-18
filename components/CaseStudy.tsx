"use client";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base font-semibold mb-5"
      style={{ color: "var(--text)" }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t my-10" style={{ borderColor: "var(--border)" }} />;
}

function StatCard({
  stat,
  label,
  source,
  url,
  accent = "var(--accent)",
  children,
}: {
  stat: string;
  label: string;
  source: string;
  url: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-baseline gap-2.5 mb-1">
          <span
            className="font-bold tabular-nums leading-none"
            style={{ fontSize: "2.5rem", color: accent, letterSpacing: "-0.03em" }}
          >
            {stat}
          </span>
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--text-3)" }}
          >
            {label}
          </span>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-2)" }}>
          {children}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline underline-offset-2 transition-colors"
          style={{ color: "var(--text-3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
        >
          {source} ↗
        </a>
      </div>
    </div>
  );
}

function TableHead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr style={{ borderBottom: "1px solid var(--border)" }}>
        {cols.map((c) => (
          <th
            key={c}
            className="text-left pb-2 pr-4 text-xs font-medium"
            style={{ color: "var(--text-3)" }}
          >
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function CaseStudy() {
  return (
    <div className="max-w-2xl space-y-0">

      {/* Problem */}
      <SectionTitle>Problem statement</SectionTitle>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-2)" }}>
        CTV advertisers commit five- and six-figure budgets to interactive ad formats without a
        reliable pre-campaign tool to predict engagement, completion rate, or ad fatigue risk.
        The result: wasted spend, damaged viewer experience, and missed opportunities to shift
        budget toward higher-performing formats before launch.
      </p>

      <div className="space-y-3">
        <StatCard
          stat="$40K"
          label="wasted without pre-campaign prediction"
          source="r/PPC · March 2025"
          url="https://reddit.com/r/PPC"
          accent="var(--red)"
        >
          &ldquo;We spent $40K on a CTV interactive ad campaign. Completion rate was 12%. We had no idea
          what to expect before launch. The platform gives you historical averages but nothing
          specific to your format or category.&rdquo;
        </StatCard>

        <StatCard
          stat="47%"
          label="of subscribers would cancel if ad load increases"
          source="Deloitte Digital Media Trends 2025"
          url="https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends.html"
          accent="var(--amber)"
        >
          Yet platforms have no per-format fatigue scoring before deployment. Ad fatigue is
          measured post-campaign via completion rates and churn signals — never before.
        </StatCard>

        <StatCard
          stat="0"
          label="pre-campaign fatigue tools exist publicly"
          source="Marketing Brew · May 2025"
          url="https://www.marketingbrew.com/stories/2025/05/06/upfronts-shoppable-ads"
          accent="var(--text-2)"
        >
          &ldquo;The risk of annoying users is real when interactivity isn&apos;t intuitive.&rdquo; Despite
          industry interest in shoppable ads, the tech still has a long way to go before it
          becomes second nature for consumers.
        </StatCard>
      </div>

      <Divider />

      {/* Research */}
      <SectionTitle>Market research synthesis</SectionTitle>

      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
        <p>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>Why this hasn&apos;t been solved: </span>
          CTV platforms benefit from opacity — advertisers buying without clear format preview
          drives higher CPMs on new interactive formats. Measurement lag compounds the problem:
          no pre-campaign fatigue modeling tool has existed publicly.
        </p>
        <p>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>IAB State of Data 2025: </span>
          &ldquo;The #1 request from CTV advertisers is better pre-campaign predictive modeling.
          Current benchmarks are not granular enough to guide format selection decisions.&rdquo;
        </p>
        <p>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>Roku VP of Advertising, Shoptalk 2025: </span>
          &ldquo;We need to meet the consumer where they&apos;re at in terms of how they want to interact.&rdquo;{" "}
          <a
            href="https://advertising.roku.com/learn/resources/retail-meets-the-remote-rokus-takeaways-from-shoptalk-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: "var(--text-3)" }}
          >
            Source ↗
          </a>
        </p>
      </div>

      <Divider />

      {/* RICE */}
      <SectionTitle>Feature prioritization — RICE</SectionTitle>
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <table className="w-full text-sm px-5">
          <TableHead cols={["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"]} />
          <tbody>
            {[
              { feature: "Engagement Decay Curve", reach: 1000, impact: 3, conf: 90, effort: 1, score: 2700, top: true },
              { feature: "Fatigue Score Calculator", reach: 800, impact: 3, conf: 85, effort: 1, score: 2040 },
              { feature: "Ad Format Simulator", reach: 1000, impact: 3, conf: 90, effort: 2, score: 1350 },
              { feature: "Competitive Teardown", reach: 400, impact: 2, conf: 75, effort: 1, score: 600 },
              { feature: "AI Format Recommendation", reach: 700, impact: 2, conf: 70, effort: 2, score: 490 },
              { feature: "A/B Test Designer", reach: 600, impact: 2, conf: 80, effort: 2, score: 480 },
            ].map((row) => (
              <tr
                key={row.feature}
                style={{
                  borderTop: "1px solid var(--border)",
                  background: row.top ? "rgba(139,92,246,0.05)" : undefined,
                }}
              >
                <td className="py-3 pr-4" style={{ color: row.top ? "var(--text)" : "var(--text-2)", fontWeight: row.top ? 500 : 400 }}>
                  {row.feature}
                  {row.top && (
                    <span
                      className="ml-2 text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                    >
                      #1
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.reach}</td>
                <td className="py-3 px-3 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.impact}</td>
                <td className="py-3 px-3 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.conf}%</td>
                <td className="py-3 px-3 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.effort}</td>
                <td
                  className="py-3 pl-3 text-center tabular-nums font-semibold"
                  style={{ color: row.top ? "var(--accent)" : "var(--text-2)" }}
                >
                  {row.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="px-5 py-3 text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
        >
          Score = (Reach × Impact × Confidence%) ÷ Effort
        </div>
      </div>

      <Divider />

      {/* Competitive teardown */}
      <SectionTitle>Competitive teardown — interactive CTV formats</SectionTitle>
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <table className="w-full text-sm">
          <TableHead cols={["Platform", "Format", "CTR avg", "Completion", "Notes"]} />
          <tbody>
            {[
              { platform: "Roku", format: "Action Ads (shoppable)", ctr: "1.8–2.4%", comp: "76–82%", notes: "Deepest retail integration; QR + remote overlay; ~30% CPM premium", highlight: true },
              { platform: "Amazon Fire TV", format: "Pause Ads + Interactive", ctr: "0.9–1.3%", comp: "90–95%", notes: "Non-intrusive; lowest fatigue; pause state only" },
              { platform: "Peacock", format: "Choice Ads", ctr: "1.2–1.7%", comp: "80–86%", notes: "Two-option format; strong completion; proprietary data" },
              { platform: "Samsung Ads", format: "ACR-targeted overlays", ctr: "1.0–1.5%", comp: "78–84%", notes: "Strongest 1st-party signal via Automated Content Recognition" },
              { platform: "Standard CTV", format: "Pre-roll 30s (baseline)", ctr: "0.25–0.40%", comp: "74–80%", notes: "IAB benchmark baseline; lowest cost, lowest engagement" },
            ].map((row) => (
              <tr
                key={row.platform}
                style={{
                  borderTop: "1px solid var(--border)",
                  background: row.highlight ? "rgba(139,92,246,0.05)" : undefined,
                }}
              >
                <td className="py-3 pr-4 font-medium" style={{ color: row.highlight ? "var(--accent)" : "var(--text)" }}>
                  {row.platform}
                  {row.highlight && (
                    <span
                      className="ml-2 text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                    >
                      highest CTR
                    </span>
                  )}
                </td>
                <td className="py-3 px-3" style={{ color: "var(--text-2)" }}>{row.format}</td>
                <td className="py-3 px-3 text-center tabular-nums font-medium" style={{ color: row.highlight ? "var(--accent)" : "var(--text-2)" }}>{row.ctr}</td>
                <td className="py-3 px-3 text-center tabular-nums" style={{ color: "var(--text-2)" }}>{row.comp}</td>
                <td className="py-3 pl-3 text-xs" style={{ color: "var(--text-3)" }}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="px-5 py-3 text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
        >
          Sources: IAB CTV Benchmarks 2024 · Roku Action Ads case studies · eMarketer CTV Ad Spend Q1 2025
        </div>
      </div>

      <Divider />

      {/* Success metrics */}
      <SectionTitle>Success metrics</SectionTitle>
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: "≥3 min", label: "Session duration", sub: "70% of users on Simulator tab" },
          { value: "50", label: "Unique users / 30 days", sub: "ProductHunt + r/PPC launch" },
          { value: "3+", label: "LinkedIn DMs", sub: "From CTV marketers · signal validation" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-4 text-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p
              className="font-bold tabular-nums mb-1"
              style={{ fontSize: "1.75rem", color: "var(--accent)", letterSpacing: "-0.025em" }}
            >
              {m.value}
            </p>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
              {m.label}
            </p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>
              {m.sub}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Build context */}
      <SectionTitle>Build context</SectionTitle>
      <div
        className="rounded-xl p-5 text-sm space-y-2"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {[
          ["Stack", "Next.js 16 App Router · Tailwind CSS · Recharts · Claude API via OpenRouter"],
          ["Built with", "Claude Code (claude-sonnet-4-6) · Multi-agent workflow"],
          ["Data sources", "IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 · Roku Shoptalk 2025 · Marketing Brew May 2025"],
          ["Deploy", "Vercel (free tier) · Static benchmark data, no backend required for simulator"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <span className="shrink-0 font-medium" style={{ color: "var(--text)", minWidth: "90px" }}>{k}</span>
            <span style={{ color: "var(--text-2)" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
