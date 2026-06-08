import type { Layer } from "./data";

type Props = {
  layer: Layer;
  index: number;
  total: number;
  isActive: boolean;
  onClick: () => void;
};

const PANEL_W = 520;
const PANEL_H = 340;
const Z_STEP = 44;

export function Panel({ layer, index, total, isActive, onClick }: Props) {
  // Distribute panels through depth, centered around z=0
  const z = -((index - (total - 1) / 2) * Z_STEP);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-left transition-colors duration-300"
      style={{
        width: PANEL_W,
        height: PANEL_H,
        transform: `translate(-50%, -50%) translateZ(${z}px)`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderLeft: `3px solid ${layer.accent}`,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        willChange: "transform",
        animation: `shimmer-sweep 1.2s ease-out ${index * 0.08}s 1`,
      }}
    >
      {/* Edge glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
        style={{
          background: layer.accent,
          opacity: isActive ? 1 : 0.6,
          boxShadow: isActive
            ? `0 0 24px ${layer.accent}, 0 0 8px ${layer.accent}`
            : `0 0 12px ${layer.accent}`,
          animation: isActive ? "edge-pulse 1.2s ease-out" : undefined,
          transition: "opacity 300ms ease, box-shadow 300ms ease",
        }}
      />

      {/* Hover background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />

      <div className="relative flex h-full flex-col justify-between p-8">
        {layer.variant === "intro" ? (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <div
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "2px solid rgba(255,255,255,0.25)",
              }}
            >
              <img src="" alt="Amal Ray" className="h-full w-full object-cover" />
              <span className="absolute text-[10px] text-text-muted">Photo</span>
            </div>
            <div>
              <div className="font-serif text-3xl text-text-primary">Amal Ray</div>
              <div className="mt-2 text-xs tracking-[0.18em] text-text-muted uppercase">
                Product · Design · Technology
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
              {String(index).padStart(2, "0")}
            </div>
            <div>
              <div className="font-serif text-2xl leading-tight text-text-primary">
                {layer.label}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Click to read →
              </div>
            </div>
          </>
        )}
      </div>
    </button>
  );
}

export const PANEL_DIMS = { PANEL_W, PANEL_H, Z_STEP };
