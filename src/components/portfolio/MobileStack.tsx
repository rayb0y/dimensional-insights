import { useEffect, useRef, useState } from "react";
import { layers } from "./data";

type Props = {
  onOpen: (id: string) => void;
};

const CARD_H = 172;
const TOP = 92;
const LABEL_H = 40;

export function MobileStack({ onOpen }: Props) {
  const [active, setActive] = useState(0);
  const [vh, setVh] = useState(760);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const moved = useRef(false);
  const total = layers.length;

  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const gap = Math.max(34, Math.min(52, (vh - TOP - 96) / (total - 1)));
  const clamp = (n: number) => Math.max(0, Math.min(total - 1, n));

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    moved.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    if (Math.abs(e.touches[0].clientX - startX.current) > 8) moved.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = (startY.current ?? 0) - e.changedTouches[0].clientY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      setActive((i) => clamp(i + (dx < 0 ? 1 : -1)));
    }
    startX.current = null;
    startY.current = null;
  };

  const labelStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(240,237,232,0.9)",
  };
  const idxStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 10,
    letterSpacing: "0.2em",
    color: "rgba(240,237,232,0.45)",
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#07070f", touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "170vw",
          height: "170vw",
          background:
            "radial-gradient(circle at center, rgba(255,204,51,0.4) 0%, rgba(255,204,51,0.15) 26%, rgba(255,204,51,0.05) 50%, rgba(255,204,51,0) 70%)",
          filter: "blur(20px)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center pt-5"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(240,237,232,0.35)",
        }}
      >
        Swipe · Tap to open
      </div>

      {layers.map((layer, i) => {
        const isActive = i === active;
        const top = TOP + i * gap;
        return (
          <button
            key={layer.id}
            type="button"
            aria-label={layer.label}
            onClick={() => {
              if (!moved.current) onOpen(layer.id);
            }}
            className="absolute left-1/2 text-left"
            style={{
              top,
              width: "86vw",
              height: CARD_H,
              transform: `translateX(-50%) scale(${isActive ? 1.035 : 1})`,
              transformOrigin: "center top",
              transition:
                "transform 300ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease, background 200ms ease",
              opacity: isActive ? 1 : 0.6,
              zIndex: isActive ? 500 : i,
              background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderTop: `2px solid ${isActive ? layer.accent : "rgba(255,255,255,0.16)"}`,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxShadow: isActive
                ? "0 30px 70px rgba(0,0,0,0.7)"
                : "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="pointer-events-none flex items-center justify-between px-5"
              style={{ height: LABEL_H }}
            >
              <span style={labelStyle}>{layer.label}</span>
              <span style={idxStyle}>{String(i).padStart(2, "0")}</span>
            </div>

            {isActive &&
              (layer.variant === "intro" ? (
                <div className="pointer-events-none flex flex-col items-center justify-center px-8 text-center" style={{ height: CARD_H - LABEL_H }}>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 26,
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
                      marginTop: 12,
                      maxWidth: 240,
                    }}
                  >
                    {layer.tagline}
                  </div>
                </div>
              ) : (
                <div className="pointer-events-none px-5 pt-2">
                  {layer.eyebrow && (
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(240,237,232,0.5)",
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {layer.eyebrow}
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      lineHeight: 1.2,
                      color: "#f0ede8",
                    }}
                  >
                    {layer.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: layer.accent,
                      marginTop: 12,
                    }}
                  >
                    Tap to open
                  </div>
                </div>
              ))}
          </button>
        );
      })}
    </div>
  );
}
