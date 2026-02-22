"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type BoardMember = {
  name: string;
  photo: string;
};

type AnimatedBoardMembersProps = {
  members: readonly BoardMember[];
  memberLabel: string;
  boardTitle: string;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedBoardMembers({ members, memberLabel, boardTitle }: AnimatedBoardMembersProps) {
  return (
    <motion.ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label={boardTitle}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {members.map((member) => (
        <motion.li
          key={member.name}
          role="listitem"
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.012 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="board-member-card rounded-2xl border border-line/80 bg-white/80 p-4 shadow-[0_14px_30px_-24px_rgba(8,55,88,0.85)]"
        >
          <div className="flex items-center gap-4">
            <div className="board-member-photo relative h-16 w-16 overflow-hidden rounded-full border border-[#e1d8c8] bg-[#f6f2e8]">
              <Image src={member.photo} alt={member.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{member.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">{memberLabel}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
