-- 01/11 : groupes du stock non comptés à l'inventaire (choix de l'établissement). Sans danger si appliquée seule.
alter table public.etablissements add column if not exists inventaire_groupes_masques jsonb;
grant select (inventaire_groupes_masques), update (inventaire_groupes_masques) on public.etablissements to authenticated;
