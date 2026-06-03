import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { poems, type Poem } from "@/data/poems";
import { getUserLikes, getUserSaves } from "@/lib/interactions";
import { supabase } from "@/lib/supabase";
import { PoemCard } from "@/components/PoemCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Tab = "saved" | "liked" | "submissions";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const [savedPoems, setSavedPoems] = useState<Poem[]>([]);
  const [likedPoems, setLikedPoems] = useState<Poem[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth", search: { redirect: "/dashboard" } });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    setIsDataLoading(true);

    try {
      const [savesRes, likesRes, submissionsRes] = await Promise.all([
        getUserSaves(user.id),
        getUserLikes(user.id),
        supabase
          ? supabase
              .from("submissions")
              .select("*")
              .eq("user_id", user.id)
              .order("created_at", { ascending: false })
          : Promise.resolve({ data: [], error: null }),
      ]);

      if (savesRes.data) {
        const savedSlugs = savesRes.data.map((s: any) => s.poem_slug);
        setSavedPoems(poems.filter((p) => savedSlugs.includes(p.slug)));
      }

      if (likesRes.data) {
        const likedSlugs = likesRes.data.map((l: any) => l.poem_slug);
        setLikedPoems(poems.filter((p) => likedSlugs.includes(p.slug)));
      }

      if (submissionsRes.data) {
        setSubmissions(submissionsRes.data);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  if (loading || !user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container-reading pt-24 pb-32 min-h-screen"
    >
      <header className="mb-16">
        <h1 className="text-display-md italic text-[var(--text-primary)]">Dashboard</h1>
      </header>

      {/* TAB SWITCHER */}
      <div className="flex flex-wrap gap-8 border-b border-[var(--border)] mb-12">
        {(["saved", "liked", "submissions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-label-caps pb-4 transition-all duration-300 relative",
              activeTab === tab
                ? "text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            )}
          >
            {tab.toUpperCase()}
            {activeTab === tab && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--accent)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="relative">
        {isDataLoading ? (
          <div className="py-20 text-center">
            <p className="text-body-standard italic text-[var(--text-muted)]">Gathering your archive...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "saved" && (
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                  {savedPoems.length > 0 ? (
                    savedPoems.map((p, i) => <PoemCard key={p.slug} poem={p} index={i} />)
                  ) : (
                    <p className="col-span-full py-20 text-center text-body-standard italic text-[var(--text-muted)]">
                      Nothing saved yet. Read slowly.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "liked" && (
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                  {likedPoems.length > 0 ? (
                    likedPoems.map((p, i) => <PoemCard key={p.slug} poem={p} index={i} />)
                  ) : (
                    <p className="col-span-full py-20 text-center text-body-standard italic text-[var(--text-muted)]">
                      Nothing liked yet. Something will land.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "submissions" && (
                <div className="space-y-6">
                  {submissions.length > 0 ? (
                    submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-[var(--border)] bg-[var(--bg-surface-low)] group hover:bg-[var(--bg-surface)] transition-colors"
                      >
                        <div>
                          <h3 className="text-headline-lg text-[var(--text-primary)]">{sub.title}</h3>
                          <p className="text-metadata text-[var(--text-muted)] mt-1">
                            {format(new Date(sub.created_at), "MMMM d, yyyy")}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-4">
                          <StatusBadge status={sub.status} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="py-20 text-center text-body-standard italic text-[var(--text-muted)]">
                      Nothing submitted yet.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: "PENDING", className: "text-[var(--text-muted)] border-[var(--border)]" },
    approved: { label: "APPROVED", className: "text-green-400 border-green-400/30 bg-green-400/5" },
    rejected: { label: "REJECTED", className: "text-red-400 border-red-400/30 bg-red-400/5" },
  };

  const { label, className } = config[status.toLowerCase()] || config.pending;

  return (
    <span className={cn("text-[10px] font-sans font-medium tracking-[0.2em] px-3 py-1 border rounded-none", className)}>
      {label}
    </span>
  );
}
