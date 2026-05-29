import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PoemCard } from "@/components/PoemCard";
import { poems, type Mood } from "@/lib/poems";

const FILTERS: ("ALL" | Mood)[] = ["ALL", "SOLITUDE", "LONGING", "DISTANCE", "INSOMNIA", "WINTER"];

export const Route = createFileRoute("/poems/")({
  head: () => ({
    meta: [
      { title: "Poems — The Akshansh Experience" },
      { name: "description", content: "An archive of atmospheric poetry. Filter by mood — solitude, longing, distance, insomnia, winter." },
      { property: "og:title", content: "Poems — The Akshansh Experience" },
      { property: "og:description", content: "An archive of atmospheric poetry by Akshansh." },
    ],
  }),
  component: PoemsArchive,
});

function PoemsArchive() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const filtered = filter === "ALL" ? poems : poems.filter((p) => p.moods.includes(filter));

  return (
    <div className="container-reading pt-24 pb-16">
      <header className="max-w-3xl">
        <h1 className="text-display-md text-[var(--text-primary)]">Poems</h1>
        <p className="mt-6 text-body-standard italic text-[var(--text-secondary)]">
          An archive of small weathers. Read them slowly, in any order — the order is yours.
        </p>
      </header>

      <div className="mt-16 flex flex-wrap gap-3 pb-10 border-b border-[var(--border)]">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-label-caps px-4 py-2 border transition-colors duration-200 rounded-[4px]"
              style={{
                borderColor: active ? "var(--border-bright)" : "var(--border)",
                color: active ? "var(--text-primary)" : "var(--text-muted)",
                backgroundColor: active ? "var(--bg-surface)" : "transparent",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {filtered.map((p, i) => (
          <PoemCard key={p.slug} poem={p} index={i} />
        ))}
      </div>
    </div>
  );
}
