import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background mt-16 sm:mt-20">
      <div className="page-container py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="space-y-2">
            <p className="font-semibold text-text-primary text-sm">
              The Dialogue Platform
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              A structured environment for institutions to design, host, and learn
              from complex public dialogues.
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-border/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-text-muted">
          <span>© {year} The Dialogue Platform</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="hover:text-text-secondary transition-colors">
              Contact
            </Link>
            <span aria-hidden="true" className="text-text-muted/40">·</span>
            <span>Designed for municipalities, universities, and public institutions.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

