import { defineMcp } from "@lovable.dev/mcp-js";

import getContactTool from "./tools/get-contact";
import getProjectTool from "./tools/get-project";
import listProjectsTool from "./tools/list-projects";

export default defineMcp({
  name: "amal-ray-portfolio",
  title: "Amal Ray Portfolio",
  version: "0.1.0",
  instructions:
    "Read Amal Ray's portfolio. Use list_projects to see every layer of the cube, get_project to read the full copy for one layer, and get_contact for contact details.",
  tools: [listProjectsTool, getProjectTool, getContactTool],
});
