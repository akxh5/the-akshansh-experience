import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SnowCanvas } from "@/components/SnowCanvas";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display-md">404</h1>
        <p className="mt-4 text-body-standard italic text-[var(--text-muted)]">
          This page has drifted out of frame.
        </p>
        <div className="mt-8">
          <Link to="/" className="text-label-caps text-[var(--text-primary)] border-b border-[var(--border-bright)] pb-1">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display-md">A small collapse.</h1>
        <p className="mt-4 text-body-standard italic text-[var(--text-muted)]">
          Something refused to render. Try again, gently.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="text-label-caps text-[var(--text-primary)] border-b border-[var(--border-bright)] pb-1"
          >
            Try Again
          </button>
          <a href="/" className="text-label-caps text-[var(--text-muted)] border-b border-[var(--border)] pb-1">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Akshansh Experience — Writing as Presence" },
      { name: "description", content: "A cinematic literary world of atmospheric poetry by Akshansh. Writing as presence, not content." },
      { property: "og:title", content: "The Akshansh Experience" },
      { property: "og:description", content: "A cinematic literary world of atmospheric poetry. Writing as presence, not content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnowCanvas />
        <Nav />
        <main className="relative z-10 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
