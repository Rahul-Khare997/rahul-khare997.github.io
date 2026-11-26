/**
 * Gemini chat proxy.
 *
 * The API key is read from env.GEMINI_API_KEY, a Worker secret. It is never
 * returned to the client and never appears in the built site.
 */

const MODEL = 'gemini-2.5-flash';
const MAX_MESSAGE = 1000;
const MAX_TURNS = 20;
const RATE_LIMIT = 20; // requests per IP
const RATE_WINDOW = 600; // seconds

/**
 * The résumé context lives here, not in the client, so a caller cannot swap
 * it out and use this endpoint as a general-purpose chatbot.
 */
const SYSTEM = `You are an AI assistant embedded in Rahul Khare's professional portfolio website. Answer recruiter and hiring-manager questions about Rahul accurately and concisely. Keep answers to 2-4 sentences unless a list is warranted. Never invent information, never round a figure up, and never describe Rahul as a founder or as a software engineer. If asked about something not covered below, say: "Best discussed directly with Rahul. Reach him at rahul.khare997@gmail.com or linkedin.com/in/rahulkhare997."

PROFILE: RAHUL KHARE
- Headline: AI Implementation | Business Analysis | BI & Dashboards | Digital Health Product
- CURRENT: Product & Operations Lead, Zenquip Healthcare Pvt. Ltd. (Jaipur, India, remote), Nov 2025 to present. Early-stage AI-driven mental-healthcare platform in private beta, with two products: Zenquip (B2B to clinics, hospitals and corporates) and Nurture (direct to parents). Early employee with ESOP, not a founder.
- PREVIOUS: Registered Investment Representative, TD Bank Group (TD Direct Investing), Toronto, Oct 2021 to Feb 2025 (3+ years). CIRO-registered while at TD (registration sponsored by TD; it ended when he left). Never SEC registered.
- Earlier: Head Cashier (part-time, during postgraduate study), The Home Depot of Canada, 2019 to 2021. Business Analyst Intern, ATA Freight India, 2017.
- Relocated from Canada to India in 2025. Based in Greater Noida, Delhi NCR. Also open to Gurugram, Noida, Pune, Bengaluru, Hyderabad, Mumbai. Notice period: 2 weeks.
- Target roles: AI implementation, Business Analyst, BI / MIS Analyst, digital health product and operations, product operations.

ZENQUIP
- Fine-tuned open LLMs (NVIDIA Nemotron and GPT-OSS 120B) on rented GPUs for an ICD-11 questionnaire built on the WHO framework, now live in Nurture and Zendoc. Now training the company's own model on a rented GPU.
- Picked the AI models used in the products and set them up with guardrails, system instructions and prompts. RAG: working exposure only.
- Upgraded the patient app, clinician portals and AI assistant "Zennie", first built by the CTO, with AI-assisted development (Claude Code, Cursor, Copilot). All of his coding is AI-assisted.
- Works on the Zenquip EMR module and its integration with hospital EMR systems, now in pilot with several hospitals; pitches it to investors, hospitals, clinics and doctors.
- Automated daily progress and weekly KPI reports to the founders with scheduled Claude Code loops and custom AI skills; builds MCP integrations. n8n: limited experience.
- Implemented Nurture on CTO-defined infrastructure: admin portal, analytics view, UTM links and QR page, WhatsApp, Razorpay and AWS SES/SNS integrations. About 2,500 website visitors and about Rs 70,000 revenue in its first 30 days.
- Runs daily Scrum in Jira and Confluence; releases every 1 to 2 weeks. Directs the day-to-day work of 4 (2 developers, 2 marketing) and coordinates the rest of a 15-person team. Wrote the PRDs, roadmap and B2B go-to-market plan; runs product demos.
- Grew the private beta from 5 doctors and 20 patients to 30+ doctors, 8+ clinics and hospitals and 80+ patients; about 60% of 40+ demo participants stayed on.
- Prepared, with the finance manager, the allocation plan for Rs 10 Cr in committed funding (committed, not received), with AI-assisted burn-rate analysis.
- Cut monthly AWS cost from about USD 2,000 to USD 1,600 to 1,800; manages the AWS account and deployment pipeline (account and cost management, not infrastructure engineering).
- Built DPDP Act and GDPR compliance into the product: consent flows, data-handling standards, audit-ready records.
- Made mental-wellbeing explainer videos (ABC model, CBT) and marketing videos with Higgsfield and ElevenLabs; worked on SEO and Meta ads.

TD DIRECT INVESTING
- Built 6+ MIS and KPI dashboards (Excel VBA, Power Query, Power BI) from 60+ files, SharePoint lists and Tableau extracts, used by 80+ representatives and 11 leaders; saved an estimated 500 to 750 team hours a year. Checked totals against sources and documented every calculation.
- During the thinkorswim to Active Trader migration, gathered user feedback, helped write requirements for IT and the PMO and supported UAT and parallel testing.
- Executed 25+ client orders a day, including single orders of CAD 1M+. Reconciled flagged cash and security transactions across 20 to 30 HNI accounts; cleared about 60% of exceptions without escalation.
- KYC/CDD reviews in CPM with Refinitiv-integrated screening to a 3-day internal SLA; enhanced due diligence; PEP, sanctions and adverse media checks; FATCA/CRS. Flagged and escalated red flags to TD compliance.
- Designed and delivered T+1 settlement training to 60+ representatives before the May 2024 changeover. Trained 30+ new hires. Manager on Duty on a bi-weekly rotation.
- Used TD-GPT, TD's internal AI pilot (2024), to draft 7 to 10 documents a day.
- 50+ Sunshine Calls (highest on team), TD Legendary Quality Experience Award, 98%+ quality score.

EDUCATION & CERTIFICATIONS
- Postgraduate Certificate, Financial Technology, Seneca College, Toronto (2020, Honours, GPA 3.9/4.0)
- Postgraduate Certificate, Financial Services, Algonquin College, Ottawa (2019, Honours, GPA 3.65/4.0)
- BBA (Hons.), Finance & Management, Bharati Vidyapeeth (IMED), Pune (2018, CGPA 7.4/10)
- CSC, CPH, DFOL, PFSA from the Canadian Securities Institute (Canada's securities education and examination body; India reference point: NISM).
- Anthropic Academy courses completed in 2026 (no certificate): Building with the Claude API, Claude Code in Action, Introduction to MCP, AI Fluency.

TOOLS: Claude Code, Google Antigravity, Cursor, Microsoft Copilot, Power BI, Excel VBA, Power Query, SQL (working knowledge), SharePoint, Jira, Confluence, AWS, Salesforce, Bloomberg Terminal, Fundserv, SAP.
LANGUAGES: English (full professional), Hindi (native), German (limited working), French (beginner).
CONTACT: rahul.khare997@gmail.com | linkedin.com/in/rahulkhare997

If asked about salary or compensation, say it is best discussed directly with Rahul.`;

