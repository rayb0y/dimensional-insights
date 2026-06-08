import { useEffect, useRef, useState } from "react";

/**
 * Returns scroll progress (0-1) within the given element, lerp-smoothed via rAF.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [smoothed, setSmoothed] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      targetRef.current = total > 0 ? scrolled / total : 0;
    };

    const loop = () => {
      const lerp = 0.08;
      currentRef.current += (targetRef.current - currentRef.current) * lerp;
      setSmoothed(currentRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { ref, progress: smoothed };
}
