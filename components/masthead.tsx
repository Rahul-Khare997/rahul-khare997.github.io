'use client';

import { motion } from 'motion/react';
import { profile } from '@/lib/content';
import { useCalm } from './ui-mode';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Full-width name header (from the bold prototype) above the two-column page. */
export function Masthead() {
  const calm = useCalm();
  const rise = (i: number) =>
    calm
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.05 + i * 0.08, ease: EASE },
        };

  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="bold-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1560px] px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-24 lg:pl-10 lg:pr-12 xl:pl-16 xl:pr-20">
        <motion.div
          {...rise(0)}
          data-motion
          className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
        >
          {profile.role}
        </motion.div>
        <motion.h1
          {...rise(1)}
          data-motion
          className="mt-6 font-serif text-[clamp(3.4rem,11vw,9.5rem)] font-normal leading-[0.9] tracking-tight text-heading"
        >
          Rahul <em className="not-italic text-accent">Khare</em>
        </motion.h1>
      </div>
    </header>
  );
}
