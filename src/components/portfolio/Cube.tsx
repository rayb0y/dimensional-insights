import { useScrollProgress } from "@/hooks/useScrollProgress";
import { layers } from "./data";
import { Panel } from "./Panel";

type Props = {
  onOpen: (id: string) => void;
};

export function Cube({ onOpen }: Props) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // 0 -> 360deg
  const rotation = progress * 360;
  // active panel index based on progress
  const total = layers.length;
  const activeIndex = Math.round(progress * total) % total;

  return (
    <div ref={ref} className="relative" style={{ height: "1000vh" }} id="work">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* perspective wrapper */}
        <div style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}>
          {/* floating wrapper */}
          <div style={{ animation: "float-bob 6s ease-in-out infinite" }}>
            {/* rotating cube */}
            <div
              className="relative"
              style={{
                width: 520,
                height: 340,
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                willChange: "transform",
              }}
            >
              {layers.map((layer, i) => (
                <Panel
                  key={layer.id}
                  layer={layer}
                  index={i}
                  total={total}
                  isActive={i === activeIndex}
                  onClick={() => onOpen(layer.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* progress indicator */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-text-muted">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} —{" "}
          {layers[activeIndex].label}
        </div>
      </div>
    </div>
  );
}
