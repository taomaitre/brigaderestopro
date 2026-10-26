-- Points du PMS suivis dans le Paramétrage (fait / incomplet / pas fait, note, action prévue, responsable, échéance).
-- APPLIQUÉE le 26/10 avec l'accord de Loïc.
create table public.pms_points (
  id uuid not null default gen_random_uuid(),
  etablissement_id uuid not null,
  point_id text not null,
  etat text,
  note text,
  action text,
  responsable text,
  echeance date,
  updated_at timestamp with time zone not null default now(),
  constraint pms_points_pkey primary key (id),
  constraint pms_points_etablissement_id_fkey foreign key (etablissement_id) references etablissements(id) on delete cascade,
  constraint pms_points_etat_check check (etat is null or etat in ('fait','incomplet','pas_fait')),
  constraint pms_points_unique unique (etablissement_id, point_id)
);
alter table public.pms_points enable row level security;
create policy isolation_etablissement on public.pms_points as permissive for all to public
  using (etablissement_id = etablissement_courant() and abonnement_courant() = 'complet')
  with check (etablissement_id = etablissement_courant() and abonnement_courant() = 'complet');
