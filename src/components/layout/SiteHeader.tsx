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
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="page-container">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded border border-border/40 bg-surface-elevated/50 flex-shrink-0"
            >
              <Image
                src="/assets/logo.png"
                alt="The Dialogue Platform"
                fill
                sizes="44px"
                className="object-contain p-1.5"
                priority
              />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                The
              </span>
              <span className="text-sm sm:text-base font-semibold text-text-primary">
                Dialogue Platform
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-surface-elevated/50 rounded-md border border-border/30"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
