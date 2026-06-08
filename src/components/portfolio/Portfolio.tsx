import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Cube } from "./Cube";
import { MobileStack } from "./MobileStack";
import { Nav } from "./Nav";
import { Grain } from "./Grain";
import { PanelOverlay } from "./PanelOverlay";
import { layers } from "./data";

export function Portfolio() {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLayer = activeId ? layers.find((l) => l.id === activeId) ?? null : null;

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-void text-text-primary">
      <Nav />
      <Grain />

      {/* Hero zone */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
            Portfolio · 2026
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
            Amal Ray
          </h1>
          <p className="mt-5 text-base text-text-muted md:text-lg">
            Product · Design · Technology. A consultant working at the seam where
            business, design and code meet.
          </p>
        </div>

        {!isMobile && (
          <div
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-text-muted transition-opacity duration-500"
            style={{
              opacity: scrolled ? 0 : 1,
              animation: "pulse-fade 2.4s ease-in-out infinite",
            }}
          >
            scroll to explore ↓
          </div>
        )}
      </section>

      {/* Cube / mobile stack */}
      {isMobile ? <MobileStack onOpen={setActiveId} /> : <Cube onOpen={setActiveId} />}

      {/* Contact zone */}
      <section
        id="contact"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div id="about" className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
            Based in Pittsburgh — open to relocation anywhere
          </div>
          <h2 className="mt-6 font-serif text-5xl md:text-6xl">Let's talk.</h2>
          <p className="mt-5 text-text-muted">
            The work is inside the cube. The cube is the argument. If something
            in there pulled you in, I'd love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:amalr@andrew.cmu.edu"
              className="rounded-md border px-6 py-3 text-sm transition-all hover:border-coral"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              amalr@andrew.cmu.edu
            </a>
            <a
              href="https://linkedin.com/in/amal-ray-577a69175"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border px-6 py-3 text-sm transition-all hover:border-coral"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-6 text-[11px] uppercase tracking-[0.2em] text-text-muted">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span>© 2026 Amal Ray</span>
            <span>Pittsburgh</span>
          </div>
        </div>
      </section>

      <PanelOverlay layer={activeLayer} onClose={() => setActiveId(null)} />
    </div>
  );
}
