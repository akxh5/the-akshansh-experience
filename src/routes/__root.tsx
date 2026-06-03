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
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { SnowCanvas } from "@/components/SnowCanvas";
import { FloatingNav } from "@/components/FloatingNav";
import { SoundControl } from "@/components/SoundControl";
import { cn } from "@/lib/utils";

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
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { 
        rel: "stylesheet", 
        href: "https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500&display=swap" 
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function App() {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isHome = pathname === "/";
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <div id="app-root" className={cn(theme === "winter-ivory" && "winter-ivory")}>
        {/* GLOBAL BACKGROUNDS */}
        <div 
          className="fixed inset-0 z-[-2] bg-[var(--bg-base)] transition-colors duration-700"
        />
        {/* HOMEPAGE GRADIENT LAYER */}
        <div 
          className={cn(
            "fixed inset-0 z-[-1] transition-opacity duration-1000 pointer-events-none",
            isHome && theme === "winter-ivory" ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: "radial-gradient(circle at center, var(--bg-base) 0%, var(--bg-gradient-end) 100%)"
          }}
        />

        <SnowCanvas />
        <SoundControl />
        <FloatingNav />

        <main className={cn("relative z-10", isHome && "home-main")}>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
