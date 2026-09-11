create table if not exists members (
  id serial primary key,
  name text not null,
  email text not null unique,
  phone text not null default '',
  channel text not null,
  version text not null,
  mailer text not null default 'dark',
  created_at timestamptz not null default now()
);
create index if not exists members_created_at_idx on members (created_at desc);
