import { createFileRoute, notFound } from "@tanstack/react-router";
import { PoemCard } from "@/components/PoemCard";
import { getCollection, poemsByCollection } from "@/lib/poems";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection, poems: poemsByCollection(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.collection.name} — Collection` },
          { name: "description", content: loaderData.collection.description },
          { property: "og:title", content: `${loaderData.collection.name} — Akshansh` },
          { property: "og:description", content: loaderData.collection.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-reading py-32 text-center">
      <h1 className="text-display-md">Collection not found.</h1>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-reading py-32 text-center">
      <h1 className="text-display-md">A small collapse.</h1>
      <p className="text-body-standard italic text-[var(--text-muted)] mt-4">{error.message}</p>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection, poems } = Route.useLoaderData();
  return (
    <div className="container-reading pt-24 pb-16">
      <header
        className="border border-[var(--border)] px-10 py-20 text-center"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 20%, ${collection.wash} 0%, transparent 65%), radial-gradient(ellipse at 80% 90%, ${collection.wash} 0%, transparent 55%)`,
          backgroundColor: "var(--bg-surface-low)",
        }}
      >
        <span className="text-label-caps text-[var(--text-muted)]">Collection</span>
        <h1 className="text-display-lg mt-6 text-[var(--text-primary)]">{collection.name}</h1>
        <p className="mt-8 max-w-2xl mx-auto text-body-standard italic text-[var(--text-secondary)]">
          {collection.description}
        </p>
      </header>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {poems.map((p: ReturnType<typeof poemsByCollection>[number], i: number) => (
          <PoemCard key={p.slug} poem={p} index={i} />
        ))}
      </div>
    </div>
  );
}
