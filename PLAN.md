# EIDF — Build Plan

## Product intent

Membership / awareness first; donations secondary. Audience: diaspora, government & institutional partners, corporate/CSR donors. English only for v1. Draft copy OK to edit later.

## Backend decision

**Supabase (Postgres)** for v1 data.

| Table | Purpose |
|--------|---------|
| `membership_applications` | Join Us flow submissions |
| `contact_messages` | Contact form (membership / funding / media / other) |
| `storage.gallery` (later) | Seminar & site-visit media |

**Not in v1:** member login, donation gateway, admin dashboard (use Supabase dashboard), CMS.

### Firebase vs Supabase

| | Firebase | Supabase (chosen) |
|--|----------|-------------------|
| Data shape | Document (Firestore) | Relational (Postgres) |
| Form leads → spreadsheet/CRM | Awkward | Natural (SQL / CSV) |
| File storage | yes | yes |
| Auth for members later | excellent | good |
| Cost / ops for this site | fine | fine + better fit |

## Phases

1. **Foundation** — tokens, Nav/Footer from creatives, layout, env, schema
2. **Seven pages** — desktop + mobile hi-fi from DC creatives
3. **Forms live** — Membership + Contact → Supabase (+ optional Resend notify)
4. **Creatives** — seminar poster template, membership card
5. **Launch** — SEO, OG, Vercel, domain

## Brand tokens (from creatives)

- Navy `oklch(23% 0.045 260)`
- Deep navy `oklch(16% 0.04 260)`
- Gold `oklch(74% 0.13 85)`
- Accent label `oklch(52% 0.12 75)`
- Cream `oklch(97% 0.012 85)`
- Fonts: Lora / Public Sans
