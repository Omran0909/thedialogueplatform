\"use client\";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-4 sm:pt-6 lg:pt-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            A platform for structured dialogue
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            Designing public dialogue as a governance and learning system.
          </motion.h1>
          <motion.p
            className="max-w-2xl text-sm sm:text-base leading-relaxed text-text-secondary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            The Dialogue Platform is an institutional infrastructure for
            municipalities, universities, and public organisations that need to
            convene complex conversations, generate shared understanding, and
            translate dialogue into durable decisions and stewardship.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          >
            <Link
              href="/platform"
              className="inline-flex items-center justify-center rounded-full border border-accent-soft bg-accent-soft/10 px-5 py-2.5 text-sm font-medium text-text-primary hover:bg-accent-soft/20 transition-colors"
            >
              Explore how the platform works
            </Link>
            <Link
              href="/contact"
              className="text-sm text-text-muted hover:text-text-secondary"
            >
              Discuss an institutional partnership
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="rounded-xl border border-border/70 bg-gradient-to-b from-surface/60 to-background p-5 sm:p-6 lg:p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.6)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-text-muted mb-4">
            Institutional frame
          </p>
          <div className="space-y-4 text-sm text-text-secondary">
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
            <p className="border-l border-accent-soft/60 pl-4 text-text-primary">
              Rather than promising quick consensus, the platform makes
              underlying assumptions, trade-offs, and institutional constraints
              explicit—so that decisions are better informed and more
              accountable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

