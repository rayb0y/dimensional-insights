import * as React from "react";

// Treat as "mobile" (use the touch-friendly deck instead of the 3D cube) when the
// viewport is narrow OR the primary input is touch. The touch check catches large
// phones, foldables, and phones in landscape that a width-only check would miss.
const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, []);

  return !!isMobile;
}
