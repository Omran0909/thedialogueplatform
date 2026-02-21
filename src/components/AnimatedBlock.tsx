"use client";

import { motion } from "framer-motion";

type AnimatedProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function joinClassName(className?: string) {
  return className ? className : "";
}

export function Reveal({ children, className, delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      className={joinClassName(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ children, className, delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      className={joinClassName(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
