import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amal Ray · Product · Design · Technology" },
      {
        name: "description",
        content:
          "What's next? Scroll to turn the cube; click any layer to read the work.",
      },
      { property: "og:title", content: "Amal Ray · Product · Design · Technology" },
      {
        property: "og:description",
        content: "What's next? Scroll to turn the cube; click any layer to read the work.",
      },
    ],
  }),
  component: Portfolio,
});
