import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

const MOODS = ["MELANCHOLIC", "SOLITUDE", "LONGING", "NOCTURNAL", "VISCERAL"] as const;

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit Your Writing — The Akshansh Experience" },
      { name: "description", content: "Submit your poetry for review. Every submission is read. Not everything is published. That's the point." },
      { property: "og:title", content: "Submit Your Writing — Akshansh" },
      { property: "og:description", content: "Every submission is read. Not everything is published." },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [moods, setMoods] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (m: string) =>
    setMoods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: 680 }}>
        <header>
          <h1 className="text-display-md text-[var(--text-primary)]">Submit Your Writing</h1>
          <p className="mt-8 text-body-standard italic text-[var(--text-secondary)]">
            Send the piece you cannot stop returning to — the one that arrived in the small hours and refused to leave. We read with attention, not appetite.
          </p>
        </header>

        {submitted ? (
          <div className="mt-20 border-t border-b border-[var(--border)] py-16 text-center">
            <p className="text-headline-lg text-[var(--text-primary)]">Received.</p>
            <p className="mt-6 text-body-standard italic text-[var(--text-muted)]">
              We will read it slowly. There is no automated reply, by design.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-16 space-y-12">
            <Field label="Poem Title">
              <input required type="text" name="title" className={inputCls} />
            </Field>
            <Field label="Author Name">
              <input required type="text" name="author" className={inputCls} />
            </Field>
            <Field label="Poem">
              <textarea
                required
                name="poem"
                style={{ minHeight: 300 }}
                className={`${inputCls} resize-y text-body-standard italic leading-[2] py-3`}
              />
            </Field>

            <div>
              <label className="text-label-caps text-[var(--text-muted)] block mb-4">Mood</label>
              <div className="flex flex-wrap gap-3">
                {MOODS.map((m) => {
                  const active = moods.includes(m);
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => toggle(m)}
                      className="text-label-caps px-4 py-2 border transition-colors duration-200 rounded-[4px]"
                      style={{
                        borderColor: active ? "var(--border-bright)" : "var(--border)",
                        color: active ? "var(--text-primary)" : "var(--text-muted)",
                        backgroundColor: active ? "var(--bg-surface)" : "transparent",
                      }}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Tags">
              <input type="text" name="tags" placeholder="frost, memory, doors" className={inputCls} />
            </Field>

            <div className="pt-6">
              <button
                type="submit"
                className="text-label-caps text-[var(--text-primary)] border border-[var(--border-bright)] px-10 py-4 hover:bg-[var(--bg-surface)] transition-colors duration-300"
              >
                Submit for Review
              </button>
            </div>

            <p className="text-body-standard italic text-[var(--text-muted)] pt-8 border-t border-[var(--border)]">
              Every submission is read. Not everything is published. That's the point.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-[var(--border)] focus:border-[var(--border-bright)] outline-none text-body-standard text-[var(--text-primary)] py-3 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-label-caps text-[var(--text-muted)] block mb-3">{label}</span>
      {children}
    </label>
  );
}
