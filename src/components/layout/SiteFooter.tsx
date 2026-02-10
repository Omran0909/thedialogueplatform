import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="page-container py-6 sm:py-8 text-xs sm:text-sm text-text-muted flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-text-secondary">
            The Dialogue Platform
          </p>
          <p className="max-w-xl">
            A structured environment for institutions to design, host, and learn
            from complex public dialogues.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-end">
          <span className="text-text-muted/80">
            © {year} The Dialogue Platform
          </span>
          <span aria-hidden="true" className="text-text-muted/50">
            ·
          </span>
          <Link href="/contact" className="hover:text-text-secondary">
            Contact
          </Link>
          <span aria-hidden="true" className="text-text-muted/50">
            ·
          </span>
          <span className="text-text-muted/80">
            Designed for municipalities, universities, and public institutions.
          </span>
        </div>
      </div>
    </footer>
  );
}

