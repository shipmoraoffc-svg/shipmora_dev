create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null,
  provider text not null default 'email',
  role text not null default 'customer',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  user_id uuid primary key references public.users (id) on delete cascade,
  avatar_url text,
  address text,
  phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cart (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_id)
);

create table if not exists public.wishlist (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete restrict,
  total_amount numeric(12, 2) not null check (total_amount >= 0),
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity integer not null check (quantity > 0),
  price numeric(12, 2) not null check (price >= 0)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  user_id uuid references public.users (id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.otp_verifications (
  id bigint generated always as identity primary key,
  email text not null,
  otp text not null,
  expires_at timestamptz not null,
  verified boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_users_email on public.users (email);
create index if not exists idx_products_name on public.products (name);
create index if not exists idx_cart_user_id on public.cart (user_id);
create index if not exists idx_wishlist_user_id on public.wishlist (user_id);
create index if not exists idx_orders_user_id_created_at on public.orders (user_id, created_at desc);
create index if not exists idx_order_items_order_id on public.order_items (order_id);
create index if not exists idx_audit_logs_user_id_created_at on public.audit_logs (user_id, created_at desc);
create index if not exists idx_otp_email_created_at on public.otp_verifications (email, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'provider', new.app_metadata ->> 'provider', 'email')
  )
  on conflict (id) do update
    set email = excluded.email,
        name = excluded.name,
        provider = excluded.provider;

  insert into public.profiles (user_id, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

create or replace function public.create_order_from_cart(p_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid := gen_random_uuid();
  v_total numeric(12, 2) := 0;
begin
  if not exists (
    select 1 from public.cart where user_id = p_user_id
  ) then
    raise exception 'Cart is empty';
  end if;

  if exists (
    select 1
    from public.cart c
    join public.products p on p.id = c.product_id
    where c.user_id = p_user_id
      and c.quantity > p.stock
  ) then
    raise exception 'One or more items are out of stock';
  end if;

  select sum(c.quantity * p.price)
  into v_total
  from public.cart c
  join public.products p on p.id = c.product_id
  where c.user_id = p_user_id;

  insert into public.orders (id, user_id, total_amount, status)
  values (v_order_id, p_user_id, coalesce(v_total, 0), 'placed');

  insert into public.order_items (order_id, product_id, quantity, price)
  select v_order_id, c.product_id, c.quantity, p.price
  from public.cart c
  join public.products p on p.id = c.product_id
  where c.user_id = p_user_id;

  update public.products p
  set stock = p.stock - c.quantity
  from public.cart c
  where c.user_id = p_user_id
    and p.id = c.product_id;

  delete from public.cart where user_id = p_user_id;

  return v_order_id;
end;
$$;

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart enable row level security;
alter table public.wishlist enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.audit_logs enable row level security;
alter table public.otp_verifications enable row level security;

drop policy if exists "Users can view own user row" on public.users;
create policy "Users can view own user row"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "Users can update own user row" on public.users;
create policy "Users can update own user row"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = user_id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
on public.products
for select
using (true);

drop policy if exists "Users manage own cart" on public.cart;
create policy "Users manage own cart"
on public.cart
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users manage own wishlist" on public.wishlist;
create policy "Users manage own wishlist"
on public.wishlist
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users view own orders" on public.orders;
create policy "Users view own orders"
on public.orders
for select
using (auth.uid() = user_id);

drop policy if exists "Users create own orders" on public.orders;
create policy "Users create own orders"
on public.orders
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users view own order items" on public.order_items;
create policy "Users view own order items"
on public.order_items
for select
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_id
      and o.user_id = auth.uid()
  )
);

drop policy if exists "Users view own audit logs" on public.audit_logs;
create policy "Users view own audit logs"
on public.audit_logs
for select
using (auth.uid() = user_id);

drop policy if exists "Service manages OTP rows" on public.otp_verifications;
create policy "Service manages OTP rows"
on public.otp_verifications
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
