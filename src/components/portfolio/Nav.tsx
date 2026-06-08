import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "group relative text-[13px] tracking-wide text-text-muted transition-colors hover:text-text-primary";

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "rgba(7,7,15,0.7)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-serif text-xl text-text-primary">
          Amal Ray
        </a>
        <div className="flex items-center gap-8">
          <a href="#work" className={linkClass}>
            Work
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-text-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className={linkClass}>
            About
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-text-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contact" className={linkClass}>
            Contact
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-text-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </nav>
  );
}
