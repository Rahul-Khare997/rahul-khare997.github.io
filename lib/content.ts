import type { LogoSpec } from '@/components/logo';

/**
 * Single source of truth for every fact on the page.
 * Mirrors public/assets/Rahul_Khare_Resume.pdf and the Master Fact Bank — when the PDF changes, change
 * this file, not the components.
 */

export const profile = {
  name: 'Rahul Khare',
  role: 'Product & Operations Lead · AI & Digital Health',
  headline:
    'AI Implementation · Business Analysis · BI & Dashboards · Digital Health Product',
  typedRoles: [
    'AI Implementation',
    'Business Analysis',
    'BI & Dashboards',
    'Digital Health Product',
  ],
  blurb:
    'I set up and fine-tune the AI models behind an early-stage mental-healthcare platform, work on its EMR pilot with hospitals, and build the reports and dashboards teams run on.',
  photo: 'assets/rahul.jpg',
  location: 'Greater Noida, Delhi NCR, India',
  notice: 'Notice period: 2 weeks',
  openTo: ['Delhi NCR', 'Gurugram', 'Noida', 'Pune', 'Bengaluru', 'Hyderabad', 'Mumbai'],
  targetRoles: [
    'AI Implementation',
    'Business Analyst',
    'BI / MIS Analyst',
    'Digital Health Product & Operations',
    'Product Operations',
  ],
  email: 'rahul.khare997@gmail.com',
  phone: '+91-9890555475',
  linkedin: 'https://linkedin.com/in/rahulkhare997',
  github: 'https://github.com/Rahul-Khare997',
  resume: 'assets/Rahul_Khare_Resume.pdf',
  contactForm:
    'https://docs.google.com/forms/d/e/1FAIpQLScIURqXHX0ZE2JzZBqTpFaKFpAnItw7x23Crsq5yoRlxjzCNg/viewform',
} as const;

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Metrics' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export const about = [
  'Product & Operations Lead at **Zenquip Healthcare**, an early-stage AI mental-healthcare platform, since Nov 2025. Before that, 3+ years at **TD Direct Investing** (TD Bank Group) in Toronto, in CIRO-regulated brokerage operations and reporting.',
  'At Zenquip I fine-tuned open LLMs (NVIDIA Nemotron and GPT-OSS 120B) for an **ICD-11 questionnaire** built on the WHO framework, now live in Nurture and Zendoc. I set up our models with guardrails and system prompts, work on the **EMR module now in pilot with several hospitals**, and automate the daily and weekly reports to leadership with Claude Code. The private beta has grown to **30+ doctors and 80+ patients**.',
  'At TD I built **6+ MIS and KPI dashboards** in Excel VBA, Power Query and Power BI that saved an estimated **500 to 750 team hours a year**, wrote requirements and supported UAT for a trading-platform migration, and designed and delivered T+1 settlement training to **60+ representatives**.',
  'Relocated from Canada to India in 2025. Four Canadian Securities Institute designations. CIRO-registered Investment Representative at TD from Oct 2021 to Feb 2025.',
];

export type MetricViz =
  | { kind: 'arc'; pct: number }
  | { kind: 'growth'; rows: { label: string; from: number; to: number }[] }
  | { kind: 'compare'; unit: string; before: number; afterLo: number; afterHi: number }
  | { kind: 'range'; lo: number; hi: number; max: number };

export type Metric = {
  value: string;
  target?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  feature?: boolean;
  /** 'wide' spans 4 of 6 bento columns (2 of 2 on tablet). */
  span?: 'wide';
  viz?: MetricViz;
};

