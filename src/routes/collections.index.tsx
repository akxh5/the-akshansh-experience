import { createFileRoute } from "@tanstack/react-router";
import { CollectionTile } from "@/components/CollectionTile";
import { collections } from "@/data/poems";
import { motion } from "framer-motion";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Archives of Solitude — Collections" },
      { name: "description", content: "Curated collections of atmospheric poetry — Winter, Collapse, Distance, Midnight." },
      { property: "og:title", content: "Archives of Solitude" },
      { property: "og:description", content: "Curated collections of atmospheric poetry." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container-reading pt-24">
        <header className="max-w-3xl mb-24">
          <h1 className="text-display-md italic text-[var(--text-primary)]">Archives of Solitude</h1>
          <p className="mt-6 text-body-standard italic text-[var(--text-secondary)]">
            Each collection is a season of feeling — gathered, not arranged. Enter slowly. The cold here is intentional.
          </p>
        </header>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
          {collections.map((c, i) => (
            <div key={c.slug} className="h-[240px] md:h-[auto]">
              <CollectionTile collection={c} index={i} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
