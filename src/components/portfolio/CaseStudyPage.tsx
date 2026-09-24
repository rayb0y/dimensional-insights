import { Link } from "@tanstack/react-router";
import { useEffect, type CSSProperties } from "react";
import { Grain } from "./Grain";
import { caseStudies, type Block, type CaseStudy, type ImageRef } from "./caseStudies";

const INK = "#f0ede8";
const INK_2 = "rgba(240,237,232,0.88)";
const INK_3 = "rgba(240,237,232,0.55)";
const LINE = "rgba(255,255,255,0.12)";
const BG = "#07070f";
const DISPLAY = "'Syne', sans-serif";
const BODY = "'Space Grotesk', sans-serif";

const linkBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 22px",
  border: "1px solid rgba(255,255,255,0.35)",
  fontFamily: BODY,
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.05em",
  color: INK,
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
};

const eyebrowStyle: CSSProperties = {
  fontFamily: BODY,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: INK_3,
};

const para: CSSProperties = {
  margin: 0,
  fontFamily: BODY,
  fontWeight: 300,
  fontSize: 18,
  lineHeight: 1.72,
  color: INK_2,
};


function Img({ img }: { img: ImageRef }) {
  return (
    <figure style={{ margin: 0 }}>
      <a href={img.src} target="_blank" rel="noreferrer" aria-label={`Open full size: ${img.alt}`}>
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          style={{ display: "block", width: "100%", height: "auto", border: `1px solid ${LINE}` }}
        />
      </a>
      {img.caption && <figcaption className="cs-caption">{img.caption}</figcaption>}
    </figure>
  );
}

