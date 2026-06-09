import { useEffect, useRef, useState } from "react";
import { layers } from "./data";
import { Panel } from "./Panel";

type Props = {
  onOpen: (id: string, rect: DOMRect) => void;
};


export function Cube({ onOpen }: Props) {
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const total = layers.length;

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;
      setRotation(currentRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += (e.deltaY + e.deltaX) * 0.25;
    };

    let touchX: number | null = null;
    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchX === null || touchY === null) return;
      const dx = touchX - e.touches[0].clientX;
      const dy = touchY - e.touches[0].clientY;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      targetRef.current += (dy + dx) * 0.6;
    };


    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") targetRef.current += 30;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") targetRef.current -= 30;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const degPerLayer = 360 / total;
  const activeIndex = ((Math.round(-rotation / degPerLayer) % total) + total) % total;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Yellow glow emanating from the centre of the cube */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle at center, rgba(255,204,51,0.45) 0%, rgba(255,204,51,0.18) 25%, rgba(255,204,51,0.05) 50%, rgba(255,204,51,0) 70%)",
          filter: "blur(20px)",
        }}
      />

      <div style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}>
        <div style={{ animation: "float-bob 6s ease-in-out infinite" }}>
          <div
            className="relative"
            style={{
              width: 440,
              height: 440,
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
                onClick={(rect) => onOpen(layer.id, rect)}
              />
            ))}
          </div>
        </div>
      </div>



    </div>
  );
}
