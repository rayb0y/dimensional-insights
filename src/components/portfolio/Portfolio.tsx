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
