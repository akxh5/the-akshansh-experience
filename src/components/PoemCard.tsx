import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Poem } from "@/data/poems";
import { formatPoemDate } from "@/lib/utils";

export function PoemCard({ poem, index = 0 }: { poem: Poem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        to="/poems/$slug"
        params={{ slug: poem.slug }}
        className="block h-full p-8 border border-[var(--border)] bg-[var(--bg-surface)] transition-colors duration-300 hover:bg-[var(--bg-surface-high)] hover:border-[var(--border-bright)] rounded-none"
      >
        <div className="flex flex-col h-full gap-6">
          <span className="text-label-caps text-[var(--accent)] tracking-[0.2em] text-[10px]">
            {poem.mood.join(" · ")}
          </span>
          <h3 className="text-headline-lg text-[var(--text-primary)]">{poem.title}</h3>
          <p className="text-body-standard italic text-[var(--text-secondary)] flex-1">
            {poem.excerpt}
          </p>
          <div className="flex items-end justify-between pt-6 border-t border-[var(--border)] mt-auto">
            <span className="text-label-caps text-[var(--text-muted)]">by {poem.author}</span>
            <span className="text-label-caps text-[var(--text-muted)]">{formatPoemDate(poem.date)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
