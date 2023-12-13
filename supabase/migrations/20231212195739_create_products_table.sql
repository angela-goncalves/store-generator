create table
  public.products (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text null default ''::text,
    description text null default ''::text,
    price bigint null,
    image text null default ''::text,
    collection_id uuid null,
    user_id uuid null,
    store_id uuid null,
    constraint products_pkey primary key (id),
    constraint products_collection_id_fkey foreign key (collection_id) references collections (id) on update cascade on delete cascade,
    constraint products_store_id_fkey foreign key (store_id) references store (id) on update cascade on delete cascade,
    constraint products_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;