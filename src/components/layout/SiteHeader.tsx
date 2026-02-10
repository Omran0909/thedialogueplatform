"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/platform", label: "Platform" },
  { href: "/dialogues", label: "Dialogues" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="page-container flex items-center justify-between h-16 sm:h-18">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded border border-border/50 bg-surface/50"
          >
            <Image
              src="/assets/logo.png"
              alt="The Dialogue Platform"
              fill
              sizes="40px"
              className="object-contain p-1"
              priority
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted leading-none">
              The
            </span>
            <span className="text-sm sm:text-base font-semibold text-text-primary leading-tight">
              Dialogue Platform
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 transition-colors ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent-soft"
                    initial={false}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

