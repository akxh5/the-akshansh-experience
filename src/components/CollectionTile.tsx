import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Collection } from "@/lib/poems";
import { poemsByCollection } from "@/lib/poems";

interface Props {
  collection: Collection;
  tall?: boolean;
  index?: number;
}

export function CollectionTile({ collection, tall = false, index = 0 }: Props) {
  const count = poemsByCollection(collection.slug).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="relative group overflow-hidden border border-[var(--border)] transition-colors duration-300 hover:border-[var(--border-bright)]"
      style={{
        backgroundColor: "var(--bg-surface-low)",
        backgroundImage: `radial-gradient(ellipse at 30% 20%, ${collection.wash} 0%, transparent 65%), radial-gradient(ellipse at 80% 90%, ${collection.wash} 0%, transparent 55%)`,
        height: tall ? 320 : 220,
      }}
    >
      <Link
        to="/collections/$slug"
        params={{ slug: collection.slug }}
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
      >
        <h3 className="text-headline-lg text-[var(--text-primary)]">{collection.name}</h3>
        <span className="mt-3 text-label-caps text-[var(--text-muted)]">{count} Poems</span>
        <p className="mt-6 max-w-sm text-body-standard italic text-[var(--text-secondary)] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {collection.excerpt}
        </p>
      </Link>
    </motion.div>
  );
}
