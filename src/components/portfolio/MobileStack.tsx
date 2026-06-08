import { layers } from "./data";

type Props = {
  onOpen: (id: string) => void;
};

export function MobileStack({ onOpen }: Props) {
  return (
    <div className="mx-auto max-w-xl space-y-4 px-5 py-12" id="work">
      {layers.map((layer, i) => (
        <button
          key={layer.id}
          type="button"
          onClick={() => onOpen(layer.id)}
          className="block w-full rounded-xl p-6 text-left"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderTop: `3px solid ${layer.accent}`,
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
            {String(i).padStart(2, "0")}
          </div>
          <div className="mt-2 font-serif text-2xl text-text-primary">{layer.label}</div>
          {layer.eyebrow && (
            <div className="mt-2 text-xs text-text-muted">{layer.eyebrow}</div>
          )}
        </button>
      ))}
    </div>
  );
}
