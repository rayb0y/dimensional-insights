import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Layer } from "./data";

type Props = {
  layer: Layer | null;
  onClose: () => void;
};

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
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="relative z-10 w-full max-w-[680px] overflow-hidden rounded-2xl"
            style={{
              background: "rgba(13,13,24,0.92)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderLeft: `3px solid ${layer.accent}`,
              boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 60px ${layer.accent}22`,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-all hover:text-text-primary"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ×
            </button>

            <div className="max-h-[80vh] overflow-y-auto p-10 md:p-12">
              {layer.variant === "intro" && (
                <div className="mb-6 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.25)" }}>
                  <img src="" alt="Amal Ray" className="h-full w-full object-cover" />
                </div>
              )}

              <div className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
                {layer.eyebrow}
              </div>
              <h2
                className="mt-3 font-serif text-4xl leading-tight md:text-5xl"
                style={{ color: layer.accent }}
              >
                {layer.title}
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-text-primary/85 whitespace-pre-line">
                {layer.description}
              </div>

              {layer.films && (
                <div className="mt-6 space-y-3 border-l pl-5" style={{ borderColor: `${layer.accent}55` }}>
                  {layer.films.map((f) => (
                    <div key={f.title}>
                      <div className="font-serif text-lg text-text-primary">{f.title}</div>
                      <div className="text-sm text-text-muted">{f.blurb}</div>
                    </div>
                  ))}
                </div>
              )}

              {layer.insight && (
                <div
                  className="mt-8 border-l-2 pl-5 font-serif text-xl italic leading-snug text-text-primary/90"
                  style={{ borderColor: layer.accent }}
                >
                  "{layer.insight}"
                </div>
              )}

              {layer.variant === "contact" && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:amalr@andrew.cmu.edu"
                    className="rounded-md border px-5 py-2.5 text-sm transition-all"
                    style={{ borderColor: "rgba(255,255,255,0.18)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = layer.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                  >
                    Email
                  </a>
                  <a
                    href="https://linkedin.com/in/amal-ray-577a69175"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border px-5 py-2.5 text-sm transition-all"
                    style={{ borderColor: "rgba(255,255,255,0.18)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = layer.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                  >
                    LinkedIn
                  </a>
                </div>
              )}

              {layer.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {layer.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-[11px] tracking-wide text-text-muted"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
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
