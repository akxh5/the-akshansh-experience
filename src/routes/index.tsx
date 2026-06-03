import { createFileRoute } from "@tanstack/react-router";
import { getFeaturedPoem } from "@/data/poems";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  loader: () => {
    const featured = getFeaturedPoem();
    return { featured };
  },
  head: () => ({
    meta: [
      { title: "The Akshansh Experience — Writing as Presence" },
      { name: "description", content: "Atmospheric poetry by Akshansh. A curated literary world where writing is experienced as emotional presence." },
      { property: "og:title", content: "The Akshansh Experience" },
      { property: "og:description", content: "Writing as presence, not content." },
    ],
  }),
  component: Index,
});

function Index() {
  const { featured } = Route.useLoaderData();
  return <Hero excerpt={featured?.excerpt} slug={featured?.slug} />;
}
