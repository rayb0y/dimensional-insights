import { useState, type CSSProperties } from "react";
import resumeAsset from "@/assets/resume.pdf.asset.json";

// The file itself lives in the app's storage; the pointer JSON below carries its
// URL. Filename controls what the downloaded file is called.
const FILENAME = "Amal Ray - Resume.pdf";

type Props = {
  style: CSSProperties;
};

export function ResumeButton({ style }: Props) {
  const [busy, setBusy] = useState(false);

  const download = async () => {
    setBusy(true);
    try {
      // Fetch then save so the browser downloads the file instead of opening
      // it in a tab, and saves it under the name above.
      const res = await fetch(resumeAsset.url);
      if (!res.ok) throw new Error(`resume request failed: ${res.status}`);
      const href = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = href;
      a.download = FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(href), 10000);
    } catch {
      // If saving is blocked (private mode, blocked popups), just open it.
      window.open(resumeAsset.url, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" onClick={download} disabled={busy} style={style}>
      {busy ? "Preparing" : "Download Resume ↓"}
    </button>
  );
}
