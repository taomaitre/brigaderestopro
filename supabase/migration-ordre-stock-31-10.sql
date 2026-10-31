-- 31/10 : ordre des produits dans le stock (glisser-déposer).
-- À exécuter une fois dans Supabase > SQL Editor. Sans danger : ajoute seulement une colonne vide.
alter table public.produits add column if not exists ordre_stock integer;
