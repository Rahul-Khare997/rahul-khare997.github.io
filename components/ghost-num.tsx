'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useCalm } from './ui-mode';

/** Section numeral that drifts 16 px with scroll. Body text never moves. */
export function GhostNum({ num }: { num: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);
  return (
    <motion.span
      ref={ref}
      className="ghost-num hidden lg:block"
      style={calm ? undefined : { y }}
      aria-hidden
    >
      {num}
    </motion.span>
  );
}

/** Hairline under a section heading that draws in once on view. */
export function SectionRule() {
  const calm = useCalm();
  return (
    <motion.span
      aria-hidden
      data-motion
      className="mt-4 hidden h-px w-full origin-left bg-border-bright lg:block"
      initial={calm ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
