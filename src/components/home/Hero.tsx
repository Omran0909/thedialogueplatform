"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="section-padding border-b border-border/20">
      <div className="page-container">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-20">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                A platform for structured dialogue
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary leading-[1.05]">
                Designing public dialogue as a governance and learning system.
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-2xl">
                The Dialogue Platform is an institutional infrastructure for
                municipalities, universities, and public organisations that need to
                convene complex conversations, generate shared understanding, and
                translate dialogue into durable decisions and stewardship.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <Link
                href="/platform"
                className="inline-flex items-center justify-center rounded-md border border-accent-soft/40 bg-accent-soft/10 px-6 py-3 text-sm font-medium text-text-primary hover:bg-accent-soft/20 hover:border-accent-soft/60 transition-all"
              >
                Explore how the platform works
              </Link>
              <Link
                href="/contact"
                className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-1"
              >
                Discuss an institutional partnership
                <span className="text-text-muted/60">→</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="card-elevated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
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
      </div>
    </section>
  );
}
