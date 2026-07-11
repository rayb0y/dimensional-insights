import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Layer } from "./data";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  layers: Layer[];
  activeId: string | null;
  originRect: DOMRect | null;
  onClose: () => void;
  onChange: (id: string) => void;
};

const SIZE = 760;
const CARD = "min(760px, 92vmin)";

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>",
  );

const shortLabel = (l: Layer) => l.label.split("·")[0].trim();

export function PanelOverlay({ layers, activeId, originRect, onClose, onChange }: Props) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [usedOrigin, setUsedOrigin] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const index = activeId ? layers.findIndex((l) => l.id === activeId) : -1;
  const layer = index >= 0 ? layers[index] : null;
  const total = layers.length;

  const goTo = (delta: number) => {
    if (index < 0) return;
    const n = (index + delta + total) % total;
    setUsedOrigin(true);
    setTilt({ rx: 0, ry: 0 });
    onChange(layers[n].id);
  };
  const goPrev = () => goTo(-1);
  const goNext = () => goTo(1);

  useEffect(() => {
    if (!layer) {
      setUsedOrigin(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [layer, index]);

  const target =
    typeof window !== "undefined"
      ? { cx: window.innerWidth / 2, cy: window.innerHeight / 2 }
      : { cx: 0, cy: 0 };

  const zoomInitial =
    originRect && !usedOrigin
      ? {
          x: originRect.left + originRect.width / 2 - target.cx,
          y: originRect.top + originRect.height / 2 - target.cy,
          scale: originRect.width / SIZE,
          opacity: 1,
        }
      : { x: 0, y: 30, scale: 0.98, opacity: 0 };

  const accent = layer ? layer.accent : "#ffffff";
  const prev = layers[(index - 1 + total) % total] ?? layers[0];
  const next = layers[(index + 1) % total] ?? layers[0];
  const isLede = !!layer && layer.paragraphs.length > 1;

  const onMove = (e: ReactMouseEvent) => {
    if (isMobile) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 4, ry: px * 4 });
  };

  const linkBtn = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 22px",
    border: "1px solid rgba(255,255,255,0.35)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.05em",
    color: "#f0ede8",
    background: "transparent",
    textDecoration: "none",
    cursor: "pointer",
  } as const;

  return (
    <AnimatePresence>
      {layer && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <style>{`.pov-active ::selection{background:${accent};color:#07070f}.pov-scroll{scrollbar-width:none}.pov-scroll::-webkit-scrollbar{display:none}.pov-nav{transition:color .2s ease}.pov-nav:hover{color:${accent}}.pov-arrow{display:inline-block;transition:transform .2s ease}.pov-nav-prev:hover .pov-arrow{transform:translateX(-4px)}.pov-nav-next:hover .pov-arrow{transform:translateX(4px)}`}</style>

          <div
            className="absolute inset-0"
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          />

          {/* Accent-shifted ambient glow behind the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{
              width: 820,
              height: 820,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at center, ${accent}44 0%, ${accent}14 34%, rgba(255,204,51,0.04) 55%, transparent 72%)`,
              filter: "blur(28px)",
              transition: "background 400ms ease",
            }}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={layer.id}
              initial={usedOrigin ? { opacity: 0, y: 24, scale: 0.985 } : zoomInitial}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              exit={usedOrigin ? { opacity: 0, y: -24, scale: 0.985 } : zoomInitial}
              transition={
                usedOrigin
                  ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  : { type: "spring", stiffness: 170, damping: 22 }
              }
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
              className="relative z-10"
              style={{
                width: isMobile ? "92vw" : CARD,
                height: isMobile ? "min(82vh, 720px)" : CARD,
                perspective: 1400,
              }}
            >
              <div
                className="pov-active relative flex h-full flex-col overflow-hidden"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
                }}
              >
                {/* top-edge highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0"
                  style={{ height: 1, background: "rgba(255,255,255,0.14)" }}
                />
                {/* accent corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    top: -120,
                    right: -120,
                    width: 340,
                    height: 340,
                    background: `radial-gradient(circle at center, ${accent}22 0%, transparent 70%)`,
                  }}
                />
                {/* noise */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: `url("${NOISE}")`,
                    backgroundSize: "140px 140px",
                    opacity: 0.03,
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Header (fixed) */}
                <div className="relative flex-none px-8 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="inline-flex items-center"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(240,237,232,0.55)",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 999,
                          background: accent,
                          marginRight: 10,
                          flex: "none",
                        }}
                      />
                      {layer.eyebrow}
                    </span>
                    <div className="flex flex-none items-center gap-3">
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.16em",
                          color: "rgba(240,237,232,0.4)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="text-text-muted transition-colors hover:text-text-primary"
                        style={{ fontSize: 22, lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(26px, 4.6vmin, 42px)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.01em",
                      color: "#f0ede8",
                      marginTop: 16,
                      maxWidth: "18ch",
                    }}
                  >
                    {layer.title}
                  </h2>
                </div>

                {/* Body (scrolls) */}
                <div
                  className="pov-scroll relative flex-1 overflow-y-auto px-8 pt-6"
                  style={{
                    minHeight: 0,
                    maskImage:
                      "linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      maxWidth: "62ch",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 300,
                      color: "rgba(240,237,232,0.9)",
                    }}
                  >
                    {layer.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        style={{
                          fontSize: isLede && i === 0 ? 19 : 17,
                          lineHeight: 1.65,
                          color:
                            isLede && i === 0
                              ? "rgba(240,237,232,0.96)"
                              : "rgba(240,237,232,0.88)",
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {layer.variant === "lalama" && (
                    <div style={{ marginTop: 22 }}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          navigate({ to: "/context" });
                        }}
                        style={linkBtn}
                      >
                        Play Context →
                      </button>
                    </div>
                  )}

                  {layer.watchUrl && (
                    <div style={{ marginTop: 22 }}>
                      <a href={layer.watchUrl} target="_blank" rel="noreferrer" style={linkBtn}>
                        Watch Film →
                      </a>
                    </div>
                  )}

                  {(layer.variant === "contact" || layer.variant === "intro") && (
                    <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 12 }}>
                      <a href="mailto:amalr@andrew.cmu.edu" style={linkBtn}>
                        amalr@andrew.cmu.edu
                      </a>
                      <a
                        href="https://www.linkedin.com/in/amal-ray-577a69175/"
                        target="_blank"
                        rel="noreferrer"
                        style={linkBtn}
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}

                  <div style={{ height: 8 }} />
                </div>

                {/* Footer (fixed): tags + nav */}
                <div
                  className="relative flex-none px-8 pb-5 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
                >
                  {layer.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
                      {layer.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: "3px 9px",
                            border: "1px solid rgba(255,255,255,0.22)",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 500,
                            fontSize: 10,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(240,237,232,0.55)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="pov-nav pov-nav-prev"
                      aria-label={`Previous: ${shortLabel(prev)}`}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        textAlign: "left",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 12,
                        letterSpacing: "0.04em",
                        color: "rgba(240,237,232,0.55)",
                      }}
                    >
                      <span className="pov-arrow">‹</span> {shortLabel(prev)}
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="pov-nav pov-nav-next"
                      aria-label={`Next: ${shortLabel(next)}`}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        textAlign: "right",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 12,
                        letterSpacing: "0.04em",
                        color: "rgba(240,237,232,0.55)",
                      }}
                    >
                      {shortLabel(next)} <span className="pov-arrow">›</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
