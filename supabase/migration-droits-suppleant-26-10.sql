-- 26/10 : droits manquants sur 2 colonnes de etablissements (la lecture des réglages renvoyait 403,
-- donc « Dossier PMS » et « Prestataires » n'apparaissaient pas). APPLIQUÉE le 26/10 avec l'accord de Loïc.
grant select (suppleant_controles, suppleant_controles_fonction) on public.etablissements to authenticated;
grant update (suppleant_controles, suppleant_controles_fonction) on public.etablissements to authenticated;
