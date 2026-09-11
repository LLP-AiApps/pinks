create table if not exists questions (
  id serial primary key,
  name text not null default '',
  email text not null,
  body text not null,
  created_at timestamptz not null default now()
);
