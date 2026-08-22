# rocket-reels

Instagram reels for **Rocket Solutions**. The subject is real client websites
Rocket has built, scrolling in a phone frame. Not text on color.

## Brand (source of truth: the live rocket-solutions-official site)
- Red `#EE0A32`, deep `#B80825`
- Fonts: Instrument Sans (display), Inter (body), JetBrains Mono (mono)
- Paper `#F4F3F0`, ink `#111113`, dark `#0E0E10`, on-dark `#EDEBE6`

## Commands
```bash
npm install
npm run capture      # screenshots live client sites into public/captures
npm run studio       # Remotion Studio on http://localhost:3005
npm run typecheck
npm run render src/index.ts <id> out/<id>.mp4 --scale 2   # release
npm run render:all
```

## How a reel is made
1. `npm run capture` grabs a tall full-page screenshot of each live site into
   `public/captures/<slug>/full.png`. Note the printed pixel height.
2. Add a `ReelSpec` in `src/specs/reels.ts` with the site name, capture path,
   and that `imgHeight`.
3. `npm run studio`, preview, then render.

## Structure
```
src/brand/      tokens.ts (real #EE0A32 brand), fonts.ts (Instrument Sans)
src/engine/     motion.ts (spring/interp helpers), schema.ts (ReelSpec)
src/components/ PhoneFrame, SiteScroll (the scrolling capture), Background, Kicker
src/templates/  Showcase (site scrolls in phone). FeatureFocus, BeforeAfter next.
src/specs/      reels.ts (one entry per reel)
scripts/        capture.mjs (Playwright site capture)
public/         brand logos, captures/
```

## Templates
- **Showcase** (built): a full site scrolling in a phone, intro hook + CTA.
- **FeatureFocus** (planned): zoom a real section (estimate form, service-area
  page, reviews) with a benefit line.
- **BeforeAfter** (planned): old site vs the Rocket rebuild.

## Rules
- Real captures only. Never rebuild a UI in CSS.
- Brand is the live-site brand (#EE0A32 / Instrument Sans), not Switzer.
- Frame-driven motion only (spring/interpolate). No CSS animation.
- Reels advertise Rocket Solutions; CTA is the audit / gorocketsolutions.com.
