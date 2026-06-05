import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getPoemBySlug, getPoemsByCollection, collections } from "@/data/poems";
import { SocialActionButtons } from "@/components/SocialActionButtons";
import { Divider } from "@/components/Divider";
import ReactMarkdown from "react-markdown";
import { formatPoemDate } from "@/lib/utils";

export const Route = createFileRoute("/poems/$slug")({
  loader: ({ params }) => {
    const poem = getPoemBySlug(params.slug);
    if (!poem) throw notFound();
    
    const related = getPoemsByCollection(poem.collection);
    const relatedPoems = related.filter((p) => p.slug !== poem.slug).slice(0, 2);
    
    const collection = collections.find(c => c.slug === poem.collection);

    return { 
      poem, 
      related: relatedPoems, 
      collection 
    };
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
  const { poem, related, collection } = Route.useLoaderData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <article className="pt-24">
        <div className="mx-auto w-full px-6 md:px-10 max-w-[680px]">
          <header className="text-center flex flex-col items-center">
            <span className="text-label-caps text-[var(--text-muted)]">{poem.mood.join(" · ")}</span>
            <h1 className="text-[30px] md:text-[36px] font-display mt-6 text-[var(--text-primary)] leading-tight">{poem.title}</h1>
            <Divider className="my-8" />
            <p className="text-label-caps text-[var(--text-muted)]">
              by {poem.author.toUpperCase()} <span className="mx-3">·</span> {formatPoemDate(poem.date)}
            </p>
          </header>

          <div className="mt-20">
            <div className="text-body-reading text-[var(--text-primary)] whitespace-pre-line text-left max-w-none">
              <ReactMarkdown 
                components={{
                  p: ({ children }) => <p className="mb-12 last:mb-0">{children}</p>,
                }}
              >
                {poem.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mt-32 pt-10 border-t border-[var(--border)]">
            <div className="flex flex-wrap gap-3">
              {poem.mood.map((m: string) => (
                <span key={m} className="text-label-caps px-3 py-2 border border-[var(--border)] text-[var(--text-muted)] rounded-none">
                  {m}
                </span>
              ))}
            </div>

            <SocialActionButtons poem={poem} />
          </div>

          {related.length > 0 && (
            <div className="mt-32">
              <h2 className="text-label-caps text-[var(--text-muted)] mb-6">
                More from {collection?.name}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((p) => (
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
    </motion.div>
  );
}
