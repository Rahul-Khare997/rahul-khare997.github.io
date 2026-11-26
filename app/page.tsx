import { Sidebar } from '@/components/sidebar';
import { Section } from '@/components/section';
import { Spotlight } from '@/components/spotlight';
import { Reveal } from '@/components/reveal';
import { Counter } from '@/components/counter';
import { MetricViz } from '@/components/metric-viz';
import { Rich } from '@/components/rich';
import { MotionGate } from '@/components/motion-gate';
import { Masthead } from '@/components/masthead';
import { Terminal } from '@/components/terminal';
import { AiChat } from '@/components/ai-chat';
import { ExperienceTabs } from '@/components/experience-tabs';
import { Logo } from '@/components/logo';
import { SkillsTabs } from '@/components/skills-tabs';
import { ProjectsGrid } from '@/components/projects-grid';
import { Availability, ContactForm, CopyEmail } from '@/components/contact';
import {
  BackToTop,
  ModeControls,
  RecruiterBar,
  ScrollProgress,
  Ticker,
} from '@/components/chrome';
import {
  about,
  awards,
  certifications,
  earlierRoles,
  education,
  experience,
  metrics,
  profile,
} from '@/lib/content';

export default function Home() {
  return (
    <MotionGate>
      <ScrollProgress />
      <Spotlight />
      <Terminal />
      <div className="grid-bg" aria-hidden />
      {/* Oversized RK mark ghosted behind the reading column, like the
          section numerals. Hidden in recruiter mode and print. */}
      <div className="rk-watermark no-print" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="assets/brand/rk-mark.png" alt="" />
      </div>

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Ticker />
      <Masthead />

      {/* Desktop: theme + recruiter controls pinned top-right, outside the
          sticky sidebar — a short viewport can never hide them there. The
          sidebar renders its own copy below lg. */}
      <div className="fixed right-6 top-4 z-40 hidden rounded-full border border-border bg-glass p-1.5 backdrop-blur-md lg:block no-print">
        <ModeControls />
      </div>

      {/* Asymmetric gutters: the identity column sits close to the left edge so
          the reading column gets the width. */}
      <div className="relative z-10 mx-auto min-h-screen max-w-[1560px] px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 lg:pl-10 lg:pr-12 xl:pl-16 xl:pr-20">
        <div className="lg:flex lg:justify-between lg:gap-8">
          <Sidebar />

          <main id="content" className="pt-14 lg:w-[62%] lg:pb-20 lg:pt-12">
            {/* ABOUT */}
            <Section id="about" label="Profile" num="01" eyebrow="Who I am">
              <div className="max-w-[62ch] space-y-4 leading-relaxed">
                {about.map((p, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <p>
                      <Rich text={p} />
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={120}>
                <div className="mt-8 rounded-md border border-border bg-surface/50 p-4">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
                    Performance highlights
                  </div>
                  <ul className="grid gap-1.5 text-sm">
                    {awards.map((a) => (
                      <li key={a} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </Section>

            {/* METRICS */}
            <Section id="impact" label="Key Metrics" num="02" eyebrow="By the numbers">
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
                {metrics.map((m, i) => (
                  <Reveal
                    key={m.label}
                    delay={i * 45}
                    className={m.span === 'wide' ? 'sm:col-span-2 lg:col-span-4' : 'lg:col-span-2'}
                  >
                    <div
                      className={[
                        'flex h-full flex-col p-5 transition-colors duration-200 hover:bg-surface-2',
                        m.feature ? 'bg-surface' : 'bg-background',
                      ].join(' ')}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-mono text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-none tabular-nums text-accent">
                            <Counter
                              value={m.value}
                              target={m.target}
                              prefix={m.prefix}
                              suffix={m.suffix}
                            />
                          </div>
                          <div className="mt-2 text-sm font-semibold text-heading">{m.label}</div>
                        </div>
                        {m.viz?.kind === 'arc' && <MetricViz viz={m.viz} />}
                      </div>
                      {m.viz && m.viz.kind !== 'arc' && (
                        <div className="mt-4">
                          <MetricViz viz={m.viz} />
                        </div>
                      )}
                      <div className="mt-auto pt-3 text-xs leading-relaxed text-muted-foreground">
                        {m.detail}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Section>

            {/* SKILLS */}
            <Section id="skills" label="Skills & Expertise" num="03" eyebrow="Competencies">
              <SkillsTabs />
            </Section>

            {/* EXPERIENCE */}
            <Section id="experience" label="Work Experience" num="04" eyebrow="Career">
              <div className="space-y-14">
                {experience.map((role) => (
                  <Reveal key={role.id}>
                    <ExperienceTabs role={role} />
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {earlierRoles.map((r) => (
                    <div key={r.company} className="rounded-md border border-border bg-surface/50 p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <Logo logo={r.logo} size={38} alt={`${r.company} logo`} />
                        <div>
                          <div className="text-[13px] font-semibold text-heading">{r.company}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {r.meta}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{r.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Section>

            {/* PROJECTS */}
            <Section id="projects" label="Key Projects" num="05" eyebrow="Impact">
              <ProjectsGrid />
            </Section>

            {/* EDUCATION */}
            <Section id="education" label="Education & Certifications" num="06" eyebrow="Academics">
              <ol className="mb-10">
                {education.map((e) => (
                  <Reveal key={e.degree}>
                    <li className="mb-6 grid gap-1 sm:grid-cols-8 sm:gap-6">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent sm:col-span-3">
                        {e.year}
                      </p>
                      <div className="sm:col-span-5">
                        <h3 className="text-sm font-semibold leading-snug text-heading">
                          {e.degree}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {e.school} · {e.note}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>

              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
                Certifications &amp; courses
              </div>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                {certifications.note}
              </p>
              <ul className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
                {certifications.items.map((c) => (
                  <li key={c.name} className="bg-background p-3">
                    <div className="text-[13px] font-medium text-heading">{c.name}</div>
                    <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                      {c.issuer}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            {/* CONTACT */}
            <Section id="contact" label="Let’s Connect" num="07" eyebrow="Contact">
              <p className="mb-6 leading-relaxed">
                Open to AI implementation, business analyst, BI and MIS analyst, digital health
                product and product operations roles across India.{' '}
                <strong className="font-semibold text-accent-light">Notice period: 2 weeks.</strong>
              </p>

              <ContactForm />

              <div className="mt-6 grid gap-2">
                <a
                  href={profile.contactForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md border border-border-bright bg-accent-muted p-4 transition-colors hover:border-accent"
                >
                  <span className="text-accent">✉</span>
                  <span className="flex-1">
                    <span className="block text-[13px] font-semibold text-accent-light">
                      Send me a message
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
                      Opens Google Form · your details stay private
                    </span>
                  </span>
                  <span className="text-accent">↗</span>
                </a>

                <div className="flex items-center gap-3 rounded-md border border-border p-4">
                  <span className="font-mono text-accent">@</span>
                  <a href={`mailto:${profile.email}`} className="flex-1 text-sm hover:text-accent">
                    {profile.email}
                  </a>
                  <CopyEmail />
                </div>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md border border-border p-4 text-sm transition-colors hover:text-accent"
                >
                  <span className="font-mono text-accent">in</span>
                  linkedin.com/in/rahulkhare997
                </a>

                <a
                  href={profile.resume}
                  download
                  className="flex items-center gap-3 rounded-md border border-border p-4 transition-colors hover:text-accent"
                >
                  <span className="text-accent">↓</span>
                  <span>
                    <span className="block text-[13px] font-semibold text-heading">
                      Download Résumé (PDF)
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
                      Current version · one page
                    </span>
                  </span>
                </a>
              </div>

              <div className="mt-10">
                <Availability />
              </div>
            </Section>

            <footer className="flex items-center gap-3 border-t border-border pb-24 pt-6 font-mono text-[10px] text-muted-foreground lg:pb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="assets/brand/rk-mark.png"
                alt=""
                width={20}
                height={24}
                className="h-6 w-auto opacity-70"
              />
              <span>
                © {new Date().getFullYear()} {profile.name} · rahul-khare997.github.io · Built with
                Next.js, Tailwind CSS and Framer Motion
              </span>
            </footer>
          </main>
        </div>
      </div>

      <AiChat />
      <BackToTop />
      <RecruiterBar />
    </MotionGate>
  );
}
