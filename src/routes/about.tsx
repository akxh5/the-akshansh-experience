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
              I write because silence has texture, and I want you to feel it.
            </p>
            <p>
              The Akshansh Experience is not a blog. It is not a portfolio. It is an archive of small weathers — the kinds of feelings that arrive at 2am and refuse to be named properly.
            </p>
            <p>
              Every poem here was written in a specific kind of quiet. Some in winter. Some in the particular loneliness of a crowded room. Some while trying to forget, and some while trying to remember.
            </p>
            <p>
              This platform was built to resist the speed of the internet. There is no algorithm here. No engagement farming. No infinite scroll. Just writing, and the atmosphere it deserves.
            </p>

            <blockquote className="pl-6 border-l border-[var(--border)] italic text-headline-sm my-12 text-[var(--text-secondary)]">
              "The cold here is intentional."
            </blockquote>

            <p>
              If something lands — save it. Share it. Or just close the window and carry it with you. That's enough.
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-[var(--border)]">
            <h2 className="text-label-caps text-[var(--text-muted)] mb-6">CONTACT</h2>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@the-akshansh-experience.com" className="text-body-standard italic hover:text-[var(--text-secondary)] transition-colors">
                hello@the-akshansh-experience.com
              </a>
              <a href="https://instagram.com/akxh_5" target="_blank" rel="noopener noreferrer" className="text-body-standard italic hover:text-[var(--text-secondary)] transition-colors">
                INSTAGRAM — @akxh_5
              </a>
              <a href="https://twitter.com/akxh_5" target="_blank" rel="noopener noreferrer" className="text-body-standard italic hover:text-[var(--text-secondary)] transition-colors">
                TWITTER — @akxh_5
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
