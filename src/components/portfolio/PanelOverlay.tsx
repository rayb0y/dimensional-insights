import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Layer } from "./data";

type Props = {
  layer: Layer | null;
  onClose: () => void;
};

const SIZE = 620;

export function PanelOverlay({ layer, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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

          <motion.div
            key={layer.id}
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="relative z-10 flex flex-col"
            style={{
              width: SIZE,
              height: SIZE,
              maxWidth: "92vw",
              maxHeight: "92vh",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(255,204,51,0.18)",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="font-serif text-[11px] uppercase tracking-[0.28em] text-text-primary">
                {layer.label}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-text-muted transition-colors hover:text-text-primary"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {layer.eyebrow}
              </div>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-text-primary">
                {layer.title}
              </h2>

              <div className="mt-5 space-y-3 whitespace-pre-line text-[14px] leading-relaxed text-text-primary/85">
                {layer.description}
              </div>

              {layer.films && (
                <div className="mt-5 space-y-3 border-l border-white/15 pl-4">
                  {layer.films.map((f) => (
                    <div key={f.title}>
                      <div className="font-serif text-base text-text-primary">{f.title}</div>
                      <div className="text-sm text-text-muted">{f.blurb}</div>
                    </div>
                  ))}
                </div>
              )}

              {layer.insight && (
                <div className="mt-6 border-l-2 border-white/30 pl-4 font-serif text-lg italic leading-snug text-text-primary/90">
                  "{layer.insight}"
                </div>
              )}

              {layer.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {layer.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] tracking-wide text-text-muted"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
