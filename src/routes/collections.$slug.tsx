import { createFileRoute, notFound } from "@tanstack/react-router";
import { PoemCard } from "@/components/PoemCard";
import { collections, getPoemsByCollection } from "@/data/poems";
import { motion } from "framer-motion";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = collections.find(c => c.slug === params.slug);
    if (!collection) throw notFound();
    const poems = getPoemsByCollection(params.slug);
    return {
      collection,
      poems,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.collection.name} — Akshansh` },
          { name: "description", content: loaderData.collection.description },
          { property: "og:title", content: loaderData.collection.name },
          { property: "og:description", content: loaderData.collection.description },
        ]
      : [],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection, poems } = Route.useLoaderData();
  const washVar = `var(--wash-${collection.slug})`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container-reading pt-24">
        <header
          className="border border-[var(--border)] px-10 py-20 text-center"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 20%, ${washVar} 0%, transparent 65%), radial-gradient(ellipse at 80% 90%, ${washVar} 0%, transparent 55%)`,
            backgroundColor: "var(--bg-surface-low)",
          }}
        >
          <span className="text-label-caps text-[var(--text-muted)]">Collection</span>
          <h1 className="text-display-lg mt-6 text-[var(--text-primary)]">{collection.name}</h1>
          <p className="mt-8 max-w-2xl mx-auto text-body-standard italic text-[var(--text-secondary)]">
            {collection.description}
          </p>
        </header>

        <div className="mt-32 grid gap-8 grid-cols-1 md:grid-cols-2">
          {poems.map((p, i) => (
            <PoemCard key={p.slug} poem={p} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
