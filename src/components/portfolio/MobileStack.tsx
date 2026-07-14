import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { layers, type Layer } from "./data";

type Props = {
  onOpen?: (id: string, rect?: DOMRect) => void;
};

const accentOf = (l: Layer) => (l.accent.startsWith("#") ? l.accent : "#ffcc33");
const glowStops = (accent: string) => `${accent}40 0%, ${accent}14 34%, ${accent}00 62%`;

// Deck cover: label + title only. The full copy lives in the article below.
function CardFace({ layer }: { layer: Layer }) {
  const accent = accentOf(layer);
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}
    >


      <div className="relative flex items-start px-7 pt-7" style={{ zIndex: 1 }}>
        <span
          className="inline-flex items-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(15px, 3.8vw, 19px)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#f0ede8",
            textShadow: "0 1px 2px rgba(0,0,0,0.35)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: accent,
              marginRight: 12,
              flex: "none",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
            }}
          />
          {layer.label}
        </span>
      </div>
      <div className="flex-1" />
      <div className="relative px-7 pb-8" style={{ zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(34px, 10.5vw, 60px)",
            lineHeight: 1.04,
            letterSpacing: "-0.015em",
            color: "#f0ede8",
            textWrap: "balance",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          {layer.title}
        </h2>
      </div>

    </div>
  );
}

function StackCard({
  layer,
  depth,
  isFront,
  onSwipe,
  onTap,
  nudge,
  reduce,
  entering,
  totalVisible,
}: {
  layer: Layer;
  depth: number;
  isFront: boolean;
  onSwipe: (dir: number) => void;
  onTap: () => void;
  nudge?: number;
  reduce?: boolean | null;
  entering: boolean;
  totalVisible: number;
}) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-320, -160, 0, 160, 320], [0, 1, 1, 1, 0]);
  const moved = useRef(false);

  useEffect(() => {
    if (isFront) x.set(0);
  }, [isFront]);

  useEffect(() => {
    if (!nudge || reduce) return;
    const controls = animate(x, [0, -16, 0], { duration: 0.7, times: [0, 0.35, 1], ease: "easeInOut" });
    return () => controls.stop();
  }, [nudge]);

  // Deepest card lands first, front card lands last (on top).
  const entryDelay = entering && !reduce ? (totalVisible - 1 - depth) * 0.11 : 0;
  const entryInitial = entering && !reduce ? { y: -320, opacity: 0, rotate: -6 } : false;

  if (!isFront) {
    return (
      <motion.div
        className="absolute inset-0"
        initial={entryInitial}
        animate={{
          scale: 1 - depth * 0.03,
          x: -depth * 15,
          y: depth * 7,
          opacity: 1,
          rotate: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          delay: entryDelay,
        }}
        style={{ zIndex: 10 - depth }}
      >
        <CardFace layer={layer} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0"
      initial={entryInitial}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: entryDelay }}
      style={{ zIndex: 20 }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`Read about ${layer.title}`}
        className="absolute inset-0"
        style={{ x, opacity, touchAction: "pan-y", cursor: "grab" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.75}
        whileTap={{ cursor: "grabbing" }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onTap();
          }
        }}
        onDragStart={() => {
          moved.current = false;
        }}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > 6) moved.current = true;
        }}
        onDragEnd={(_, info) => {
          const power = info.offset.x + info.velocity.x * 0.2;
          if (Math.abs(power) > 100) {
            moved.current = true;
            const dir = power > 0 ? 1 : -1;
            if (reduce) {
              x.set(0);
              onSwipe(dir);
            } else {
              const w = typeof window !== "undefined" ? window.innerWidth : 400;
              animate(x, dir * w * 1.25, { duration: 0.28, ease: "easeIn" });
              window.setTimeout(() => onSwipe(dir), 240);
            }
          } else {
            animate(x, 0, { type: "spring", stiffness: 320, damping: 30 });
          }
        }}
        onTap={() => {
          if (moved.current) return;
          onTap();
        }}
      >
        <CardFace layer={layer} />
      </motion.div>
    </motion.div>
  );
}


