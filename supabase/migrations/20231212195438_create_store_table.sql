create table
  public.store (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text null default ''::text,
    description text null default ''::text,
    logo text null default ''::text,
    user_id uuid null,
    location text null,
    phone text null default ''::text,
    whatsapp text null default ''::text,
    social_media jsonb[] null,
    contact_mail text null,
    constraint store_pkey primary key (id),
    constraint store_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;