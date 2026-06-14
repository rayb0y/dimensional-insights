import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Grain } from "../components/portfolio/Grain";

export const Route = createFileRoute("/context")({
  component: ContextGame,
  head: () => ({
    meta: [
      { title: "CONTEXT — A game by Amal Ray" },
      {
        name: "description",
        content:
          "CONTEXT is a game that teaches how language models work by making you live inside one. Spend tokens. Lose memories. Keep telling the story.",
      },
    ],
  }),
});

type BeatType = "Introduction" | "Turn" | "Revelation" | "Loss";
type Card = { id: string; type: BeatType; text: string; forgotten: boolean };
type Phase = "setup" | "playing" | "forgetting" | "ended";

const BEAT_COLOURS: Record<BeatType, string> = {
  Introduction: "#96e040",
  Turn: "#38b6ff",
  Revelation: "#ffcc33",
  Loss: "#ff5c2e",
};
const BEAT_COSTS: Record<BeatType, number> = {
  Introduction: 1,
  Turn: 2,
  Revelation: 3,
  Loss: 3,
};
const BEAT_ORDER: BeatType[] = ["Introduction", "Turn", "Revelation", "Loss"];

const SEEDS = [
  "A cartographer discovers her maps are wrong.",
  "The last train leaves at noon.",
  "He found the letter after the funeral.",
  "She had been awake for forty hours.",
  "The city was quiet in a way that meant something.",
];

const eyebrow: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(240,237,232,0.5)",
};

