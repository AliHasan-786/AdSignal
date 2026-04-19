"use client";

import { useState, useEffect, useRef } from "react";
import type { FormatKey, CategoryKey } from "@/lib/formatPredictor";

type DemoState = "playing" | "detecting" | "overlay" | "focused" | "converted" | "dismissed";

const COUNTDOWN_START = 8;

// ── Category-aware product content ───────────────────────────────────────────

const CATEGORY_CONTENT: Record<CategoryKey, {
  brand: string;
  product: string;
  price: string;
  tagline: string;
  choiceQuestion: string;
  choiceOptions: [string, string];
  qrUrl: string;
  bannerCta: string;
  emoji: string;
  adHeadline: string;
}> = {
  retail: {
    brand: "Nike", product: "Air Force 1 \u201907", price: "$110",
    tagline: "Built for the pace of now.",
    choiceQuestion: "What matters most in your next shoe?",
    choiceOptions: ["Performance & speed", "Everyday comfort"],
    qrUrl: "Nike.com/spring25", bannerCta: "Shop the new collection →",
    emoji: "👟", adHeadline: "Nike Running: Spring 2025",
  },
  cpg: {
    brand: "Oat\u00adly", product: "Oat Drink Barista", price: "$5.99",
    tagline: "It\u2019s like milk, but made for humans.",
    choiceQuestion: "How do you start your morning?",
    choiceOptions: ["Coffee first", "Smoothie first"],
    qrUrl: "Oatly.com/find", bannerCta: "Find it near you →",
    emoji: "🥛", adHeadline: "Oatly: Find at your local store",
  },
  auto: {
    brand: "Rivian", product: "R1T Electric Truck", price: "From $69,900",
    tagline: "Adventure starts at full charge.",
    choiceQuestion: "What\u2019s your next road trip priority?",
    choiceOptions: ["Off-road capability", "Range & efficiency"],
    qrUrl: "Rivian.com/test-drive", bannerCta: "Book a test drive →",
    emoji: "🚗", adHeadline: "Rivian: Configure yours today",
  },
  finance: {
    brand: "Amex", product: "Platinum Card\u00ae", price: "Earn 5× points",
    tagline: "Don\u2019t live life without it.",
    choiceQuestion: "What rewards matter most to you?",
    choiceOptions: ["Travel & lounge access", "Cash back & everyday perks"],
    qrUrl: "Amex.com/platinum", bannerCta: "See if you\u2019re pre-approved →",
    emoji: "💳", adHeadline: "American Express: Membership has rewards",
  },
  entertainment: {
    brand: "Spotify", product: "Premium Individual", price: "$11.99/mo",
    tagline: "Music without limits.",
    choiceQuestion: "How do you listen most?",
    choiceOptions: ["On the go / commute", "At home / working"],
    qrUrl: "Spotify.com/premium", bannerCta: "Try 3 months free →",
    emoji: "🎵", adHeadline: "Spotify Premium: First month free",
  },
  travel: {
    brand: "Delta", product: "SkyMiles\u00ae Reserve Card", price: "60K bonus miles",
    tagline: "Every mile takes you further.",
    choiceQuestion: "What\u2019s your next trip goal?",
    choiceOptions: ["International adventure", "Domestic weekend"],
    qrUrl: "Delta.com/reserve", bannerCta: "Apply and start earning →",
    emoji: "✈️", adHeadline: "Delta Air Lines: Summer fares from $199",
  },
  telecom: {
    brand: "T-Mobile", product: "Go5G Next", price: "$85/mo",
    tagline: "The network more people rely on.",
    choiceQuestion: "What matters most in your phone plan?",
    choiceOptions: ["Fastest 5G speeds", "Best price & value"],
    qrUrl: "T-Mobile.com/plans", bannerCta: "Switch and save →",
    emoji: "📱", adHeadline: "T-Mobile: Switch, get iPhone 16 on us",
  },
  health: {
    brand: "Peloton", product: "Bike+", price: "$2,495",
    tagline: "The best workout is the one you\u2019ll actually do.",
    choiceQuestion: "What\u2019s your fitness goal right now?",
    choiceOptions: ["Build strength", "Improve cardio"],
    qrUrl: "Onepeloton.com/bike", bannerCta: "Try 30 days free →",
    emoji: "🏋️", adHeadline: "Peloton: 0% APR financing available",
  },
};

