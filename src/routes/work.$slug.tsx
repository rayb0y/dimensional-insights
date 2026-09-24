import { createFileRoute, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/components/portfolio/caseStudies";
import { CaseStudyPage } from "@/components/portfolio/CaseStudyPage";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = caseStudies[params.slug];
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study;
    if (!study) return { meta: [{ title: "Case study · Amal Ray" }] };
    const title = `${study.title} · Case study · Amal Ray`;
    return {
      meta: [
        { title },
        { name: "description", content: study.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: study.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: CaseStudyRoute,
});

function CaseStudyRoute() {
  const { study } = Route.useLoaderData();
  return <CaseStudyPage study={study} />;
}
