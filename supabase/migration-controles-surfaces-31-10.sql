-- 31/10 : contrôles de surfaces (plans de travail, ustensiles) = tests d'autocontrôle faits par le chef (bandelettes, lames, ATP...)
-- + choix du mode de vérification de l'hygiène par la direction (laboratoire OU tests d'autocontrôle).
-- À exécuter une fois dans Supabase > SQL Editor, AVEC L'ACCORD DE LOÏC, avant la mise en ligne du code. Sans danger : ajoute seulement.

alter table public.etablissements add column if not exists mode_verification_hygiene text;
alter table public.etablissements drop constraint if exists mode_verification_hygiene_check;
alter table public.etablissements add constraint mode_verification_hygiene_check check (mode_verification_hygiene is null or mode_verification_hygiene in ('laboratoire','autocontrole'));
grant select (mode_verification_hygiene), update (mode_verification_hygiene) on public.etablissements to authenticated;

create table if not exists public.controles_surfaces (
  id uuid not null default gen_random_uuid(),
  etablissement_id uuid not null,
  date date not null default current_date,
  heure text,
  surface text not null,
  precision_surface text,
  methode text,
  produit_test text,
  resultat text not null,
  valeur_lue text,
  action_corrective text,
  photo text,
  realise_par text,
  saisi_le timestamp with time zone not null default now(),
  constraint controles_surfaces_pkey primary key (id),
  constraint controles_surfaces_etablissement_id_fkey foreign key (etablissement_id) references public.etablissements(id) on delete cascade,
  constraint controles_surfaces_resultat_check check (resultat in ('conforme','non_conforme','a_refaire'))
);
alter table public.controles_surfaces enable row level security;
drop policy if exists isolation_etablissement on public.controles_surfaces;
create policy isolation_etablissement on public.controles_surfaces as permissive for all to public
  using (etablissement_id = etablissement_courant() and abonnement_courant() = 'complet')
  with check (etablissement_id = etablissement_courant() and abonnement_courant() = 'complet');

-- Les corrections et suppressions sont conservées dans l'historique des modifications (comme les autres enregistrements).
drop trigger if exists tracer_modification on public.controles_surfaces;
create trigger tracer_modification after update or delete on public.controles_surfaces for each row execute function public.tracer_modification();
