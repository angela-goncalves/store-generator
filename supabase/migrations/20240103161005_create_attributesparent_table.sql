create table
  public.attributes (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    product_id uuid null,
    name text null,
    children_values jsonb[] not null,
    constraint attributes_pkey primary key (id),
    constraint attributes_product_id_fkey foreign key (product_id) references products (id) on update cascade on delete cascade
  ) tablespace pg_default;