export function MobileStack(_props: Props) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => layers.map((_, i) => i));
  const [showHint, setShowHint] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckVisible, setDeckVisible] = useState(true);

  const active = layers[order[0]];
  const accent = accentOf(active);
  const total = layers.length;
  const visible = order.slice(0, 4);
  const entering = !hasInteracted;


  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!window.localStorage.getItem("swipedOnce")) setShowHint(true);
    } catch {
      setShowHint(true);
    }
  }, []);

  const markSwiped = () => {
    if (!showHint) return;
    setShowHint(false);
    try {
      window.localStorage.setItem("swipedOnce", "1");
    } catch {
      /* ignore */
    }
  };
  const advance = () => {
    markSwiped();
    setHasInteracted(true);
    setOrder((o) => [...o.slice(1), o[0]]);
  };
  const retreat = () => {
    markSwiped();
    setHasInteracted(true);
    setOrder((o) => [o[o.length - 1], ...o.slice(0, o.length - 1)]);
  };

  const scrollToDetails = () =>
    detailsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  useEffect(() => {
    if (!showHint || reduce) return;
    const t = window.setTimeout(() => setNudge((n) => n + 1), 1500);
    return () => window.clearTimeout(t);
  }, [showHint, reduce, order]);

  // Show the sticky title bar only once the card is scrolled out of view.
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setDeckVisible(e.intersectionRatio > 0.3), {
      threshold: [0, 0.3, 0.6, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: "#07070f", WebkitOverflowScrolling: "touch", overflowX: "hidden" }}
    >
      {/* Sticky title bar, appears when the card scrolls out of view */}
      <div
        aria-hidden={deckVisible}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          padding: "calc(env(safe-area-inset-top, 0px) + 14px) 20px 14px",
          background: "rgba(7,7,15,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transform: deckVisible ? "translateY(-100%)" : "translateY(0)",
          opacity: deckVisible ? 0 : 1,
          transition: "transform 300ms ease, opacity 300ms ease",
          pointerEvents: deckVisible ? "none" : "auto",
        }}
      >
        <span
          aria-hidden
          style={{ width: 7, height: 7, borderRadius: 999, background: accent, marginRight: 12, flex: "none" }}
        />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "#f0ede8",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {active.title}
        </span>
      </div>

      {/* Deck */}
      <div ref={deckRef} className="relative flex flex-col items-center pb-6">
        <AnimatePresence>
          <motion.div
            key={accent}
            aria-hidden
            className="pointer-events-none absolute left-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42 }}
            style={{
              top: "42%",
              width: "160vw",
              height: "160vw",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at center, ${glowStops(accent)})`,
              filter: "blur(30px)",
              willChange: "opacity",
            }}
          />
        </AnimatePresence>

        {showHint && (
          <div
            className="pointer-events-none absolute inset-x-0 flex items-center justify-center"
            style={{
              top: "calc(env(safe-area-inset-top, 0px) + 22px)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.45)",
            }}
          >
            Swipe to change
          </div>
        )}

        <div
          className="relative mt-10"
          style={{ width: "min(96vw, 480px)", height: "min(78vh, 720px)" }}

        >
          {visible.map((idx, depth) => (
            <StackCard
              key={layers[idx].id}
              layer={layers[idx]}
              depth={depth}
              isFront={depth === 0}
              onSwipe={(dir) => (dir < 0 ? advance() : retreat())}
              onTap={scrollToDetails}
              nudge={depth === 0 ? nudge : undefined}
              reduce={reduce}
              entering={entering}
              totalVisible={visible.length}
            />
          ))}
        </div>


        <button
          type="button"
          onClick={scrollToDetails}
          className="relative mt-8 flex flex-col items-center"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.5)",
          }}
        >
          {String(order[0] + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          <span style={{ marginTop: 8, fontSize: 18, lineHeight: 1 }}>↓</span>
        </button>
      </div>

      {/* Article for the active project */}
      <motion.article
        ref={detailsRef}
        key={active.id}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full px-6 pb-28 pt-10"
        style={{ maxWidth: 640, borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.55)",
            lineHeight: 1.6,
            marginBottom: 18,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: 999,
              background: accent,
              marginRight: 9,
              verticalAlign: "middle",
            }}
          />
          {active.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {active.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.72,
                color: "rgba(240,237,232,0.9)",
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {active.variant === "lalama" && (
          <button
            type="button"
            onClick={() => navigate({ to: "/context" })}
            style={linkStyle}
          >
            Play Context →
          </button>
        )}

        {active.watchUrl && (
          <a href={active.watchUrl} target="_blank" rel="noreferrer" style={linkStyle}>
            Watch Film →
          </a>
        )}

        {(active.variant === "contact" || active.variant === "intro") && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
            <a href="mailto:amalr@andrew.cmu.edu" style={{ ...linkStyle, marginTop: 0 }}>
              amalr@andrew.cmu.edu
            </a>
            <a
              href="https://www.linkedin.com/in/amal-ray-577a69175/"
              target="_blank"
              rel="noreferrer"
              style={{ ...linkStyle, marginTop: 0 }}
            >
              LinkedIn
            </a>
          </div>
        )}

        {active.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 30 }}>
            {active.tags.map((t) => (
              <span
                key={t}
                style={{
                  padding: "5px 12px",
                  border: "1px solid rgba(255,255,255,0.22)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,232,0.55)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
}

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  marginTop: 26,
  padding: "13px 24px",
  border: "1px solid rgba(255,255,255,0.35)",
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "0.05em",
  color: "#f0ede8",
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
} as const;
