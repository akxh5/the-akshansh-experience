import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPoems, type Poem } from "@/data/poems";
import { motion } from "framer-motion";
import { Divider } from "@/components/Divider";

export const Route = createFileRoute("/years")({
  loader: () => {
    const poems = getAllPoems();
    // Sort oldest to newest
    const ascending = [...poems].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const grouped = ascending.reduce((acc, poem) => {
      const year = poem.date.substring(0, 4);
      if (!acc[year]) acc[year] = [];
      acc[year].push(poem);
      return acc;
    }, {} as Record<string, Poem[]>);

    return { grouped };
  },
  head: () => ({
    meta: [
      { title: "The Years — The Akshansh Experience" },
      { name: "description", content: "An emotional biography. Tracing the evolution of a voice from the earliest fragments to the quietest depths." },
      { property: "og:title", content: "The Years" },
      { property: "og:description", content: "Tracing the evolution of a voice." },
    ],
  }),
  component: YearsPage,
});

const ERAS: Record<string, { title: string; description: string; quote: string }> = {
  "2022": {
    title: "The First Fragments",
    description: "Learning how to turn feeling into language.",
    quote: "every little word you've said to me, has made a home."
  },
  "2023": {
    title: "Constellations",
    description: "The world became larger. Love became cosmic.",
    quote: "A glow of distant memory, outrunning fate across the sky."
  },
  "2024": {
    title: "Architecture of Leaving",
    description: "Memory, absence, and the shape people leave behind.",
    quote: "But memories aren't a way out. They're a maze."
  },
  "2025": {
    title: "Observations",
    description: "Questions about time, identity, resilience, and meaning.",
    quote: "Everything Changes. Just in different ways."
  },
  "2026": {
    title: "Nocturne",
    description: "The quiet hours. Solitude. The self.",
    quote: "Through my poetry I stand vulnerable."
  }
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric",
    year: "numeric"
  });
}

function YearsPage() {
  const { grouped } = Route.useLoaderData();
  const years = Object.keys(grouped).sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container-reading pt-24 pb-32">
        <header className="max-w-3xl mb-32">
          <h1 className="text-display-md italic text-[var(--text-primary)]">The Years</h1>
          <p className="mt-6 text-body-standard italic text-[var(--text-secondary)]">
            An emotional biography. Tracing the evolution of a voice from the earliest fragments to the quietest depths.
          </p>
        </header>

        <div className="flex flex-col gap-32">
          {years.map((year) => {
            const era = ERAS[year];
            const yearPoems = grouped[year];

            return (
              <section key={year} className="relative">
                {/* Sticky Era Header */}
                <div className="sticky top-20 z-20 py-8 bg-[var(--bg-base)] transition-colors duration-700">
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[var(--bg-base)] to-transparent -translate-y-full pointer-events-none" />
                  
                  {/* Oversized Year Watermark */}
                  <div className="absolute -top-6 left-0 text-[100px] md:text-[140px] font-display text-[var(--text-muted)] opacity-10 pointer-events-none select-none leading-none -z-10">
                    {year}
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className="text-display-md text-[var(--text-primary)]">{era?.title || year}</h2>
                    {era && (
                      <>
                        <p className="text-body-standard italic text-[var(--text-secondary)] mt-4">
                          {era.description}
                        </p>
                        <p className="text-body-reading italic text-[var(--text-muted)] mt-6 pr-8">
                          "{era.quote}"
                        </p>
                      </>
                    )}
                  </div>
                  <Divider className="mt-12" />
                  
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[var(--bg-base)] to-transparent translate-y-full pointer-events-none" />
                </div>

                {/* Timeline Entries */}
                <div className="flex flex-col gap-16 mt-16 relative z-10">
                  {yearPoems.map((poem) => {
                    const isLighthouse = poem.slug === "the-lighthouse";

                    if (isLighthouse) {
                      return (
                        <div key={poem.slug} className="w-full mt-24 py-32 flex flex-col items-center text-center relative group">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--wash-nocturne)_0%,transparent_60%)] opacity-30 z-0 transition-opacity duration-500 group-hover:opacity-50" />
                          <div className="relative z-10 max-w-[600px] px-6">
                            <Link to="/poems/$slug" params={{ slug: poem.slug }} className="block">
                              <span className="text-label-caps text-[var(--text-muted)] mb-8 block">{formatDate(poem.date)}</span>
                              <h3 className="text-display-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                                {poem.title}
                              </h3>
                              <p className="mt-10 text-body-reading italic text-[var(--text-secondary)]">
                                {poem.excerpt}
                              </p>
                              <span className="mt-16 inline-block text-label-caps text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors border-b border-[var(--border)] pb-1">
                                Read Final Entry →
                              </span>
                            </Link>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link 
                        key={poem.slug} 
                        to="/poems/$slug" 
                        params={{ slug: poem.slug }}
                        className="flex flex-col md:flex-row gap-4 md:gap-12 group"
                      >
                        <div className="md:w-1/4 shrink-0 flex flex-col gap-1 md:pt-2">
                          <span className="text-label-caps text-[var(--text-muted)]">
                            {formatDate(poem.date)}
                          </span>
                          <span className="text-label-caps text-[var(--accent)] opacity-60">
                            {poem.collection.replace(/-/g, " ")}
                          </span>
                        </div>
                        <div className="md:w-3/4 flex flex-col gap-4 pl-4 md:pl-0 border-l border-[var(--border)] md:border-none">
                          <h4 className="text-headline-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                            {poem.title}
                          </h4>
                          <p className="text-body-standard italic text-[var(--text-secondary)]">
                            {poem.excerpt}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Epilogue */}
        <div className="mt-48 pt-12 flex flex-col items-center justify-center text-center">
          <Divider className="w-16 mb-16 mx-auto" />
          <span className="text-label-caps text-[var(--text-muted)] tracking-[0.3em] block">
            34 Poems
          </span>
          <span className="text-label-caps text-[var(--text-muted)] opacity-50 mt-4 tracking-[0.2em] block">
            2022 — 2026
          </span>
        </div>
      </div>
    </motion.div>
  );
}
