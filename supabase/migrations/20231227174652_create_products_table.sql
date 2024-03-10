create table
  public.products (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text null default ''::text,
    description text null default ''::text,
    price bigint null,
    collection_id uuid null,
    store_id uuid null,
    url text null default ''::text,
    extrainfo text null default ''::text,
    images text[] null,
    constraint products_pkey primary key (id),
    constraint products_store_id_fkey foreign key (store_id) references store (id) on update cascade on delete cascade,
    constraint products_collection_id_fkey foreign key (collection_id) references collections (id) on update cascade on delete cascade
  ) tablespace pg_default;