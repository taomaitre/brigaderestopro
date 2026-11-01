-- Détail d'achat et de comptage d'un produit (colis, sachets, pièces, prix, unité d'inventaire) — appliqué le 01/11/2026
alter table public.produits add column if not exists detail_achat jsonb;
grant select (detail_achat), insert (detail_achat), update (detail_achat) on public.produits to authenticated;
