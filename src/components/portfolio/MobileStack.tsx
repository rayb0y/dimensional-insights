import { layers } from "./data";

type Props = {
  onOpen: (id: string) => void;
};

export function MobileStack({ onOpen }: Props) {
  const intro = layers[0];
  const projects = layers.slice(1);

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: "#07070f", WebkitOverflowScrolling: "touch" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0"
        style={{
          width: "150vw",
          height: "150vw",
          transform: "translate(-50%, -46%)",
          background:
            "radial-gradient(circle at center, rgba(255,204,51,0.26) 0%, rgba(255,204,51,0.07) 34%, transparent 62%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-md px-5 pb-24 pt-16">
        {/* Hero */}
        <button
          type="button"
          onClick={() => onOpen(intro.id)}
          className="block w-full text-left"
          style={{ marginBottom: 44 }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 42,
              letterSpacing: "-0.01em",
              color: "#f0ede8",
              lineHeight: 1,
            }}
          >
            Amal Ray
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 21,
              color: "rgba(240,237,232,0.6)",
              marginTop: 12,
            }}
          >
            What's next?
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.62,
              color: "rgba(240,237,232,0.72)",
              marginTop: 20,
            }}
          >
            {intro.paragraphs[0]}
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.5)",
              marginTop: 20,
            }}
          >
            About &amp; contact ↗
          </div>
        </button>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.4)",
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Selected work
        </div>

        <div className="flex flex-col" style={{ gap: 12 }}>
          {projects.map((layer, i) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => onOpen(layer.id)}
              className="block w-full text-left"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderLeft: `3px solid ${layer.accent}`,
                borderRadius: 14,
                padding: "18px 18px",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ gap: 12 }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(240,237,232,0.72)",
                  }}
                >
                  {layer.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "rgba(240,237,232,0.35)",
                    flex: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  lineHeight: 1.22,
                  color: "#f0ede8",
                  marginTop: 10,
                }}
              >
                {layer.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
