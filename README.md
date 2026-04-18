# AdSignal — CTV Ad Format Intelligence Dashboard

Pre-campaign intelligence for CTV advertising. Input ad format parameters, see predicted engagement decay, CTR, completion rate, and ad fatigue score before committing budget.

**Live demo:** [ad-signal.vercel.app](https://ad-signal.vercel.app)

---

## What it does

**Format Simulator** — Configure ad format type, product category, length, interactivity level, and target frequency. See live predictions for CTR, completion rate, and ad fatigue score (1–10), powered by IAB CTV Benchmarks 2024 and Deloitte Digital Media Trends 2025. The engagement decay curve shows how viewer attention drops second-by-second for the selected format. Hit "Generate" for a Claude-powered recommendation grounded in the simulated data.

**Case Study** — Problem statement, market research evidence (cited), RICE prioritization table, competitive teardown of Roku Action Ads vs. Amazon Fire TV vs. Peacock vs. Samsung Ads, and success metrics.

**A/B Test Designer** — Configure experiment parameters (control vs. treatment format, primary metric, baseline rate, MDE, significance level, statistical power, daily impressions). Outputs: required sample per variant, total impressions, projected test duration, and a full experiment design summary.

---

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Visualization:** Recharts
- **Styling:** Tailwind CSS
- **AI:** Claude via OpenRouter API (format recommendations)
- **Data:** Static JSON — IAB CTV Benchmarks 2024, Deloitte Digital Media Trends 2025
- **Deploy:** Vercel (free tier)

---

## Local setup

```bash
npm install
```

Create `.env.local`:
```
OPENROUTER_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Data sources

All benchmark numbers are cited inline in the UI:
- [IAB CTV Benchmarks 2024](https://www.iab.com/wp-content/uploads/2024/01/IAB_CTV_Video_Ad_Spend_2024.pdf)
- [Deloitte Digital Media Trends 2025](https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends.html)
- [Roku Shoptalk 2025 Recap](https://advertising.roku.com/learn/resources/retail-meets-the-remote-rokus-takeaways-from-shoptalk-2025)
- [Marketing Brew — Shoppable Ads (May 2025)](https://www.marketingbrew.com/stories/2025/05/06/upfronts-shoppable-ads)

---

Built by [Ali Hasan](https://github.com/AliHasan-786) · Built with Claude Code (claude-sonnet-4-6) · 48-hour build
