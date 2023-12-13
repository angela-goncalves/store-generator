create table
  public.product_color (
    id uuid not null default gen_random_uuid (),
    name text null default ''::text,
    constraint product_color_pkey primary key (id)
  ) tablespace pg_default;