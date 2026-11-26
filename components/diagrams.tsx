/**
 * Two flow diagrams drawn in code (no images): each box is real text, so the
 * diagram reads with CSS off and scales without blur.
 */
const FLOWS = {
  icd: {
    title: 'ICD-11 questionnaire pipeline',
    steps: ['WHO ICD-11 framework', 'Fine-tuned open LLM', 'Guardrails + system prompts', 'Live in Nurture & Zendoc'],
  },
  emr: {
    title: 'EMR pilot flow',
    steps: ['Zenquip app & portals', 'Zenquip EMR module', 'Integration layer', 'Hospital EMR (pilot)'],
  },
} as const;

export function FlowDiagram({ kind }: { kind: keyof typeof FLOWS }) {
  const flow = FLOWS[kind];
  return (
    <figure className="mt-4 rounded-md border border-border bg-background/60 p-3">
      <figcaption className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {flow.title}
      </figcaption>
      <ol className="flex flex-wrap items-center gap-1.5">
        {flow.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <span
              className={[
                'rounded border px-2 py-1 font-mono text-[10px] leading-tight',
                i === flow.steps.length - 1
                  ? 'border-accent bg-accent-muted text-accent-light'
                  : 'border-border-bright text-heading',
              ].join(' ')}
            >
              {s}
            </span>
            {i < flow.steps.length - 1 && (
              <span aria-hidden className="text-accent/60">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
