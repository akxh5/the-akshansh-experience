import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { submitPoem } from "@/lib/interactions";
import { toast } from "sonner";

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
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [moods, setMoods] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth", search: { redirect: "/submit" } });
    }
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const toggle = (m: string) =>
    setMoods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const authorName = formData.get("author") as string;
    const content = formData.get("poem") as string;
    const authorEmail = user.email || "";

    setIsSubmitting(true);

    try {
      const { error } = await submitPoem({
        userId: user.id,
        authorEmail,
        title,
        authorName,
        content,
        mood: moods
      });

      if (error) {
        toast.error("A small collapse: " + error.message);
      } else {
        setSubmitted(true);

        // Dispatch the notification off-thread via the Supabase Edge Function
        try {
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-submission`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ title, authorName, authorEmail, mood: moods, content })
          }).then((res) => {
            if (!res.ok) console.error("Notification function responded with an error status.");
          }).catch((err) => {
            console.error("Failed to fire notification function:", err);
          });
        } catch (emailErr) {
          console.error("Error setting up notification dispatch:", emailErr);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again, gently.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="pt-24 pb-32">
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: 680 }}>
          <header>
            <h1 className="text-display-md text-[var(--text-primary)] font-display">Submit Your Writing</h1>
            <p className="mt-8 text-body-standard italic text-[var(--text-secondary)]">
              Send the piece you cannot stop returning to — the one that arrived in the small hours and refused to leave. We read with attention, not appetite.
            </p>
          </header>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20 border-t border-b border-[var(--border)] py-16 text-center"
            >
              <p className="text-headline-lg text-[var(--text-primary)] font-body italic">
                Your writing has been received. We read everything.
              </p>
              <div className="mt-12">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-label-caps text-[var(--text-muted)] border-b border-[var(--border)] pb-1 hover:text-[var(--text-primary)] transition-colors"
                >
                  Send another piece
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="mt-16 space-y-12 w-full">
              <Field label="Poem Title">
                <input required type="text" name="title" className={inputCls} placeholder="Untitled" />
              </Field>
              <Field label="Author Name">
                <input required type="text" name="author" className={inputCls} defaultValue={user?.email?.split('@')[0] || ""} />
              </Field>
              <Field label="Poem">
                <textarea
                  required
                  name="poem"
                  placeholder="..."
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
                        className={cn(
                          "text-label-caps px-4 py-2 border transition-colors duration-200 rounded-none",
                          active
                            ? "border-[var(--border-bright)] text-[var(--text-primary)] bg-[var(--bg-surface)]"
                            : "border-[var(--border)] text-[var(--text-muted)] bg-transparent hover:border-[var(--border-bright)]"
                        )}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "text-label-caps text-[var(--text-primary)] border border-[var(--border-bright)] px-10 py-4 transition-all duration-300",
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--bg-surface)]"
                  )}
                >
                  {isSubmitting ? "Receiving..." : "Submit for Review"}
                </button>
              </div>

              <p className="text-body-standard italic text-[var(--text-muted)] pt-8 border-t border-[var(--border)]">
                Every submission is read. Not everything is published. That's the point.
              </p>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-[var(--border)] focus:border-[var(--border-bright)] outline-none text-body-standard text-[var(--text-primary)] py-3 transition-colors placeholder:opacity-30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-label-caps text-[var(--text-muted)] block mb-3">{label}</span>
      {children}
    </label>
  );
}