import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
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
const FADE =
  "linear-gradient(to bottom, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%)";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(true);
  const reduce = useReducedMotion();
  const isOpen = activeId !== null;

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
      } else if (e.key === "Tab") {
        const nodes = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!nodes || nodes.length === 0) return;
        const list = Array.from(nodes);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [layer, index]);

  // Focus the dialog on open; restore focus to the opener on close.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => overlayRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      prev?.focus?.();
    };
  }, [isOpen]);

  // Decide poster (centered) vs scrolling (top-anchored) per card.
  useIsoLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 24);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeId, isMobile]);

  const target =
    typeof window !== "undefined"
      ? { cx: window.innerWidth / 2, cy: window.innerHeight / 2 }
      : { cx: 200, cy: 400 };

  const zoomInitial =
    originRect && !usedOrigin
      ? {
          x: originRect.left + originRect.width / 2 - target.cx,
          y: originRect.top + originRect.height / 2 - target.cy,
          scale: originRect.width / (isMobile ? target.cx * 2 : SIZE),
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
    padding: "12px 22px",
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

  const navBtn = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "14px 16px",
    margin: "-14px -16px",
    minHeight: 48,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: isMobile ? 14 : 12,
    letterSpacing: "0.04em",
    color: "rgba(240,237,232,0.55)",
  } as const;

  return (
    <AnimatePresence>
      {layer && (
        <motion.div
          ref={overlayRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={layer.title}
          className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-6 outline-none"
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
              background: isMobile ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.8)",
              backdropFilter: isMobile ? undefined : "blur(14px)",
              WebkitBackdropFilter: isMobile ? undefined : "blur(14px)",
            }}
          />

          {/* Accent glow behind the card, cross-fading via opacity (cheap) */}
          <AnimatePresence>
            <motion.div
              key={accent}
              aria-hidden
              className="pointer-events-none absolute left-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                top: isMobile ? "36%" : "50%",
                width: 820,
                height: 820,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle at center, ${accent}44 0%, ${accent}14 34%, ${accent}0a 55%, transparent 72%)`,
                filter: "blur(28px)",
                willChange: "opacity",
              }}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={layer.id}
              initial={
                reduce ? { opacity: 0 } : usedOrigin ? { opacity: 0, y: 24, scale: 0.985 } : zoomInitial
              }
              animate={reduce ? { opacity: 1 } : { x: 0, y: 0, scale: 1, opacity: 1 }}
              exit={
                reduce ? { opacity: 0 } : usedOrigin ? { opacity: 0, y: -24, scale: 0.985 } : zoomInitial
              }
              transition={
                reduce
                  ? { duration: 0.2 }
                  : usedOrigin
                    ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    : { type: "spring", stiffness: 170, damping: 22 }
              }
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
              className="relative z-10"
              style={{
                width: isMobile ? "100vw" : CARD,
                height: isMobile ? "100dvh" : CARD,
                perspective: 1400,
              }}
            >
              <div
                className="pov-active relative flex h-full flex-col overflow-hidden"
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  touchStart.current = t.clientX < 24 ? null : { x: t.clientX, y: t.clientY };
                }}
                onTouchEnd={(e) => {
                  const s = touchStart.current;
                  touchStart.current = null;
                  if (!s) return;
                  const dx = e.changedTouches[0].clientX - s.x;
                  const dy = e.changedTouches[0].clientY - s.y;
                  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                    if (dx < 0) goNext();
                    else goPrev();
                  } else if (
                    dy > 80 &&
                    dy > Math.abs(dx) * 1.4 &&
                    (bodyRef.current?.scrollTop ?? 0) <= 0
                  ) {
                    onClose();
                  }
                }}
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

                {/* Header (fixed): eyebrow, index, close */}
                <div
                  className="relative flex-none px-8"
                  style={{ paddingTop: isMobile ? "calc(env(safe-area-inset-top, 0px) + 22px)" : 24 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="inline-flex items-center"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: isMobile ? 13 : 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(240,237,232,0.6)",
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
                    <div className="flex flex-none items-center gap-2">
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: isMobile ? 13 : 11,
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
                        style={{ fontSize: 22, lineHeight: 1, padding: 12, margin: -12 }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>

                {/* Body: poster (centered) when it fits, scrolling when it overflows */}
                <div
                  ref={bodyRef}
                  className="pov-scroll relative flex-1 overflow-y-auto px-8"
                  style={{
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: overflows ? "flex-start" : "flex-end",
                    paddingTop: overflows ? 20 : 0,
                    paddingBottom: overflows ? 8 : 28,
                    ...(overflows ? { maskImage: FADE, WebkitMaskImage: FADE } : {}),
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: isMobile
                        ? overflows
                          ? "clamp(32px, 8.5vw, 46px)"
                          : "clamp(38px, 10.5vw, 54px)"
                        : "clamp(26px, 4.6vmin, 42px)",
                      lineHeight: 1.06,
                      letterSpacing: "-0.01em",
                      color: "#f0ede8",
                      maxWidth: isMobile ? undefined : "18ch",
                      textWrap: "balance",
                      marginBottom: 20,
                    }}
                  >
                    {layer.title}
                  </h2>

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
                          fontSize: isMobile
                            ? isLede && i === 0
                              ? 20
                              : 18
                            : isLede && i === 0
                              ? 19
                              : 17,
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
                </div>

                {/* Footer (fixed): tags + nav */}
                <div
                  className="relative flex-none px-8 pt-4"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.09)",
                    paddingBottom: isMobile
                      ? "calc(20px + env(safe-area-inset-bottom, 0px))"
                      : 20,
                  }}
                >
                  {layer.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
                      {layer.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: isMobile ? "4px 11px" : "3px 9px",
                            border: "1px solid rgba(255,255,255,0.22)",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 500,
                            fontSize: isMobile ? 12 : 10,
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
                      style={{ ...navBtn, textAlign: "left" }}
                    >
                      <span className="pov-arrow">‹</span> {shortLabel(prev)}
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="pov-nav pov-nav-next"
                      aria-label={`Next: ${shortLabel(next)}`}
                      style={{ ...navBtn, textAlign: "right" }}
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
