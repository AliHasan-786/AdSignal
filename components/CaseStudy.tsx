"use client";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Callout({
  label,
  source,
  url,
  children,
}: {
  label: string;
  source: string;
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 border-l-4 border-blue-600 rounded-r-xl p-4 mb-4">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-600 hover:text-gray-400 mt-2 block transition-colors"
      >
        Source: {source} ↗
      </a>
    </div>
  );
}

function RiceRow({
  feature,
  reach,
  impact,
  confidence,
  effort,
  score,
}: {
  feature: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  score: number;
}) {
  return (
    <tr className="border-t border-gray-800">
      <td className="py-2.5 pr-4 text-sm text-gray-300">{feature}</td>
      <td className="py-2.5 px-3 text-sm text-gray-400 text-center tabular-nums">{reach}</td>
      <td className="py-2.5 px-3 text-sm text-gray-400 text-center tabular-nums">{impact}</td>
      <td className="py-2.5 px-3 text-sm text-gray-400 text-center tabular-nums">{confidence}%</td>
      <td className="py-2.5 px-3 text-sm text-gray-400 text-center tabular-nums">{effort}</td>
      <td className="py-2.5 pl-3 text-sm font-semibold text-white text-center tabular-nums">{score}</td>
    </tr>
  );
}

function CompRow({
  platform,
  format,
  ctr,
  completion,
  notes,
}: {
  platform: string;
  format: string;
  ctr: string;
  completion: string;
  notes: string;
}) {
  return (
    <tr className="border-t border-gray-800">
      <td className="py-2.5 pr-4 text-sm font-medium text-gray-200">{platform}</td>
      <td className="py-2.5 px-3 text-sm text-gray-400">{format}</td>
      <td className="py-2.5 px-3 text-sm text-blue-400 tabular-nums text-center">{ctr}</td>
      <td className="py-2.5 px-3 text-sm text-gray-400 tabular-nums text-center">{completion}</td>
      <td className="py-2.5 pl-3 text-sm text-gray-500 text-xs">{notes}</td>
    </tr>
  );
}

