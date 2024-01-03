create table
  public.inventory (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    product_id uuid null,
    stock_level bigint null,
    price bigint null,
    attribute_id uuid null,
    attributeschildren_id text null,
    constraint inventory_pkey primary key (id),
    constraint inventory_product_id_fkey foreign key (product_id) references products (id) on update cascade on delete cascade
  ) tablespace pg_default;