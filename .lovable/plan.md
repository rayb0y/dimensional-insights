## Goal

On desktop, the expanded card content should start from the top of the card instead of being bottom-anchored on shorter cards.

## Current behavior

In `src/components/portfolio/PanelOverlay.tsx`, the body container uses `justifyContent: overflows ? "flex-start" : "flex-end"`. Short cards that don't overflow get pushed to the bottom (poster style). This applies on both mobile and desktop.

## Change

Desktop-only: always top-anchor the content.

- `justifyContent`: `flex-start` on desktop regardless of overflow. Mobile keeps existing poster/scroll behavior.
- `paddingTop`: consistent top padding on desktop (e.g. `20`) instead of `0` when not overflowing.
- `paddingBottom`: keep `28` when not overflowing so bottom links/buttons breathe.
- Fade mask stays tied to `overflows` (only applied when scrolling).

Mobile layout, animations, copy, colors, and the desktop Cube are untouched.

## Files

- `src/components/portfolio/PanelOverlay.tsx` — adjust the body div style block (around lines 371–383).
