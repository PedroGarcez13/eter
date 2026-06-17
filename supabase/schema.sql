-- ============================================================
--  Agostina — schema do banco de dados (PostgreSQL / Supabase)
--  Rode este arquivo no SQL Editor do painel do Supabase.
-- ============================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
--  Tabela de produtos (peças do brechó)
-- ------------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  category    text not null,
  size        text not null,
  price       numeric(10,2) not null check (price >= 0),
  image_url   text,
  status      text not null default 'available'
              check (status in ('available', 'sold')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists products_status_idx   on public.products (status);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_created_idx  on public.products (created_at desc);

-- Atualiza updated_at automaticamente em cada UPDATE
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
--  Row Level Security (RLS)
--  Regra: qualquer pessoa LÊ peças disponíveis;
--         apenas usuários autenticados (admins) escrevem.
-- ------------------------------------------------------------
alter table public.products enable row level security;

-- Visitantes (anon) só enxergam peças disponíveis
drop policy if exists "público lê peças disponíveis" on public.products;
create policy "público lê peças disponíveis"
  on public.products for select
  to anon
  using (status = 'available');

-- Admins (logados) enxergam tudo, inclusive vendidas
drop policy if exists "admin lê tudo" on public.products;
create policy "admin lê tudo"
  on public.products for select
  to authenticated
  using (true);

-- Apenas admins podem inserir / atualizar / remover
drop policy if exists "admin insere" on public.products;
create policy "admin insere"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "admin atualiza" on public.products;
create policy "admin atualiza"
  on public.products for update
  to authenticated
  using (true) with check (true);

drop policy if exists "admin remove" on public.products;
create policy "admin remove"
  on public.products for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
--  Storage: bucket público para as fotos das roupas
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Qualquer pessoa pode ver as imagens (leitura pública)
drop policy if exists "imagens públicas" on storage.objects;
create policy "imagens públicas"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Apenas admins logados enviam / atualizam / removem imagens
drop policy if exists "admin gerencia imagens" on storage.objects;
create policy "admin gerencia imagens"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

-- ------------------------------------------------------------
--  Dados de exemplo (opcional — pode apagar depois)
-- ------------------------------------------------------------
insert into public.products (name, description, category, size, price, status) values
  ('Vestido floral vintage', 'Algodão leve, estampa de flores azuis. Ótimo estado.', 'Vestidos', 'M', 65.00, 'available'),
  ('Blusa de linho creme',   'Linho natural, manga bufante. Perfeita pro verão.',     'Blusas',   'P', 42.00, 'available'),
  ('Calça jeans reta',       'Jeans clássico de cintura alta, lavagem média.',        'Calças',   'G', 58.00, 'available'),
  ('Casaco de tricô azul',   'Tricô macio cor cobalto, super confortável.',           'Casacos',  'M', 79.00, 'available'),
  ('Bolsa de palha',         'Palha trançada à mão, alça de couro. Peça única.',      'Bolsas',   'Único', 55.00, 'sold');
