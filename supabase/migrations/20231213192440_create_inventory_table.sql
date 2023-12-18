create table
  public.inventory (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    product_id uuid null,
    size_id uuid null,
    color_id uuid null,
    stock_level bigint null,
    constraint inventory_pkey primary key (id),
    constraint inventory_color_id_fkey foreign key (color_id) references product_color (id) on update cascade on delete cascade,
    constraint inventory_product_id_fkey foreign key (product_id) references products (id) on update cascade on delete cascade,
    constraint inventory_size_id_fkey foreign key (size_id) references product_size (id) on update cascade on delete cascade
  ) tablespace pg_default;