// ── Format metadata ───────────────────────────────────────────────────────────

const FORMAT_META: Record<FormatKey, {
  label: string;
  trigger: string;
  pauseRequired: boolean; // overlay appears on pause vs during playback
  description: string;
}> = {
  standard_15:       { label: "Standard 15s",        trigger: "Mid-roll (plays before content resumes)", pauseRequired: false, description: "Full-screen linear ad. No interaction required." },
  standard_30:       { label: "Standard 30s",        trigger: "Mid-roll (plays before content resumes)", pauseRequired: false, description: "Full-screen linear ad. No interaction required." },
  interactive_choice:{ label: "Interactive Choice",  trigger: "Overlay during playback",                pauseRequired: false, description: "Viewer picks between two options with the D-pad." },
  shoppable:         { label: "Shoppable / Action",  trigger: "Viewer-initiated pause",                 pauseRequired: true,  description: "Product card triggered by pause intent." },
  pause_ad:          { label: "Pause Ad",            trigger: "Viewer-initiated pause",                 pauseRequired: true,  description: "Brand banner that appears when the viewer pauses." },
  qr_code:           { label: "QR Code Overlay",     trigger: "Overlay during playback",                pauseRequired: false, description: "Corner overlay with a scannable QR code." },
};

// ── Sub-components ────────────────────────────────────────────────────────────

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
      <span style={{ fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", fontSize: "12px" }}>ROKU</span>
      <div className="flex items-center gap-3">
        <span>NOW PLAYING · S2 E4</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
        <span>42:18 remaining</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path d="M7 8.5a1 1 0 110-2 1 1 0 010 2z" fill="rgba(255,255,255,0.7)" />
          <path d="M4.5 6.5C5.1 5.9 6 5.5 7 5.5s1.9.4 2.5 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M2.5 4.5C3.6 3.4 5.2 2.7 7 2.7s3.4.7 4.5 1.8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.6)" }}>3:47 PM</span>
      </div>
    </div>
  );
}

// ── Overlays per format ───────────────────────────────────────────────────────

type ProductContent = typeof CATEGORY_CONTENT[CategoryKey];

/** Standard 15s / 30s — full-screen linear ad replaces content */
function StandardAdOverlay({ seconds, content, onDone }: { seconds: number; content: ProductContent; onDone: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    setRemaining(seconds);
    setSkippable(false);
    const skip = setTimeout(() => setSkippable(true), 5000);
    const tick = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { clearInterval(tick); onDone(); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => { clearTimeout(skip); clearInterval(tick); };
  }, [seconds, onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      background: "linear-gradient(135deg, #1a1040 0%, #0d1a30 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      {/* Ad content placeholder */}
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: "linear-gradient(135deg, #7c6af5, #34d399)",
          margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: "22px" }}>{content.emoji}</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(8px,1.4vw,11px)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>
          Sponsored
        </p>
        <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(14px,2.8vw,22px)", letterSpacing: "-0.02em", marginBottom: "4px" }}>
          {content.tagline}
        </p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(9px,1.6vw,12px)" }}>
          {content.adHeadline}
        </p>
      </div>

      {/* Timer + skip */}
      <div style={{
        position: "absolute", bottom: "16px", right: "16px", display: "flex", alignItems: "center", gap: "10px",
      }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(8px,1.4vw,11px)" }}>
          Ad: 0:{String(remaining).padStart(2, "0")}
        </span>
        {skippable && (
          <button
            onClick={onDone}
            style={{
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", fontSize: "clamp(8px,1.4vw,11px)", fontWeight: 600,
              padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Skip ▶
          </button>
        )}
        {!skippable && (
          <span style={{
            background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.4)", fontSize: "clamp(8px,1.4vw,11px)",
            padding: "4px 10px", borderRadius: "4px",
          }}>
            Skip in {Math.max(0, 5 - (seconds - remaining))}s
          </span>
        )}
      </div>
    </div>
  );
}

/** Interactive Choice — two option buttons, D-pad navigable */
function ChoiceAdOverlay({ visible, content, onDone }: { visible: boolean; content: ProductContent; onDone: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
      background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0) 100%)",
      padding: "clamp(10px,3vw,24px)",
      transform: visible ? "translateY(0)" : "translateY(20px)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.35s ease, transform 0.35s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(8px,1.4vw,11px)", marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Sponsored · {content.brand}
      </p>
      <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(10px,2vw,16px)", marginBottom: "clamp(6px,1.5vw,12px)", letterSpacing: "-0.01em" }}>
        {content.choiceQuestion}
      </p>
      <div style={{ display: "flex", gap: "clamp(6px,1.5vw,10px)" }}>
        {content.choiceOptions.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setTimeout(onDone, 900); }}
            style={{
              flex: 1, padding: "clamp(6px,1.5vw,10px) clamp(8px,2vw,14px)",
              borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
              fontSize: "clamp(9px,1.6vw,12px)", fontWeight: 600,
              border: selected === i ? "2px solid #7c6af5" : "2px solid rgba(255,255,255,0.25)",
              background: selected === i ? "#7c6af5" : "rgba(255,255,255,0.1)",
              color: "#fff", transition: "all 0.15s", textAlign: "center",
            }}
          >
            {selected === i ? "✓ " : ""}{opt}
          </button>
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "clamp(7px,1.2vw,10px)", marginTop: "6px" }}>
        Use D-pad to navigate · OK to select · Back to dismiss
      </p>
    </div>
  );
}

