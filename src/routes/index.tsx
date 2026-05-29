import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { PoemCard } from "@/components/PoemCard";
import { CollectionTile } from "@/components/CollectionTile";
import { collections, poems } from "@/lib/poems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Akshansh Experience — Writing as Presence" },
      { name: "description", content: "Atmospheric poetry by Akshansh. A curated literary world where writing is experienced as emotional presence." },
      { property: "og:title", content: "The Akshansh Experience" },
      { property: "og:description", content: "Writing as presence, not content." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = poems[0];
  const latest = poems.slice(1, 4);
  const tallSet = new Set(["winter", "midnight"]);

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100vh] min-h-[640px] flex items-center justify-center -mt-16 pt-16">
        <div className="pointer-events-none absolute inset-0 cold-vignette" />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 container-reading flex flex-col items-center text-center"
        >
          <div className="max-w-[700px] flex flex-col items-center">
            <motion.span variants={item} className="text-label-caps text-[var(--text-muted)]">
              Featured Writing
            </motion.span>
            <motion.div variants={item} className="w-[60px] h-px bg-[var(--border)] my-8" />
            <motion.h1 variants={item} className="text-display-md text-[var(--text-primary)]">
              {featured.title}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-10 text-body-reading italic text-[var(--accent-dim)] text-left whitespace-pre-line"
            >
              {featured.excerpt}
            </motion.p>
            <motion.p variants={item} className="mt-10 text-metadata text-[var(--text-muted)]">
              <span className="italic">by Akshansh</span>
              <span className="mx-3">·</span>
              <span className="text-label-caps">{featured.moods.join(" · ")}</span>
            </motion.p>
            <motion.div variants={item} className="mt-12">
              <Link
                to="/poems/$slug"
                params={{ slug: featured.slug }}
                className="text-label-caps text-[var(--text-primary)] border border-[var(--border-bright)] px-8 py-4 hover:bg-[var(--bg-surface)] transition-colors duration-300 inline-flex items-center gap-3"
              >
                Read the Full Poem <span>→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-[var(--text-muted)]"
          />
        </motion.div>
      </section>

      {/* LATEST */}
      <section className="container-reading mt-32">
        <SectionHeader title="Latest Writings" link="/poems" linkLabel="View All →" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <PoemCard key={p.slug} poem={p} index={i} />
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="container-reading mt-32">
        <SectionHeader title="Collections" link="/collections" linkLabel="Explore →" />
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((c, i) => (
            <CollectionTile key={c.slug} collection={c} tall={tallSet.has(c.slug)} index={i} />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mt-32 py-32 border-y border-[var(--border)]" style={{ backgroundColor: "var(--bg-surface-low)" }}>
        <div className="container-reading text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-display-md italic text-[var(--text-muted)]"
          >
            Writing as presence, not content.
          </motion.p>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, link, linkLabel }: { title: string; link: string; linkLabel: string }) {
  return (
    <div className="flex items-end justify-between mb-12 pb-6 border-b border-[var(--border)]">
      <h2 className="text-headline-lg text-[var(--text-primary)]">{title}</h2>
      <Link to={link} className="text-label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
        {linkLabel}
      </Link>
    </div>
  );
}
