import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { layers } from "@/components/portfolio/data";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Return Amal Ray's contact details (email, LinkedIn, location).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = layers.find((l) => l.variant === "contact") ?? null;
    const payload = {
      name: "Amal Ray",
      email: "amalr@andrew.cmu.edu",
      linkedin: "https://www.linkedin.com/in/amal-ray-577a69175/",
      location: "Pittsburgh",
      tagline: contact?.tagline ?? "What's next?",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});

void z;