/** Order is the bento layout: wide + narrow pairs, then a row of three. */
export const metrics: Metric[] = [
  {
    value: '30+ / 80+',
    label: 'Doctors and patients in the private beta',
    detail: 'Zenquip · also 8+ clinics and hospitals',
    feature: true,
    span: 'wide',
    viz: {
      kind: 'growth',
      rows: [
        { label: 'Doctors', from: 5, to: 30 },
        { label: 'Patients', from: 20, to: 80 },
      ],
    },
  },
  {
    value: '60%',
    target: 60,
    suffix: '%',
    label: 'Demo-to-beta retention',
    detail: 'Zenquip · of 40+ product-demo participants',
    viz: { kind: 'arc', pct: 60 },
  },
  {
    value: '2',
    target: 2,
    label: 'Products running the ICD-11 questionnaire',
    detail: 'Zenquip · Nurture and Zendoc, on fine-tuned open LLMs',
  },
  {
    value: '10-20%',
    label: 'Monthly AWS cost cut',
    detail: 'Zenquip · about USD 2,000 a month down to USD 1,600 to 1,800',
    feature: true,
    span: 'wide',
    viz: { kind: 'compare', unit: 'USD / month', before: 2000, afterLo: 1600, afterHi: 1800 },
  },
  {
    value: '500-750',
    label: 'Team hours saved a year',
    detail: 'TD · estimated, from 6+ MIS and KPI dashboards',
    feature: true,
    span: 'wide',
    viz: { kind: 'range', lo: 500, hi: 750, max: 1000 },
  },
  {
    value: '60+',
    target: 60,
    suffix: '+',
    label: 'Representatives trained on T+1',
    detail: 'TD · designed and delivered before the May 2024 changeover',
  },
  {
    value: 'Rs 10 Cr',
    label: 'Committed funding allocation plan',
    detail: 'Zenquip · prepared with the finance manager; committed, not yet received',
  },
  {
    value: 'Rs 70K',
    label: 'Nurture revenue, first 30 days',
    detail: 'Zenquip · about 2,500 website visitors',
  },
  {
    value: '60+',
    target: 60,
    suffix: '+',
    label: 'Data sources consolidated',
    detail: 'TD · files, SharePoint lists and Tableau extracts in role-based reports',
  },
];

export type Track = {
  id: string;
  label: string;
  bullets: string[];
  highlights: string[];
};

export type Role = {
  id: string;
  period: string;
  company: string;
  companySub: string;
  role: string;
  metaRight: string[];
  logo: LogoSpec;
  tracks: Track[];
  current?: boolean;
};

