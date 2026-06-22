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
const Z_STEP = 36;

export function Panel({ layer, index, total, onClick }: Props) {
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
        transform: `translate(-50%, calc(-50% - ${hover ? 56 : 0}px)) translateZ(${z}px)`,
        transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease",
        background: hover ? "rgba(255,255,255,0.19)" : "rgba(255,255,255,0.13)",
        border: "1px solid rgba(255,255,255,0.20)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        willChange: "transform",
        animation: `shimmer-sweep 1.2s ease-out ${index * 0.08}s 1`,
      }}
    >
      {/* Top label */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.9)",
          }}
        >
          {layer.label}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(240,237,232,0.45)",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Intro variant only: name + tagline centred (no photo) */}
      {layer.variant === "intro" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: "#f0ede8",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            Amal Ray
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.5,
              color: "rgba(240,237,232,0.6)",
              marginTop: 14,
              maxWidth: 280,
            }}
          >
            {layer.tagline}
          </div>
        </div>
      )}
    </button>
  );
}

export const PANEL_DIMS = { PANEL_W, PANEL_H, Z_STEP };
