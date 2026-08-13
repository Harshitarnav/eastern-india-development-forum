-- Eastern India Development Forum — CMS schema (v2)
-- Run in Supabase SQL editor after creating the project.
-- Extends v1 form tables.

create extension if not exists "pgcrypto";

-- ========== Existing form tables (idempotent) ==========
create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  city text,
  country text,
  contribution_type text,
  message text,
  status text not null default 'new'
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new'
);

create table if not exists public.project_proposals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ref_id text not null,
  title text not null,
  state text not null,
  sector text not null,
  budget text not null,
  summary text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  dpr_note text,
  status text not null default 'new'
);

create unique index if not exists project_proposals_ref_id_idx on public.project_proposals(ref_id);

-- ========== CMS Settings (singleton row) ==========
create table if not exists public.cms_settings (
  id text primary key default 'site',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ========== Navigation ==========
create table if not exists public.cms_navigation (
  id uuid primary key default gen_random_uuid(),
  location text not null check (location in ('header', 'portal', 'footer', 'mobile')),
  label text not null,
  href text not null,
  parent_id uuid references public.cms_navigation(id) on delete set null,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists cms_navigation_location_idx on public.cms_navigation(location, sort_order);

-- ========== Generic content items (all collections) ==========
create table if not exists public.cms_items (
  id text not null,
  collection text not null,
  data jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_published boolean not null default true,
  slug text,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

create index if not exists cms_items_collection_idx on public.cms_items(collection, sort_order);
create index if not exists cms_items_slug_idx on public.cms_items(collection, slug);

-- ========== SEO per path / entity ==========
create table if not exists public.cms_seo (
  path text primary key,
  title text,
  description text,
  canonical text,
  og_title text,
  og_description text,
  og_image text,
  twitter_title text,
  twitter_description text,
  twitter_image text,
  robots text default 'index,follow',
  jsonld jsonb,
  hreflang jsonb,
  noindex boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ========== Media library ==========
create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text not null default '',
  title text,
  mime_type text,
  folder text default 'general',
  size_bytes int,
  created_at timestamptz not null default now()
);

-- ========== Redirects ==========
create table if not exists public.cms_redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  status_code int not null default 301,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ========== Audit log ==========
create table if not exists public.cms_audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_email text,
  action text not null,
  collection text,
  item_id text,
  detail jsonb
);

-- ========== RLS ==========
alter table public.membership_applications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.project_proposals enable row level security;
alter table public.cms_settings enable row level security;
alter table public.cms_navigation enable row level security;
alter table public.cms_items enable row level security;
alter table public.cms_seo enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_redirects enable row level security;
alter table public.cms_audit_log enable row level security;

-- Public can submit forms
drop policy if exists "Anyone can submit membership applications" on public.membership_applications;
create policy "Anyone can submit membership applications"
  on public.membership_applications for insert to anon, authenticated with check (true);

drop policy if exists "Anyone can submit contact messages" on public.contact_messages;
create policy "Anyone can submit contact messages"
  on public.contact_messages for insert to anon, authenticated with check (true);

drop policy if exists "Anyone can submit project proposals" on public.project_proposals;
create policy "Anyone can submit project proposals"
  on public.project_proposals for insert to anon, authenticated with check (true);

-- Public read for published CMS content
drop policy if exists "Public read cms_settings" on public.cms_settings;
create policy "Public read cms_settings" on public.cms_settings for select to anon, authenticated using (true);

drop policy if exists "Public read cms_navigation" on public.cms_navigation;
create policy "Public read cms_navigation" on public.cms_navigation for select to anon, authenticated using (is_visible = true);

drop policy if exists "Public read cms_items" on public.cms_items;
create policy "Public read cms_items" on public.cms_items for select to anon, authenticated using (is_published = true);

drop policy if exists "Public read cms_seo" on public.cms_seo;
create policy "Public read cms_seo" on public.cms_seo for select to anon, authenticated using (true);

drop policy if exists "Public read cms_media" on public.cms_media;
create policy "Public read cms_media" on public.cms_media for select to anon, authenticated using (true);

drop policy if exists "Public read cms_redirects" on public.cms_redirects;
create policy "Public read cms_redirects" on public.cms_redirects for select to anon, authenticated using (is_active = true);

-- Writes: service role only (bypasses RLS). No insert/update policies for anon.

-- Storage bucket note: create bucket "eidf-media" in Supabase dashboard (public read).