export const experience: Role[] = [
  {
    id: 'zenquip',
    period: 'Nov 2025 - Present',
    company: 'Zenquip Healthcare Pvt. Ltd.',
    companySub:
      'Early-stage AI-driven mental-healthcare platform · Zenquip (B2B to clinics, hospitals and corporates) and Nurture (direct to parents) · private beta',
    role: 'Product & Operations Lead',
    metaRight: ['Jaipur, India · Remote', 'Nov 2025 - Present · Current Role'],
    // Real mark. Drop a file in public/assets/logos and point `src` at it;
    // without `src` the monogram tile is used instead.
    logo: { src: 'assets/logos/zenquip.png', text: 'ZQ', color: '#0e8f86', bg: '#ffffff' },
    current: true,
    tracks: [
      {
        id: 'ai',
        label: 'AI & LLMs',
        bullets: [
          'Fine-tuned open LLMs (**NVIDIA Nemotron and GPT-OSS 120B**) on rented GPUs for an ICD-11 questionnaire built on the WHO framework, now **live in Nurture and Zendoc**. Now training our own model on a rented GPU.',
          'Picked the AI models used across both products and set them up with **guardrails, system instructions and prompts**.',
          'Upgraded the patient app, clinician web portals and the AI assistant “Zennie”, first built by the CTO, with AI-assisted development (Claude Code, Cursor, Copilot).',
          'Automated the **daily progress and weekly KPI reports** to leadership with scheduled Claude Code loops and custom AI skills.',
        ],
        highlights: ['Nemotron · GPT-OSS 120B', 'ICD-11 live in 2 products', 'Guardrails & prompts', 'Claude Code automation'],
      },
      {
        id: 'emr',
        label: 'EMR & Integrations',
        bullets: [
          'Work on the **Zenquip EMR module** and its integration with hospital EMR systems, now **in pilot with several hospitals**. Pitch it to investors, hospitals, clinics and doctors.',
          'Implemented **Nurture** on CTO-defined infrastructure: admin portal, a links-and-QR page that issues UTM links per campaign and partner, and **WhatsApp, Razorpay and AWS SES/SNS** integrations.',
          'Implemented an analytics view in the Nurture admin panel: visitors, sign-ups, paid unlocks, revenue, checkout conversion, refunds and payment failure rate.',
          'Nurture drew about **2,500 website visitors and about Rs 70,000 in revenue** in its first 30 days.',
        ],
        highlights: ['EMR pilot', 'WhatsApp · Razorpay', 'AWS SES/SNS', 'Admin analytics'],
      },
      {
        id: 'delivery',
        label: 'Product & Delivery',
        bullets: [
          'Run daily Scrum and the delivery cycle in **Jira and Confluence**: user stories, backlog grooming and sprint tracking through release. Releases go to production every 1 to 2 weeks.',
          'Direct the day-to-day work of 4 (2 developers, 2 marketing) and coordinate the rest of a **15-person team**.',
          'Wrote the **PRDs, roadmap and go-to-market plan** for a B2B model selling to clinics, hospitals and corporates, and run the product demos.',
          'Grew the private beta from 5 doctors and 20 patients to **30+ doctors, 8+ clinics and hospitals and 80+ patients**. About 60% of 40+ demo participants stayed on.',
        ],
        highlights: ['Scrum · Jira', 'Releases every 1-2 weeks', 'PRDs & roadmap', '30+ doctors · 80+ patients'],
      },
      {
        id: 'finance',
        label: 'Finance, Compliance & Content',
        bullets: [
          'Prepared, with the finance manager, the allocation plan for **Rs 10 Cr in committed funding**, using AI-assisted analysis of burn rates and cost projections.',
          'Cut monthly AWS cost from about **USD 2,000 to USD 1,600 to 1,800**. Manage the AWS account (EC2, Lambda, Amplify, CloudWatch, Route 53, Bedrock): access, alerts and monthly cost review.',
          'Built **DPDP Act and GDPR** compliance into the product: consent flows, data-handling standards and audit-ready records.',
          'Made mental-wellbeing explainer videos (ABC model, CBT) and marketing videos with **Higgsfield and ElevenLabs**, and worked on SEO and Meta ads.',
        ],
        highlights: ['Rs 10 Cr committed', 'AWS cost cut', 'DPDP Act · GDPR', 'AI video'],
      },
    ],
  },
  {
    id: 'td',
    period: 'Oct 2021 - Feb 2025',
    company: 'TD Bank Group (TD Direct Investing)',
    companySub:
      'TD Bank Group’s self-directed brokerage · CIRO-regulated · high-value client accounts · Toronto, Canada',
    role: 'Registered Investment Representative',
    metaRight: ['CIRO-registered at TD, Oct 2021 - Feb 2025', '3+ years'],
    logo: { src: 'assets/logos/td.png', text: 'TD', color: '#00B140', bg: '#ffffff' },
    tracks: [
      {
        id: 'mis',
        label: 'MIS & Dashboards',
        bullets: [
          'Built **6+ MIS and KPI dashboards** in Excel VBA, Power Query and Power BI, pulling 60+ files, SharePoint lists and Tableau extracts into role-based reports for **80+ representatives, 6+ team leads, 2 group managers, 2 VPs and 1 president**.',
          'Saved an estimated **500 to 750 team hours a year**. Checked totals against source files and kept a reference sheet for every source and calculation.',
          'Dashboards covered agent productivity, service levels, cash transfers, business activity and operational exceptions on daily to quarterly cycles.',
          'Supported the build of a SharePoint dashboard tracking platform migration, trading volumes and adoption, replacing Excel tracking.',
          'Drafted **7 to 10 documents a day**, such as root cause summaries and escalation notes, with TD-GPT, TD’s internal AI pilot (2024).',
        ],
        highlights: ['6+ dashboards', '60+ sources', '500-750 hrs a year', '80+ users', 'TD-GPT pilot'],
      },
      {
        id: 'ba',
        label: 'Business Analysis',
        bullets: [
          'During the thinkorswim to Active Trader migration, gathered user feedback, helped write requirements for IT and the PMO (including GTC and all-or-none orders) and supported **UAT and parallel testing**.',
          'Ran root cause analysis on recurring errors as floor subject matter expert on Active Trader, WebBroker, Croesus, ISM and CPM, and proposed control changes.',
          'Gave compliance feedback on client authentication procedures and helped revise them.',
        ],
        highlights: ['Requirements', 'UAT · parallel testing', 'Root cause analysis', 'Floor SME'],
      },
      {
        id: 'ops',
        label: 'Brokerage Operations',
        bullets: [
          'Executed **25+ client orders a day** across equities, fixed income, ETFs, mutual funds, options, GICs and bullion in Kyndryl ISM, including single orders of CAD 1M+.',
          'Reconciled flagged cash and security transactions across 20 to 30 HNI accounts. Cleared about 60% of exceptions without escalation, most within 48 hours.',
          'Processed 20 to 25 USD/CAD FX transactions a week and 15+ cross-border transfers a month, each within a CAD 1M authority.',
          'Processed Fundserv mutual fund trades, corporate action elections, ATON/CDS transfers and RRSP, TFSA, RESP and RRIF operations.',
        ],
        highlights: ['25+ orders a day', 'CAD 1M+ orders', 'Reconciliation', 'Fundserv · ATON'],
      },
      {
        id: 'kyc',
        label: 'KYC / AML',
        bullets: [
          'Reviewed and updated KYC/CDD profiles for individuals, corporates, trusts and partnerships in CPM with Refinitiv-integrated screening, to a 3-day internal SLA.',
          'Applied enhanced due diligence on about one in three interactions, ran PEP, sanctions and adverse media checks, and documented each disposition.',
          'Flagged and escalated red flags (suspicious trading patterns, off-market rates, cancel-and-amend anomalies) and filed breach reports to TD compliance daily.',
          'Handled FATCA and CRS documentation and kept account files audit-ready.',
        ],
        highlights: ['CDD · EDD', 'PEP · sanctions screening', 'FATCA · CRS', 'Breach reporting'],
      },
      {
        id: 'training',
        label: 'Training & Recognition',
        bullets: [
          'Designed and delivered **T+1 settlement training**, 5 hours a day for 2 weeks, to **60+ representatives** before the May 2024 changeover.',
          'Trained **30+ new-hire representatives** as Team Transitioning Officer, and served as Manager on Duty on a bi-weekly rotation.',
          'Held the quarterly team activity budget of CAD 5K to 10K.',
          '**50+ Sunshine Calls** (highest on team), the TD Legendary Quality Experience Award and a 98%+ quality score. Rated Quality Excellent or Quality High in each of the last four quarterly reviews.',
        ],
        highlights: ['60+ trained on T+1', '30+ new hires', 'Manager on Duty', '50+ Sunshine Calls'],
      },
    ],
  },
];

