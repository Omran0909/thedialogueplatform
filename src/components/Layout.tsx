import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/dialogues", label: "Dialogues" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="border-b border-white/5 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-content mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-text-primary font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              aria-label="The Dialogue Platform - Home"
            >
              <Image
                src="/assets/logo.png"
                alt="The Dialogue Platform"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
              <span className="text-sm">The Dialogue Platform</span>
            </Link>
            <div className="flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/5 mt-32">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-text-secondary text-sm">
              The Dialogue Platform · {new Date().getFullYear()}
            </p>
            <div className="flex gap-8">
              <Link
                href="/about"
                className="text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                About
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
      </footer>
    </div>
  );
}
