-- Eastern India Development Forum — v1 schema
-- Run in Supabase SQL editor after creating the project.

create extension if not exists "pgcrypto";

-- Membership / Join Us applications
create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  city text,
  country text,
  contribution_type text, -- time | funds | skill | network
  message text,
  status text not null default 'new' -- new | contacted | onboarded | archived
);

-- Contact form
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null, -- Membership | Funding | Media | Other
  message text not null,
  status text not null default 'new'
);

alter table public.membership_applications enable row level security;
alter table public.contact_messages enable row level security;

-- Public can submit; only service role / dashboard can read
create policy "Anyone can submit membership applications"
  on public.membership_applications
  for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
