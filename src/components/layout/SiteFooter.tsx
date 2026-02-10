import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-background mt-20">
      <div className="page-container">
        <div className="py-12 sm:py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="space-y-3">
              <p className="font-semibold text-text-primary text-sm">
                The Dialogue Platform
              </p>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                A structured environment for institutions to design, host, and learn
                from complex public dialogues.
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-text-primary text-sm">Navigation</p>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/about" className="text-text-muted hover:text-text-secondary transition-colors">
                  About
                </Link>
                <Link href="/platform" className="text-text-muted hover:text-text-secondary transition-colors">
                  Platform
                </Link>
                <Link href="/dialogues" className="text-text-muted hover:text-text-secondary transition-colors">
                  Dialogues
                </Link>
                <Link href="/events" className="text-text-muted hover:text-text-secondary transition-colors">
                  Events
                </Link>
                <Link href="/insights" className="text-text-muted hover:text-text-secondary transition-colors">
                  Insights
                </Link>
                <Link href="/contact" className="text-text-muted hover:text-text-secondary transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-text-muted">
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
      </div>
    </footer>
  );
}
