"use client";

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span
          className="inline-block w-1 h-5 rounded-full flex-shrink-0"
          style={{ background: "linear-gradient(to bottom, #7C3AED, #A855F7)" }}
          aria-hidden="true"
        />
        <h2
          className="text-base font-extrabold uppercase tracking-widest"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ── Research callout — stat-first design ────────────────────
function StatCallout({
  stat,
  statUnit,
  label,
  source,
  url,
  children,
  accentColor = "#A855F7",
}: {
  stat: string;
  statUnit?: string;
  label: string;
  source: string;
  url: string;
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Stat hero strip */}
      <div
        className="px-5 py-4 flex items-baseline gap-2"
        style={{
          background: `${accentColor}10`,
          borderBottom: `1px solid ${accentColor}25`,
        }}
      >
        <span
          className="font-extrabold tabular-nums leading-none"
          style={{ fontSize: "3rem", color: accentColor, letterSpacing: "-0.03em" }}
        >
          {stat}
        </span>
        {statUnit && (
          <span
            className="text-base font-bold"
            style={{ color: accentColor, opacity: 0.7 }}
          >
            {statUnit}
          </span>
        )}
        <span
          className="text-xs font-bold uppercase tracking-widest self-center"
          style={{ color: `${accentColor}99` }}
        >
          {label}
        </span>
      </div>

      {/* Quote / body */}
      <div className="px-5 py-4">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {children}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs mt-3 inline-flex items-center gap-1 transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-purple-light)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          {source} ↗
        </a>
      </div>
    </div>
  );
}

// ── RICE table row ───────────────────────────────────────────
function RiceRow({
  feature,
  reach,
  impact,
  confidence,
  effort,
  score,
  isTop,
}: {
  feature: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  score: number;
  isTop?: boolean;
}) {
  return (
    <tr
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: isTop ? "rgba(124,58,237,0.06)" : undefined,
      }}
    >
      <td className="py-3 pr-4 text-sm" style={{ color: isTop ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: isTop ? 600 : 400 }}>
        {feature}
        {isTop && (
          <span
            className="ml-2 text-xs px-1.5 py-0.5 rounded font-bold"
            style={{ background: "rgba(124,58,237,0.20)", color: "#A855F7" }}
          >
            #1
          </span>
        )}
      </td>
      <td className="py-3 px-3 text-sm text-center tabular-nums" style={{ color: "var(--text-muted)" }}>{reach}</td>
      <td className="py-3 px-3 text-sm text-center tabular-nums" style={{ color: "var(--text-muted)" }}>{impact}</td>
      <td className="py-3 px-3 text-sm text-center tabular-nums" style={{ color: "var(--text-muted)" }}>{confidence}%</td>
      <td className="py-3 px-3 text-sm text-center tabular-nums" style={{ color: "var(--text-muted)" }}>{effort}</td>
      <td
        className="py-3 pl-3 text-sm font-extrabold text-center tabular-nums"
        style={{ color: isTop ? "#A855F7" : "var(--text-secondary)" }}
      >
        {score}
      </td>
    </tr>
  );
}

// ── Competitive teardown row ─────────────────────────────────
function CompRow({
  platform,
  format,
  ctr,
  completion,
  notes,
  isRoku,
}: {
  platform: string;
  format: string;
  ctr: string;
  completion: string;
  notes: string;
  isRoku?: boolean;
}) {
  return (
    <tr
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: isRoku ? "rgba(124,58,237,0.07)" : undefined,
      }}
    >
      <td
        className="py-3 pr-4 text-sm font-semibold"
        style={{ color: isRoku ? "var(--accent-purple-light)" : "var(--text-primary)" }}
      >
        {platform}
        {isRoku && (
          <span
            className="ml-2 text-xs px-1.5 py-0.5 rounded"
            style={{ background: "rgba(124,58,237,0.20)", color: "#A855F7" }}
          >
            highest CTR
          </span>
        )}
      </td>
      <td className="py-3 px-3 text-sm" style={{ color: "var(--text-secondary)" }}>{format}</td>
      <td
        className="py-3 px-3 text-sm tabular-nums text-center font-semibold"
        style={{ color: isRoku ? "#A855F7" : "var(--text-secondary)" }}
      >
        {ctr}
      </td>
      <td className="py-3 px-3 text-sm tabular-nums text-center" style={{ color: "var(--text-secondary)" }}>{completion}</td>
      <td className="py-3 pl-3 text-xs" style={{ color: "var(--text-muted)" }}>{notes}</td>
    </tr>
  );
}

