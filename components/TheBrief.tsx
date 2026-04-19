"use client";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold mb-5" style={{ color: "var(--text)" }}>
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />
  );
}

function IdBadge({ id, variant = "accent" }: { id: string; variant?: "accent" | "team" }) {
  if (variant === "team") {
    return (
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-md"
        style={{
          background: "var(--surface-2)",
          color: "var(--accent)",
          fontFamily: "inherit",
        }}
      >
        {id}
      </span>
    );
  }
  return (
    <span
      className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
      style={{
        background: "var(--accent-dim)",
        color: "var(--accent)",
        letterSpacing: "0.03em",
      }}
    >
      {id}
    </span>
  );
}

function UserStoryCard({
  id,
  role,
  story,
  criteria,
}: {
  id: string;
  role: string;
  story: string;
  criteria: string[];
}) {
  return (
    <div
      className="rounded-xl p-5 mb-4"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <IdBadge id={id} />
        <span className="text-xs font-medium" style={{ color: "var(--text-2)" }}>
          [{role}]
        </span>
      </div>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "var(--text)", fontStyle: "italic" }}
      >
        {story}
      </p>
      <div>
        <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--text-3)" }}>
          Acceptance Criteria
        </p>
        <ul className="space-y-1.5">
          {criteria.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 shrink-0" style={{ color: "var(--accent)", fontSize: "0.5rem" }}>
                ●
              </span>
              <span className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                {c}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function KpiCard({
  target,
  label,
  note,
}: {
  target: string;
  label: string;
  note: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="font-bold leading-none"
        style={{ fontSize: "1.75rem", color: "var(--accent)", letterSpacing: "-0.02em" }}
      >
        {target}
      </span>
      <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
        {label}
      </span>
      <span className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
        {note}
      </span>
    </div>
  );
}

function PhaseCard({
  number,
  title,
  weeks,
  bullets,
  gate,
}: {
  number: string;
  title: string;
  weeks: string;
  bullets: string[];
  gate: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 flex-1"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          {number}
        </span>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {title}
          </p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            {weeks}
          </p>
        </div>
      </div>
      <ul className="space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 shrink-0" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>
              ●
            </span>
            <span className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
              {b}
            </span>
          </li>
        ))}
      </ul>
      <div
        className="rounded-lg px-3 py-2 mt-auto"
        style={{ background: "var(--accent-dim)", border: "1px solid rgba(124,106,245,0.2)" }}
      >
        <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--accent)" }}>
          Success Gate
        </p>
        <p className="text-xs" style={{ color: "var(--text-2)" }}>
          {gate}
        </p>
      </div>
    </div>
  );
}