function ContextGame() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [seed, setSeed] = useState("");
  const [startingTokens, setStartingTokens] = useState(4);
  const [tokensRemaining, setTokensRemaining] = useState(4);
  const [cards, setCards] = useState<Card[]>([]);
  const [forgettingBeats, setForgettingBeats] = useState(0);
  const [selectedBeat, setSelectedBeat] = useState<BeatType>("Introduction");
  const [beatText, setBeatText] = useState("");
  const [reflection, setReflection] = useState<{ shape?: string; effect?: string }>(
    {}
  );
  const contextRef = useRef<HTMLDivElement>(null);

  // Auto-scroll right on new card
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.scrollTo({
        left: contextRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [cards.length]);

  // Keyboard shortcuts 1-4 for beat type
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const idx = parseInt(e.key, 10);
      if (idx >= 1 && idx <= 4) setSelectedBeat(BEAT_ORDER[idx - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const begin = () => {
    if (seed.trim().length < 5) return;
    setTokensRemaining(startingTokens);
    setCards([]);
    setForgettingBeats(0);
    setPhase("playing");
  };

  const reset = () => {
    setPhase("setup");
    setSeed("");
    setBeatText("");
    setCards([]);
    setForgettingBeats(0);
    setReflection({});
  };

  const playBeat = () => {
    const text = beatText.trim();
    if (!text) return;
    const cost = BEAT_COSTS[selectedBeat];
    const inForgettingMode = tokensRemaining === 0;
    if (!inForgettingMode && tokensRemaining < cost) return;

    const newCard: Card = {
      id: crypto.randomUUID(),
      type: selectedBeat,
      text,
      forgotten: false,
    };
    setCards((c) => [...c, newCard]);
    setBeatText("");

    if (inForgettingMode) {
      setPhase("forgetting");
    } else {
      setTokensRemaining((t) => t - cost);
    }
  };

  const forgetCard = (id: string) => {
    if (phase !== "forgetting") return;
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, forgotten: true } : c)));
    const nextCount = forgettingBeats + 1;
    setForgettingBeats(nextCount);
    if (nextCount >= 3) setPhase("ended");
    else setPhase("playing");
  };

  const passEnd = () => setPhase("ended");

  // ---- Setup screen ----
  if (phase === "setup") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#07070f",
          color: "#f0ede8",
          position: "relative",
        }}
      >
        <Grain />
        <Link
          to="/"
          style={{
            position: "fixed",
            top: 20,
            left: 24,
            ...eyebrow,
            textTransform: "none",
            letterSpacing: "0.03em",
            fontSize: 13,
            color: "rgba(240,237,232,0.5)",
            textDecoration: "none",
            zIndex: 10,
          }}
        >
          ← Back
        </Link>

        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: "80px 24px 60px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            CONTEXT
          </h1>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(240,237,232,0.5)",
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            You are a language model with a fixed context window. Spend tokens to add beats
            to a story. When the tokens run out you keep playing — but every new beat now
            costs a memory, and you choose what to forget.
          </p>

          <Divider />

          <div style={{ ...eyebrow, marginBottom: 12 }}>Opening Sentence</div>
          <textarea
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Begin the story…"
            rows={4}
            maxLength={120}
            style={{
              width: "100%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 8,
              padding: "14px 16px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "#f0ede8",
              resize: "none",
              outline: "none",
            }}
          />
          <div
            style={{
              textAlign: "right",
              marginTop: 4,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              color: "rgba(240,237,232,0.4)",
            }}
          >
            {seed.length}/120
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 12,
            }}
          >
            {SEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeed(s)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: "6px 14px",
                  background: "transparent",
                  color: "rgba(240,237,232,0.75)",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
                }
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Divider />
            <div style={{ ...eyebrow, marginBottom: 12 }}>Starting Tokens</div>
            <select
              value={startingTokens}
              onChange={(e) => setStartingTokens(parseInt(e.target.value, 10))}
              style={{
                width: "100%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 8,
                padding: "10px 16px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                color: "#f0ede8",
                outline: "none",
              }}
            >
              {[4, 5, 6].map((n) => (
                <option key={n} value={n} style={{ background: "#07070f" }}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 32 }}>
            <Divider />
            <button
              type="button"
              onClick={begin}
              disabled={seed.trim().length < 5}
              style={{
                width: "100%",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                padding: 14,
                background: "transparent",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.1em",
                color: "#f0ede8",
                cursor: seed.trim().length < 5 ? "not-allowed" : "pointer",
                opacity: seed.trim().length < 5 ? 0.3 : 1,
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (seed.trim().length >= 5) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              BEGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- End screen ----
  if (phase === "ended") {
    return <EndScreen
      cards={cards}
      tokensRemaining={tokensRemaining}
      forgettingBeats={forgettingBeats}
      reflection={reflection}
      setReflection={setReflection}
      onReset={reset}
    />;
  }

  // ---- Playing / forgetting ----
  const inForgettingMode = tokensRemaining === 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07070f",
        color: "#f0ede8",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grain />

      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          background: "rgba(7,7,15,0.9)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link
          to="/"
          style={{
            position: "absolute",
            left: 24,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            color: "rgba(240,237,232,0.5)",
            textDecoration: "none",
          }}
        >
          ← Back
        </Link>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.08em",
          }}
        >
          CONTEXT
        </div>
      </div>

      {/* Token row */}
      <div
        style={{
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: tokensRemaining === 0 ? 0.55 : 1,
        }}
      >
        {Array.from({ length: startingTokens }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background:
                i < tokensRemaining ? "rgba(255,255,255,0.7)" : "transparent",
              border:
                i < tokensRemaining
                  ? "1px solid rgba(255,255,255,0.7)"
                  : "1px solid rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Forgetting banner */}
      {inForgettingMode && phase === "playing" && (
        <div
          style={{
            background: "rgba(255,92,46,0.08)",
            borderTop: "1px solid rgba(255,92,46,0.3)",
            borderBottom: "1px solid rgba(255,92,46,0.3)",
            padding: "10px",
            textAlign: "center",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "#ff5c2e",
            animation: "ctx-pulse 1.2s ease-in-out infinite",
          }}
        >
          FORGETTING — EACH BEAT COSTS A MEMORY
        </div>
      )}

      {phase === "forgetting" && (
        <div
          style={{
            padding: "12px 40px 0",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            color: "#ff5c2e",
          }}
        >
          Click a card to forget it
        </div>
      )}

      {/* Context window */}
      <div
        ref={contextRef}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          gap: 16,
          padding: "32px 40px",
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {/* Seed card */}
        <div style={panelStyle("rgba(255,255,255,0.2)")}>
          <div style={{ ...eyebrow, fontSize: 10 }}>Opening</div>
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: "#f0ede8",
            }}
          >
            {seed}
          </div>
        </div>

        {cards.map((c) => {
          const isForgetMode = phase === "forgetting" && !c.forgotten;
          return (
            <div
              key={c.id}
              onClick={() => forgetCard(c.id)}
              style={{
                ...panelStyle(BEAT_COLOURS[c.type]),
                cursor: isForgetMode ? "pointer" : "default",
                opacity: c.forgotten ? 0.3 : 1,
                textDecoration: c.forgotten ? "line-through" : "none",
                pointerEvents: c.forgotten ? "none" : "auto",
                borderTopColor: c.forgotten
                  ? "rgba(255,255,255,0.1)"
                  : BEAT_COLOURS[c.type],
                border: isForgetMode
                  ? "1px dashed rgba(255,92,46,0.5)"
                  : "1px solid rgba(255,255,255,0.12)",
                borderTop: `3px solid ${
                  c.forgotten ? "rgba(255,255,255,0.1)" : BEAT_COLOURS[c.type]
                }`,
                transition: "opacity 0.4s ease",
              }}
            >
              <div
                style={{
                  ...eyebrow,
                  fontSize: 10,
                  color: c.forgotten
                    ? "rgba(240,237,232,0.3)"
                    : BEAT_COLOURS[c.type],
                }}
              >
                {c.type}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "#f0ede8",
                }}
              >
                {c.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div
        style={{
          background: "rgba(7,7,15,0.95)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 40px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {BEAT_ORDER.map((b, i) => {
            const cost = BEAT_COSTS[b];
            const colour = BEAT_COLOURS[b];
            const selected = selectedBeat === b;
            const disabled = !inForgettingMode && tokensRemaining < cost && tokensRemaining > 0;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBeat(b)}
                disabled={disabled}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: `1px solid ${colour}${selected ? "" : "59"}`,
                  background: selected ? `${colour}14` : "transparent",
                  borderRadius: 6,
                  padding: "10px 16px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#f0ede8",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.3 : 1,
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <span>{b}</span>
                <span style={{ display: "inline-flex", gap: 3 }}>
                  {Array.from({ length: cost }).map((_, j) => (
                    <span
                      key={j}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: colour,
                      }}
                    />
                  ))}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: "rgba(240,237,232,0.35)",
                    marginLeft: 4,
                  }}
                >
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>

        <textarea
          value={beatText}
          onChange={(e) => setBeatText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              playBeat();
            }
          }}
          placeholder="Write the next beat…"
          maxLength={120}
          rows={1}
          style={{
            width: "100%",
            marginTop: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 8,
            padding: "12px 14px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            color: "#f0ede8",
            resize: "none",
            outline: "none",
          }}
        />
        <div
          style={{
            textAlign: "right",
            marginTop: 2,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            color: "rgba(240,237,232,0.4)",
          }}
        >
          {beatText.length}/120
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <button
            type="button"
            onClick={playBeat}
            disabled={phase === "forgetting" || !beatText.trim()}
            style={{
              border: `1px solid ${BEAT_COLOURS[selectedBeat]}`,
              background: "transparent",
              borderRadius: 8,
              padding: "10px 22px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.04em",
              color: "#f0ede8",
              cursor: "pointer",
              opacity: phase === "forgetting" || !beatText.trim() ? 0.4 : 1,
            }}
          >
            Play beat
          </button>
          <button
            type="button"
            onClick={passEnd}
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              borderRadius: 8,
              padding: "10px 22px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(240,237,232,0.6)",
              cursor: "pointer",
            }}
          >
            Pass → end story
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ctx-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function panelStyle(accent: string): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderTop: `3px solid ${accent}`,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    borderRadius: 12,
    padding: "16px 20px",
    minWidth: 220,
    maxWidth: 280,
    flexShrink: 0,
  };
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: "rgba(255,255,255,0.08)",
        margin: "0 0 32px",
      }}
    />
  );
}