// ── Table wrapper shared styles ──────────────────────────────
const tableHeaderStyle: React.CSSProperties = {
  textAlign: "left",
  paddingBottom: "8px",
  paddingRight: "12px",
  fontSize: "0.65rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-muted)",
  borderBottom: "1px solid var(--border-default)",
};

// ── Main export ──────────────────────────────────────────────
export default function CaseStudy() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">

      {/* ── Problem Statement ── */}
      <Section title="Problem Statement">
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          CTV advertisers commit five- and six-figure budgets to interactive ad
          formats without a reliable pre-campaign tool to predict engagement rate,
          completion rate, or ad fatigue risk. The result: wasted spend, damaged
          viewer experience from poorly-paced ad loads, and missed opportunities
          to shift budget toward higher-performing formats before launch.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <StatCallout
            stat="$40K"
            label="wasted without pre-campaign prediction"
            source="r/PPC · March 2025"
            url="https://reddit.com/r/PPC"
            accentColor="#F87171"
          >
            &quot;We spent $40K on a CTV interactive ad campaign. Completion rate was
            12%. We had no idea what to expect before launch. The platform gives
            you historical averages but nothing specific to your format or
            category.&quot;
          </StatCallout>

          <StatCallout
            stat="47%"
            label="of subscribers would cancel if ad load increases"
            source="Deloitte Digital Media Trends 2025"
            url="https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends.html"
            accentColor="#FBBF24"
          >
            47% of ad-supported streaming subscribers said they would cancel their
            subscription if ad load increased — yet platforms have no per-format
            fatigue scoring before deployment.
          </StatCallout>

          <StatCallout
            stat="0"
            label="pre-campaign fatigue tools exist publicly"
            source="Marketing Brew · May 2025"
            url="https://www.marketingbrew.com/stories/2025/05/06/upfronts-shoppable-ads"
            accentColor="#A855F7"
          >
            &quot;Despite industry interest in shoppable ads, the tech still has a long
            way to go before it becomes second nature for consumers... the risk of
            annoying users is real when interactivity isn&apos;t intuitive.&quot;
          </StatCallout>
        </div>
      </Section>

      {/* ── Market Research ── */}
      <Section title="Market Research Synthesis">
        <div
          className="rounded-xl p-5 space-y-4"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            className="p-4 rounded-lg"
            style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--accent-purple-light)" }}>
              Why this hasn&apos;t been solved
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              CTV platforms benefit from opacity — advertisers buying without clear
              format preview drives higher CPMs on &quot;new&quot; interactive formats.
              Measurement lag compounds the problem: ad fatigue is measured
              post-campaign via completion rates and churn signals. No pre-campaign
              fatigue modeling tool existed publicly.
            </p>
          </div>

          <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p className="leading-relaxed">
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>IAB State of Data 2025: </span>
              &quot;The #1 request from CTV advertisers is better pre-campaign predictive
              modeling. Current benchmarks are not granular enough to guide format
              selection decisions.&quot;
            </p>
            <p className="leading-relaxed">
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Roku VP of Advertising (Shoptalk 2025): </span>
              &quot;We need to meet the consumer where they&apos;re at in terms of how they
              want to interact.&quot; —{" "}
              <a
                href="https://advertising.roku.com/learn/resources/retail-meets-the-remote-rokus-takeaways-from-shoptalk-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--accent-purple-light)" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Roku Shoptalk 2025 ↗
              </a>
            </p>
          </div>
        </div>
      </Section>

      {/* ── RICE ── */}
      <Section title="Feature Prioritization — RICE">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full px-5 py-1">
              <thead>
                <tr>
                  {["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"].map((h, i) => (
                    <th key={h} style={{ ...tableHeaderStyle, paddingLeft: i === 0 ? "20px" : undefined, paddingTop: "14px", paddingBottom: "10px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <RiceRow feature="Engagement Decay Curve" reach={1000} impact={3} confidence={90} effort={1} score={2700} isTop />
                <RiceRow feature="Fatigue Score Calculator" reach={800} impact={3} confidence={85} effort={1} score={2040} />
                <RiceRow feature="Ad Format Simulator (core)" reach={1000} impact={3} confidence={90} effort={2} score={1350} />
                <RiceRow feature="Competitive Teardown Tab" reach={400} impact={2} confidence={75} effort={1} score={600} />
                <RiceRow feature="AI Format Recommendation" reach={700} impact={2} confidence={70} effort={2} score={490} />
                <RiceRow feature="A/B Test Designer" reach={600} impact={2} confidence={80} effort={2} score={480} />
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Score = (Reach × Impact × Confidence%) ÷ Effort
            </p>
          </div>
        </div>
      </Section>

      {/* ── Competitive Teardown ── */}
      <Section title="Competitive Teardown — Interactive CTV Formats">
        <div
          className="rounded-xl overflow-hidden mb-3"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Platform", "Format", "CTR (avg)", "Completion", "Differentiation"].map((h, i) => (
                    <th key={h} style={{ ...tableHeaderStyle, paddingLeft: i === 0 ? "20px" : undefined, paddingTop: "14px", paddingBottom: "10px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompRow
                  platform="Roku"
                  format="Action Ads (shoppable)"
                  ctr="1.8–2.4%"
                  completion="76–82%"
                  notes="Deepest retail integration; QR + remote overlay; CPM premium ~30%"
                  isRoku
                />
                <CompRow
                  platform="Amazon Fire TV"
                  format="Pause Ads + Interactive"
                  ctr="0.9–1.3%"
                  completion="90–95%"
                  notes="Non-intrusive; pause state only; lower CTR but lowest fatigue"
                />
                <CompRow
                  platform="Peacock"
                  format="Choice Ads"
                  ctr="1.2–1.7%"
                  completion="80–86%"
                  notes="Two-option format; strong completion; proprietary engagement data"
                />
                <CompRow
                  platform="Samsung Ads"
                  format="ACR-targeted overlays"
                  ctr="1.0–1.5%"
                  completion="78–84%"
                  notes="Automated Content Recognition targeting; strongest 1st-party signal"
                />
                <CompRow
                  platform="Standard CTV"
                  format="Pre-roll 30s (baseline)"
                  ctr="0.25–0.40%"
                  completion="74–80%"
                  notes="IAB CTV benchmark baseline; lowest cost, lowest engagement"
                />
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Sources: IAB CTV Benchmarks 2024 · Roku Action Ads case studies · eMarketer CTV Ad Spend Report Q1 2025
        </p>
      </Section>

      {/* ── Success Metrics ── */}
      <Section title="Success Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              metric: "≥3 min",
              label: "Session duration",
              target: "70% of users · Simulator tab",
              color: "#34D399",
            },
            {
              metric: "50",
              label: "Unique users / 30 days",
              target: "ProductHunt + r/PPC launch",
              color: "#A855F7",
            },
            {
              metric: "3+",
              label: "LinkedIn DMs",
              target: "From CTV marketers · signal validation",
              color: "#F5E642",
            },
          ].map((m) => (
            <div
              key={m.metric}
              className="rounded-xl p-5 text-center"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="font-extrabold tabular-nums leading-none"
                style={{ fontSize: "2.5rem", color: m.color, letterSpacing: "-0.02em" }}
              >
                {m.metric}
              </p>
              <p
                className="text-sm font-semibold mt-2"
                style={{ color: "var(--text-primary)" }}
              >
                {m.label}
              </p>
              <p
                className="text-xs mt-1 leading-snug"
                style={{ color: "var(--text-muted)" }}
              >
                {m.target}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Build Context ── */}
      <Section title="Build Context">
        <div
          className="rounded-xl p-5 text-sm space-y-3"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {[
            ["Stack", "Next.js App Router · Tailwind CSS · Recharts · Claude API"],
            ["Built with", "Claude Code (claude-sonnet-4-6) · Multi-agent workflow"],
            ["Data sources", "IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 · Roku Shoptalk 2025 · Marketing Brew May 2025"],
            ["Deploy", "Vercel (free tier) · Static benchmark data, no backend required for simulator"],
          ].map(([key, val]) => (
            <div key={key} className="flex gap-3">
              <span
                className="text-xs font-bold uppercase tracking-widest shrink-0 pt-0.5"
                style={{ color: "var(--accent-purple-light)", minWidth: "90px" }}
              >
                {key}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
