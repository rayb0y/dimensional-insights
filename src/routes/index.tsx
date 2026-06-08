import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amal Ray — Product · Design · Technology" },
      {
        name: "description",
        content:
          "Layered cube portfolio of Amal Ray. Scroll to turn the cube; click any layer to read the work.",
      },
      { property: "og:title", content: "Amal Ray — Product · Design · Technology" },
      {
        property: "og:description",
        content: "A layered cube portfolio. Scroll to turn it. Click any layer to read.",
      },
    ],
  }),
  component: Portfolio,
});
