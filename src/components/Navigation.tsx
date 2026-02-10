import Link from "next/link";

export function Navigation() {
  return (
    <nav className="border-b border-white/5">
      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-text-primary font-medium text-sm">
            The Dialogue Platform
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/about"
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/dialogues"
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Dialogues
            </Link>
            <Link
              href="/insights"
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/contact"
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
