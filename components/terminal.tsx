'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '@/lib/content';
import { toggleTheme } from './ui-mode';

type Line = { html: string };

const HELP = [
  '<b>Available commands</b>',
  '  <b>skills</b>      - core competencies &amp; tooling',
  '  <b>experience</b>  - roles &amp; tenure',
  '  <b>certs</b>       - certifications',
  '  <b>contact</b>     - how to reach Rahul',
  '  <b>resume</b>      - download the PDF',
  '  <b>theme</b>       - toggle light / dark',
  '  <b>clear</b>       - clear the screen',
  '  <b>exit</b>        - close the terminal  <i>(or press ` / Esc)</i>',
].join('\n');

const TEXT: Record<string, string> = {
  help: HELP,
  skills: [
    'AI &amp; LLMs                  <i>Fine-tuning · guardrails · Claude Code · MCP · agentic workflows</i>',
    'Business Analysis          <i>Requirements · user stories · UAT · EMR integration</i>',
    'BI &amp; Dashboards            <i>Power BI · Excel VBA · Power Query · KPI reporting</i>',
    'Product &amp; Delivery         <i>Scrum · PRDs · roadmaps · Jira / Confluence</i>',
    'Platform &amp; Integrations    <i>AWS · WhatsApp · Razorpay · SES/SNS</i>',
    'Brokerage Operations       <i>Order execution · reconciliation · T+1 settlement</i>',
    'KYC / AML &amp; Privacy        <i>CDD/EDD · PEP · sanctions screening · DPDP Act / GDPR</i>',
  ].join('\n'),
  experience: [
    '<b>Zenquip Healthcare Pvt. Ltd.</b>  <i>Nov 2025 - Present · Jaipur, India · Remote</i>',
    '  Product &amp; Operations Lead · LLM fine-tuning, EMR pilot, delivery',
    '<b>TD Bank Group (TD Direct Investing)</b>  <i>Oct 2021 - Feb 2025 · 3+ yrs</i>',
    '  Registered Investment Representative · CIRO-registered at TD · Toronto',
    '<b>The Home Depot of Canada</b>  <i>Mar 2019 - Oct 2021</i>',
    '  Head Cashier (part-time) · till reconciliation, SAP invoicing',
    '<b>ATA Freight India</b>  <i>Jun 2017 - Aug 2017</i>',
    '  Business Analyst Intern · SAP NetWeaver invoicing, variance reports',
  ].join('\n'),
  certs: [
    "CSI (Canada's securities education and examination body; India reference point: NISM):",
    '  <b>CSC</b> · <b>CPH</b> · <b>DFOL</b> · <b>PFSA</b>',
    '  CIRO-registered Investment Representative at TD <i>(Oct 2021 - Feb 2025)</i>',
    '  Anthropic Academy courses <i>(completed 2026)</i>: Claude API · Claude Code in Action · MCP · AI Fluency',
  ].join('\n'),
  contact: [
    `email     <b>${profile.email}</b>`,
    `phone     <b>${profile.phone}</b>`,
    'linkedin  <b>linkedin.com/in/rahulkhare997</b>',
    'location  <i>Greater Noida, Delhi NCR · notice period 2 weeks · open to Gurugram / Pune / Bengaluru</i>',
  ].join('\n'),
};

/** Backtick-toggled terminal. Same command set as the original site. */
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const print = useCallback((html: string) => setLines((l) => [...l, { html }]), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const tag = el?.tagName ?? '';
      const typing = (tag === 'INPUT' || tag === 'TEXTAREA') && el !== inputRef.current;

      if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (lines.length === 0) {
      print('<b>RK Terminal v1.0</b> <i>· AI, BA &amp; BI portfolio</i>');
      print('<i>Type</i> help <i>for commands.</i>');
      print('');
    }
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open, lines.length, print]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    // Escape the echo — the input is user-controlled and rendered as HTML.
    print(`<b>%</b> ${cmd.replace(/&/g, '&amp;').replace(/</g, '&lt;')}`);
    const c = cmd.toLowerCase();

    if (c === 'clear') return setLines([]);
    if (c === 'exit') return setOpen(false);
    if (c === 'resume') {
      print('<i>Opening résumé PDF…</i>');
      window.location.href = profile.resume;
      return;
    }
    if (c === 'theme') {
      // Through the shared store, not the DOM directly — otherwise the
      // sidebar toggle's icon and aria-pressed go stale.
      toggleTheme();
      print('<i>Theme toggled.</i>');
      return;
    }
    if (TEXT[c]) {
      print(TEXT[c]);
      print('');
      return;
    }
    print(`<i>command not found:</i> ${c.replace(/</g, '&lt;')} <i>· try</i> help`);
    print('');
  }

  if (!open) return null;

  /* Deliberately no exit animation and no AnimatePresence here: an exit that
     fails to complete would leave a modal on screen that Escape appears not to
     close. Unmounting immediately is the safe failure mode; only the entrance
     is animated. */
  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 no-print"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-label="Terminal"
      aria-modal="true"
    >
      <motion.div
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-border-bright bg-[#050d1a] shadow-2xl"
        initial={reduced ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
            <div className="flex items-center gap-2 border-b border-border bg-white/[0.03] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-[11px] text-[#838b9f]">
                rahul@portfolio — ~ — zsh
              </span>
            </div>

            <div
              ref={bodyRef}
              className="h-[min(60vh,26rem)] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed text-[#9ea4b0]"
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className="whitespace-pre-wrap [&_b]:text-[#c9a84c] [&_i]:text-[#5f6880] [&_i]:not-italic"
                  dangerouslySetInnerHTML={{ __html: l.html }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-border px-4 py-2.5">
              <span className="font-mono text-[12.5px] text-[#c9a84c]">rahul@portfolio ~ %</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    run(value);
                    setValue('');
                  }
                }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="flex-1 bg-transparent font-mono text-[12.5px] text-[#e8e6e0] outline-none"
              />
        </div>
      </motion.div>
    </div>
  );
}
