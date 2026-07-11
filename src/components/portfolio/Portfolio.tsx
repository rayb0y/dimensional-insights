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
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const handleOpen = (id: string, rect?: DOMRect) => {
    setOriginRect(rect ?? null);
    setActiveId(id);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void text-text-primary">
      <Grain />

      <div style={{ visibility: isMobile && activeId ? "hidden" : "visible" }}>
        {isMobile ? (
          <MobileStack onOpen={(id, rect) => handleOpen(id, rect)} />
        ) : (
          <Cube onOpen={(id, rect) => handleOpen(id, rect)} />
        )}
      </div>

      <PanelOverlay
        layers={layers}
        activeId={activeId}
        originRect={originRect}
        onClose={() => {
          setActiveId(null);
          setOriginRect(null);
        }}
        onChange={(id) => setActiveId(id)}
      />
    </div>
  );
}