export const earlierRoles = [
  {
    company: 'The Home Depot of Canada',
    logo: { src: 'assets/logos/homedepot.svg', text: 'HD', color: '#F96302', bg: '#ffffff' },
    meta: 'Toronto · Mar 2019 - Oct 2021',
    body: 'Head Cashier (part-time, alongside postgraduate study). Ran daily till reconciliation across multiple registers, supervised the front-end team and processed vendor invoices in SAP. Promoted within the first year.',
  },
  {
    company: 'ATA Freight India Pvt. Ltd.',
    logo: { text: 'ATA', color: '#c9a84c', bg: '#1a3c6e' },
    meta: 'Pune · Jun 2017 - Aug 2017',
    body: 'Business Analyst Intern. Prepared client invoices in SAP NetWeaver, supported period-end reporting, and prepared per diem variance reports and an overhead cost-benefit analysis for management.',
  },
];

export type SkillPanel = {
  id: string;
  name: string;
  desc: string;
  bullets: string[];
  chips: { label: string; hi?: boolean }[];
};

export const skillPanels: SkillPanel[] = [
  {
    id: 'ai',
    name: 'AI & LLMs',
    desc: 'Fine-tuning · Guardrails · Agentic workflows',
    bullets: [
      'Fine-tuned **NVIDIA Nemotron and GPT-OSS 120B** for an ICD-11 questionnaire now live in two products',
      'Set up production models with **guardrails, system instructions and prompts**',
      'Automate reporting with **Claude Code loops, scheduled routines and custom AI skills**, and build MCP integrations',
      'Anthropic Academy courses completed in 2026: Building with the Claude API, Claude Code in Action, Introduction to MCP, AI Fluency',
    ],
    chips: [
      { label: 'LLM Fine-Tuning', hi: true },
      { label: 'Guardrails & System Prompts', hi: true },
      { label: 'Claude Code', hi: true },
      { label: 'Agentic AI Workflows', hi: true },
      { label: 'Google Antigravity' },
      { label: 'Cursor' },
      { label: 'Microsoft Copilot' },
      { label: 'MCP Integrations' },
      { label: 'Custom AI Skills' },
      { label: 'n8n (limited)' },
      { label: 'RAG (working exposure)' },
    ],
  },
  {
    id: 'ba',
    name: 'Business Analysis',
    desc: 'Requirements · UAT · EMR integration',
    bullets: [
      'At TD, gathered user feedback and helped write requirements for a trading-platform migration; supported **UAT and parallel testing**',
      'At Zenquip, work on the **EMR module and hospital EMR integration**, now in pilot',
      'Wrote **PRDs, user stories and the roadmap** for a B2B healthcare product',
      'FinTech capstone: business analyst on a simulated AI-based underwriting rollout (INVEST user stories, As-Is/To-Be maps, Jira backlog)',
    ],
    chips: [
      { label: 'Requirements Gathering', hi: true },
      { label: 'User Stories', hi: true },
      { label: 'UAT', hi: true },
      { label: 'EMR Integration', hi: true },
      { label: 'PRDs' },
      { label: 'As-Is / To-Be Mapping' },
      { label: 'Process Documentation' },
      { label: 'Root Cause Analysis' },
    ],
  },
  {
    id: 'bi',
    name: 'BI & Dashboards',
    desc: 'Power BI · Excel VBA · KPI reporting',
    bullets: [
      'Built **6+ MIS and KPI dashboards** (Excel VBA, Power Query, Power BI) from 60+ sources for 80+ users',
      'Saved an estimated **500 to 750 team hours a year**; checked totals against source files and documented every calculation',
      'Implemented a product analytics view in the Nurture admin panel (sign-ups, conversion, revenue, refunds)',
      'Send weekly KPI reports to founders and investors',
    ],
    chips: [
      { label: 'Power BI', hi: true },
      { label: 'Excel VBA', hi: true },
      { label: 'Power Query', hi: true },
      { label: 'KPI Reporting', hi: true },
      { label: 'Data Validation' },
      { label: 'Data Lineage Documentation' },
      { label: 'Product Analytics' },
      { label: 'SQL (working knowledge)' },
      { label: 'SharePoint' },
    ],
  },
  {
    id: 'delivery',
    name: 'Product & Delivery',
    desc: 'Scrum · Roadmaps · Go-to-market',
    bullets: [
      'Run **daily Scrum and sprint tracking in Jira and Confluence**; releases every 1 to 2 weeks',
      'Direct the day-to-day work of 4 and coordinate a **15-person team**',
      'Run the product demos: about 60% of 40+ demo participants stayed on as beta users',
    ],
    chips: [
      { label: 'Scrum', hi: true },
      { label: 'Jira / Confluence', hi: true },
      { label: 'Sprint Planning' },
      { label: 'Backlog Grooming' },
      { label: 'Roadmaps' },
      { label: 'Go-to-Market (B2B)' },
      { label: 'Client Demos' },
    ],
  },
  {
    id: 'platform',
    name: 'Platform & Integrations',
    desc: 'AWS · APIs · AI content',
    bullets: [
      'Integrated **WhatsApp, Razorpay and AWS SES/SNS** for Nurture on CTO-defined infrastructure',
      'Manage the AWS account and deployment pipeline (CodePipeline, CodeBuild); cut monthly AWS cost from about USD 2,000 to USD 1,600 to 1,800',
      'Made mental-wellbeing and marketing videos with **Higgsfield and ElevenLabs**; worked on SEO and Meta ads',
    ],
    chips: [
      { label: 'AWS (account, cost & pipeline management)', hi: true },
      { label: 'API Integrations', hi: true },
      { label: 'WhatsApp API' },
      { label: 'Razorpay' },
      { label: 'Higgsfield' },
      { label: 'ElevenLabs' },
      { label: 'SEO' },
      { label: 'Meta Ads' },
    ],
  },
  {
    id: 'ops',
    name: 'Brokerage Operations',
    desc: 'Order execution · Reconciliation · T+1',
    bullets: [
      'Executed **25+ client orders a day** in Kyndryl ISM, including single orders of CAD 1M+',
      'Reconciled flagged cash and security transactions; cleared about 60% of exceptions without escalation',
      'Designed and delivered **T+1 settlement training** to 60+ representatives',
    ],
    chips: [
      { label: 'Order Execution', hi: true },
      { label: 'Reconciliation', hi: true },
      { label: 'T+1 Settlement', hi: true },
      { label: 'Exception Management' },
      { label: 'FX Processing (USD/CAD)' },
      { label: 'Corporate Actions' },
      { label: 'Fundserv' },
    ],
  },
  {
    id: 'compliance',
    name: 'KYC / AML & Data Privacy',
    desc: 'CDD / EDD · Screening · DPDP Act / GDPR',
    bullets: [
      'Reviewed KYC/CDD profiles in CPM with Refinitiv-integrated screening, to a 3-day internal SLA',
      'Applied **enhanced due diligence**; ran PEP, sanctions and adverse media checks',
      'At Zenquip, built **DPDP Act and GDPR** compliance into the product: consent flows and audit-ready records',
    ],
    chips: [
      { label: 'CDD / EDD', hi: true },
      { label: 'PEP Screening', hi: true },
      { label: 'DPDP Act / GDPR', hi: true },
      { label: 'Sanctions Screening' },
      { label: 'Adverse Media' },
      { label: 'FATCA / CRS' },
      { label: 'Consent Flows' },
    ],
  },
];

