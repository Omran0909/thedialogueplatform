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
    <section className="mt-12 sm:mt-16 space-y-14 sm:space-y-16">
      <motion.div
        className="grid gap-8 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          custom={0}
          variants={sectionVariants}
          className="lg:col-span-2 space-y-3"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
            A content-first platform for complex dialogue.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl">
            The Dialogue Platform is intentionally narrow: it focuses on the
            architecture of questions, formats, and learning pathways that make
            public dialogue legible to institutions and communities over time.
          </p>
        </motion.div>
        <motion.div
          custom={1}
          variants={sectionVariants}
          className="rounded-lg border border-border/70 bg-surface/60 p-4 sm:p-5 text-xs sm:text-sm text-text-secondary"
        >
          <p className="font-medium text-text-secondary mb-2">
            What the platform is not
          </p>
          <p>
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
        viewport={{ once: true, margin: "-80px" }}
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
      className="group relative flex flex-col rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6"
    >
      <h3 className="text-sm sm:text-base font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-text-secondary">
        {description}
      </p>
      <ul className="mt-3 space-y-1.5 text-xs text-text-muted">
        {bullets.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[6px] h-[3px] w-[18px] rounded-full bg-accent-soft/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex-1" />
      <div className="mt-3 text-xs">
        <Link
          href={href}
          className="text-text-muted group-hover:text-text-secondary transition-colors"
        >
          View {title.toLowerCase()} structure
        </Link>
      </div>
    </motion.article>
  );
}

