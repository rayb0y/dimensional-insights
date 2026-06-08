import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Cube } from "./Cube";
import { MobileStack } from "./MobileStack";
import { Grain } from "./Grain";
import { PanelOverlay } from "./PanelOverlay";
import { layers } from "./data";

export function Portfolio() {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeLayer = activeId ? layers.find((l) => l.id === activeId) ?? null : null;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void text-text-primary">
      <Grain />

      {/* Top brand mark */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5">
        <span className="font-serif text-lg text-text-primary">Amal Ray</span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">
          Portfolio · 2026
        </span>
      </div>

      {isMobile ? (
        <div className="h-full overflow-y-auto">
          <MobileStack onOpen={setActiveId} />
        </div>
      ) : (
        <Cube onOpen={setActiveId} />
      )}

      <PanelOverlay layer={activeLayer} onClose={() => setActiveId(null)} />
    </div>
  );
}