export type ProjectTag = 'ai' | 'ba' | 'bi';

export const projectFilters: { id: 'all' | ProjectTag; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & LLM' },
  { id: 'ba', label: 'Business Analysis' },
  { id: 'bi', label: 'BI & Ops' },
];

export type Project = {
  num: string;
  title: string;
  org: string;
  description: string;
  impact: string;
  tags: ProjectTag[];
  diagram?: 'icd' | 'emr';
};

export const projects: Project[] = [
  {
    num: '01',
    tags: ['ai'],
    diagram: 'icd',
    title: 'ICD-11 Questionnaire on Fine-Tuned LLMs',
    org: 'Zenquip Healthcare · 2026',
    description:
      'Fine-tuned open LLMs (NVIDIA Nemotron and GPT-OSS 120B) on rented GPUs for an ICD-11 questionnaire built on the WHO framework, with guardrails and system prompts. Now training our own model on a rented GPU.',
    impact: 'Live in Nurture and Zendoc',
  },
  {
    num: '02',
    tags: ['ai', 'ba'],
    diagram: 'emr',
    title: 'EMR Module & Hospital Integration',
    org: 'Zenquip Healthcare · 2026',
    description:
      'Work on the Zenquip EMR module and its integration with hospital EMR systems, and pitch it to investors, hospitals, clinics and doctors.',
    impact: 'In pilot with several hospitals',
  },
  {
    num: '03',
    tags: ['ai', 'bi'],
    title: 'Nurture Launch',
    org: 'Zenquip Healthcare · 2026',
    description:
      'Direct-to-parent product with two paid tiers. Implemented on CTO-defined infrastructure with an admin portal, analytics view, UTM links and QR page, and WhatsApp, Razorpay and AWS SES/SNS integrations.',
    impact: 'About 2,500 visitors · about Rs 70,000 revenue in 30 days',
  },
  {
    num: '04',
    tags: ['ai', 'bi'],
    title: 'AI-Automated Leadership Reporting',
    org: 'Zenquip Healthcare · 2026',
    description:
      'Daily progress and weekly KPI reports to the founders, produced by scheduled Claude Code loops and custom AI skills.',
    impact: 'Daily and weekly reports, automated',
  },
  {
    num: '05',
    tags: ['ba'],
    title: 'Zenquip Private Beta',
    org: 'Zenquip Healthcare · 2026',
    description:
      'Took the platform to a live private beta with the CTO in Mar 2026 and grew it from 5 doctors and 20 patients, changing the product from user feedback.',
    impact: '30+ doctors · 8+ clinics & hospitals · 80+ patients',
  },
  {
    num: '06',
    tags: ['bi'],
    title: 'MIS & KPI Dashboard Suite',
    org: 'TD Bank Group',
    description:
      '6+ dashboards in Excel VBA, Power Query and Power BI pulling 60+ files, SharePoint lists and Tableau extracts into role-based reports, with source checks and a reference sheet for every calculation.',
    impact: 'Estimated 500-750 hrs a year saved · 80+ users',
  },
  {
    num: '07',
    tags: ['bi'],
    title: 'T+1 Settlement Training',
    org: 'TD Bank Group · 2024',
    description:
      'Designed the training decks and delivered T+1 settlement training, 5 hours a day for 2 weeks, before the May 2024 changeover.',
    impact: '60+ representatives trained',
  },
  {
    num: '08',
    tags: ['ba'],
    title: 'Active Trader Platform Migration',
    org: 'TD Bank Group',
    description:
      'During the thinkorswim to Active Trader migration, gathered user feedback, helped write requirements for IT and the PMO and supported UAT and parallel testing while keeping daily work running.',
    impact: 'Requirements · UAT · parallel testing',
  },
  {
    num: '09',
    tags: ['ba', 'ai'],
    title: 'AI-Based Underwriting Capstone',
    org: 'Seneca College · 2020',
    description:
      'Business analyst on a simulated AI-based underwriting rollout: INVEST user stories, As-Is/To-Be maps and a Jira backlog.',
    impact: 'Honours · GPA 3.9/4.0',
  },
  {
    num: '10',
    tags: ['ai'],
    title: 'Portfolio Website, AI-Assisted Build',
    org: 'Personal project',
    description:
      'Built this site with AI-assisted development (Claude Code, prompt writing, MCP integrations). Next.js static export on GitHub Pages.',
    impact: 'Live: rahul-khare997.github.io',
  },
];