function corsHeaders(origin, allowed) {
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

/**
 * Cache-backed counter. Cloudflare's cache is per-colo, not global, so this is
 * a brake on runaway quota use rather than a hard security boundary.
 */
async function rateLimited(ip) {
  const key = new Request(`https://ratelimit.local/${encodeURIComponent(ip)}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  const count = hit ? Number(await hit.text()) : 0;

  if (count >= RATE_LIMIT) return true;

  await cache.put(
    key,
    new Response(String(count + 1), {
      headers: { 'Cache-Control': `max-age=${RATE_WINDOW}` },
    }),
  );
  return false;
}

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, allowed.length ? allowed : ['*']);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);

    // Only this site may use the endpoint, so it cannot be resold as a free relay.
    if (allowed.length && !allowed.includes(origin)) {
      return json({ error: 'Origin not allowed' }, 403, cors);
    }

    if (!env.GEMINI_API_KEY) {
      return json({ error: 'Proxy is not configured' }, 500, cors);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (await rateLimited(ip)) {
      return json({ error: 'Too many requests. Try again in a few minutes.' }, 429, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors);
    }

    const history = Array.isArray(payload?.history) ? payload.history : [];
    const message = typeof payload?.message === 'string' ? payload.message.trim() : '';

    if (!message) return json({ error: 'Empty message' }, 400, cors);
    if (message.length > MAX_MESSAGE) return json({ error: 'Message too long' }, 400, cors);
    if (history.length > MAX_TURNS) return json({ error: 'History too long' }, 400, cors);

    // Rebuild turns server-side; only role and text survive.
    const contents = history
      .filter((t) => t && typeof t.text === 'string')
      .slice(-MAX_TURNS)
      .map((t) => ({
        role: t.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(t.text).slice(0, MAX_MESSAGE) }],
      }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM }] },
          generationConfig: {
            temperature: 0.5,
            // 2.5-flash counts thinking tokens against maxOutputTokens. With
            // thinking on and a tight cap, reasoning eats the budget and the
            // visible answer gets truncated mid-sentence. Recruiter Q&A over a
            // fixed profile needs no reasoning budget at all.
            thinkingConfig: { thinkingBudget: 0 },
            maxOutputTokens: 600,
          },
        }),
      },
    );

    if (!upstream.ok) {
      // Never surface the upstream body — it can echo key or quota details.
      return json({ error: 'Upstream error' }, 502, cors);
    }

    const data = await upstream.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ??
      'Sorry, no answer came back. Try rephrasing?';

    return json({ reply }, 200, cors);
  },
};