function BlockView({ block, accent }: { block: Block; accent: string }) {
  switch (block.type) {
    case "p":
      return <p style={para}>{block.text}</p>;

    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((item, i) => (
            <li key={i} style={para}>
              <span aria-hidden className="cs-bullet" style={{ background: accent }} />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote style={{ margin: 0, paddingLeft: 22, borderLeft: `2px solid ${accent}` }}>
          <p
            style={{
              margin: 0,
              fontFamily: BODY,
              fontWeight: 300,
              fontSize: 22,
              lineHeight: 1.5,
              color: INK,
            }}
          >
            “{block.text}”
          </p>
          <footer style={{ ...eyebrowStyle, marginTop: 12 }}>{block.cite}</footer>
        </blockquote>
      );

    case "callout":
      return (
        <div
          style={{
            padding: "22px 24px",
            borderLeft: `2px solid ${accent}`,
            background: `${accent}12`,
            fontFamily: BODY,
            fontWeight: 400,
            fontSize: 19,
            lineHeight: 1.6,
            color: INK,
          }}
        >
          {block.text}
        </div>
      );

    case "stats":
      return (
        <div className="cs-stats">
          {block.items.map((s) => (
            <div key={s.label} style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 48,
                  lineHeight: 1,
                  color: accent,
                }}
              >
                {s.value}
              </div>
              <div style={{ ...para, fontSize: 15, lineHeight: 1.5, marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="cs-steps">
          {block.items.map((s, i) => (
            <li key={i} className="cs-step">
              <span aria-hidden className="cs-step-dot" style={{ borderColor: accent }} />
              <div style={{ ...eyebrowStyle, color: accent }}>{s.label}</div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 600,
                  fontSize: 22,
                  color: INK,
                  margin: "6px 0 6px",
                }}
              >
                {s.title}
              </div>
              <p style={{ ...para, fontSize: 16 }}>{s.text}</p>
            </li>
          ))}
        </ol>
      );

    case "cards":
      return (
        <div className={block.items.length === 4 ? "cs-cards cs-cards-2" : "cs-cards"}>
          {block.items.map((c) => (
            <div key={c.title} style={{ border: `1px solid ${LINE}`, padding: "20px 20px 22px" }}>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 600,
                  fontSize: 20,
                  color: accent,
                  marginBottom: 8,
                }}
              >
                {c.title}
              </div>
              <p style={{ ...para, fontSize: 15, lineHeight: 1.6 }}>{c.text}</p>
            </div>
          ))}
        </div>
      );

    case "compare":
      return (
        <div className="cs-compare">
          {[block.left, block.right].map((col, ci) => (
            <div key={col.title} style={{ border: `1px solid ${LINE}`, padding: "20px 22px" }}>
              <div style={{ ...eyebrowStyle, color: ci === 0 ? accent : INK_3, marginBottom: 14 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                {col.items.map((item) => (
                  <li key={item} style={{ ...para, fontSize: 15, lineHeight: 1.55, display: "flex", gap: 10 }}>
                    <span aria-hidden style={{ color: ci === 0 ? accent : INK_3, flex: "none" }}>
                      {ci === 0 ? "+" : "–"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "figure":
      if (!block.src) return null;
      return <Img img={{ src: block.src, alt: block.alt, caption: block.caption }} />;

    case "gallery":
      if (block.images.length === 0) return null;
      return (
        <div className="cs-gallery">
          {block.images.map((img) => (
            <Img key={img.src} img={img} />
          ))}
        </div>
      );

    case "doc":
      if (!block.href) return null;
      return (
        <div style={{ border: `1px solid ${LINE}` }}>
          <a
            href={block.href}
            target="_blank"
            rel="noreferrer"
            className="cs-doc"
            style={{ display: "flex", gap: 18, alignItems: "center", padding: "18px 20px", textDecoration: "none" }}
          >
            <span
              style={{
                ...eyebrowStyle,
                color: accent,
                border: `1px solid ${accent}66`,
                padding: "6px 8px",
                flex: "none",
              }}
            >
              {block.kind ?? "Doc"}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontFamily: BODY, fontWeight: 500, fontSize: 16, color: INK }}>
                {block.title}
              </span>
              {block.description && (
                <span style={{ display: "block", ...para, fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>
                  {block.description}
                </span>
              )}
            </span>
            <span aria-hidden style={{ color: INK_3, flex: "none" }}>
              ↗
            </span>
          </a>
          {block.preview && block.kind === "PDF" && (
            <iframe
              src={block.href}
              title={block.title}
              loading="lazy"
              className="cs-pdf"
              style={{ display: "block", width: "100%", height: 560, border: 0, borderTop: `1px solid ${LINE}` }}
            />
          )}
        </div>
      );

    case "embed":
      if (!block.src) return null;
      return (
        <figure style={{ margin: 0 }}>
          <div style={{ position: "relative", aspectRatio: block.ratio ?? "16 / 9", border: `1px solid ${LINE}` }}>
            <iframe
              src={block.src}
              title={block.title}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
          {block.caption && <figcaption className="cs-caption">{block.caption}</figcaption>}
        </figure>
      );

    case "video":
      if (!block.src) return null;
      return (
        <figure style={{ margin: 0 }}>
          <video
            src={block.src}
            poster={block.poster}
            controls
            playsInline
            preload="metadata"
            style={{ display: "block", width: "100%", border: `1px solid ${LINE}` }}
          />
          {block.caption && <figcaption className="cs-caption">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const accent = study.accent;
  const next = caseStudies[study.next];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: BG, color: INK, overflowX: "hidden" }}>
      <style>{`
        .cs-wrap ::selection{background:${accent};color:${BG}}
        .cs-caption{margin-top:10px;font-family:${BODY};font-size:13px;line-height:1.5;color:${INK_3}}
        .cs-list{list-style:none;margin:0;padding:0;display:grid;gap:12px}
        .cs-list li{position:relative;padding-left:22px}
        .cs-bullet{position:absolute;left:0;top:.72em;width:6px;height:6px;border-radius:999px}
        .cs-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .cs-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .cs-cards-2{grid-template-columns:repeat(2,minmax(0,1fr))}
        .cs-compare{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
        .cs-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
        .cs-steps{list-style:none;margin:0;padding:0 0 0 26px;border-left:1px solid ${LINE};display:grid;gap:28px}
        .cs-step{position:relative}
        .cs-step-dot{position:absolute;left:-33px;top:2px;width:13px;height:13px;border-radius:999px;border:2px solid;background:${BG}}
        .cs-doc:hover{background:rgba(255,255,255,0.03)}
        .cs-toc a{color:${INK_3};text-decoration:none;transition:color .2s ease}
        .cs-toc a:hover,.cs-toc a:focus-visible{color:${accent}}
        .cs-wrap a:focus-visible,.cs-wrap button:focus-visible{outline:2px solid ${accent};outline-offset:3px}
        .cs-body{display:grid;grid-template-columns:minmax(0,1fr);gap:0}
        .cs-toc{display:none}
        .cs-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 20px}
        @media (min-width:900px){.cs-meta{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media (min-width:1180px){
          .cs-body{grid-template-columns:180px minmax(0,760px);gap:64px}
          .cs-toc{display:block;position:sticky;top:96px;align-self:start}
        }
        @media (max-width:640px){
          .cs-stats,.cs-cards,.cs-compare,.cs-gallery{grid-template-columns:minmax(0,1fr)}
          .cs-pdf{display:none !important}
        }
      `}</style>
      <Grain />

      <div className="cs-wrap relative" style={{ maxWidth: 1040, margin: "0 auto", padding: "0 20px" }}>
        <nav style={{ padding: "28px 0 0" }}>
          <Link to="/" style={{ ...eyebrowStyle, textDecoration: "none", color: INK_3 }}>
            ← Back to work
          </Link>
        </nav>

        <header style={{ padding: "56px 0 40px", maxWidth: 860 }}>
          <div style={{ ...eyebrowStyle, display: "flex", alignItems: "center" }}>
            <span
              aria-hidden
              style={{ width: 6, height: 6, borderRadius: 999, background: accent, marginRight: 12, flex: "none" }}
            />
            {study.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(38px, 6.4vw, 72px)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              margin: "18px 0 22px",
              textWrap: "balance",
            }}
          >
            {study.title}
          </h1>
          <p style={{ ...para, fontSize: 20, lineHeight: 1.6, color: INK, maxWidth: "58ch" }}>{study.summary}</p>

          {study.links.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              {study.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={linkBtn}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {l.label} →
                </a>
              ))}
            </div>
          )}
        </header>

        <dl className="cs-meta" style={{ margin: 0, padding: "24px 0", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          {study.meta.map((m) => (
            <div key={m.label}>
              <dt style={eyebrowStyle}>{m.label}</dt>
              <dd style={{ margin: "6px 0 0", fontFamily: BODY, fontSize: 15, lineHeight: 1.5, color: INK }}>{m.value}</dd>
            </div>
          ))}
        </dl>

        {study.hero && (
          <div style={{ marginTop: 40 }}>
            <BlockView block={study.hero} accent={accent} />
          </div>
        )}

        <div className="cs-body" style={{ marginTop: 64 }}>
          <aside className="cs-toc" aria-label="On this page">
            <div style={{ ...eyebrowStyle, marginBottom: 14 }}>On this page</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
              {study.sections.map((s) => (
                <li key={s.id} style={{ fontFamily: BODY, fontSize: 14 }}>
                  <a href={`#${s.id}`}>{s.heading}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article>
            {study.sections.map((s, i) => (
              <section key={s.id} id={s.id} style={{ scrollMarginTop: 32, marginBottom: 72 }}>
                <div style={{ ...eyebrowStyle, color: accent }}>{String(i + 1).padStart(2, "0")}</div>
                <h2
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontSize: "clamp(26px, 3.4vw, 36px)",
                    lineHeight: 1.1,
                    margin: "8px 0 24px",
                  }}
                >
                  {s.heading}
                </h2>
                <div style={{ display: "grid", gap: 24 }}>
                  {s.blocks.map((b, bi) => (
                    <BlockView key={bi} block={b} accent={accent} />
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>

        <footer style={{ borderTop: `1px solid ${LINE}`, padding: "40px 0 64px" }}>
          {next && (
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              style={{ display: "block", textDecoration: "none", color: INK, marginBottom: 40 }}
            >
              <div style={eyebrowStyle}>Next case study</div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: "clamp(24px, 3.4vw, 36px)",
                  lineHeight: 1.1,
                  marginTop: 10,
                }}
              >
                {next.title} →
              </div>
            </Link>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="mailto:amalr@andrew.cmu.edu" style={linkBtn}>
              amalr@andrew.cmu.edu
            </a>
            <a href="https://www.linkedin.com/in/amal-ray-577a69175/" target="_blank" rel="noreferrer" style={linkBtn}>
              LinkedIn
            </a>
            <Link to="/" style={linkBtn}>
              All work
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
