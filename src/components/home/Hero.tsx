"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-8 sm:pt-12 lg:pt-16">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-16">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted mb-6">
              A platform for structured dialogue
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1] mb-6">
              Designing public dialogue as a governance and learning system.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary max-w-2xl">
              The Dialogue Platform is an institutional infrastructure for
              municipalities, universities, and public organisations that need to
              convene complex conversations, generate shared understanding, and
              translate dialogue into durable decisions and stewardship.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <Link
              href="/platform"
              className="inline-flex items-center justify-center rounded-md border border-accent-soft/50 bg-accent-soft/10 px-6 py-3 text-sm font-medium text-text-primary hover:bg-accent-soft/20 hover:border-accent-soft transition-all"
            >
              Explore how the platform works
            </Link>
            <Link
              href="/contact"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Discuss an institutional partnership →
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="rounded-lg border border-border/50 bg-surface/40 p-6 sm:p-7 lg:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted mb-6">
            Institutional frame
          </p>
          <div className="space-y-5 text-sm leading-relaxed text-text-secondary">
            <p>
              The platform is designed for teams that treat dialogue as a
              long-term capability, not a single event: city administrations,
              research centres, multi-stakeholder coalitions, and foundations.
            </p>
            <p>
              It provides a common architecture for scoping dialogue mandates,
              framing questions, curating participants, and capturing learning
              across cycles and contexts.
            </p>
            <div className="border-l-2 border-accent-soft/50 pl-5 pt-1">
              <p className="text-text-primary font-medium">
                Rather than promising quick consensus, the platform makes
                underlying assumptions, trade-offs, and institutional constraints
                explicit—so that decisions are better informed and more
                accountable.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

