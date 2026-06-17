## Panel (`src/components/portfolio/Panel.tsx`)

- Remove the colored top accent border (`borderTop: 3px solid ${layer.accent}`) — replace with the same 1px white/14 border as the rest.
- Remove the intro variant's photo placeholder (the circular img block). Keep the name + tagline centered on layer 0 only.
- For all layers *other than* the intro, remove the centered Syne title from the card face. The top-left label is the only visible text.
- Make the top label more visible: increase color opacity (e.g. `rgba(240,237,232,0.85)`) and weight (600).
- Hover peek: reduce the lift so just the top label clears the layer in front. Change `translateY(-54%)` to a smaller offset (~`calc(-50% - 22px)`) so only the eyebrow row peeks above the next panel.

## PanelOverlay — Rolodex Navigation (`src/components/portfolio/PanelOverlay.tsx`)

- Remove the colored `borderTop` accent from the overlay card and the colored `borderLeft` on the insight block (use neutral white/20).
- Accept the full `layers` list + active `index` (or change props to `layerId`/`onChange(id)`). Add `onPrev` / `onNext` callbacks.
- Wire arrow keys: `ArrowLeft`/`ArrowUp` → prev, `ArrowRight`/`ArrowDown` → next, `Escape` → close.
- Add on-screen ◀ / ▶ buttons flanking the overlay card (fixed, vertically centered, outside the card). Disabled styling at first/last (or wrap around — wrap is more rolodex-like; **decision: wrap around**).
- Animate card swap: use `motion.div` keyed by `layer.id` inside `AnimatePresence` with a quick slide+fade (incoming from +40px y, outgoing to -40px y) so it feels like a rolodex flip. Keep the existing origin-rect zoom only for the *first* open (when navigating, skip the rect math).

## Portfolio (`src/components/portfolio/Portfolio.tsx`)

- Pass `layers` and `activeId` to `PanelOverlay`; provide `onPrev`/`onNext` that step `activeId` through the `layers` array with wrap-around.
- Clear `originRect` after first mount so subsequent prev/next swaps animate cleanly without the zoom origin.

## CONTEXT game (`src/routes/context.tsx`)

Simplify:
- Replace all "beat" terminology with "line" (UI copy + variable/type names: `BeatType` → `LineType` is optional; user-facing copy is what matters — rename labels: "Add beat" → "Add line", "FORGETTING — EACH BEAT COSTS A MEMORY" → "FORGETTING — EACH LINE COSTS A MEMORY", "Click a card to forget it" stays).
- Remove the four line types (Introduction / Turn / Revelation / Loss). Every line is one kind, costs 1 token. Drop `BEAT_COLOURS`, `BEAT_COSTS`, `BEAT_ORDER`, the `selectedBeat` selector UI, the 1–4 keyboard shortcut effect, and the `type` field on cards.
- `playBeat` (rename to `playLine`) always deducts 1 token. Cards render with neutral border (no per-type color).
- Setup screen: remove copy referencing different beat types if any. Keep token selector, seed input.
- Reflection / EndScreen: remove any per-type breakdowns; keep total lines played, memories forgotten.

## Out of scope

No data, font, layout, or routing changes beyond above. No edits to `Cube.tsx`, `data.ts`, or `MobileStack.tsx`.
