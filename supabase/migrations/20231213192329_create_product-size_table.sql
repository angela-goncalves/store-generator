create table
  public.product_size (
    id uuid not null default gen_random_uuid (),
    name text null default ''::text,
    constraint product_size_pkey primary key (id)
  ) tablespace pg_default;