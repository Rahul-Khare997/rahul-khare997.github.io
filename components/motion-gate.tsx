'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { useUiMode } from './ui-mode';

/** One switch for all Motion animations: recruiter mode forces reduced motion. */
export function MotionGate({ children }: { children: ReactNode }) {
  const { recruiter } = useUiMode();
  return <MotionConfig reducedMotion={recruiter ? 'always' : 'user'}>{children}</MotionConfig>;
}
