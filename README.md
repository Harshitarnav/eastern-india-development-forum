# Eastern India Development Forum

Public website for the **Eastern India Development Forum (EIDF)** — an initiative of **Umanand Eastern Foundation** — uniting the global Eastern-India community to fund skill centres, heritage & tourism, and development projects across Bihar, Jharkhand & Odisha.

## Stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + brand OKLCH tokens |
| Fonts | Lora + Public Sans |
| Backend / DB | **Supabase** (Postgres + Storage) |
| Forms | Next.js Route Handlers → Supabase tables (+ email notify) |
| Hosting | Vercel |

## Why Supabase (not Firebase)

We need a place to **store** membership applications and contact leads — not only send email.

- **Supabase** = Postgres tables you can export, filter, and later turn into a simple CRM
- Storage bucket ready for Gallery / event photos
- Row Level Security for public insert / private read
- Less awkward than Firestore for structured applications (name, city, contribution type, etc.)

Firebase remains a fine option if you already live in Google Cloud; for this site Postgres fits better.

## Pages (v1)

Home · About · Projects · Membership · Events & News · Gallery · Contact

## Local setup

```bash
npm install
cp .env.example .env.local
# fill Supabase URL + anon/service keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Repo layout (planned)

```
app/                 # routes + API
components/          # Nav, Footer, UI
content/             # draft copy / project cards
lib/supabase/        # client + server helpers
supabase/schema.sql  # membership_applications, contact_messages
```

See [PLAN.md](./PLAN.md) for phases and data model.  
See [HANDOVER.md](./HANDOVER.md) for **keys, setup, and team handover**.
