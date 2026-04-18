"use client";

import { useState, useEffect, useRef } from "react";

type DemoState = "playing" | "detecting" | "overlay" | "focused" | "converted" | "dismissed";

const COUNTDOWN_START = 8;

// Product shown in the overlay
const PRODUCT = {
  brand: "Nike",
  name: "Air Force 1 '07",
  price: "$110",
  category: "As seen in this show",
};

function RokuStatusBar() {
  return (
    <div
      className="flex items-center justify-between px-4 py-1.5"
      style={{
        background: "rgba(0,0,0,0.6)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        fontSize: "11px",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <div className="flex items-center gap-2">
        {/* Roku wordmark */}
        <span style={{ fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", fontSize: "12px" }}>
          ROKU
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span>NOW PLAYING · S2 E4</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
        <span>42:18 remaining</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Wifi icon */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path d="M7 8.5a1 1 0 110-2 1 1 0 010 2z" fill="rgba(255,255,255,0.7)" />
          <path d="M4.5 6.5C5.1 5.9 6 5.5 7 5.5s1.9.4 2.5 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M2.5 4.5C3.6 3.4 5.2 2.7 7 2.7s3.4.7 4.5 1.8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M0.5 2.5C2.1 1 4.4 0 7 0s4.9 1 6.5 2.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.6)" }}>3:47 PM</span>
      </div>
    </div>
  );
}

function ShopPauseOverlay({
  visible,
  focused,
  countdown,
  onFocus,
  onShopNow,
  onSave,
  onDismiss,
}: {
  visible: boolean;
  focused: boolean;
  countdown: number;
  onFocus: () => void;
  onShopNow: () => void;
  onSave: () => void;
  onDismiss: () => void;
}) {
  const pct = (countdown / COUNTDOWN_START) * 100;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        right: "20px",
        width: "200px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)",
        background: "#fff",
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s ease, transform 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 10,
      }}
    >
      {/* "As seen in show" label */}
      <div
        style={{
          background: "#7c6af5",
          padding: "4px 10px",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        {PRODUCT.category}
      </div>

      {/* Product image placeholder */}
      <div
        style={{
          height: "80px",
          background: "linear-gradient(135deg, #f0effe 0%, #e8e4fd 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Abstract shoe silhouette in SVG */}
        <svg width="80" height="48" viewBox="0 0 80 48" fill="none" aria-label="Nike Air Force 1 product">
          <ellipse cx="40" cy="40" rx="36" ry="5" fill="rgba(0,0,0,0.08)" />
          <path d="M8 34 Q12 20 24 18 Q32 16 40 20 L68 22 Q72 22 72 26 Q72 30 68 31 L16 34 Q10 34 8 34Z" fill="#f0f0f0" stroke="#ddd" strokeWidth="0.5" />
          <path d="M14 28 Q20 18 32 16 Q40 15 48 18 L60 20 L56 24 Q44 24 34 22 Q24 22 18 28Z" fill="#e8e8e8" />
          <path d="M32 16 Q40 12 50 16" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Nike swoosh */}
          <path d="M22 24 Q34 18 48 22 L44 26 Q32 24 22 24Z" fill="#111" />
        </svg>
        {/* Brand badge */}
        <span style={{
          position: "absolute",
          top: "6px",
          right: "8px",
          fontSize: "9px",
          fontWeight: 800,
          color: "#111",
          letterSpacing: "-0.02em",
        }}>
          NIKE
        </span>
      </div>

      {/* Product info */}
      <div style={{ padding: "10px 10px 0" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#111", marginBottom: "2px", lineHeight: 1.2 }}>
          {PRODUCT.name}
        </p>
        <p style={{ fontSize: "13px", fontWeight: 800, color: "#7c6af5", marginBottom: "8px" }}>
          {PRODUCT.price}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
          onClick={onFocus}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onShopNow(); }}
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
              border: focused ? "2px solid #7c6af5" : "2px solid transparent",
              background: "#7c6af5",
              color: "#fff",
              transition: "all 0.15s",
              textAlign: "center",
            }}
          >
            🛍 Shop Now
          </button>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              style={{
                flex: 1,
                padding: "5px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                border: "1.5px solid #e5e5e5",
                background: "#fff",
                color: "#555",
                transition: "all 0.15s",
              }}
            >
              ♡ Save
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDismiss(); }}
              style={{
                padding: "5px 8px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                border: "1.5px solid #e5e5e5",
                background: "#fff",
                color: "#999",
                transition: "all 0.15s",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Auto-dismiss countdown */}
      <div style={{ padding: "8px 10px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <span style={{ fontSize: "9px", color: "#999" }}>Auto-dismissing</span>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#7c6af5" }}>{countdown}s</span>
        </div>
        <div style={{ height: "3px", borderRadius: "2px", background: "#f0f0f0", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "linear-gradient(90deg, #7c6af5, #9184f7)",
              borderRadius: "2px",
              transition: "width 1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ConversionOverlay({ onDone }: { onDone: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "28px 32px",
          textAlign: "center",
          maxWidth: "260px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* QR code placeholder */}
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#f5f5f5",
            borderRadius: "8px",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Simple QR-style grid */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-label="QR code">
            {/* Corner squares */}
            <rect x="4" y="4" width="20" height="20" rx="2" fill="#111" />
            <rect x="8" y="8" width="12" height="12" rx="1" fill="#fff" />
            <rect x="10" y="10" width="8" height="8" fill="#111" />
            <rect x="56" y="4" width="20" height="20" rx="2" fill="#111" />
            <rect x="60" y="8" width="12" height="12" rx="1" fill="#fff" />
            <rect x="62" y="10" width="8" height="8" fill="#111" />
            <rect x="4" y="56" width="20" height="20" rx="2" fill="#111" />
            <rect x="8" y="60" width="12" height="12" rx="1" fill="#fff" />
            <rect x="10" y="62" width="8" height="8" fill="#111" />
            {/* Random dots for QR pattern */}
            {[28,32,36,44,48,52].flatMap(x => [28,32,36,40,44,48,52].map(y => (
              Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#111" /> : null
            )))}
            {/* Center accent */}
            <rect x="34" y="34" width="12" height="12" rx="2" fill="#7c6af5" />
          </svg>
        </div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>
          Scan to shop on your phone
        </p>
        <p style={{ fontSize: "11px", color: "#888", marginBottom: "16px", lineHeight: 1.4 }}>
          Nike Air Force 1 '07 · $110
        </p>
        <p style={{ fontSize: "10px", color: "#bbb", marginBottom: "16px" }}>
          Or open the Roku app — link sent to your account
        </p>
        <button
          onClick={onDone}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            background: "#7c6af5",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            border: "none",
          }}
        >
          Done — Resume Playback
        </button>
      </div>
    </div>
  );
}

export default function TVPrototype() {
  const [state, setState] = useState<DemoState>("playing");
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    clearTimer();
    if (state === "overlay" || state === "focused") {
      timerRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            setState("playing");
            return COUNTDOWN_START;
          }
          return c - 1;
        });
      }, 1000);
    } else {
      setCountdown(COUNTDOWN_START);
    }
    return clearTimer;
  }, [state]);

  const handlePlayPause = () => {
    if (state === "playing") {
      // 500ms detection delay before overlay appears
      setState("detecting");
      setTimeout(() => setState("overlay"), 500);
    } else if (state === "overlay" || state === "focused" || state === "dismissed") {
      setState("playing");
      setCountdown(COUNTDOWN_START);
    }
  };

  const isPlaying = state === "playing";
  const isPaused = state !== "playing" && state !== "converted";
  const overlayVisible = state === "overlay" || state === "focused";

  const stateLabel: Record<DemoState, string> = {
    playing: "Content playing",
    detecting: "Pause detected — loading overlay…",
    overlay: "ShopPause overlay active",
    focused: "Viewer navigating overlay",
    converted: "Shop Now — QR generated",
    dismissed: "Overlay dismissed",
  };

  const stateColor: Record<DemoState, string> = {
    playing: "var(--text-3)",
    detecting: "var(--amber)",
    overlay: "var(--accent)",
    focused: "var(--green)",
    converted: "var(--green)",
    dismissed: "var(--text-3)",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-3)" }}>
            Interactive prototype
          </p>
          <p className="text-sm font-medium" style={{ color: "var(--text-2)" }}>
            What the viewer sees on their Roku TV
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)" }}>
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: stateColor[state] }}
          />
          <span style={{ color: "var(--text-2)" }}>{stateLabel[state]}</span>
        </div>
      </div>

      {/* TV Frame */}
      <div
        style={{
          background: "#111",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 0 3px #1a1a1a, 0 0 0 5px #0d0d0d, 0 24px 48px rgba(0,0,0,0.6)",
          position: "relative",
          aspectRatio: "16/9",
          maxWidth: "100%",
        }}
      >
        <RokuStatusBar />

        {/* Content area */}
        <div
          style={{
            position: "relative",
            flex: 1,
            background: "linear-gradient(135deg, #0a0520 0%, #0d1520 35%, #111827 65%, #0a0520 100%)",
            height: "calc(100% - 28px - 6px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Subtle grain overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
            opacity: 0.4,
            pointerEvents: "none",
          }} />

          {/* Show title */}
          <div style={{ textAlign: "center", zIndex: 1, opacity: isPaused ? 0.4 : 0.9, transition: "opacity 0.3s" }}>
            <p style={{ fontSize: "clamp(8px, 2vw, 14px)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>
              Netflix Original
            </p>
            <p style={{ fontSize: "clamp(14px, 3.5vw, 28px)", color: "#fff", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "4px" }}>
              Stranger Things
            </p>
            <p style={{ fontSize: "clamp(8px, 1.8vw, 12px)", color: "rgba(255,255,255,0.4)" }}>
              Season 2, Episode 4 — "Will the Wise"
            </p>
          </div>

          {/* Pause icon */}
          {isPaused && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(32px, 6vw, 52px)",
              height: "clamp(32px, 6vw, 52px)",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              zIndex: 2,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white" aria-hidden="true">
                <rect x="3" y="2" width="3.5" height="12" rx="1" />
                <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
              </svg>
            </div>
          )}

          {/* ShopPause overlay */}
          <ShopPauseOverlay
            visible={overlayVisible}
            focused={state === "focused"}
            countdown={countdown}
            onFocus={() => setState("focused")}
            onShopNow={() => setState("converted")}
            onSave={() => { setState("dismissed"); setTimeout(() => setState("playing"), 800); }}
            onDismiss={() => { setState("dismissed"); setTimeout(() => setState("playing"), 800); }}
          />

          {/* Conversion QR overlay */}
          {state === "converted" && (
            <ConversionOverlay onDone={() => { setState("playing"); setCountdown(COUNTDOWN_START); }} />
          )}
        </div>

        {/* Progress bar */}
        <div style={{ height: "6px", background: "#1a1a1a", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "62%", background: "linear-gradient(90deg, #7c6af5 0%, #9184f7 100%)" }} />
          <div style={{
            position: "absolute",
            left: "62%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 0 2px rgba(124,106,245,0.5)",
          }} />
        </div>
      </div>

      {/* TV stand */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "60px", height: "12px", background: "#1a1a1a", borderRadius: "0 0 2px 2px" }} />
        <div style={{ width: "100px", height: "4px", background: "#141414", borderRadius: "2px" }} />
      </div>

      {/* Remote control buttons */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <span className="text-xs" style={{ color: "var(--text-3)" }}>Remote:</span>
        <button
          onClick={handlePlayPause}
          disabled={state === "detecting" || state === "converted"}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
          style={{
            background: isPlaying ? "var(--accent)" : "var(--surface-2)",
            color: isPlaying ? "#fff" : "var(--text-2)",
            border: isPlaying ? "1px solid var(--accent)" : "1px solid var(--border-2)",
            fontFamily: "inherit",
            cursor: state === "detecting" || state === "converted" ? "not-allowed" : "pointer",
          }}
        >
          {isPlaying ? (
            <><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3" height="10" rx="1" /><rect x="7" y="1" width="3" height="10" rx="1" /></svg> Pause</>
          ) : (
            <><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1.5L10.5 6 3 10.5V1.5Z" /></svg> Resume</>
          )}
        </button>
        {(state === "overlay" || state === "focused") && (
          <button
            onClick={() => { setState("dismissed"); setTimeout(() => setState("playing"), 500); }}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)", color: "var(--text-2)", fontFamily: "inherit", cursor: "pointer" }}
          >
            ← Back (dismiss)
          </button>
        )}
      </div>

      {/* Instruction hint */}
      <p className="text-center text-xs mt-3" style={{ color: "var(--text-3)" }}>
        {state === "playing"
          ? "Press Pause to trigger the ShopPause overlay — appears after 500ms"
          : state === "overlay"
          ? "Click the overlay to navigate with D-pad, or Back to dismiss"
          : state === "converted"
          ? "QR code sent — viewer can complete purchase on their phone"
          : "Press Resume to continue viewing"}
      </p>
    </div>
  );
}
