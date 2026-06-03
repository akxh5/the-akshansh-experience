import { Link } from "@tanstack/react-router";

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  linkHref?: string;
}

export function SectionHeader({ title, linkText, linkHref }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-12 pb-6 border-b border-[var(--border)]">
      <h2 className="text-headline-lg text-[var(--text-primary)]">{title}</h2>
      {linkText && linkHref && (
        <Link 
          to={linkHref as any} 
          className="text-label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
