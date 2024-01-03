create table
  public.attributeschildren (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    product_id uuid null,
    attributeparent_id uuid null,
    name text null,
    constraint attributeschildren_pkey primary key (id),
    constraint attributeschildren_product_id_fkey foreign key (product_id) references products (id),
    constraint attributeschildren_attributeparent_id_fkey foreign key (attributeparent_id) references attributesparent (id) on update cascade on delete cascade
  ) tablespace pg_default;