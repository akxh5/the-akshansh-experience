import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PoemCard } from "@/components/PoemCard";
import { getAllPoems, type Mood, type Poem } from "@/data/poems";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FILTERS: ("ALL" | Mood)[] = ["ALL", "LONGING", "LOVE", "ABSENCE", "SOLITUDE", "INSOMNIA", "MELANCHOLY", "CATHARSIS", "NOSTALGIA", "DEVOTION", "WONDER", "HOPE", "PHILOSOPHY", "RESILIENCE", "INTROSPECTION", "TIME", "MEMORY", "WARMTH"];

export const Route = createFileRoute("/poems/")({
  loader: () => {
    const poems = getAllPoems();
    return { poems };
  },
  head: () => ({
    meta: [
      { title: "Poems — The Akshansh Experience" },
      { name: "description", content: "An archive of atmospheric poetry. Filter by emotional state — grief, numbness, longing, insomnia, catharsis, memory, absence." },
      { property: "og:title", content: "Poems — The Akshansh Experience" },
      { property: "og:description", content: "An archive of atmospheric poetry by Akshansh." },
    ],
  }),
  component: PoemsArchive,
});

function PoemsArchive() {
  const { poems } = Route.useLoaderData();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const filtered = filter === "ALL" ? poems : poems.filter((p) => p.mood.includes(filter as Mood));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container-reading pt-24">
        <header className="max-w-3xl">
          <h1 className="text-display-md italic text-[var(--text-primary)]">Poems</h1>
          <p className="mt-6 text-body-standard italic text-[var(--text-secondary)]">
            An archive of small weathers. Read them slowly, in any order — the order is yours.
          </p>
        </header>

        <div className="mt-20">
          <span className="text-label-caps text-[var(--text-muted)] opacity-50 tracking-[0.2em] text-[10px]">
            Browse by Mood
          </span>
          <div className="mt-6 flex flex-wrap gap-3 pb-8 border-b border-[var(--border)]">
            {FILTERS.map((f) => {
              const active = filter === f;
              const hasItems = f === "ALL" || poems.some(p => p.mood.includes(f as Mood));
              
              if (!hasItems) return null;

              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "text-label-caps px-5 py-2.5 border transition-all duration-300 rounded-none text-[11px]",
                    active 
                      ? "border-[var(--border-bright)] text-[var(--text-primary)] bg-[var(--bg-surface)] scale-[1.02]" 
                      : "border-[var(--border)] text-[var(--text-muted)] bg-transparent hover:border-[var(--border-bright)] hover:text-[var(--text-secondary)]"
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
          {filtered.map((p, i) => (
            <PoemCard key={p.slug} poem={p} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
