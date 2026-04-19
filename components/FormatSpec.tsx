"use client";

// ─────────────────────────────────────────────────────────────────────────────
// FormatSpec.tsx
// PM-to-Engineering handoff document for the ShopPause ad format.
// Visual UX specification for the "Format Spec" tab in AdSignal.
// ─────────────────────────────────────────────────────────────────────────────

export default function FormatSpec() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8"
      style={{ color: "var(--text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── 1. Header ────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <span
          style={{
            display: "inline-block",
            fontVariant: "small-caps",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--accent)",
            background: "var(--accent-dim)",
            border: "1px solid var(--accent)",
            borderRadius: "4px",
            padding: "2px 10px",
            marginBottom: "14px",
            textTransform: "uppercase",
          }}
        >
          ShopPause
        </span>
        <h1
          style={{
            fontSize: "1.85rem",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "var(--text)",
            marginBottom: "10px",
          }}
        >
          Shoppable Pause Ad
        </h1>
        <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "560px" }}>
          Non-intrusive shoppable overlay triggered by viewer pause intent. Designed for Roku
          OneView v1.
        </p>
      </div>

      {/* ── 2. Format Overview Strip ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 mb-2" style={{ gap: "12px" }}>
        {[
          { label: "Trigger", value: "Viewer-initiated pause" },
          { label: "Display window", value: "8 seconds (auto-dismiss)" },
          { label: "Target CTR", value: "1.5–2.0%" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-2)",
              borderRadius: "10px",
              padding: "16px 18px",
            }}
          >
            <p
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                color: "var(--text-3)",
                marginBottom: "6px",
              }}
            >
              {stat.label}
            </p>
            <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* ── 3. Ad States ─────────────────────────────────────────────────── */}
      <SectionHeading>Ad States</SectionHeading>
      <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "24px" }}>
        State diagram showing the full lifecycle of a ShopPause impression.
      </p>

      {/* Desktop: horizontal row. Mobile: vertical stack. */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 0,
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        <StateCard
          number={1}
          name="Content Playing"
          description="Normal Roku playback. No overlay. Standard viewing state."
          color="#8b8ba7"
          colorLabel="Neutral"
          indicator={
            <div
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "4px",
                background: "#8b8ba7",
                opacity: 0.35,
              }}
            />
          }
        />
        <FlowArrow />
        <StateCard
          number={2}
          name="Pause Detected"
          description="Viewer pressed pause. 500ms wait to distinguish from seek. Overlay loads silently."
          color="#fbbf24"
          colorLabel="500ms delay"
          indicator={
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#fbbf24",
                  animation: "pulse 1.2s ease-in-out infinite",
                }}
              />
              <span style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: 600 }}>
                detecting…
              </span>
            </div>
          }
        />
        <FlowArrow />
        <StateCard
          number={3}
          name="Overlay Active"
          description="Product card appears bottom-right. Non-fullscreen. Three remote-navigable options presented."
          color="#7c6af5"
          colorLabel="Accent"
          indicator={<TVMockFrame />}
        />
        <FlowArrow />
        <StateCard
          number={4}
          name="Focused / Navigating"
          description="D-pad moves focus within overlay. Clear focus ring on each option. Remote navigation active."
          color="#34d399"
          colorLabel="Active"
          indicator={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              {["Shop Now", "Save to List", "Dismiss"].map((btn, i) => (
                <div
                  key={btn}
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    padding: "3px 6px",
                    borderRadius: "4px",
                    border: i === 0 ? "1.5px solid #34d399" : "1px solid var(--border-2)",
                    color: i === 0 ? "#34d399" : "var(--text-2)",
                    background: i === 0 ? "rgba(52,211,153,0.08)" : "transparent",
                    textAlign: "center",
                  }}
                >
                  {btn}
                </div>
              ))}
            </div>
          }
        />
        <FlowArrow />
        <StateCard
          number={5}
          name="Resolved"
          description="Action taken → QR shown or item saved. Or 8s timeout → overlay fades, playback resumes uninterrupted."
          color="#34d399"
          colorLabel="Conversion / Timeout"
          indicator={
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  padding: "3px 6px",
                  borderRadius: "4px",
                  border: "1px solid #34d399",
                  color: "#34d399",
                  background: "rgba(52,211,153,0.08)",
                  textAlign: "center",
                }}
              >
                Converted
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  padding: "3px 6px",
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                  color: "var(--text-3)",
                  textAlign: "center",
                }}
              >
                Timed out
              </div>
            </div>
          }
        />
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* ── 4. Remote Control Mapping ─────────────────────────────────────── */}
      <SectionHeading>Interaction Model: Remote Control Mapping</SectionHeading>
      <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "20px" }}>
        Every Roku remote input must have a defined behavior during overlay presence.
      </p>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {[
          {
            key: "OK / Select",
            action: "Confirms focused action (Shop Now, Save to List, or Dismiss)",
          },
          {
            key: "D-pad ↑↓←→",
            action: "Navigates between overlay options; Up/Down moves through the three CTAs",
          },
          {
            key: "Back / Play-Pause",
            action: "Dismisses overlay immediately and resumes content; no impression logged as conversion",
          },
          {
            key: "Home",
            action: "Dismisses overlay and navigates to Roku home screen (standard Roku platform behavior)",
          },
          {
            key: "No input · 8s",
            action: "Auto-dismiss triggered; overlay fades out, impression recorded, playback resumes",
          },
        ].map((row, i, arr) => (
          <div
            key={row.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "13px 18px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <code
              style={{
                minWidth: "148px",
                fontSize: "0.72rem",
                fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
                fontWeight: 600,
                color: "var(--accent)",
                background: "var(--accent-dim)",
                border: "1px solid rgba(124,106,245,0.2)",
                borderRadius: "5px",
                padding: "3px 9px",
                whiteSpace: "nowrap",
              }}
            >
              {row.key}
            </code>
            <span style={{ fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.5 }}>
              {row.action}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* ── 5. Device Behavior Matrix ─────────────────────────────────────── */}
      <SectionHeading>Device Behavior Matrix</SectionHeading>
      <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "20px" }}>
        ShopPause must render consistently across the Roku device lineup.
      </p>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          borderRadius: "10px",
          overflow: "hidden",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.82rem",
          }}
        >
          <thead>
            <tr
              style={{
                background: "var(--surface-2)",
                borderBottom: "1px solid var(--border-2)",
              }}
            >
              {["Device", "Remote type", "Overlay renders", "Voice support", "Notes"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 16px",
                    textAlign: "left",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                device: "Roku Streaming Stick 4K",
                remote: "Standard remote",
                renders: true,
                voice: false,
                notes: "Baseline experience",
              },
              {
                device: "Roku TV (built-in)",
                remote: "Standard + voice",
                renders: true,
                voice: true,
                notes: 'Voice: "OK Roku, shop this" (v2 scope)',
              },
              {
                device: "Roku Ultra",
                remote: "Enhanced + headphone",
                renders: true,
                voice: true,
                notes: "Private listening; overlay unaffected",
              },
              {
                device: "Roku Express",
                remote: "Standard",
                renders: true,
                voice: false,
                notes: "Lower-end; test render performance",
              },
            ].map((row, i, arr) => (
              <tr
                key={row.device}
                style={{
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  background: i % 2 === 1 ? "var(--surface-2)" : "transparent",
                }}
              >
                <td style={{ padding: "13px 16px", color: "var(--text)", fontWeight: 600 }}>
                  {row.device}
                </td>
                <td style={{ padding: "13px 16px", color: "var(--text-2)" }}>{row.remote}</td>
                <td style={{ padding: "13px 16px", textAlign: "center" }}>
                  <BoolBadge value={row.renders} />
                </td>
                <td style={{ padding: "13px 16px", textAlign: "center" }}>
                  <BoolBadge value={row.voice} />
                </td>
                <td style={{ padding: "13px 16px", color: "var(--text-2)", fontSize: "0.8rem" }}>
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* ── 6. Edge Cases & Guardrails ────────────────────────────────────── */}
      <SectionHeading>Edge Cases &amp; Guardrails</SectionHeading>
      <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "20px" }}>
        Defined system behavior for every failure mode. Engineering must handle all of the
        following before launch.
      </p>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {[
          {
            scenario: "Seek / scrub pause",
            behavior: "Overlay suppressed if pause duration < 500ms",
            why: "Prevents annoyance from brief seeks",
          },
          {
            scenario: "Kids profile / Y or Y7 content",
            behavior: "Overlay fully suppressed; no fallback, no impression",
            why: "COPPA compliance + viewer trust",
          },
          {
            scenario: "Offline / network error",
            behavior: "Silent fallback; overlay never appears, no impression logged",
            why: "Ad quality: never show a broken experience",
          },
          {
            scenario: "Screensaver triggered",
            behavior: "Overlay timer pauses; dismisses when screensaver exits",
            why: "Accurate impression measurement",
          },
          {
            scenario: "Frequency cap exceeded",
            behavior: "Overlay suppressed; max 1 per session, 3 per 24h per household",
            why: "Frequency cap exceeded",
          },
          {
            scenario: "Ad blocker / privacy mode",
            behavior: "Impression not counted; playback unaffected",
            why: "Platform integrity",
          },
        ].map((row, i, arr) => (
          <div
            key={row.scenario}
            style={{
              padding: "14px 18px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr 1fr",
              gap: "16px",
              alignItems: "start",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text)" }}>
              {row.scenario}
            </span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.5 }}>
              {row.behavior}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-3)",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              {row.why}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* ── 7. Non-goals (v1 scope) ───────────────────────────────────────── */}
      <SectionHeading>Non-Goals: v1 Scope</SectionHeading>
      <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "20px" }}>
        Explicitly out of scope for this release. Defer to backlog.
      </p>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          borderLeft: "3px solid var(--text-3)",
          borderRadius: "10px",
          padding: "18px 22px",
        }}
      >
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-3)",
            marginBottom: "12px",
          }}
        >
          Not in v1
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            "In-overlay checkout / cart integration (v2)",
            'Voice-initiated shopping ("OK Roku, buy this")',
            "Real-time inventory / price sync",
            "Multi-product carousel within overlay",
            "Personalized product recommendations (ACR-powered, v2 scope)",
          ].map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                fontSize: "0.875rem",
                color: "var(--text-2)",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "var(--text-3)", fontSize: "0.7rem", marginTop: "1px" }}>
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", margin: "2.5rem 0" }} />

      {/* ── 8. Open Questions ─────────────────────────────────────────────── */}
      <SectionHeading>Open Questions: Cross-functional Review</SectionHeading>
      <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "20px" }}>
        These must be resolved before engineering kickoff. Owners assigned per team.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          {
            team: "Engineering",
            question:
              "What is the p95 latency for overlay load? Target: <200ms from pause event to visible overlay.",
          },
          {
            team: "Data Science",
            question:
              "How do we attribute a purchase if the viewer scanned the QR code 2 hours later? Last-touch vs. view-through attribution window?",
          },
          {
            team: "Sales / Partnerships",
            question:
              "Which advertiser categories get access in closed beta? Suggest: retail, CPG, direct-to-consumer.",
          },
          {
            team: "Legal / Privacy",
            question:
              "Does displaying product data derived from ACR viewing history require additional consent disclosure within the overlay itself?",
          },
        ].map((q) => (
          <div
            key={q.team}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-2)",
              borderRadius: "10px",
              padding: "14px 18px",
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--accent)",
                background: "var(--accent-dim)",
                border: "1px solid rgba(124,106,245,0.25)",
                borderRadius: "5px",
                padding: "3px 8px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {q.team}
            </span>
            <span style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.55 }}>
              {q.question}
            </span>
          </div>
        ))}
      </div>

      {/* bottom breathing room */}
      <div style={{ height: "40px" }} />
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.05rem",
        fontWeight: 800,
        color: "var(--text)",
        marginBottom: "6px",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function BoolBadge({ value }: { value: boolean }) {
  return (
    <span
      style={{
        fontWeight: 700,
        fontSize: "0.9rem",
        color: value ? "var(--green)" : "var(--text-3)",
      }}
    >
      {value ? "✓" : "✗"}
    </span>
  );
}

function FlowArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: "0 4px",
        alignSelf: "center",
      }}
    >
      <svg
        width="22"
        height="14"
        viewBox="0 0 22 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="7" x2="16" y2="7" stroke="#4a4a60" strokeWidth="1.5" />
        <polyline
          points="10,2 17,7 10,12"
          fill="none"
          stroke="#4a4a60"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// TV mock frame: a dark rounded rectangle with a small overlay card in the bottom-right.
function TVMockFrame() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        width="90"
        height="58"
        viewBox="0 0 90 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="TV screen with overlay in bottom-right corner"
        role="img"
      >
        {/* Screen bezel */}
        <rect x="1" y="1" width="88" height="52" rx="4" fill="#0c0c10" stroke="#252532" strokeWidth="1.5" />

        {/* Faint content lines simulating video content */}
        <rect x="8" y="8" width="50" height="4" rx="1.5" fill="#252532" />
        <rect x="8" y="15" width="38" height="3" rx="1.5" fill="#1e1e28" />
        <rect x="8" y="21" width="44" height="3" rx="1.5" fill="#1e1e28" />

        {/* Overlay card bottom-right */}
        <rect x="52" y="28" width="32" height="20" rx="3" fill="#16161d" stroke="#7c6af5" strokeWidth="1" />

        {/* Product image placeholder in overlay */}
        <rect x="55" y="31" width="10" height="10" rx="1.5" fill="#252532" />

        {/* Product name line */}
        <rect x="67" y="31" width="14" height="2.5" rx="1" fill="#4a4a60" />
        {/* Price line */}
        <rect x="67" y="35.5" width="10" height="2" rx="1" fill="#7c6af5" opacity="0.7" />

        {/* Three CTA buttons */}
        <rect x="55" y="43" width="29" height="3" rx="1" fill="#7c6af5" opacity="0.85" />

        {/* Stand */}
        <rect x="40" y="53" width="10" height="2" rx="1" fill="#252532" />
        <rect x="36" y="55" width="18" height="1.5" rx="0.75" fill="#252532" />

        {/* "overlay" label */}
        <text
          x="68"
          y="50"
          fontSize="4"
          fill="#7c6af5"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="600"
        >
          overlay
        </text>
      </svg>
    </div>
  );
}

interface StateCardProps {
  number: number;
  name: string;
  description: string;
  color: string;
  colorLabel: string;
  indicator: React.ReactNode;
}

function StateCard({ number, name, description, color, colorLabel, indicator }: StateCardProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-2)",
        borderRadius: "10px",
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "128px",
        maxWidth: "160px",
        flexShrink: 0,
        flexGrow: 1,
      }}
    >
      {/* State number + color dot */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6rem",
            fontWeight: 800,
            color: "#0c0c10",
            flexShrink: 0,
          }}
        >
          {number}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: color,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          {colorLabel}
        </span>
      </div>

      {/* State name */}
      <p
        style={{
          fontSize: "0.78rem",
          fontWeight: 800,
          color: "var(--text)",
          lineHeight: 1.25,
          margin: 0,
        }}
      >
        {name}
      </p>

      {/* Visual indicator */}
      <div style={{ minHeight: "48px", display: "flex", alignItems: "center" }}>{indicator}</div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.7rem",
          color: "var(--text-2)",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {description}
      </p>

      {/* Bottom color accent bar */}
      <div
        style={{
          height: "2px",
          borderRadius: "2px",
          background: color,
          opacity: 0.4,
          marginTop: "auto",
        }}
      />
    </div>
  );
}
