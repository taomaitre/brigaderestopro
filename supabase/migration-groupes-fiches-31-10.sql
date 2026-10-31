-- 31/10 : groupes des fiches techniques libres (chaque établissement crée, nomme et ordonne ses groupes).
-- Sans danger si appliquée seule (colonne ajoutée, rien d'existant modifié). Le rangement des fiches elles-mêmes
-- (groupe et ordre) est gardé dans la fiche : aucune autre colonne nécessaire.
alter table public.etablissements add column if not exists groupes_fiches jsonb;
grant select (groupes_fiches), update (groupes_fiches) on public.etablissements to authenticated;
