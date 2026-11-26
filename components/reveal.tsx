'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCalm } from './ui-mode';

/**
 * Short fade-and-lift on first view. Fires while the element is still 15%
 * below the fold, so content is already settled when it scrolls in and fast
 * scrolling never shows a blank section. Calm mode renders it in place.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const calm = useCalm();
  return (
    <motion.div
      data-motion
      className={className}
      initial={calm ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 15% 0px' }}
      transition={{ duration: 0.28, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
