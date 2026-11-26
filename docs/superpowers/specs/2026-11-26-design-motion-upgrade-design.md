# Portfolio design and motion upgrade (2026-11-26)

Audience: recruiters and hiring managers for AI implementation, BA and BI roles. Rule: nothing may slow a 10-second scan. Recruiter mode and `prefers-reduced-motion` turn off all motion. Content stays exactly as in `lib/content.ts` (fact-bank aligned); no new claims.

## Part A: upgrade on the current layout (branch `main`)

1. **Preloader:** remove the scroll-locking splash. Replace with a 250 ms top progress line that never blocks input.
2. **Motion gate:** one `MotionConfig` at the root. `reducedMotion="always"` in recruiter mode, `"user"` otherwise. Counter, rotating role, ping dots, ticker and terminal all obey it.
3. **Reveal fix:** replace per-element IntersectionObservers with Motion `whileInView` variants (`viewport: { once: true, amount: 0.15 }`), 10 px lift, 280 ms, 45 ms stagger. Content starts visible when JS or motion is off, so no blank sections.
4. **Type and contrast:** drop `font-bold` on DM Serif Display (single weight 400). Light-theme muted text to `#5c5852` (WCAG AA). Prose capped at 62ch. KPI numbers larger with `tabular-nums`.
5. **Metrics bento:** 6-column bento grid, no orphan card. Small SVG charts drawn on view (`pathLength` 0 to 1): 60% retention arc, AWS cost before/after bars, beta growth bars (5 to 30+ doctors, 20 to 80+ patients), 500-750 hr range bar. Count-ups via Motion `animate` on view. Final values render at once when motion is off.
6. **Section depth:** section ghost numerals move up to 16 px with local scroll (`useScroll` + `useTransform`); heading hairline draws in (`scaleX`). Body text never moves.
7. **Projects filter:** pills All / AI & LLM / Business Analysis / BI & Ops; `layout` reflow and a sliding active pill (`layoutId`). Each project gets a `tags` field in `content.ts`. Remove opacity-60 sibling dimming.
8. **Skills rail:** sliding active background (`layoutId`), chips split into "core" and "working exposure" rows.
9. **Nav indicator:** transform-based (`scaleX`) instead of animating width.
10. **Micro-interactions:** hover lift and press scale on resume, copy-email, back-to-top, AI chat launcher; copy to copied morph; ticker pauses on hover and focus.
11. **Two code-drawn diagrams** (inline SVG, no AI images): ICD-11 LLM pipeline (questionnaire, fine-tuned model, guardrails, Nurture/Zendoc) and EMR pilot flow (Zenquip EMR module, integration, hospital EMR). Shown inside the matching project cards.
12. **AI chat teaser:** never covers content on mobile (shown only after first scroll stop, smaller, dismiss persists).

No AI-generated images, no AI headshot (Gemini review agrees: synthetic art and charts cost credibility for a BI candidate).

Done when: `npm run build` clean; no console errors; no blank sections on fast scroll at 375 px and 1440 px; recruiter mode shows zero motion; Lighthouse performance and accessibility not lower than before.

## Part B: bold redesign prototype (branch `bold-prototype`, never merged without approval)

Goal: show a bolder look while keeping scan speed. Built on a separate branch, previewed locally only.

- **Hero, full width, first screen:** name, title, one-line pitch, three headline numbers (30+ doctors / 80+ patients, ICD-11 live in 2 products, 500-750 hrs saved) and the resume button. Everything a recruiter needs is above the fold.
- **Sticky skim bar** after the hero: role, location, notice period, resume and email, always one click away.
- **One pinned scroll story only** (ICD-11 and EMR case study, 3 steps, about 1.5 screens of scroll). A "skip" link jumps past it; recruiter mode shows the 3 steps as a plain list.
- **Projects as a horizontal rail** with arrow keys and a visible "show all as list" toggle; no hidden content.
- **Bigger editorial type**, larger section breaks, gold used for data only.
- **Same fact content, same motion gate,** same recruiter mode.

Done when: builds clean, previews locally, and Rahul compares A and B side by side before anything is pushed.
