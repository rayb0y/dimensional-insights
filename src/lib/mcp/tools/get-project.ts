import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { layers } from "@/components/portfolio/data";

export default defineTool({
  name: "get_project",
  title: "Get portfolio project",
  description:
    "Return the full contents of one portfolio layer by id — eyebrow, title, paragraphs, insight, tags, and any watch/award info.",
  inputSchema: {
    id: z
      .string()
      .min(1)
      .describe("The layer id, e.g. 'intro', 'ai-facilitation', 'contact'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) {
      return {
        content: [
          {
            type: "text",
            text: `No project with id "${id}". Call list_projects to see available ids.`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(layer, null, 2) }],
      structuredContent: { project: layer },
    };
  },
});
