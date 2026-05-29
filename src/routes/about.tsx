import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Akshansh Experience" },
      { name: "description", content: "A manifesto for writing as presence. The philosophy behind the Akshansh Experience." },
      { property: "og:title", content: "About — The Akshansh Experience" },
      { property: "og:description", content: "Writing as presence, not content." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: 680 }}>
        <h1 className="text-display-lg text-[var(--text-primary)]">About</h1>
        <div className="w-[60px] h-px bg-[var(--border)] my-10" />

        <div className="text-body-reading text-[var(--text-primary)] space-y-8">
          <p>
            The Akshansh Experience is not a blog. It is not a feed. It is a slow room with a single chair and a window left slightly open in winter.
          </p>
          <p>
            We publish writing the way one lights a single lamp in a large house — quietly, on purpose, and not for everyone. Each poem is a temperature, a small weather you walk into and stand inside for a while.
          </p>
        </div>

        <PullQuote>
          The internet rewards noise. We are not interested in noise. We are interested in the sound a thought makes when it lands.
        </PullQuote>

        <div className="text-body-reading text-[var(--text-primary)] space-y-8">
          <p>
            Everything here is made by hand. The line breaks matter. The white space matters. The cold blue of the page matters. Nothing is decoration; everything is a register of feeling.
          </p>
          <p>
            If you have found your way here, stay as long as you need. Read twice. Read aloud. Read once and close the window. There is no algorithm waiting to be fed.
          </p>
        </div>

        <PullQuote>Writing as presence, not content.</PullQuote>

        <div className="text-body-reading text-[var(--text-primary)] space-y-8">
          <p>
            This is the entire manifesto. The rest is poems.
          </p>
        </div>
      </div>
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-14 pl-8 border-l border-[var(--border-bright)]">
      <p className="text-headline-lg italic text-[var(--text-secondary)] font-display">{children}</p>
    </blockquote>
  );
}
