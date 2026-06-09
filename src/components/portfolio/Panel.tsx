import { useRef, useState } from "react";
import type { Layer } from "./data";

type Props = {
  layer: Layer;
  index: number;
  total: number;
  isActive: boolean;
  onClick: (rect: DOMRect) => void;
};

const PANEL_W = 440;
const PANEL_H = 440;
const Z_STEP = 40;

export function Panel({ layer, index, total, isActive, onClick }: Props) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const z = -((index - (total - 1) / 2) * Z_STEP);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        if (ref.current) onClick(ref.current.getBoundingClientRect());
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group absolute left-1/2 top-1/2 text-left"

      style={{
        width: PANEL_W,
        height: PANEL_H,
        transform: `translate(-50%, ${hover ? "-58%" : "-50%"}) translateZ(${z}px)`,
        transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        willChange: "transform",
        animation: `shimmer-sweep 1.2s ease-out ${index * 0.08}s 1`,
      }}
    >
      {/* Topic label always on top */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="font-serif text-[11px] uppercase tracking-[0.28em] text-text-primary">
          {layer.label}
        </span>
        <span className="text-[10px] tracking-[0.2em] text-text-muted">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Peek-up reveal: full title appears when hovering */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 px-5 py-5"
        style={{
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 280ms ease, transform 280ms ease",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
        }}
      >
        <div className="font-serif text-lg leading-tight text-text-primary">
          {layer.title}
        </div>
        {layer.eyebrow && (
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-text-muted line-clamp-1">
            {layer.eyebrow}
          </div>
        )}
      </div>



    </button>
  );
}

export const PANEL_DIMS = { PANEL_W, PANEL_H, Z_STEP };
