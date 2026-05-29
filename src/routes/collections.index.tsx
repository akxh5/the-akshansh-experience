import { createFileRoute } from "@tanstack/react-router";
import { CollectionTile } from "@/components/CollectionTile";
import { collections } from "@/lib/poems";

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
    <div className="container-reading pt-24 pb-16">
      <header className="max-w-3xl">
        <h1 className="text-display-md italic text-[var(--text-primary)]">Archives of Solitude</h1>
        <p className="mt-6 text-body-standard italic text-[var(--text-secondary)]">
          Each collection is a season of feeling — gathered, not arranged. Enter slowly. The cold here is intentional.
        </p>
      </header>
      <div className="mt-20 grid gap-6 md:grid-cols-2">
        {collections.map((c, i) => (
          <div key={c.slug} className="[&>*]:!h-[360px]">
            <CollectionTile collection={c} tall index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