export default function CaseStudy() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Problem */}
      <Section title="Problem Statement">
        <p className="text-gray-400 leading-relaxed mb-5">
          CTV advertisers commit five- and six-figure budgets to interactive ad
          formats without a reliable pre-campaign tool to predict engagement rate,
          completion rate, or ad fatigue risk. The result: wasted spend, damaged
          viewer experience from poorly-paced ad loads, and missed opportunities
          to shift budget toward higher-performing formats before launch.
        </p>

        <Callout
          label="Advertiser pain — r/PPC (March 2025)"
          source="reddit.com/r/PPC"
          url="https://reddit.com/r/PPC"
        >
          &quot;We spent $40K on a CTV interactive ad campaign. Completion rate was
          12%. We had no idea what to expect before launch. The platform gives
          you historical averages but nothing specific to your format or
          category.&quot;
        </Callout>

        <Callout
          label="Viewer churn risk — Deloitte Digital Media Trends 2025"
          source="deloitte.com/us/en/insights/industry/technology/digital-media-trends"
          url="https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends.html"
        >
          47% of ad-supported streaming subscribers said they would cancel their
          subscription if ad load increased — yet platforms have no per-format
          fatigue scoring before deployment.
        </Callout>

        <Callout
          label="Shoppable ad UX risk — Marketing Brew (May 2025)"
          source="marketingbrew.com"
          url="https://www.marketingbrew.com/stories/2025/05/06/upfronts-shoppable-ads"
        >
          &quot;Despite industry interest in shoppable ads, the tech still has a long
          way to go before it becomes second nature for consumers... the risk of
          annoying users is real when interactivity isn&apos;t intuitive.&quot;
        </Callout>
      </Section>

      {/* Market Research */}
      <Section title="Market Research Synthesis">
        <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
          <p>
            <span className="text-white font-medium">Why this hasn&apos;t been solved: </span>
            CTV platforms benefit from opacity — advertisers buying without clear
            format preview drives higher CPMs on &quot;new&quot; interactive formats.
            Measurement lag compounds the problem: ad fatigue is measured
            post-campaign via completion rates and churn signals. No pre-campaign
            fatigue modeling tool existed publicly.
          </p>
          <p>
            <span className="text-white font-medium">IAB State of Data 2025: </span>
            &quot;The #1 request from CTV advertisers is better pre-campaign predictive
            modeling. Current benchmarks are not granular enough to guide format
            selection decisions.&quot;
          </p>
          <p>
            <span className="text-white font-medium">Roku VP of Advertising (Shoptalk 2025): </span>
            &quot;We need to meet the consumer where they&apos;re at in terms of how they
            want to interact.&quot; —{" "}
            <a
              href="https://advertising.roku.com/learn/resources/retail-meets-the-remote-rokus-takeaways-from-shoptalk-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Roku Shoptalk 2025 ↗
            </a>
          </p>
        </div>
      </Section>

      {/* RICE */}
      <Section title="Feature Prioritization — RICE">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider pr-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <RiceRow feature="Ad Format Simulator (core)" reach={1000} impact={3} confidence={90} effort={2} score={1350} />
              <RiceRow feature="Engagement Decay Curve" reach={1000} impact={3} confidence={90} effort={1} score={2700} />
              <RiceRow feature="Fatigue Score Calculator" reach={800} impact={3} confidence={85} effort={1} score={2040} />
              <RiceRow feature="A/B Test Designer" reach={600} impact={2} confidence={80} effort={2} score={480} />
              <RiceRow feature="Competitive Teardown Tab" reach={400} impact={2} confidence={75} effort={1} score={600} />
              <RiceRow feature="AI Format Recommendation" reach={700} impact={2} confidence={70} effort={2} score={490} />
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Score = (Reach × Impact × Confidence%) ÷ Effort
        </p>
      </Section>

      {/* Competitive Teardown */}
      <Section title="Competitive Teardown — Interactive CTV Formats">
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr>
                {["Platform", "Format", "CTR (avg)", "Completion", "Differentiation"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider pr-3"
                  >
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
                format="Mustard Yellow Choice Ads"
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
        <p className="text-xs text-gray-600">
          Sources: IAB CTV Benchmarks 2024 · Roku Action Ads case studies · eMarketer CTV Ad Spend Report Q1 2025
        </p>
      </Section>

      {/* Success Metrics */}
      <Section title="Success Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              metric: "≥3 min",
              label: "Session duration on Simulator",
              target: "70% of users",
            },
            {
              metric: "50",
              label: "Unique users in 30 days",
              target: "ProductHunt + r/PPC launch",
            },
            {
              metric: "3+",
              label: "LinkedIn DMs from CTV marketers",
              target: "Product signal validation",
            },
          ].map((m) => (
            <div
              key={m.metric}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-blue-400">{m.metric}</p>
              <p className="text-sm text-gray-300 mt-1">{m.label}</p>
              <p className="text-xs text-gray-600 mt-1">{m.target}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Build Context */}
      <Section title="Build Context">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-sm space-y-2 text-gray-400">
          <p><span className="text-white">Stack:</span> Next.js 14 App Router · Tailwind CSS · Recharts · Claude API</p>
          <p><span className="text-white">Built with:</span> Claude Code (claude-sonnet-4-6) · Multi-agent workflow</p>
          <p><span className="text-white">Data sources:</span> IAB CTV Benchmarks 2024 · Deloitte Digital Media Trends 2025 · Roku Shoptalk 2025 · Marketing Brew May 2025</p>
          <p><span className="text-white">Deploy:</span> Vercel (free tier) · Static benchmark data, no backend required for simulator</p>
        </div>
      </Section>
    </div>
  );
}
