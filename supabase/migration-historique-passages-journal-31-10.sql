-- Migration du 31/10/2026 : historique des passages des prestataires, nouvelles catégories de documents,
-- conservation des enregistrements sans limite de durée, journal des corrections et suppressions.
-- Appliquée sur le projet Supabase « BrigadeRestoPro » (uikxpjnovzxcglygueif). Rien n'est supprimé ni modifié dans les données existantes.

-- 1. Pièces jointes : nouvelles catégories + lien facultatif avec un prestataire
alter table public.pms_documents drop constraint if exists pms_documents_categorie_check;
alter table public.pms_documents add constraint pms_documents_categorie_check check (categorie = any (array[
  'declaration_activite','attestation_formation','contrat_nuisibles','attestation_eau','autorisation_eau_privee','analyse_eau',
  'rapport_laboratoire','contrat_maintenance','fds','rapport_controle_officiel','rapport_audit','bordereau_huiles','bordereau_dechets',
  'certificat_hotte','verification_sondes','autre'
]));
alter table public.pms_documents add column if not exists prestataire_id uuid references public.prestataires(id) on delete set null;
create index if not exists pms_documents_prestataire_id_idx on public.pms_documents using btree (prestataire_id);

-- 2. Historique des passages des prestataires (le prestataire peut être supprimé : le passage reste, avec le nom de la société et le type)
create table if not exists public.prestataires_passages (
  id uuid primary key default gen_random_uuid(),
  etablissement_id uuid not null references public.etablissements(id) on delete cascade,
  prestataire_id uuid references public.prestataires(id) on delete set null,
  type text not null,
  societe text,
  date_passage date not null,
  note text,
  document_id uuid references public.pms_documents(id) on delete set null,
  saisi_le timestamptz not null default now()
);
create index if not exists prestataires_passages_etab_idx on public.prestataires_passages using btree (etablissement_id, date_passage desc);
create index if not exists prestataires_passages_prest_idx on public.prestataires_passages using btree (prestataire_id);
alter table public.prestataires_passages enable row level security;
drop policy if exists isolation_etablissement on public.prestataires_passages;
create policy isolation_etablissement on public.prestataires_passages as permissive for all to public
  using ((etablissement_id = etablissement_courant()) and (abonnement_courant() = 'complet'::text))
  with check ((etablissement_id = etablissement_courant()) and (abonnement_courant() = 'complet'::text));

-- 3. Heure réelle de saisie (serveur) sur les enregistrements dont l'heure est donnée par l'application.
--    Les lignes déjà présentes gardent « null » (heure de saisie inconnue) : on n'invente rien.
do $$
declare t text;
begin
  foreach t in array array['releves_temperature','cuissons','refroidissements','maintiens_chaud','huile_friture_tests'] loop
    execute format('alter table public.%I add column if not exists saisi_le timestamptz', t);
    execute format('alter table public.%I alter column saisi_le set default now()', t);
  end loop;
end $$;

-- 4. Journal des corrections et suppressions : écrit uniquement par le serveur, lisible par l'établissement, jamais modifiable ni effaçable par lui.
drop policy if exists isolation_etablissement on public.journal_activite;
drop policy if exists lecture_etablissement on public.journal_activite;
create policy lecture_etablissement on public.journal_activite as permissive for select to public
  using (etablissement_id = etablissement_courant());

create or replace function public.tracer_modification() returns trigger
language plpgsql security definer set search_path to 'public','pg_temp' as $$
declare
  v_old jsonb := to_jsonb(OLD);
  v_new jsonb;
  v_etab uuid := nullif(to_jsonb(OLD)->>'etablissement_id','')::uuid;
begin
  if TG_OP = 'UPDATE' then
    v_new := to_jsonb(NEW);
    if v_old = v_new then return NEW; end if;
  end if;
  -- l'établissement peut être en cours de suppression (cascade) : rien à tracer dans ce cas
  if v_etab is not null and exists (select 1 from public.etablissements e where e.id = v_etab) then
    insert into public.journal_activite (etablissement_id, utilisateur_id, action, table_concernee, ligne_id, ancienne_valeur, nouvelle_valeur)
    values (v_etab, null, case when TG_OP = 'DELETE' then 'suppression' else 'modification' end, TG_TABLE_NAME,
            nullif(v_old->>'id','')::uuid, v_old, v_new);
  end if;
  if TG_OP = 'DELETE' then return OLD; end if;
  return NEW;
end $$;

do $$
declare t text;
begin
  foreach t in array array['releves_temperature','surveillances_temperature','cuissons','refroidissements','maintiens_chaud','huile_friture_tests',
                           'pms_executions','etiquettes','tracabilites','receptions','rappelconso_alertes','tiac_declarations','pms_documents',
                           'prestataires','prestataires_passages','pms_points','pms_formations'] loop
    execute format('drop trigger if exists tracer_modification on public.%I', t);
    execute format('create trigger tracer_modification after update or delete on public.%I for each row execute function public.tracer_modification()', t);
  end loop;
end $$;

-- 5. Conservation : les enregistrements sont gardés tant que l'établissement existe (décision de Loïc, 31/10/2026).
--    La fonction de purge à 6 mois / 5 ans ne supprime plus rien. Seule la purge des photos de bons de livraison (14 jours) est conservée.
create or replace function public.purger_conservation_enregistrements() returns void language plpgsql set search_path to 'public','pg_temp' as $$
begin
  -- Volontairement vide : plus aucune suppression automatique des enregistrements (températures, cuissons, refroidissements,
  -- maintiens au chaud, huiles, exécutions du PMS, journal, traçabilités, étiquettes).
  null;
end $$;
