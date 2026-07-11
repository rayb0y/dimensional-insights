import { useEffect, useRef, useState } from "react";
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
  const pushed = useRef(false);
  const isOpen = activeId !== null;

  const handleOpen = (id: string, rect?: DOMRect) => {
    setOriginRect(rect ?? null);
    setActiveId(id);
  };

  const closeNow = () => {
    pushed.current = false;
    setActiveId(null);
    setOriginRect(null);
  };

  // Close the overlay via the device/browser back gesture.
  const requestClose = () => {
    if (pushed.current) window.history.back();
    else closeNow();
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!pushed.current) {
      window.history.pushState({ __overlay: true }, "");
      pushed.current = true;
    }
    const onPop = () => closeNow();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [isOpen]);

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
        onClose={requestClose}
        onChange={(id) => setActiveId(id)}
      />
    </div>
  );
}
