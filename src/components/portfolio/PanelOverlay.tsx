import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Layer } from "./data";

type Props = {
  layers: Layer[];
  activeId: string | null;
  originRect: DOMRect | null;
  onClose: () => void;
  onChange: (id: string) => void;
};

const SIZE = 660;

export function PanelOverlay({ layers, activeId, originRect, onClose, onChange }: Props) {
  const navigate = useNavigate();
  const [usedOrigin, setUsedOrigin] = useState(false);

  const index = activeId ? layers.findIndex((l) => l.id === activeId) : -1;
  const layer = index >= 0 ? layers[index] : null;

  const goPrev = () => {
    if (index < 0) return;
    const next = (index - 1 + layers.length) % layers.length;
    setUsedOrigin(true);
    onChange(layers[next].id);
  };
  const goNext = () => {
    if (index < 0) return;
    const next = (index + 1) % layers.length;
    setUsedOrigin(true);
    onChange(layers[next].id);
  };

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

  return (
    <AnimatePresence>
      {layer && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0"
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Prev arrow */}
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            className="absolute z-20 flex items-center justify-center"
            style={{
              left: "max(16px, calc(50% - 400px))",
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.04)",
              color: "#f0ede8",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ◀
          </button>

          {/* Next arrow */}
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            className="absolute z-20 flex items-center justify-center"
            style={{
              right: "max(16px, calc(50% - 400px))",
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.04)",
              color: "#f0ede8",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ▶
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={layer.id}
              initial={usedOrigin ? { opacity: 0, y: 30, scale: 0.98 } : zoomInitial}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              exit={usedOrigin ? { opacity: 0, y: -30, scale: 0.98 } : zoomInitial}
              transition={
                usedOrigin
                  ? { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                  : { type: "spring", stiffness: 180, damping: 22 }
              }
              className="relative z-10 flex flex-col"
              style={{
                width: SIZE,
                height: SIZE,
                maxWidth: "92vw",
                maxHeight: "92vh",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow:
                  "0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(255,204,51,0.18)",
              }}
            >
              <div className="flex items-center justify-between px-8 pt-6">
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
                  {layer.eyebrow}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="text-text-muted transition-colors hover:text-text-primary"
                  style={{ fontSize: 22, lineHeight: 1, marginLeft: 12 }}
                >
                  ×
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-7 pt-3">
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#f0ede8",
                    marginTop: 12,
                  }}
                >
                  {layer.title}
                </h2>

                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 300,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "rgba(240,237,232,0.88)",
                  }}
                >
                  {layer.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {layer.awardLine && (
                  <div
                    style={{
                      marginTop: 16,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      color: "rgba(240,237,232,0.6)",
                    }}
                  >
                    {layer.awardLine}
                  </div>
                )}

                {layer.insight && (
                  <div
                    style={{
                      marginTop: 24,
                      borderLeft: "3px solid rgba(255,255,255,0.25)",
                      paddingLeft: 16,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: 15,
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      color: "rgba(240,237,232,0.9)",
                    }}
                  >
                    {layer.insight}
                  </div>
                )}

                {layer.variant === "lalama" && (
                  <div style={{ marginTop: 20 }}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate({ to: "/context" });
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 24px",
                        border: "1px solid rgba(255,255,255,0.4)",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        color: "#f0ede8",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Play CONTEXT →
                    </button>
                  </div>
                )}

                {layer.watchUrl && (
                  <div style={{ marginTop: 20 }}>
                    <a
                      href={layer.watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 24px",
                        border: "1px solid rgba(255,255,255,0.4)",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        color: "#f0ede8",
                        background: "transparent",
                        textDecoration: "none",
                      }}
                    >
                      Watch Film →
                    </a>
                  </div>
                )}

                {layer.variant === "contact" && (
                  <div
                    style={{
                      marginTop: 24,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    {[
                      { href: "mailto:amalr@andrew.cmu.edu", label: "amalr@andrew.cmu.edu" },
                      {
                        href: "https://www.linkedin.com/in/amal-ray-577a69175/",
                        label: "LinkedIn",
                      },
                    ].map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "12px 24px",
                          border: "1px solid rgba(255,255,255,0.4)",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 14,
                          fontWeight: 500,
                          letterSpacing: "0.03em",
                          color: "#f0ede8",
                          background: "transparent",
                          textDecoration: "none",
                        }}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}

                {layer.tags.length > 0 && (
                  <div
                    style={{
                      marginTop: 24,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {layer.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "4px 10px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 500,
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(240,237,232,0.6)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
