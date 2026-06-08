# Amal Ray Portfolio — Layered Cube

A single-page, dark, cinematic portfolio. A floating stack of 11 translucent panels (a "cube") sits center-screen, rotates on Y as the user scrolls, and any panel can be clicked to fly forward and expand into a readable card.

## Scope

- Single page, no routing changes (use existing `src/routes/index.tsx`)
- Mobile fallback: vertical stacked cards (no 3D)
- No images yet — circular placeholder slot in the intro panel
- Content for all 11 layers comes from the brief verbatim

## Tech & dependencies

- React + TanStack Start (existing)
- CSS 3D transforms (`perspective`, `preserve-3d`, `rotateY`, `translateZ`) for the cube
- `framer-motion` (new dep) for fly-out / overlay transitions
- Google Fonts: DM Serif Display + DM Sans, loaded via `<link>` in `src/routes/__root.tsx` head (NOT @import — per Tailwind v4 rules)
- Design tokens added to `src/styles.css` under `@theme` and `:root`

## Files

- `src/styles.css` — add palette tokens (`--void`, `--coral`, `--ice`, `--acid`, `--plasma`, `--amber`, `--text`, `--text-muted`), font family tokens, background = void black, grain helper, panel base styles, shimmer keyframes, float keyframes
- `src/routes/__root.tsx` — add Google Fonts `<link>` tags (preconnect + DM Serif Display + DM Sans), update default `<title>` / meta to "Amal Ray — Product · Design · Technology"
- `src/routes/index.tsx` — replace placeholder; render `<Portfolio />`
- `src/components/portfolio/Portfolio.tsx` — page shell: nav, hero zone, scroll zone (10× vh), contact zone, grain overlay, active-panel state
- `src/components/portfolio/Nav.tsx` — fixed top nav, blurs after scroll
- `src/components/portfolio/Cube.tsx` — sticky-centered cube container; reads scroll progress via `useRef` + scroll listener; lerp-smoothed `rotateY` 0→360deg; float bob animation; renders 11 `<Panel />`s at staggered `translateZ`
- `src/components/portfolio/Panel.tsx` — single layer; props: index, accent, label, content; resting state + hover brightening; click → expand
- `src/components/portfolio/PanelOverlay.tsx` — Framer Motion overlay + expanded card with close button; spring (stiffness 180, damping 22)
- `src/components/portfolio/data.ts` — array of 11 layer definitions (eyebrow, title, description, insight, tags, accent)
- `src/components/portfolio/MobileStack.tsx` — vertical card list using same data, used below `md`
- `src/components/portfolio/Grain.tsx` — fixed full-viewport SVG noise overlay
- `src/hooks/useScrollProgress.ts` — returns 0–1 progress within a ref'd element, lerp-smoothed value via rAF

## Cube mechanics

- Container: `perspective: 1200px`, inner cube `transform-style: preserve-3d`
- Each panel: absolute, centered, `translateZ(-44px * index)`, base 520×340, radius 12, translucent white, 3px left border in accent, backdrop blur
- Scroll zone is 10× viewport tall; cube container is `sticky top-0 h-screen` inside it
- Scroll progress drives `rotateY`; lerp factor 0.08 via rAF loop
- Active panel = `round(progress * 11) % 11`; passes `isActive` to the matching panel for the edge-glow pulse

## Fly-out interaction

- Click panel → set `activePanelId` in Portfolio
- `PanelOverlay` renders via `AnimatePresence`: dark backdrop fades in, expanded card springs from center (initial scale 0.85, target 1) at ~680px wide
- Close on backdrop click, × button, or Escape

## Responsive

- `useIsMobile` hook (already in `src/hooks/use-mobile.tsx`) gates `<Cube />` vs `<MobileStack />`
- Tablet: scale cube to 0.8 via CSS clamp on width/height vars

## Subtle details

- Grain overlay (SVG `feTurbulence`), `mix-blend-mode: overlay`, opacity 0.03
- Per-panel mount shimmer (one-time, staggered 80ms)
- Cube floats ±12px on Y over 6s ease-in-out infinite
- Scroll cue fades out after first scroll event

## Out of scope (this pass)

- Real photo (placeholder kept; user swaps `src` later)
- Custom cursors, audio, analytics
- Backend / Lovable Cloud (no data persistence needed)

Ready to switch to build mode when you approve.