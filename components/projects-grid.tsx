'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useState } from 'react';
import { projectFilters, projects, type ProjectTag } from '@/lib/content';
import { FlowDiagram } from './diagrams';
import { useCalm } from './ui-mode';

const SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const;

/** Filterable project cards. Filters only narrow the list; "All" shows every card. */
export function ProjectsGrid() {
  const [filter, setFilter] = useState<'all' | ProjectTag>('all');
  const calm = useCalm();
  const shown = filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter));
  const t = calm ? { duration: 0 } : SPRING;

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter projects" className="mb-5 flex flex-wrap gap-2 no-print">
        {projectFilters.map((f) => {
          const on = f.id === filter;
          const count =
            f.id === 'all' ? projects.length : projects.filter((p) => p.tags.includes(f.id as ProjectTag)).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={[
                'relative rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-200',
                on ? 'border-accent text-accent-foreground' : 'border-border-bright text-muted-foreground hover:text-heading',
              ].join(' ')}
            >
              {on && (
                <motion.span
                  layoutId="project-filter"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={t}
                />
              )}
              <span className="relative">
                {f.label} <span className="opacity-70">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        Showing {shown.length} of {projects.length} projects
      </p>
      <motion.ol layout={!calm} className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.num}
              layout={!calm}
              initial={calm ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={calm ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.97 }}
              transition={t}
              className={p.diagram ? 'sm:col-span-2' : undefined}
            >
              <div className="h-full rounded-md border border-border bg-surface/40 p-5 transition-colors duration-200 hover:border-border-bright">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-accent/60">{p.num}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    {p.tags.map((tag) => projectFilters.find((f) => f.id === tag)?.label).join(' · ')}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-heading">{p.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {p.org}
                </p>
                <p className="mt-3 text-xs leading-relaxed">{p.description}</p>
                {p.diagram && <FlowDiagram kind={p.diagram} />}
                <p className="mt-3 border-t border-border pt-3 font-mono text-[11px] text-accent-light">
                  {p.impact}
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>
    </LayoutGroup>
  );
}
