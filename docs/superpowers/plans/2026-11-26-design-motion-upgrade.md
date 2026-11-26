# Design and motion upgrade: implementation plan

Spec: `docs/superpowers/specs/2026-11-26-design-motion-upgrade-design.md`. No test suite exists; each task is verified with `npm run build` plus a browser check at 375 px and 1440 px, recruiter mode on and off.

## Part A (main)
1. Motion gate: `useCalm()` in `components/ui-mode.tsx` (OS reduced motion OR recruiter); `components/motion-gate.tsx` wraps the page in `MotionConfig`. Remove `Preloader` from `app/page.tsx` and delete `components/preloader.tsx`. Counter skips animation when calm.
2. Reveal: rewrite `components/reveal.tsx` on Motion `whileInView` (margin `0px 0px 15% 0px`, 280 ms, 10 px). CSS: drop old `.reveal` rules; `html:not(.js) [data-motion]` stays visible.
3. Type and contrast: serif headings `font-normal`; `.ghost-num` weight 400; light `--muted-foreground: #5c5852`; About prose `max-w-[62ch]`; KPI numbers larger, tabular.
4. Metrics bento: `Metric` gains `span?: 'wide'` and `viz?`; new `components/metric-viz.tsx` (arc, growth bars, before/after, range); 6-col grid in `app/page.tsx`.
5. Section depth: `components/ghost-num.tsx` (useScroll + useTransform, 16 px) and drawn heading hairline in `components/section.tsx`.
6. Projects: `tags` and `diagram` on `Project`; new `components/projects-grid.tsx` (filter pills, layoutId, layout reflow); `components/diagrams.tsx` (ICD-11 pipeline, EMR pilot flow).
7. Skills: sliding active background, chips split Core / Also.
8. Nav indicator: transform scaleX in `components/sidebar.tsx`.
9. Micro-interactions: whileHover/whileTap on resume, back-to-top, chat launcher; copy morph; ticker pauses on hover/focus.
10. Chat teaser: desktop only. Contact paragraph text fixed to current target roles.
11. Build, browser check, commit.

## Part B (branch bold-prototype)
12. New layout per spec Part B, reusing content and motion gate. Build, preview, commit on branch only.
