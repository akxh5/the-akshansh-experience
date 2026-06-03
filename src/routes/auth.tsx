import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Divider } from "@/components/Divider";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || "/",
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const { user, signInWithGoogle, signInWithOtp, loading } = useAuth();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate({ to: redirect as any });
    }
  }, [user, loading, navigate, redirect]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google.");
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const { error } = await signInWithOtp(email);
      if (error) throw error;
      setSent(true);
      toast.success("Magic link sent to your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send magic link.");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <section className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] flex flex-col items-center text-center"
        >
          <h1 className="text-label-caps text-[var(--text-muted)] tracking-widest">
            THE AKSHANSH EXPERIENCE
          </h1>
          
          <div className="mt-8">
            <Divider />
          </div>

          <div className="mt-12 w-full">
            <h2 className="text-headline-lg font-display text-[var(--text-primary)]">
              Continue Reading
            </h2>
            <p className="mt-4 text-body-standard italic text-[var(--text-secondary)]">
              Sign in to save poems, like writing, and submit your own.
            </p>

            <div className="mt-12 space-y-8 w-full">
              {/* GOOGLE SIGN IN */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border border-[var(--border)] text-label-caps text-[var(--text-primary)] hover:border-[var(--border-bright)] hover:bg-[var(--bg-surface)] transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                CONTINUE WITH GOOGLE
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-[var(--border)] opacity-20"></div>
                <span className="flex-shrink mx-4 text-label-caps text-[var(--text-muted)] text-[10px]">
                  OR SIGN IN WITH EMAIL
                </span>
                <div className="flex-grow border-t border-[var(--border)] opacity-20"></div>
              </div>

              {/* MAGIC LINK */}
              {sent ? (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-body-standard italic text-[var(--text-primary)] py-4"
                >
                  A link has been sent. Check your inbox.
                </motion.p>
              ) : (
                <form onSubmit={handleEmailSignIn} className="space-y-6">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-[var(--border)] py-4 text-body-standard focus:outline-none focus:border-[var(--border-bright)] transition-colors placeholder:text-[var(--text-muted)]/30"
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full px-6 py-4 border border-[var(--border)] text-label-caps text-[var(--text-primary)] hover:border-[var(--border-bright)] hover:bg-[var(--bg-surface)] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSending ? "SENDING..." : "SEND MAGIC LINK"}
                  </button>
                </form>
              )}
            </div>

            <p className="mt-16 text-metadata text-[var(--text-muted)] opacity-50">
              No password. No noise. Just reading.
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