export const education = [
  {
    year: '2020 · Honours, Dean’s Honour List',
    degree: 'Postgraduate Certificate, Financial Technology',
    school: 'Seneca College, Toronto, Canada',
    note: 'GPA 3.9 / 4.0',
  },
  {
    year: '2019 · Honours, Dean’s Honour List',
    degree: 'Postgraduate Certificate, Financial Services',
    school: 'Algonquin College, Ottawa, Canada',
    note: 'GPA 3.65 / 4.0',
  },
  {
    year: '2015 - 2018',
    degree: 'BBA (Hons.), Finance & Management',
    school: 'Bharati Vidyapeeth (IMED), Pune, India',
    note: 'CGPA 7.4 / 10',
  },
];

export const certifications = {
  note: 'CSI is Canada’s securities education and examination body (India reference point: NISM). CIRO is Canada’s national self-regulatory organisation for investment dealers (US reference point: FINRA).',
  items: [
    { name: 'Canadian Securities Course (CSC)', issuer: 'Canadian Securities Institute (CSI)' },
    { name: 'Conduct and Practices Handbook (CPH)', issuer: 'Canadian Securities Institute (CSI)' },
    { name: 'Derivatives Fundamentals and Options Licensing (DFOL)', issuer: 'Canadian Securities Institute (CSI)' },
    { name: 'Personal Financial Services Advice (PFSA)', issuer: 'Canadian Securities Institute (CSI)' },
    { name: 'CIRO-registered Investment Representative (formerly IIROC)', issuer: 'Sponsored by TD, Oct 2021 - Feb 2025' },
    { name: 'Building with the Claude API', issuer: 'Anthropic Academy · course completed 2026' },
    { name: 'Claude Code in Action', issuer: 'Anthropic Academy · course completed 2026' },
    { name: 'Introduction to Model Context Protocol (MCP)', issuer: 'Anthropic Academy · course completed 2026' },
    { name: 'AI Fluency', issuer: 'Anthropic Academy · course completed 2026' },
  ],
};

export const languages = [
  { name: 'English', level: 'Full Professional', hi: true },
  { name: 'Hindi', level: 'Native/Bilingual', hi: true },
  { name: 'German', level: 'Limited Working' },
  { name: 'French', level: 'Beginner' },
];

export const awards = [
  '50+ Sunshine Calls (highest on team)',
  'TD Legendary Quality Experience Award',
  '98%+ service quality score',
  'Quality Excellent or Quality High in each of the last four quarterly reviews',
];

export const ticker = [
  'AI IMPLEMENTATION',
  'LLM FINE-TUNING',
  'CLAUDE CODE',
  'EMR INTEGRATION',
  'BUSINESS ANALYSIS',
  'POWER BI',
  'EXCEL VBA',
  'KPI REPORTING',
  'JIRA / CONFLUENCE',
  'AWS',
  'DPDP ACT / GDPR',
  'KYC / AML',
  'BROKERAGE OPERATIONS',
];
