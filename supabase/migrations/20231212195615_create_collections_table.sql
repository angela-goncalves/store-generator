create table
  public.collections (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text null default ''::text,
    description text null default ''::text,
    store_id uuid null,
    image text null default ''::text,
    user_id uuid null,
    constraint collections_pkey primary key (id),
    constraint collections_store_id_fkey foreign key (store_id) references store (id) on update cascade on delete cascade,
    constraint collections_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;