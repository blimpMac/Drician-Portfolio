create extension if not exists pgcrypto;

create table if not exists public.portfolio_views (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  visitor_hash text not null,
  path text not null default '/',
  referrer text,
  user_agent text
);
create index if not exists portfolio_views_created_at_idx on public.portfolio_views (created_at desc);
create index if not exists portfolio_views_visitor_hash_idx on public.portfolio_views (visitor_hash);

create table if not exists public.portfolio_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rating smallint not null check (rating between 1 and 5),
  comment text,
  name text,
  visitor_hash text
);
create index if not exists portfolio_feedback_created_at_idx on public.portfolio_feedback (created_at desc);

alter table public.portfolio_views enable row level security;
alter table public.portfolio_feedback enable row level security;
