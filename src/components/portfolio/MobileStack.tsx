import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { layers, type Layer } from "./data";

type Props = {
  onOpen: (id: string) => void;
};

const glowStops = (accent: string) => {
  const c = accent && accent.startsWith("#") ? accent : "#ffcc33";
  return `${c}40 0%, ${c}14 34%, ${c}00 62%`;
};

function CardFace({ layer, dim, bare }: { layer: Layer; dim?: boolean; bare?: boolean }) {
  const accent = layer.accent.startsWith("#") ? layer.accent : "#ffcc33";
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        borderRadius: 0,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 30px 90px rgba(0,0,0,0.65)",
        opacity: dim ? 0.92 : 1,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: -120,
          right: -120,
          width: 380,
          height: 380,
          background: `radial-gradient(circle at center, ${accent}2e 0%, transparent 70%)`,
        }}
      />

      {!bare && (
        <>
          {/* Header: label */}
          <div className="flex items-start px-7 pt-8">
            <span
              className="inline-flex items-center"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.9)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: accent,
                  marginRight: 10,
                  flex: "none",
                }}
              />
              {layer.label}
            </span>
          </div>

          <div className="flex-1" />

          {/* Footer: eyebrow, title, tags, hint */}
          <div className="px-7 pb-9">
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.55)",
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              {layer.eyebrow}
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(30px, 9vw, 46px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "#f0ede8",
              }}
            >
              {layer.title}
            </h2>
            {layer.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                {layer.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 11px",
                      border: "1px solid rgba(255,255,255,0.24)",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.6)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accent,
                marginTop: 24,
              }}
            >
              Tap to open ↗
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StackCard({
  layer,
  depth,
  isFront,
  onSwipe,
  onOpen,
}: {
  layer: Layer;
  depth: number;
  isFront: boolean;
  onSwipe: () => void;
  onOpen: (id: string) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-7, 7]);
  const opacity = useTransform(x, [-320, -160, 0, 160, 320], [0, 1, 1, 1, 0]);
  const moved = useRef(false);

  if (!isFront) {
    return (
      <motion.div
        className="absolute inset-0"
        animate={{ scale: 1 - depth * 0.04, y: depth * 12, opacity: depth < 2 ? 1 : 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        style={{ zIndex: 10 - depth }}
      >
        <CardFace layer={layer} dim />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity, zIndex: 20, touchAction: "pan-y", cursor: "grab" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.75}
      whileTap={{ cursor: "grabbing" }}
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
          const w = typeof window !== "undefined" ? window.innerWidth : 400;
          animate(x, dir * w * 1.25, { duration: 0.28, ease: "easeIn" });
          window.setTimeout(onSwipe, 240);
        } else {
          animate(x, 0, { type: "spring", stiffness: 320, damping: 30 });
        }
      }}
      onTap={() => {
        if (moved.current) return;
        onOpen(layer.id);
      }}
    >
      <CardFace layer={layer} />
    </motion.div>
  );
}

export function MobileStack({ onOpen }: Props) {
  const [order, setOrder] = useState(() => layers.map((_, i) => i));
  const total = layers.length;
  const frontLayer = layers[order[0]];
  const advance = () => setOrder((o) => [...o.slice(1), o[0]]);
  const visible = order.slice(0, 3);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#07070f", touchAction: "pan-y" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2"
        style={{
          width: "160vw",
          height: "160vw",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at center, ${glowStops(frontLayer.accent)})`,
          filter: "blur(30px)",
          transition: "background 420ms ease",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center pt-6"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(240,237,232,0.45)",
        }}
      >
        Swipe · Tap to open
      </div>

      <div className="relative" style={{ width: "88vw", height: "76vh" }}>
        {visible.map((idx, depth) => (
          <StackCard
            key={layers[idx].id}
            layer={layers[idx]}
            depth={depth}
            isFront={depth === 0}
            onSwipe={advance}
            onOpen={onOpen}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center pb-6"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12,
          letterSpacing: "0.16em",
          color: "rgba(240,237,232,0.45)",
        }}
      >
        {String(order[0] + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
