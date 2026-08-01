# EIDF — Team Handover

Handover for engineers and operators working on the **Eastern India Development Forum** website.

| | |
|--|--|
| **Repo** | https://github.com/Harshitarnav/eastern-india-development-forum |
| **Local path** | `~/Desktop/Train-Rex.nosync/eastern-india-development-forum` |
| **Product** | Public marketing + membership site for EIDF (Umanand Eastern Foundation) |
| **Status** | Scaffold only — pages/forms not built yet |
| **Stack** | Next.js (App Router) · TypeScript · Tailwind · Supabase · Vercel |

Related docs: [README.md](./README.md) · [PLAN.md](./PLAN.md) · [supabase/schema.sql](./supabase/schema.sql)

---

## 1. Keys & secrets you need

Copy `.env.example` → `.env.local`. **Never commit** `.env.local` or service-role keys.

### Required for forms / data (Supabase)

Create a free project at [supabase.com](https://supabase.com) → Project Settings → **API**.

| Env var | Where to find it | Safe in browser? | Used for |
|---------|------------------|------------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL (`https://xxxx.supabase.co`) | Yes (`NEXT_PUBLIC_*`) | Client + server Supabase connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys → **anon** `public` | Yes | Public inserts (forms) under RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Project API keys → **service_role** `secret` | **No — server only** | Reading leads, admin ops, bypassing RLS |

**After creating the project:** open Supabase → SQL Editor → paste and run `supabase/schema.sql`.

### Required later for deploy (Vercel)

No keys in the repo. In Vercel project settings, add the same three Supabase vars (and optional Resend vars below).

| Item | Notes |
|------|--------|
| Vercel account access | Deploy from GitHub repo |
| Custom domain (optional) | e.g. `eidf.org.in` — DNS at domain registrar |

### Optional — email alerts on new submissions (Resend)

| Env var | Where to find it | Safe in browser? | Used for |
|---------|------------------|------------------|----------|
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys | **No** | Email when someone joins / contacts |
| `NOTIFY_EMAIL` | Your choice (e.g. `hello@eidf.org.in`) | N/A (server) | Inbox that receives alerts |

Requires a verified sending domain in Resend (or use Resend’s test sender while developing).

### Not needed in v1

| Service | Why skipped |
|---------|-------------|
| Firebase | Replaced by Supabase |
| Payment / Razorpay / Stripe | Donations secondary; no gateway yet |
| Auth secret / NextAuth | No member login yet |
| Google Maps API | Contact page can use static address first |
| CMS keys (Sanity, etc.) | Content is in-repo for now |

### Secret hygiene

- Share keys via 1Password / team vault — not Slack/WhatsApp.
- Rotate `service_role` if it ever leaks (Supabase → API → regenerate).
- `anon` is public by design; security comes from **Row Level Security** (see schema).
- Production vs staging: prefer **two Supabase projects** once you ship.

---

## 2. What this product is

EIDF unites diaspora from Eastern India (Bihar, Jharkhand, Odisha) and partners (govt / CSR) to fund skill centres, heritage & tourism, and development — powered by Umanand Eastern Foundation (Section 8).

**Primary CTA:** Join / membership  
**Secondary:** Donate / support a project  

### Audience journeys

1. Diaspora → Home → About/Projects → Membership apply  
2. CSR / donor → Home → Projects → Contact / Donate  
3. Govt / institution → About (credibility) → Events → Contact  

### Pages (v1)

Home · About · Projects · Membership · Events & News · Gallery · Contact  

Design reference creatives (local, not in repo):  
`~/Downloads/Eastern India Development Forum/`  
(`*.dc.html` — UX flow, hi-fi screens, poster, membership card)

---

## 3. Architecture (target)

```
Browser (Next.js pages)
    │
    ├─ Public content (static / MDX / TS content files)
    │
    └─ Form POST → Next.js Route Handlers
            │
            ├─ Insert row → Supabase Postgres
            │     • membership_applications
            │     • contact_messages
            │
            └─ Optional notify → Resend → NOTIFY_EMAIL
```

**Hosting:** Vercel (preview deploys per PR).  
**Leads admin (v1):** Supabase Table Editor — no custom admin UI yet.

---

## 4. Local setup (dev)

```bash
git clone https://github.com/Harshitarnav/eastern-india-development-forum.git
cd eastern-india-development-forum
npm install
cp .env.example .env.local
# Fill Supabase URL + anon + service_role
npm run dev
```

Open http://localhost:3000

### Supabase one-time setup checklist

1. Create Supabase project (region: Mumbai / closest to India preferred).  
2. Copy URL, anon key, service_role key into `.env.local`.  
3. Run `supabase/schema.sql` in SQL Editor.  
4. Confirm tables exist: `membership_applications`, `contact_messages`.  
5. Confirm RLS is on; only INSERT policies for `anon` (no public SELECT).

---

## 5. Brand system (from approved creatives)

| Token | Value | Use |
|-------|--------|-----|
| Navy | `oklch(23% 0.045 260)` | Nav, hero |
| Deep navy | `oklch(16% 0.04 260)` | Footer, dark bands |
| Gold | `oklch(74% 0.13 85)` | Primary CTA, mark |
| Label gold | `oklch(52% 0.12 75)` | Eyebrows / labels |
| Cream | `oklch(97% 0.012 85)` | Page background |
| Display font | **Lora** | Headlines, logo wordmark |
| UI font | **Public Sans** | Body, nav, forms |

Nav labels: Home · About · Projects · Membership · Events · Gallery · Contact  
CTAs: **Join Us** (primary) · Donate (secondary outline)

---

## 6. Build phases

| Phase | Deliverable | Done? |
|-------|-------------|-------|
| 0 | Repo scaffold, plan, schema, env example | Yes |
| 1 | Design tokens, Nav/Footer, layout chrome | Yes |
| 2 | Seven pages desktop + mobile (match creatives) | Yes |
| 3 | Membership + Contact → Supabase (+ optional Resend) | Yes (Resend optional still) |
| 4 | Seminar poster template + membership card creative | Yes (`/creatives`) |
| 5 | SEO, OG, Vercel production + domain | Partial (basic meta) |

---

## 7. Team roles (suggested)

| Role | Owns |
|------|------|
| Eng | Next.js pages, forms API, Supabase wiring, deploy |
| Design / brand | Photography, logo final, poster variants |
| Content | Edit draft English copy on pages |
| Ops / foundation | Monitor Supabase leads, reply to applicants, domain DNS |

---

## 8. Viewing leads (ops)

1. Log into Supabase project.  
2. **Table Editor** → `membership_applications` or `contact_messages`.  
3. Filter `status = new`.  
4. After outreach, set status to `contacted` / `onboarded` / `archived`.  
5. Export CSV from Supabase when needed for offline CRM.

---

## 9. Deploy checklist (when ready)

1. Push to `main` (or merge PR).  
2. Import repo in Vercel → Framework: Next.js.  
3. Add env vars (same as `.env.local`; never commit them).  
4. Deploy preview → test Join + Contact forms.  
5. Point domain DNS to Vercel.  
6. Confirm production Supabase project (not local/dev) is used.

---

## 10. Contacts / placeholders in copy

Draft content in creatives uses placeholders such as:

- Email: `hello@eidf.org.in`  
- Phone: `+91 00000 00000` (replace before launch)  
- Address: Umanand Auditorium, Diamond City, Oyna, Ranchi, Jharkhand  
- Offices: Ranchi (HQ), Patna, Bhubaneswar  

Replace with real foundation contacts before go-live.

---

## 11. Quick “where is X?”

| Need | Location |
|------|----------|
| Env template | `.env.example` |
| DB schema | `supabase/schema.sql` |
| Product plan | `PLAN.md` |
| This handover | `HANDOVER.md` |
| App routes | `app/` (pages to be added) |
| Design creatives | Downloads folder (not in git) |

---

*Last updated: Aug 2026 — scaffold handover. Update this file when phases 1–5 land.*