function EndScreen({
  cards,
  tokensRemaining,
  forgettingBeats,
  reflection,
  setReflection,
  onReset,
}: {
  cards: Card[];
  tokensRemaining: number;
  forgettingBeats: number;
  reflection: { shape?: string; effect?: string };
  setReflection: (r: { shape?: string; effect?: string }) => void;
  onReset: () => void;
}) {
  // Build narrative: collapse runs of forgotten into one gap marker
  const narrative = useMemo(() => {
    const out: { kind: "text" | "gap"; value: string; id: string }[] = [];
    let inGap = false;
    cards.forEach((c) => {
      if (c.forgotten) {
        if (!inGap) {
          out.push({ kind: "gap", value: "[ … forgotten … ]", id: c.id });
          inGap = true;
        }
      } else {
        out.push({ kind: "text", value: c.text, id: c.id });
        inGap = false;
      }
    });
    return out;
  }, [cards]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07070f",
        color: "#f0ede8",
        position: "relative",
      }}
    >
      <Grain />
      <Link
        to="/"
        style={{
          position: "fixed",
          top: 20,
          left: 24,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          color: "rgba(240,237,232,0.5)",
          textDecoration: "none",
          zIndex: 10,
        }}
      >
        ← Back
      </Link>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 40px 60px" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "-0.02em",
            margin: 0,
            marginBottom: 32,
          }}
        >
          What the model remembers
        </h2>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.7,
            color: "#f0ede8",
          }}
        >
          {narrative.map((n) =>
            n.kind === "gap" ? (
              <span
                key={n.id}
                style={{ color: "#ff5c2e", fontStyle: "italic", margin: "0 6px" }}
              >
                {n.value}
              </span>
            ) : (
              <span key={n.id}> {n.value} </span>
            )
          )}
        </div>

        <Divider />

        <div style={{ ...eyebrow, marginBottom: 12 }}>Reflection</div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            color: "rgba(240,237,232,0.7)",
            marginBottom: 8,
          }}
        >
          Does this story have a shape?
        </div>
        <PillRow
          options={["Yes", "Partial", "No"]}
          selected={reflection.shape}
          onSelect={(v) => setReflection({ ...reflection, shape: v })}
        />

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            color: "rgba(240,237,232,0.7)",
            marginTop: 20,
            marginBottom: 8,
          }}
        >
          Did the forgetting make it stranger or just worse?
        </div>
        <PillRow
          options={["Stranger", "Worse", "Both", "Different"]}
          selected={reflection.effect}
          onSelect={(v) => setReflection({ ...reflection, effect: v })}
        />

        <div style={{ marginTop: 40 }}>
          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              paddingTop: 24,
            }}
          >
            <Stat label="Beats Played" value={cards.length} />
            <Stat label="Cards Forgotten" value={forgettingBeats} />
            <Stat label="Tokens Unspent" value={tokensRemaining} />
          </div>
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={onReset}
            style={{
              width: "100%",
              maxWidth: 320,
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 8,
              padding: 14,
              background: "transparent",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.1em",
              color: "#f0ede8",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}

function PillRow({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const isSel = selected === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onSelect(o)}
            style={{
              border: `1px solid ${isSel ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"}`,
              background: isSel ? "rgba(255,255,255,0.06)" : "transparent",
              borderRadius: 20,
              padding: "6px 16px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              color: "#f0ede8",
              cursor: "pointer",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 28,
          color: "#f0ede8",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 300,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(240,237,232,0.5)",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}
