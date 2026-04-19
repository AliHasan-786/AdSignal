"use client";

function DataBadge({ type }: { type: "real" | "synthetic" | "modeled" | "representative" }) {
  const config = {
    real: { label: "Real source", bg: "rgba(52,211,153,0.10)", color: "var(--green)", border: "rgba(52,211,153,0.25)" },
    synthetic: { label: "Synthetic", bg: "rgba(251,191,36,0.10)", color: "var(--amber)", border: "rgba(251,191,36,0.25)" },
    modeled: { label: "Modeled", bg: "rgba(251,191,36,0.10)", color: "var(--amber)", border: "rgba(251,191,36,0.25)" },
    representative: { label: "Representative quote", bg: "rgba(251,191,36,0.10)", color: "var(--amber)", border: "rgba(251,191,36,0.25)" },
  }[type];
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.65rem",
        padding: "1px 6px",
        borderRadius: "4px",
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        marginLeft: "6px",
        verticalAlign: "middle",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      {config.label}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold mb-5" style={{ color: "var(--text)" }}>
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
  badge,
  children,
}: {
  stat: string;
  label: string;
  source: string;
  url: string;
  accent?: string;
  badge?: "real" | "synthetic" | "modeled" | "representative";
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-baseline gap-2.5 mb-1 flex-wrap">
          <span
            className="font-bold tabular-nums leading-none"
            style={{ fontSize: "2.5rem", color: accent, letterSpacing: "-0.03em" }}
          >
            {stat}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-3)" }}>
            {label}
          </span>
          {badge && <DataBadge type={badge} />}
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
            className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap"
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

      {/* Framing */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ background: "var(--accent-dim)", border: "1px solid rgba(124,106,245,0.2)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
          What this is
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          AdSignal is a <span style={{ color: "var(--text)", fontWeight: 500 }}>product concept for Roku&apos;s OneView Ad Manager</span>: a Campaign Preview feature that would let advertisers simulate format performance before committing budget. This prototype validates the concept and demonstrates the PM thinking behind it: problem discovery, market research, feature prioritization, and success metrics.
        </p>
      </div>

      {/* Problem */}
      <SectionTitle>Problem statement</SectionTitle>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-2)" }}>
        Advertisers buying CTV formats on Roku&apos;s OneView platform have no way to predict how a format will perform before launch. They select from a menu of formats (Standard 30s, Action Ads, Choice Ads) with only historical platform averages to guide them. There&apos;s no preview of engagement decay, no fatigue risk scoring by category, and no pre-campaign CTR estimate. The result is wasted spend, damaged viewer experience, and eroded advertiser trust in the platform.
      </p>

      <div className="space-y-3">
        <StatCard
          stat="$40K"
          label="wasted: no pre-campaign format prediction"
          source="r/PPC (representative advertiser account)"
          url="https://www.reddit.com/r/PPC/"
          accent="var(--red)"
          badge="representative"
        >
          &ldquo;We spent $40K on a CTV interactive ad campaign. Completion rate was 12%. We had no idea what to expect before launch. The platform gives you historical averages but nothing specific to your format or category.&rdquo; (CTV advertiser, r/PPC)
        </StatCard>

        <StatCard
          stat="47%"
          label="of streaming subscribers would cancel if ad load increases"
          source="Deloitte Digital Media Trends 2025"
          url="https://www2.deloitte.com/us/en/insights/industry/technology/digital-media-trends.html"
          accent="var(--amber)"
          badge="real"
        >
          Ad fatigue is a platform-level risk for Roku, not just an advertiser problem. Over-frequency or low-quality format selection harms viewer retention, and Roku has no tool that helps advertisers make better choices before campaigns go live.
        </StatCard>

        <StatCard
          stat="0"
          label="pre-campaign format preview tools in Roku's Ad Manager"
          source="Marketing Brew: CTV advertising coverage"
          url="https://www.marketingbrew.com/topics/video"
          accent="var(--text-2)"
          badge="synthetic"
        >
          &ldquo;The risk of annoying users is real when interactivity isn&apos;t intuitive.&rdquo; Shoppable and interactive formats are Roku&apos;s highest-CPM inventory, but without a preview mechanism, advertisers can&apos;t confidently commit to premium formats.
        </StatCard>
      </div>

      <Divider />

      {/* Opportunity */}
      <SectionTitle>The product opportunity</SectionTitle>
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
        <p>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>Why Roku is uniquely positioned to build this: </span>
          Roku has ACR data across 100M+ households, format-level performance data from thousands of campaigns, and category-specific engagement signals that no third party has access to. A Campaign Preview feature powered by this data would be dramatically more accurate than IAB averages and would be a meaningful differentiator for OneView against Amazon Ads and Peacock.
        </p>
        <p>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>Roku VP of Advertising, Shoptalk 2025: </span>
          &ldquo;We need to meet the consumer where they&apos;re at in terms of how they want to interact.&rdquo; Format selection is where that starts, and right now advertisers are guessing.{" "}
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
        <p>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>The PM angle: </span>
          This is an advertiser-facing product problem that sits at the intersection of Roku&apos;s three core interests: growing ad revenue, protecting viewer experience, and increasing advertiser confidence in premium format inventory. An APM on Ad Experiences would own this feature end-to-end: from discovery through spec, launch, and iteration.
        </p>
      </div>

      <Divider />

      {/* RICE */}
      <div className="flex items-center gap-2 mb-5">
        <SectionTitle>Feature prioritization: RICE</SectionTitle>
        <DataBadge type="modeled" />
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-2)" }}>
        If Roku were to build Campaign Preview into OneView, these are the features I&apos;d prioritize for v1 and v2, scored by RICE. Reach and confidence values are author estimates based on public Roku advertiser data.
      </p>
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse" }}>
            <TableHead cols={["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"]} />
            <tbody>
              {[
                { feature: "Engagement decay preview", reach: 1000, impact: 3, conf: 90, effort: 1, score: 2700, top: true },
                { feature: "Fatigue risk score by category", reach: 800, impact: 3, conf: 85, effort: 1, score: 2040 },
                { feature: "Format comparison simulator", reach: 1000, impact: 3, conf: 90, effort: 2, score: 1350 },
                { feature: "Competitive format benchmarks", reach: 400, impact: 2, conf: 75, effort: 1, score: 600 },
                { feature: "AI format recommendation", reach: 700, impact: 2, conf: 70, effort: 2, score: 490 },
                { feature: "A/B test design assistant", reach: 600, impact: 2, conf: 80, effort: 2, score: 480 },
              ].map((row) => (
                <tr
                  key={row.feature}
                  style={{
                    borderTop: "1px solid var(--border)",
                    background: row.top ? "rgba(124,106,245,0.05)" : undefined,
                  }}
                >
                  <td className="py-3 px-4" style={{ color: row.top ? "var(--text)" : "var(--text-2)", fontWeight: row.top ? 500 : 400 }}>
                    {row.feature}
                    {row.top && (
                      <span
                        className="ml-2 text-xs px-1.5 py-0.5 rounded"
                        style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                      >
                        v1 priority
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.reach}</td>
                  <td className="py-3 px-4 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.impact}</td>
                  <td className="py-3 px-4 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.conf}%</td>
                  <td className="py-3 px-4 text-center tabular-nums" style={{ color: "var(--text-3)" }}>{row.effort}</td>
                  <td className="py-3 px-4 text-center tabular-nums font-semibold" style={{ color: row.top ? "var(--accent)" : "var(--text-2)" }}>
                    {row.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}>
          Score = (Reach × Impact × Confidence%) ÷ Effort · Reach = estimated monthly active advertisers affected
        </div>
      </div>

      <Divider />

      {/* Competitive teardown */}
      <div className="flex items-center gap-2 mb-5">
        <SectionTitle>Competitive teardown: interactive CTV formats</SectionTitle>
        <DataBadge type="modeled" />
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-2)" }}>
        CTR and completion ranges are approximated from public sources: IAB CTV Benchmarks 2024, eMarketer, and published Roku Action Ads case studies. Not Roku internal data.
      </p>
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>
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
                    background: row.highlight ? "rgba(124,106,245,0.05)" : undefined,
                  }}
                >
                  <td className="py-3 px-4 font-medium whitespace-nowrap" style={{ color: row.highlight ? "var(--accent)" : "var(--text)" }}>
                    {row.platform}
                    {row.highlight && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                        highest CTR
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap" style={{ color: "var(--text-2)" }}>{row.format}</td>
                  <td className="py-3 px-4 text-center tabular-nums font-medium whitespace-nowrap" style={{ color: row.highlight ? "var(--accent)" : "var(--text-2)" }}>{row.ctr}</td>
                  <td className="py-3 px-4 text-center tabular-nums whitespace-nowrap" style={{ color: "var(--text-2)" }}>{row.comp}</td>
                  <td className="py-3 px-4 text-sm" style={{ color: "var(--text-2)" }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}>
          Sources: IAB CTV Benchmarks 2024 · Roku Action Ads case studies · eMarketer CTV Ad Spend Q1 2025
        </div>
      </div>

      <Divider />

      {/* Success metrics */}
      <SectionTitle>Success metrics: if this shipped in OneView</SectionTitle>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-2)" }}>
        How I&apos;d measure whether Campaign Preview is actually driving advertiser value.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { value: "+15%", label: "Repeat campaign rate", sub: "Advertisers who used preview vs. those who didn't (90-day window)" },
          { value: "↓20%", label: "Support tickets re: format", sub: "\"We didn't know what to expect\" tickets; measures education gap closed" },
          { value: "+8%", label: "Premium format adoption", sub: "Share of campaigns choosing Action Ads or Choice Ads over Standard 30s" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p className="font-bold tabular-nums mb-1" style={{ fontSize: "1.75rem", color: "var(--accent)", letterSpacing: "-0.025em" }}>
              {m.value}
            </p>
            <p className="text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
              {m.label}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
              {m.sub}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Build context */}
      <SectionTitle>About this prototype</SectionTitle>
      <div
        className="rounded-xl p-5 text-sm space-y-2"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {[
          ["What it is", "A working prototype of the Campaign Preview concept, built to validate the UX and demonstrate the PM thinking behind it"],
          ["Stack", "Next.js 16 · Tailwind CSS · Recharts · Claude API via OpenRouter · Vercel"],
          ["Data", "IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 · Roku Shoptalk 2025"],
          ["Limitations", "Uses static benchmark data; Roku's real ACR data would make predictions significantly more accurate"],
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
