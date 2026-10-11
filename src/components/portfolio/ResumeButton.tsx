import type { CSSProperties, MouseEvent } from "react";
import resumeAsset from "@/assets/resume.pdf.asset.json";

// On the live site the anchor's download attribute saves the file directly.
// Inside an embedded frame (like the editor preview) browsers often block
// downloads silently, so there we open the PDF in a new tab instead.
const FILENAME = "Amal Ray - Resume.pdf";

type Props = {
  style: CSSProperties;
};

function inFrame() {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function ResumeButton({ style }: Props) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (inFrame()) {
      e.preventDefault();
      window.open(resumeAsset.url, "_blank", "noopener");
    }
  };
  return (
    <a
      href={resumeAsset.url}
      download={FILENAME}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      style={style}
    >
      Download Resume ↓
    </a>
  );
}