/** QR Code Overlay — corner overlay with scannable code */
function QRCodeOverlay({ visible, content, onDismiss }: { visible: boolean; content: ProductContent; onDismiss: () => void }) {
  return (
    <div style={{
      position: "absolute", bottom: "clamp(8px,2vw,20px)", right: "clamp(8px,2vw,16px)",
      width: "clamp(100px,22vw,160px)", zIndex: 10,
      borderRadius: "10px", overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
      background: "#fff",
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.35s ease, transform 0.35s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{ background: "#111", padding: "clamp(4px,1vw,6px) clamp(8px,2vw,10px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#fff", fontSize: "clamp(7px,1.3vw,10px)", fontWeight: 700 }}>{content.brand}</span>
        <button
          onClick={onDismiss}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "clamp(8px,1.4vw,11px)", fontFamily: "inherit" }}
        >
          ✕
        </button>
      </div>
      <div style={{ padding: "clamp(6px,1.5vw,10px)", textAlign: "center" }}>
        {/* QR code SVG */}
        <div style={{ background: "#f8f8f8", borderRadius: "6px", padding: "6px", marginBottom: "6px", display: "inline-block" }}>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-label="QR code">
            <rect width="70" height="70" fill="white" />
            {/* Corner squares */}
            <rect x="4" y="4" width="18" height="18" rx="2" fill="#111" />
            <rect x="7" y="7" width="12" height="12" rx="1" fill="white" />
            <rect x="9" y="9" width="8" height="8" fill="#111" />
            <rect x="48" y="4" width="18" height="18" rx="2" fill="#111" />
            <rect x="51" y="7" width="12" height="12" rx="1" fill="white" />
            <rect x="53" y="9" width="8" height="8" fill="#111" />
            <rect x="4" y="48" width="18" height="18" rx="2" fill="#111" />
            <rect x="7" y="51" width="12" height="12" rx="1" fill="white" />
            <rect x="9" y="53" width="8" height="8" fill="#111" />
            {/* Data dots */}
            <rect x="26" y="4" width="4" height="4" fill="#111" />
            <rect x="32" y="4" width="4" height="4" fill="#111" />
            <rect x="38" y="4" width="4" height="4" fill="#111" />
            <rect x="26" y="10" width="4" height="4" fill="#111" />
            <rect x="38" y="10" width="4" height="4" fill="#111" />
            <rect x="26" y="16" width="4" height="4" fill="#111" />
            <rect x="32" y="16" width="4" height="4" fill="#111" />
            <rect x="4" y="26" width="4" height="4" fill="#111" />
            <rect x="10" y="26" width="4" height="4" fill="#111" />
            <rect x="4" y="32" width="4" height="4" fill="#111" />
            <rect x="16" y="32" width="4" height="4" fill="#111" />
            <rect x="4" y="38" width="4" height="4" fill="#111" />
            <rect x="10" y="38" width="4" height="4" fill="#111" />
            <rect x="16" y="38" width="4" height="4" fill="#111" />
            <rect x="26" y="26" width="4" height="4" fill="#111" />
            <rect x="32" y="26" width="4" height="4" fill="#111" />
            <rect x="38" y="26" width="4" height="4" fill="#111" />
            <rect x="44" y="26" width="4" height="4" fill="#111" />
            <rect x="26" y="32" width="4" height="4" fill="#111" />
            <rect x="44" y="32" width="4" height="4" fill="#111" />
            <rect x="26" y="38" width="4" height="4" fill="#111" />
            <rect x="32" y="38" width="4" height="4" fill="#111" />
            <rect x="38" y="38" width="4" height="4" fill="#111" />
            <rect x="48" y="26" width="4" height="4" fill="#111" />
            <rect x="54" y="26" width="4" height="4" fill="#111" />
            <rect x="60" y="26" width="4" height="4" fill="#111" />
            <rect x="48" y="32" width="4" height="4" fill="#111" />
            <rect x="60" y="32" width="4" height="4" fill="#111" />
            <rect x="48" y="38" width="4" height="4" fill="#111" />
            <rect x="60" y="38" width="4" height="4" fill="#111" />
            <rect x="26" y="48" width="4" height="4" fill="#111" />
            <rect x="38" y="48" width="4" height="4" fill="#111" />
            <rect x="44" y="48" width="4" height="4" fill="#111" />
            <rect x="26" y="54" width="4" height="4" fill="#111" />
            <rect x="32" y="54" width="4" height="4" fill="#111" />
            <rect x="44" y="54" width="4" height="4" fill="#111" />
            <rect x="26" y="60" width="4" height="4" fill="#111" />
            <rect x="32" y="60" width="4" height="4" fill="#111" />
            <rect x="38" y="60" width="4" height="4" fill="#111" />
            <rect x="44" y="60" width="4" height="4" fill="#111" />
            {/* Center accent */}
            <rect x="30" y="30" width="10" height="10" rx="2" fill="#7c6af5" />
          </svg>
        </div>
        <p style={{ fontSize: "clamp(7px,1.3vw,10px)", fontWeight: 700, color: "#111", marginBottom: "2px" }}>Scan to learn more</p>
        <p style={{ fontSize: "clamp(6px,1.1vw,9px)", color: "#888" }}>{content.qrUrl}</p>
      </div>
    </div>
  );
}

