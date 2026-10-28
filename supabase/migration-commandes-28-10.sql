-- 28/10 : les bons de commande sont enregistrés (avant : en mémoire seulement, perdus au rechargement).
create table if not exists public.commandes (
  id uuid not null default gen_random_uuid() primary key,
  etablissement_id uuid not null references public.etablissements(id) on delete cascade,
  date date not null default current_date,
  employe_id uuid references public.utilisateurs(id) on delete set null,
  donnees jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists commandes_etablissement_id_idx on public.commandes (etablissement_id, date desc);
alter table public.commandes enable row level security;
drop policy if exists isolation_etablissement on public.commandes;
create policy isolation_etablissement on public.commandes as permissive for all to public
  using (etablissement_id = etablissement_courant()) with check (etablissement_id = etablissement_courant());
grant select, insert, update, delete on public.commandes to authenticated;
