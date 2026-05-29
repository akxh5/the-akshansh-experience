import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/collections", label: "Collections" },
    { to: "/poems", label: "Poems" },
    { to: "/submit", label: "Submit" },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300"
      style={{
        backgroundColor: scrolled ? "color-mix(in oklab, var(--bg-surface) 80%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(60px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(60px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="container-reading flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-[18px] text-[var(--text-primary)] tracking-tight">
          Akshansh
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  activeProps={{ style: { color: "var(--text-primary)" } }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="ml-2 h-7 w-7 grid place-items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {theme === "dark" ? <Snowflake /> : <Sun />}
          </button>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] text-label-caps px-2"
        >
          {open ? "—" : "···"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)]" style={{ backgroundColor: "var(--bg-surface)" }}>
          <ul className="container-reading py-6 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={toggle} className="text-label-caps text-[var(--text-muted)]">
                {theme === "dark" ? "Winter Ivory" : "Midnight Snowfall"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Snowflake() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" />
    </svg>
  );
}
function Sun() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
