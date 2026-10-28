-- 27/10 : groupes du stock libres (chaque établissement crée, nomme et ordonne ses groupes).
-- À APPLIQUER AVEC L'ACCORD DE LOÏC, AVANT la mise en ligne du code qui les utilise. Sans danger si appliquée seule.
alter table public.etablissements add column if not exists groupes_stock jsonb;
alter table public.produits add column if not exists groupe_stock text;
-- etablissements : droits par colonne (comme pour suppleant_controles)
grant select (groupes_stock), update (groupes_stock) on public.etablissements to authenticated;
