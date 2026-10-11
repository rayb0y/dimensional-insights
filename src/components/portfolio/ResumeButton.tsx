import type { CSSProperties } from "react";
import resumeAsset from "@/assets/resume.pdf.asset.json";

// The file itself lives in the app's storage; the pointer JSON below carries its
// URL. A plain anchor with the download attribute is the most reliable way to
// save the file: no script, no popup blockers, works everywhere.
const FILENAME = "Amal Ray - Resume.pdf";

type Props = {
  style: CSSProperties;
};

export function ResumeButton({ style }: Props) {
  return (
    <a href={resumeAsset.url} download={FILENAME} style={style}>
      Download Resume ↓
    </a>
  );
}
