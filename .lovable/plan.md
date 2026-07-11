## Goal
Make the mobile deck cards feel like they own the screen on iPhone 16 Pro (~393×852 CSS px), and let each card's accent color read as the dominant surface instead of a small corner glow.

## Changes (mobile only — desktop Cube untouched)

### 1. Card size fills the screen
In `src/components/portfolio/MobileStack.tsx`, resize the deck container so the front card is close to edge-to-edge on iPhone 16 Pro:
- Width: `min(96vw, 480px)` (was `min(94vw, 460px)`)
- Height: `min(78vh, 720px)` (was `min(70vh, 640px)`)
- Reduce the top spacing above the deck (`mt-16` → `mt-10`) and the "swipe to change" hint offset so the taller card fits above the fold with the counter still visible.
- Reduce the sticky-title trigger threshold so the header appears at the right point for the taller card.

### 2. Accent color fills more of the card, brighter
In `CardFace` (same file), replace the small top-right radial with a full-bleed accent wash:
- Base gradient becomes a diagonal blend from a bright accent tint at the top into the deep near-black at the bottom, roughly:
  `linear-gradient(160deg, {accent} 0%, {accent}CC 22%, #1a1a24 70%, #0b0b12 100%)`
- Add a second large soft radial (~140% of card size) anchored top-right at higher opacity (~`{accent}` at 55–65% alpha, fading to transparent by 75%) so color bleeds across most of the card.
- Add a subtle bottom vignette so the title stays readable on the darker lower third.
- Keep the accent dot + label and the title untouched in size/position; verify contrast on the brightest accents (amber, acid, ice, plasma, coral) — title stays `#f0ede8`; if any accent washes out the label, add a thin dark scrim behind the label row only.

### 3. Small polish
- Bump the drop shadow slightly since the card is larger (`0 30px 80px rgba(0,0,0,0.75)`).
- Keep entrance stack animation, swipe, and article behavior unchanged.

## Out of scope
- Desktop `Cube` panels
- Copy, fonts, article layout, navigation, routing

## Summary
Bigger card (up to 96vw × 78vh, capped) and a full-card accent wash so each project's color dominates the surface instead of sitting in the corner.