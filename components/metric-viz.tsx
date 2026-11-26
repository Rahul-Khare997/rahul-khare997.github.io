'use client';

import { motion } from 'motion/react';
import type { MetricViz } from '@/lib/content';
import { useCalm } from './ui-mode';

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEW = { once: true, amount: 0.4 } as const;

/**
 * Small charts for the metrics bento. Each one draws once on view; in calm
 * mode (recruiter mode or reduced motion) it renders finished. Every chart
 * carries the numbers as text too, so nothing depends on reading a shape.
 */
export function MetricViz({ viz }: { viz: MetricViz }) {
  const calm = useCalm();
  const t = (d = 0) => ({ duration: calm ? 0 : 0.9, delay: calm ? 0 : d, ease: EASE });

  if (viz.kind === 'arc') {
    const r = 22;
    return (
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" className="stroke-border" />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className="stroke-accent"
          initial={calm ? false : { pathLength: 0 }}
          whileInView={{ pathLength: viz.pct / 100 }}
          animate={calm ? { pathLength: viz.pct / 100 } : undefined}
          viewport={VIEW}
          transition={t(0.1)}
        />
      </svg>
    );
  }

  if (viz.kind === 'growth') {
    const max = Math.max(...viz.rows.map((r) => r.to));
    return (
      <div className="grid gap-2.5" aria-hidden>
        {viz.rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {r.label}
            </span>
            <div className="relative h-2.5 rounded-sm bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-sm bg-accent"
                style={{ width: `${(r.to / max) * 100}%` }}
                initial={calm ? false : { scaleX: r.from / r.to }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEW}
                transition={t(0.15 + i * 0.12)}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-sm bg-heading/40"
                style={{ width: `${(r.from / max) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-accent-light">
              {r.from} → {r.to}+
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (viz.kind === 'compare') {
    const pct = (n: number) => `${(n / viz.before) * 100}%`;
    return (
      <div className="grid gap-2.5" aria-hidden>
        <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Before
          </span>
          <div className="flex items-center gap-2">
            <div className="h-2.5 flex-1 rounded-sm bg-heading/40" />
            <span className="font-mono text-[10px] text-muted-foreground">~2,000</span>
          </div>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            After
          </span>
          <div className="flex items-center gap-2">
            <div className="relative h-2.5 flex-1">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-sm bg-accent"
                style={{ width: pct(viz.afterLo) }}
                initial={calm ? false : { scaleX: viz.before / viz.afterLo }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEW}
                transition={t(0.15)}
              />
              <div
                className="absolute inset-y-0 rounded-r-sm bg-accent/35"
                style={{ left: pct(viz.afterLo), width: pct(viz.afterHi - viz.afterLo) }}
              />
            </div>
            <span className="font-mono text-[10px] text-accent-light">1,600-1,800</span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">{viz.unit}</span>
      </div>
    );
  }

  // range
  const left = (viz.lo / viz.max) * 100;
  const width = ((viz.hi - viz.lo) / viz.max) * 100;
  return (
    <div aria-hidden>
      <div className="relative h-2.5 rounded-sm bg-border">
        <motion.div
          className="absolute inset-y-0 origin-left rounded-sm bg-accent"
          style={{ left: `${left}%`, width: `${width}%` }}
          initial={calm ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEW}
          transition={t(0.15)}
        />
      </div>
      <div className="relative mt-1.5 h-3 font-mono text-[10px] text-muted-foreground">
        <span className="absolute left-0">0</span>
        <span className="absolute -translate-x-1/2 text-accent-light" style={{ left: `${left}%` }}>
          500
        </span>
        <span
          className="absolute -translate-x-1/2 text-accent-light"
          style={{ left: `${left + width}%` }}
        >
          750
        </span>
        <span className="absolute right-0">hrs / yr</span>
      </div>
    </div>
  );
}
