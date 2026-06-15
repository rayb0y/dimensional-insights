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
        transform: `translate(-50%, ${hover ? "-68%" : "-50%"}) translateZ(${z}px)`,
        transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease",
        background: hover ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        willChange: "transform",
        animation: `shimmer-sweep 1.2s ease-out ${index * 0.08}s 1`,
      }}
    >
      {/* Top eyebrow with number */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.5)",
          }}
        >
          {layer.label}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(240,237,232,0.35)",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Intro variant: photo + name + tagline centred */}
      {layer.variant === "intro" && (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
              marginBottom: 18,
            }}
          >
            <img
              src=""
              alt="Amal Ray"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#f0ede8",
              letterSpacing: "-0.01em",
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
              color: "rgba(240,237,232,0.55)",
              marginTop: 10,
              maxWidth: 280,
            }}
          >
            {layer.tagline}
          </div>
        </div>
      )}

      {/* Default variant: centred title in Syne */}
      {layer.variant !== "intro" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center">
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.01em",
              color: "#f0ede8",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            {layer.label}
          </div>
        </div>
      )}
    </button>
  );
}

export const PANEL_DIMS = { PANEL_W, PANEL_H, Z_STEP };
