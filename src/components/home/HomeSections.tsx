"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: "easeOut" }
  })
};

export function HomeSections() {
  return (
    <section className="mt-16 sm:mt-20 lg:mt-24 space-y-16 sm:space-y-20">
      <motion.div
        className="grid gap-10 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          custom={0}
          variants={sectionVariants}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
            A content-first platform for complex dialogue.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            The Dialogue Platform is intentionally narrow: it focuses on the
            architecture of questions, formats, and learning pathways that make
            public dialogue legible to institutions and communities over time.
          </p>
        </motion.div>
        <motion.div
          custom={1}
          variants={sectionVariants}
          className="rounded-lg border border-border/50 bg-surface/40 p-5 sm:p-6 text-sm text-text-secondary"
        >
          <p className="font-semibold text-text-primary mb-3">
            What the platform is not
          </p>
          <p className="leading-relaxed">
            It is not a social network, campaign tool, or generic survey
            engine. It is an infrastructure layer that underpins serious,
            facilitated dialogue with clear mandates and accountability.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <DialogueCard
          index={0}
          title="Dialogues"
          href="/dialogues"
          description="Structured formats for convening residents, practitioners, and decision-makers around well-framed questions."
          bullets={[
            "Scoping mandates and constraints",
            "Designing session formats and prompts",
            "Curating participants and roles"
          ]}
        />
        <DialogueCard
          index={1}
          title="Events"
          href="/events"
          description="A calendar layer for assemblies, forums, and working groups that builds continuity rather than isolated events."
          bullets={[
            "Coordinated series and cycles",
            "Documentation and synthesis expectations",
            "Alignment with institutional timelines"
          ]}
        />
        <DialogueCard
          index={2}
          title="Insights"
          href="/insights"
          description="Knowledge outputs emerging from dialogue: patterns, tensions, and policy-relevant observations."
          bullets={[
            "Traceable to specific dialogues",
            "Grounded in lived and institutional perspectives",
            "Structured for policy and program design"
          ]}
        />
      </motion.div>
    </section>
  );
}

interface DialogueCardProps {
  index: number;
  title: string;
  description: string;
  href: string;
  bullets: string[];
}

function DialogueCard({
  index,
  title,
  description,
  href,
  bullets
}: DialogueCardProps) {
  return (
    <motion.article
      custom={index}
      variants={sectionVariants}
      className="group relative flex flex-col rounded-lg border border-border/50 bg-surface/40 p-6 sm:p-7 hover:border-border/70 transition-colors"
    >
      <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
        {description}
      </p>
      <ul className="space-y-2.5 text-sm text-text-muted mb-6">
        {bullets.map((item) => (
          <li key={item} className="flex gap-3 items-start">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft/70 flex-shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 border-t border-border/30">
        <Link
          href={href}
          className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-1"
        >
          View {title.toLowerCase()} structure →
        </Link>
      </div>
    </motion.article>
  );
}

