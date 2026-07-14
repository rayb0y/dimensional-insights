## Match mobile card colours to desktop

On desktop, each cube panel is a translucent glass card (`rgba(255,255,255,0.02–0.04)` with a subtle white border) and the accent colour only appears as an ambient radial glow behind the cube. On mobile, cards currently render as a full accent-coloured gradient fill. This plan brings mobile in line with desktop.

### Change (single file)

**`src/components/portfolio/MobileStack.tsx` — `CardFace` component**

- Replace the accent gradient `background` on the card container with the desktop glass treatment:
  - `background: "rgba(255,255,255,0.03)"`
  - `border: "1px solid rgba(255,255,255,0.14)"`
  - `backdropFilter: "blur(4px)"` (+ `-webkit-`)
  - Keep an outer drop shadow for depth.
- Remove the two internal accent-fill decorative layers (the large radial `screen`-blend blob and the dark bottom gradient) — desktop panels have neither.
- Keep the accent presence via the existing behind-the-deck radial glow already rendered by `MobileStack` (the `glowStops(accent)` layer). No change needed there; it mirrors the desktop cube glow.
- Keep label + title typography and layout unchanged (label top-left, title bottom-left), but recolor the small label dot to use the layer accent (matches the sticky title bar dot already in the file) instead of ivory.

### Out of scope

- No changes to desktop `Cube.tsx` / `Panel.tsx`.
- No changes to card sizing, stacking, swipe behaviour, article/detail section, or `data.ts`.
- No changes to the background glow colour logic.
