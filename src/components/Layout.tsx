import Link from "next/link";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-white/5">
        <div className="max-w-content mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-text-primary text-sm font-medium">
              The Dialogue Platform
            </Link>
            <div className="flex items-center gap-10">
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
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/5 mt-32">
        <div className="max-w-content mx-auto px-6 py-12">
          <p className="text-text-secondary text-sm">
            The Dialogue Platform · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