export default function TheBrief() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Metadata bar */}
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 rounded-xl mb-8 text-xs"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text-2)",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--text-3)" }}>Status</span>
          <span
            className="font-semibold px-2 py-0.5 rounded text-xs"
            style={{
              background: "rgba(251,191,36,0.12)",
              color: "var(--amber)",
              letterSpacing: "0.04em",
            }}
          >
            DRAFT
          </span>
        </div>
        <span style={{ color: "var(--border-2, rgba(255,255,255,0.10))" }}>|</span>
        <div className="flex items-center gap-1.5">
          <span style={{ color: "var(--text-3)" }}>Author</span>
          <span style={{ color: "var(--text)" }}>Ali Hasan, APM Candidate</span>
        </div>
        <span style={{ color: "var(--border-2, rgba(255,255,255,0.10))" }}>|</span>
        <div className="flex items-center gap-1.5">
          <span style={{ color: "var(--text-3)" }}>Format</span>
          <span style={{ color: "var(--text)" }}>ShopPause v1</span>
        </div>
        <span style={{ color: "var(--border-2, rgba(255,255,255,0.10))" }}>|</span>
        <div className="flex items-center gap-1.5">
          <span style={{ color: "var(--text-3)" }}>Last updated</span>
          <span style={{ color: "var(--text)" }}>April 2026</span>
        </div>
      </div>

      {/* Section 1: Problem Statement */}
      <section>
        <SectionTitle>Problem Statement</SectionTitle>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
          Roku&apos;s current interactive formats (Action Ads, QR overlays, Choice Ads) all require the viewer to
          be in an active-attention state during playback. The viewer must notice, process, and respond to an ad
          while content is running. The pause moment is the highest-intent, lowest-friction interaction window in
          CTV: the viewer has voluntarily stopped, they&apos;re holding the remote, and they&apos;re in a reflective
          state. No Roku format captures this window. ShopPause is designed to fill it.
        </p>
        <div
          className="rounded-xl px-5 py-4"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid rgba(124,106,245,0.25)",
          }}
        >
          <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--accent)" }}>
            Why now
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
            Shoppable CTV is Roku&apos;s stated strategic priority (Shoptalk 2025). Action Ads already demonstrate
            1.8–2.4% CTR at a 30% CPM premium. Pause-triggered formats haven&apos;t been productized on any major
            CTV platform. This is a first-mover opportunity.
          </p>
        </div>
      </section>

      <Divider />

      {/* Section 2: Users & Goals */}
      <section>
        <SectionTitle>Users &amp; Goals</SectionTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Viewer card */}
          <div
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: "1.1rem" }}>👤</span>
              <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                Viewer
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-3)" }}>
                Goal
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                Watch content without feeling marketed at
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-3)" }}>
                Pain
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                Interactive ads during playback feel intrusive and cause content abandonment
              </p>
            </div>
            <div
              className="rounded-lg px-3 py-2"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--accent)" }}>
                ShopPause promise
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                Only appears when you&apos;ve already paused. You&apos;re in control.
              </p>
            </div>
          </div>

          {/* Advertiser card */}
          <div
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: "1.1rem" }}>📢</span>
              <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                Advertiser
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-3)" }}>
                Goal
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                Reach high-intent audiences at the moment of consideration
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-3)" }}>
                Pain
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                Standard CTV formats have 0.25–0.40% CTR; hard to justify premium inventory cost
              </p>
            </div>
            <div
              className="rounded-lg px-3 py-2"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--accent)" }}>
                ShopPause promise
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                Pause moments = highest intent signal in CTV; projected 1.5–2.0% CTR
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 3: User Stories */}
      <section>
        <SectionTitle>User Stories</SectionTitle>
        <UserStoryCard
          id="US-01"
          role="Viewer"
          story="As a Roku viewer, I want ads to appear only when I have voluntarily paused content, so that my viewing experience is never interrupted by an ad overlay during playback."
          criteria={[
            "Overlay MUST NOT appear during active playback under any circumstance",
            "Overlay MUST appear only after a confirmed pause event (≥500ms held)",
            "Overlay MUST dismiss instantly when playback resumes",
            "Overlay MUST NOT appear if the pause was part of a seek/scrub action",
          ]}
        />
        <UserStoryCard
          id="US-02"
          role="Viewer"
          story="As a Roku viewer, I want to be able to dismiss or ignore the overlay with a single button press, so that I never feel trapped by an ad."
          criteria={[
            "Back button always dismisses overlay immediately",
            "Overlay auto-dismisses after 8 seconds of no remote input",
            "Frequency cap: max 1 overlay per viewing session, 3 per 24-hour household window",
            "Overlay is fully suppressed on Kids profiles and TV-Y/Y7 rated content",
          ]}
        />
        <UserStoryCard
          id="US-03"
          role="Advertiser"
          story="As an advertiser on Roku OneView, I want to reach viewers at the exact moment they pause content, so that I can convert passive viewers into active shoppers at the highest-intent moment in their session."
          criteria={[
            "Advertiser can target by content category, viewer segment, and daypart",
            "Product card shows: product image, name, price, and 3 CTAs (Shop Now / Save to List / Dismiss)",
            '"Shop Now" generates a QR code or sends a deep link to the Roku mobile app',
            "Impression is only counted if overlay was visible for ≥2 seconds (not instant dismissals)",
            "Click and conversion events are tracked with standard OneView attribution",
          ]}
        />
      </section>

      <Divider />

      {/* Section 4: Success Metrics */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <SectionTitle>Success Metrics</SectionTitle>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.65rem",
              padding: "1px 6px",
              borderRadius: "4px",
              background: "rgba(251,191,36,0.10)",
              color: "var(--amber)",
              border: "1px solid rgba(251,191,36,0.25)",
              fontWeight: 600,
            }}
          >
            Projected targets (not Roku internal data)
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-3)" }}>
          Primary KPIs
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          <KpiCard
            target="≥1.5%"
            label="CTR target"
            note="vs. 0.30% standard CTV baseline (IAB 2024)"
          />
          <KpiCard
            target="≥60%"
            label="Advertiser re-buy rate"
            note="within 90 days of first ShopPause campaign"
          />
          <KpiCard
            target="+8%"
            label="Premium format adoption"
            note="share of OneView campaigns choosing interactive over Standard 30s"
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-3)" }}>
          Guardrail Metrics
        </p>
        <div
          className="rounded-xl px-5 py-4"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(251,191,36,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "var(--amber)", fontSize: "0.85rem" }}>⚠</span>
            <p className="text-xs font-semibold" style={{ color: "var(--amber)" }}>
              Must not degrade. Any breach triggers immediate review.
            </p>
          </div>
          <ul className="space-y-2">
            {[
              "Viewer opt-out rate: <5% (if >5%, feature is paused and reviewed)",
              "Content abandonment rate: no statistically significant increase vs. control",
              "Ad Quality Score: must maintain or improve platform composite score",
              "Overlay load latency: p95 <200ms (imperceptible to viewer)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 shrink-0" style={{ color: "var(--amber)", fontSize: "0.45rem" }}>
                  ●
                </span>
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Divider />

      {/* Section 5: Out of Scope */}
      <section>
        <SectionTitle>Out of Scope (v1)</SectionTitle>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-2)" }}>
          Explicitly excluded to maintain launch velocity. Documented for v2 roadmap.
        </p>
        <div
          className="rounded-xl px-5 py-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <ul className="space-y-2.5">
            {[
              "In-overlay checkout / cart integration",
              "Voice interaction (\"OK Roku, shop this\")",
              "Real-time inventory and pricing sync from retailer APIs",
              "Multi-product carousel within a single overlay",
              "ACR-powered product personalization (what you watched → what you're shown)",
              "Cross-device handoff (auto-send to Roku mobile app without QR)",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-mono shrink-0"
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--text-3)",
                    border: "1px solid var(--border)",
                  }}
                >
                  →
                </span>
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Divider />

      {/* Section 6: Rollout Plan */}
      <section>
        <SectionTitle>Rollout Plan</SectionTitle>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <PhaseCard
            number="1"
            title="Alpha"
            weeks="Week 1–4"
            bullets={[
              "5 internal advertiser partners (whitelisted)",
              "1% of eligible Roku traffic",
              "Goal: validate overlay render across all device classes, confirm latency SLA",
            ]}
            gate="Zero P0 rendering bugs, p95 latency <200ms"
          />
          {/* Connector line — desktop only */}
          <div
            className="hidden sm:flex items-center shrink-0"
            style={{ width: "1.5rem" }}
          >
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "linear-gradient(90deg, var(--accent) 0%, var(--surface-3) 100%)",
                borderRadius: "2px",
              }}
            />
          </div>
          <PhaseCard
            number="2"
            title="Closed Beta"
            weeks="Week 5–12"
            bullets={[
              "50 OneView advertisers (retail + CPG priority)",
              "10% of eligible traffic",
              "Goal: validate CTR hypothesis and viewer opt-out rate",
            ]}
            gate="CTR ≥1.2%, opt-out rate <8%"
          />
          <div
            className="hidden sm:flex items-center shrink-0"
            style={{ width: "1.5rem" }}
          >
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "linear-gradient(90deg, var(--accent) 0%, var(--surface-3) 100%)",
                borderRadius: "2px",
              }}
            />
          </div>
          <PhaseCard
            number="3"
            title="General Availability"
            weeks="Week 13+"
            bullets={[
              "All OneView advertisers, all eligible content categories",
              "Full traffic allocation with frequency capping active",
              "Quarterly review: advertiser re-buy rate, Ad Quality Score impact",
            ]}
            gate="Sustained CTR ≥1.5%, re-buy rate ≥60%"
          />
        </div>
      </section>

      <Divider />

      {/* Section 7: Open Questions */}
      <section>
        <SectionTitle>Open Questions</SectionTitle>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-2)" }}>
          Unresolved items requiring cross-functional input before spec is finalized.
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              team: "Engineering",
              question:
                "What is the p95 overlay load latency target and can we achieve <200ms given current OneView ad serving infrastructure?",
            },
            {
              team: "Data Science",
              question:
                "How do we attribute a purchase if the viewer scanned the QR code 2+ hours after the pause event? Proposing 24-hour view-through window; needs alignment.",
            },
            {
              team: "Sales",
              question:
                "Which advertiser verticals get closed beta access? Recommending retail and CPG first given shoppable intent alignment.",
            },
            {
              team: "Legal / Privacy",
              question:
                "Does displaying products informed by ACR viewing data require additional consent disclosure? Need Legal review before GA.",
            },
          ].map(({ team, question }, i) => (
            <div
              key={i}
              className="rounded-xl px-5 py-4 flex items-start gap-3"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <IdBadge id={team} variant="team" />
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
