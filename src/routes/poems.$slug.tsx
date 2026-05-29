import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getPoem, poemsByCollection, getCollection } from "@/lib/poems";
import { useState } from "react";

export const Route = createFileRoute("/poems/$slug")({
  loader: ({ params }) => {
    const poem = getPoem(params.slug);
    if (!poem) throw notFound();
    return { poem };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.poem.title} — Akshansh` },
          { name: "description", content: loaderData.poem.excerpt },
          { property: "og:title", content: loaderData.poem.title },
          { property: "og:description", content: loaderData.poem.excerpt },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-reading py-32 text-center">
      <h1 className="text-display-md">Poem not found.</h1>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-reading py-32 text-center">
      <h1 className="text-display-md">A small collapse.</h1>
      <p className="text-body-standard italic text-[var(--text-muted)] mt-4">{error.message}</p>
    </div>
  ),
  component: PoemPage,
});

function PoemPage() {
  const { poem } = Route.useLoaderData();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(34);
  const [bookmarked, setBookmarked] = useState(false);

  const collection = getCollection(poem.collection);
  const more = poemsByCollection(poem.collection).filter((p) => p.slug !== poem.slug).slice(0, 2);

  const copyLink = () => {
    if (typeof window !== "undefined") navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <article className="pt-24 pb-32">
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: 680 }}>
        <header className="text-center flex flex-col items-center">
          <span className="text-label-caps text-[var(--text-muted)]">{poem.moods.join(" · ")}</span>
          <h1 className="text-display-md mt-6 text-[var(--text-primary)]">{poem.title}</h1>
          <div className="w-[60px] h-px bg-[var(--border)] my-8" />
          <p className="text-metadata italic text-[var(--text-muted)]">
            by Akshansh <span className="not-italic mx-3">·</span> {poem.date}
          </p>
        </header>

        <div className="mt-20 space-y-12">
          {poem.body.map((stanza: string, i: number) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              className="text-body-reading text-[var(--text-primary)] whitespace-pre-line text-left"
            >
              {stanza}
            </motion.p>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-[var(--border)]">
          <div className="flex flex-wrap gap-3">
            {poem.moods.map((m: string) => (
              <span key={m} className="text-label-caps px-3 py-2 border border-[var(--border)] text-[var(--text-muted)] rounded-[4px]">
                {m}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-[var(--text-muted)]">
            <button
              onClick={() => { setLiked((v) => !v); setCount((c) => c + (liked ? -1 : 1)); }}
              className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
            >
              <motion.span animate={{ scale: liked ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.35 }} className="inline-block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z" />
                </svg>
              </motion.span>
              <span className="text-metadata">{count}</span>
            </button>
            <button
              onClick={() => setBookmarked((v) => !v)}
              className="hover:text-[var(--text-primary)] transition-colors"
              aria-label="Bookmark"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
                <path d="M6 3h12v18l-6-4-6 4V3z" />
              </svg>
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${poem.excerpt}" — ${poem.title} by Akshansh`)}`}
              target="_blank" rel="noreferrer"
              className="text-label-caps hover:text-[var(--text-primary)] transition-colors"
            >
              Share on X
            </a>
            <button onClick={copyLink} className="text-label-caps hover:text-[var(--text-primary)] transition-colors">
              Copy Link
            </button>
          </div>
        </div>

        {more.length > 0 && (
          <div className="mt-24">
            <h2 className="text-label-caps text-[var(--text-muted)] mb-6">
              More from {collection?.name}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  to="/poems/$slug"
                  params={{ slug: p.slug }}
                  className="block p-6 border border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--bg-surface)] transition-colors"
                >
                  <h3 className="text-headline-lg text-[var(--text-primary)]">{p.title}</h3>
                  <p className="mt-3 text-body-standard italic text-[var(--text-secondary)] line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
