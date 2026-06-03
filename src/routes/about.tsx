import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Akshansh — The Akshansh Experience" },
      { name: "description", content: "Notes on the architecture of silence and the weight of words." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="pt-24">
        <div className="mx-auto w-full px-6 md:px-10 max-w-[680px]">
          <h1 className="text-display-lg text-[var(--text-primary)]">About</h1>
          <div className="w-[60px] h-px bg-[var(--border)] my-10" />

          <div className="text-body-reading text-[var(--text-primary)] space-y-8">
            <p>
              Akshansh is a writer and digital architect focused on the intersection of atmospheric presence and minimal editorial design.
            </p>
            <p>
              This platform is not a blog. It is an archive of small weathers — a curated literary world where writing is experienced as emotional presence, not content.
            </p>
            <p>
              Every poem, collection, and particle is intended to encourage a slower, rhythmic state of reading. The cold here is intentional.
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-[var(--border)]">
            <h2 className="text-label-caps text-[var(--text-muted)] mb-4">Contact</h2>
            <a href="mailto:hello@the-akshansh-experience.com" className="text-body-standard italic hover:text-[var(--accent)] transition-colors">
              hello@the-akshansh-experience.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
