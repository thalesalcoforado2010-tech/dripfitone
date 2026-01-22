// components/ScrollReveal.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;

  /** delay em ms (ex: 120, 240) */
  delayMs?: number;

  /** animação base */
  y?: number;

  /** revela apenas 1x */
  once?: boolean;

  /** margem do viewport (framer) */
  margin?: string;
};

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  y = 24,
  once = true,
  margin = "-120px",
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.6, ease: "easeOut", delay: delayMs / 1000 }}
    >
      {children}
    </motion.div>
  );
}
