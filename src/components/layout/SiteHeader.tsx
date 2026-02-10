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
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="page-container flex items-center justify-between py-4 sm:py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-md border border-border/70 bg-surface"
            >
              <Image
                src="/assets/logo.png"
                alt="The Dialogue Platform"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                The
              </span>
              <span className="text-sm sm:text-base font-semibold text-text-primary">
                Dialogue Platform
              </span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-text-muted hover:text-text-primary transition-colors"
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1 h-px bg-accent-soft"
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

