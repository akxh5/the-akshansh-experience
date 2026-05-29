import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-24 mt-32 relative z-10">
      <div className="container-reading flex flex-col items-center gap-6 text-center">
        <h2 className="text-headline-lg text-[var(--text-muted)]">The Akshansh Experience</h2>
        <p className="text-body-standard italic text-[var(--text-muted)]">Writing as presence.</p>
        <ul className="flex gap-8 mt-4">
          {[
            { to: "/poems", label: "Poems" },
            { to: "/collections", label: "Collections" },
            { to: "/submit", label: "Submit" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-metadata text-[var(--text-muted)] mt-6">© {new Date().getFullYear()} — All words held quietly.</p>
      </div>
    </footer>
  );
}
