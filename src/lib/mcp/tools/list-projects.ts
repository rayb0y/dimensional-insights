import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { layers } from "@/components/portfolio/data";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description:
    "List every layer of Amal Ray's portfolio cube — each layer's id, label, eyebrow, title, and tags.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = layers.map((l) => ({
      id: l.id,
      label: l.label,
      eyebrow: l.eyebrow,
      title: l.title,
      tags: l.tags,
      variant: l.variant ?? "default",
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items },
    };
  },
});

// silence unused import in schema builder
void z;