/** Pause Ad — slim banner at the bottom, appears on pause */
function PauseAdBanner({ visible, content, onDismiss }: { visible: boolean; content: ProductContent; onDismiss: () => void }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
      background: "rgba(10,10,18,0.92)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(8px)",
      padding: "clamp(8px,1.5vw,14px) clamp(12px,2.5vw,20px)",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
      transform: visible ? "translateY(0)" : "translateY(100%)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease, transform 0.3s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,2vw,14px)" }}>
        {/* Brand logo placeholder */}
        <div style={{
          width: "clamp(28px,6vw,40px)", height: "clamp(28px,6vw,40px)", borderRadius: "8px",
          background: "linear-gradient(135deg, #7c6af5, #9184f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: "clamp(12px,2.5vw,18px)" }}>👟</span>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(7px,1.2vw,9px)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>
            Sponsored · {content.brand}
          </p>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(9px,1.8vw,14px)", letterSpacing: "-0.01em" }}>
            {content.tagline}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px,1.2vw,10px)" }}>
        <button
          onClick={() => {}}
          style={{
            background: "#7c6af5", color: "#fff", border: "none",
            padding: "clamp(4px,1vw,7px) clamp(8px,2vw,14px)", borderRadius: "6px",
            fontSize: "clamp(8px,1.4vw,11px)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          {content.bannerCta}
        </button>
        <button
          onClick={onDismiss}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)",
            padding: "clamp(4px,1vw,7px) clamp(8px,2vw,10px)", borderRadius: "6px",
            fontSize: "clamp(8px,1.4vw,11px)", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/** ShopPause overlay — product card */
function ShopPauseOverlay({
  visible, focused, countdown, content, onFocus, onShopNow, onSave, onDismiss,
}: {
  visible: boolean; focused: boolean; countdown: number; content: ProductContent;
  onFocus: () => void; onShopNow: () => void; onSave: () => void; onDismiss: () => void;
}) {
  const pct = (countdown / COUNTDOWN_START) * 100;
  return (
    <div style={{
      position: "absolute", bottom: "clamp(8px,2vw,32px)", right: "clamp(8px,2vw,20px)",
      width: "clamp(130px,22vw,200px)", borderRadius: "12px", overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)",
      background: "#fff",
      transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.35s ease, transform 0.35s ease",
      pointerEvents: visible ? "auto" : "none",
      zIndex: 10,
    }}>
      <div style={{ background: "#7c6af5", padding: "clamp(3px,0.7vw,4px) clamp(8px,2vw,10px)", fontSize: "clamp(7px,1.2vw,9px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
        As seen in this show
      </div>
      <div style={{ height: "clamp(50px,10vw,80px)", background: "linear-gradient(135deg, #f0effe 0%, #e8e4fd 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: "clamp(24px,5vw,40px)" }}>{content.emoji}</span>
        <span style={{ position: "absolute", top: "4px", right: "6px", fontSize: "clamp(7px,1.2vw,9px)", fontWeight: 800, color: "#555" }}>{content.brand.toUpperCase()}</span>
      </div>
      <div style={{ padding: "clamp(6px,1.5vw,10px) clamp(6px,1.5vw,10px) 0" }}>
        <p style={{ fontSize: "clamp(9px,1.6vw,11px)", fontWeight: 700, color: "#111", marginBottom: "2px", lineHeight: 1.2 }}>{content.product}</p>
        <p style={{ fontSize: "clamp(10px,1.8vw,13px)", fontWeight: 800, color: "#7c6af5", marginBottom: "clamp(4px,1vw,8px)" }}>{content.price}</p>
        <div onClick={onFocus} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <button onClick={(e) => { e.stopPropagation(); onShopNow(); }} style={{ width: "100%", padding: "clamp(4px,1vw,6px)", borderRadius: "6px", fontSize: "clamp(8px,1.4vw,10px)", fontWeight: 700, fontFamily: "inherit", cursor: "pointer", border: focused ? "2px solid #7c6af5" : "2px solid transparent", background: "#7c6af5", color: "#fff" }}>🛍 Shop Now</button>
          <div style={{ display: "flex", gap: "3px" }}>
            <button onClick={(e) => { e.stopPropagation(); onSave(); }} style={{ flex: 1, padding: "clamp(3px,0.8vw,5px)", borderRadius: "6px", fontSize: "clamp(7px,1.2vw,10px)", fontWeight: 600, fontFamily: "inherit", cursor: "pointer", border: "1.5px solid #e5e5e5", background: "#fff", color: "#555" }}>♡ Save</button>
            <button onClick={(e) => { e.stopPropagation(); onDismiss(); }} style={{ padding: "clamp(3px,0.8vw,5px) clamp(6px,1.2vw,8px)", borderRadius: "6px", fontSize: "clamp(7px,1.2vw,10px)", fontWeight: 600, fontFamily: "inherit", cursor: "pointer", border: "1.5px solid #e5e5e5", background: "#fff", color: "#999" }}>✕</button>
          </div>
        </div>
      </div>
      <div style={{ padding: "clamp(5px,1vw,8px) clamp(6px,1.5vw,10px) clamp(6px,1.5vw,10px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
          <span style={{ fontSize: "clamp(7px,1.1vw,9px)", color: "#999" }}>Auto-dismiss</span>
          <span style={{ fontSize: "clamp(7px,1.1vw,9px)", fontWeight: 700, color: "#7c6af5" }}>{countdown}s</span>
        </div>
        <div style={{ height: "3px", borderRadius: "2px", background: "#f0f0f0", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #7c6af5, #9184f7)", borderRadius: "2px", transition: "width 1s linear" }} />
        </div>
      </div>
    </div>
  );
}

function ConversionOverlay({ content, onDone }: { content: ProductContent; onDone: () => void }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "clamp(16px,3vw,28px) clamp(20px,4vw,32px)", textAlign: "center", maxWidth: "260px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
        <div style={{ width: "80px", height: "80px", background: "#f5f5f5", borderRadius: "8px", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-label="QR code">
            <rect width="70" height="70" fill="white" />
            <rect x="4" y="4" width="18" height="18" rx="2" fill="#111" /><rect x="7" y="7" width="12" height="12" rx="1" fill="white" /><rect x="9" y="9" width="8" height="8" fill="#111" />
            <rect x="48" y="4" width="18" height="18" rx="2" fill="#111" /><rect x="51" y="7" width="12" height="12" rx="1" fill="white" /><rect x="53" y="9" width="8" height="8" fill="#111" />
            <rect x="4" y="48" width="18" height="18" rx="2" fill="#111" /><rect x="7" y="51" width="12" height="12" rx="1" fill="white" /><rect x="9" y="53" width="8" height="8" fill="#111" />
            <rect x="26" y="4" width="4" height="4" fill="#111" /><rect x="32" y="4" width="4" height="4" fill="#111" />
            <rect x="26" y="32" width="4" height="4" fill="#111" /><rect x="38" y="32" width="4" height="4" fill="#111" />
            <rect x="32" y="60" width="4" height="4" fill="#111" /><rect x="44" y="54" width="4" height="4" fill="#111" />
            <rect x="30" y="30" width="10" height="10" rx="2" fill="#7c6af5" />
          </svg>
        </div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Scan to shop on your phone</p>
        <p style={{ fontSize: "10px", color: "#888", marginBottom: "14px", lineHeight: 1.4 }}>{content.brand} · {content.product} · {content.price}</p>
        <button onClick={onDone} style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "#7c6af5", color: "#fff", fontSize: "11px", fontWeight: 700, fontFamily: "inherit", cursor: "pointer", border: "none" }}>
          Done. Resume Playback
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TVPrototype({ format = "shoppable", category = "retail" }: { format?: FormatKey; category?: CategoryKey }) {
  const [state, setState] = useState<DemoState>("playing");
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const meta = FORMAT_META[format];
  const content = CATEGORY_CONTENT[category];

  // Reset state when format or category changes
  useEffect(() => {
    setState("playing");
    setCountdown(COUNTDOWN_START);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [format, category]);

  // Countdown for pause-triggered overlays
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (state === "overlay" || state === "focused") {
      timerRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) { setState("playing"); return COUNTDOWN_START; }
          return c - 1;
        });
      }, 1000);
    } else {
      setCountdown(COUNTDOWN_START);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  const isStandardAd = format === "standard_15" || format === "standard_30";
  const isPlaying = state === "playing";

  const handleAction = () => {
    if (isStandardAd) {
      // Standard ads play during content — button triggers the ad
      setState("overlay");
    } else if (meta.pauseRequired) {
      // Pause-triggered formats
      if (state === "playing") {
        setState("detecting");
        setTimeout(() => setState("overlay"), 500);
      } else if (state !== "converted") {
        setState("playing");
      }
    } else {
      // Overlay-during-playback formats (choice, QR)
      if (state === "playing") setState("overlay");
      else if (state !== "converted") setState("playing");
    }
  };

  const stateLabel: Record<DemoState, string> = {
    playing: isStandardAd ? "Content playing: click to trigger ad" : meta.pauseRequired ? "Content playing" : "Content playing",
    detecting: "Pause detected: loading overlay…",
    overlay: "Ad active",
    focused: "Viewer navigating overlay",
    converted: "Shop Now: QR generated",
    dismissed: "Overlay dismissed",
  };

  const stateColor: Record<DemoState, string> = {
    playing: "var(--text-3)", detecting: "var(--amber)", overlay: "var(--accent)",
    focused: "var(--green)", converted: "var(--green)", dismissed: "var(--text-3)",
  };

  const overlayVisible = state === "overlay" || state === "focused";
  const isPaused = !isPlaying && state !== "converted";

  const buttonLabel = () => {
    if (isStandardAd) return state === "overlay" ? "← Skip ad" : "▶ Trigger mid-roll ad";
    if (meta.pauseRequired) return isPlaying ? "⏸ Pause" : "▶ Resume";
    return state === "overlay" ? "Hide overlay" : "Show overlay";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-3)" }}>
            Interactive prototype · {meta.label}
          </p>
          <p className="text-sm" style={{ color: "var(--text-2)" }}>
            {meta.description} <span style={{ color: "var(--text-3)" }}>Trigger: {meta.trigger}.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg shrink-0" style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)" }}>
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: stateColor[state] }} />
          <span style={{ color: "var(--text-2)" }}>{stateLabel[state]}</span>
        </div>
      </div>

      {/* TV Frame */}
      <div style={{
        background: "#111", borderRadius: "12px", overflow: "hidden",
        boxShadow: "0 0 0 3px #1a1a1a, 0 0 0 5px #0d0d0d, 0 24px 48px rgba(0,0,0,0.6)",
        position: "relative", aspectRatio: "16/9", maxWidth: "100%",
      }}>
        <RokuStatusBar />

        {/* Content area */}
        <div style={{
          position: "relative", height: "calc(100% - 28px - 6px)",
          background: "linear-gradient(135deg, #0a0520 0%, #0d1520 35%, #111827 65%, #0a0520 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}>
          {/* Show title */}
          <div style={{ textAlign: "center", zIndex: 1, opacity: isPaused && meta.pauseRequired ? 0.4 : 0.9, transition: "opacity 0.3s" }}>
            <p style={{ fontSize: "clamp(8px, 2vw, 14px)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Netflix Original</p>
            <p style={{ fontSize: "clamp(14px, 3.5vw, 28px)", color: "#fff", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "4px" }}>Stranger Things</p>
            <p style={{ fontSize: "clamp(8px, 1.8vw, 12px)", color: "rgba(255,255,255,0.4)" }}>Season 2, Episode 4: &ldquo;Will the Wise&rdquo;</p>
          </div>

          {/* Pause icon (only for pause-triggered formats) */}
          {isPaused && meta.pauseRequired && (
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: "clamp(32px,6vw,52px)", height: "clamp(32px,6vw,52px)", borderRadius: "50%",
              background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)", border: "1.5px solid rgba(255,255,255,0.2)", zIndex: 2,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white" aria-hidden="true">
                <rect x="3" y="2" width="3.5" height="12" rx="1" />
                <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
              </svg>
            </div>
          )}

          {/* Format-specific overlays */}
          {(format === "standard_15" || format === "standard_30") && overlayVisible && (
            <StandardAdOverlay
              seconds={format === "standard_15" ? 15 : 30}
              content={content}
              onDone={() => setState("playing")}
            />
          )}

          {format === "interactive_choice" && (
            <ChoiceAdOverlay
              visible={overlayVisible}
              content={content}
              onDone={() => { setState("dismissed"); setTimeout(() => setState("playing"), 600); }}
            />
          )}

          {format === "qr_code" && (
            <QRCodeOverlay
              visible={overlayVisible}
              content={content}
              onDismiss={() => { setState("dismissed"); setTimeout(() => setState("playing"), 400); }}
            />
          )}

          {format === "pause_ad" && (
            <PauseAdBanner
              visible={overlayVisible}
              content={content}
              onDismiss={() => { setState("dismissed"); setTimeout(() => setState("playing"), 400); }}
            />
          )}

          {format === "shoppable" && (
            <ShopPauseOverlay
              visible={overlayVisible}
              focused={state === "focused"}
              countdown={countdown}
              content={content}
              onFocus={() => setState("focused")}
              onShopNow={() => setState("converted")}
              onSave={() => { setState("dismissed"); setTimeout(() => setState("playing"), 800); }}
              onDismiss={() => { setState("dismissed"); setTimeout(() => setState("playing"), 800); }}
            />
          )}

          {state === "converted" && <ConversionOverlay content={content} onDone={() => { setState("playing"); setCountdown(COUNTDOWN_START); }} />}
        </div>

        {/* Progress bar */}
        <div style={{ height: "6px", background: "#1a1a1a", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "62%", background: "linear-gradient(90deg, #7c6af5 0%, #9184f7 100%)" }} />
          <div style={{ position: "absolute", left: "62%", top: "50%", transform: "translate(-50%, -50%)", width: "10px", height: "10px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 2px rgba(124,106,245,0.5)" }} />
        </div>
      </div>

      {/* TV stand */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "60px", height: "12px", background: "#1a1a1a", borderRadius: "0 0 2px 2px" }} />
        <div style={{ width: "100px", height: "4px", background: "#141414", borderRadius: "2px" }} />
      </div>

      {/* Remote */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <span className="text-xs" style={{ color: "var(--text-3)" }}>Remote:</span>
        <button
          onClick={handleAction}
          disabled={state === "detecting"}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
          style={{
            background: "var(--accent)", color: "#fff",
            border: "1px solid var(--accent)", fontFamily: "inherit",
            cursor: state === "detecting" ? "not-allowed" : "pointer",
          }}
        >
          {buttonLabel()}
        </button>
      </div>

      <p className="text-center text-xs mt-3" style={{ color: "var(--text-3)" }}>
        {isStandardAd
          ? "Standard ads interrupt playback; viewer cannot skip until after 5s"
          : meta.pauseRequired
          ? state === "playing" ? "Press Pause; overlay appears after 500ms detection delay" : "Press Resume to dismiss and continue"
          : state === "playing" ? "Click to show the ad overlay" : "Click to hide overlay"}
      </p>
    </div>
  );
}
