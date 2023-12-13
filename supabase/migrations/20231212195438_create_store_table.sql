create table
  public.store (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text null default ''::text,
    description text null default ''::text,
    profile_image text null default ''::text,
    logo text null default ''::text,
    user_id uuid null,
    location text null,
    constraint Store_pkey primary key (id)
  ) tablespace pg_default;