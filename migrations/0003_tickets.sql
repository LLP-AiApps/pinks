alter table members add column if not exists password_hash text not null default '';

create table if not exists tickets (
  id serial primary key,
  member_email text not null,
  week text not null,
  title text not null default '',
  legs jsonb not null default '[]'::jsonb,
  stake numeric,
  book text not null default '',
  result text not null default 'open',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists tickets_email_week_idx
  on tickets (member_email, week, created_at desc);

create table if not exists desk_sessions (
  token text primary key,
  email text not null,
  expires_at timestamptz not null
);
