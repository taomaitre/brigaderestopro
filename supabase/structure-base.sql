-- BrigadeRestoPro - structure de la base Supabase (projet uikxpjnovzxcglygueif), généré le 13/10/2026.
-- Contient tables, contraintes, index, règles RLS. SANS données.

create table public.alertes_ia (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, mois_concerne date not null, type text not null, cout_du_mois_euros numeric, message_client_genere text, statut text not null default 'en_attente'::text, date_creation timestamp with time zone not null default now());
alter table public.alertes_ia add constraint alertes_ia_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.alertes_ia add constraint alertes_ia_pkey PRIMARY KEY (id);
alter table public.alertes_ia add constraint alertes_ia_statut_check CHECK ((statut = ANY (ARRAY['en_attente'::text, 'envoye'::text, 'traite'::text])));
alter table public.alertes_ia add constraint alertes_ia_type_check CHECK ((type = ANY (ARRAY['alerte_3e'::text, 'alerte_5e'::text])));
CREATE INDEX alertes_ia_etablissement_id_idx ON public.alertes_ia USING btree (etablissement_id);
alter table public.alertes_ia enable row level security;
create policy isolation_etablissement on public.alertes_ia as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.allergenes_reference (id uuid not null default gen_random_uuid(), nom text not null);
alter table public.allergenes_reference add constraint allergenes_reference_nom_key UNIQUE (nom);
alter table public.allergenes_reference add constraint allergenes_reference_pkey PRIMARY KEY (id);
alter table public.allergenes_reference enable row level security;
create policy lecture_publique on public.allergenes_reference as permissive for select to public using (true);

create table public.appareils (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, nom text not null, famille text not null, type text, norme_min numeric, norme_max numeric, numero_sonde text);
alter table public.appareils add constraint appareils_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.appareils add constraint appareils_famille_check CHECK ((famille = ANY (ARRAY['positif'::text, 'negatif'::text])));
alter table public.appareils add constraint appareils_pkey PRIMARY KEY (id);
CREATE INDEX appareils_etablissement_id_idx ON public.appareils USING btree (etablissement_id);
alter table public.appareils enable row level security;
create policy isolation_etablissement on public.appareils as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.appareils_connectes (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, type text not null, utilisateur_id uuid, identifiant_appareil text not null, statut text not null default 'actif'::text, derniere_connexion timestamp with time zone, created_at timestamp with time zone not null default now());
alter table public.appareils_connectes add constraint appareils_connectes_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.appareils_connectes add constraint appareils_connectes_pkey PRIMARY KEY (id);
alter table public.appareils_connectes add constraint appareils_connectes_statut_check CHECK ((statut = ANY (ARRAY['actif'::text, 'bloque'::text])));
alter table public.appareils_connectes add constraint appareils_connectes_type_check CHECK ((type = ANY (ARRAY['tablette_cuisine'::text, 'telephone_employe'::text])));
alter table public.appareils_connectes add constraint appareils_connectes_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
CREATE INDEX appareils_connectes_etablissement_id_idx ON public.appareils_connectes USING btree (etablissement_id);
alter table public.appareils_connectes enable row level security;
create policy isolation_etablissement on public.appareils_connectes as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.cartes (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, nom text not null, type_carte text not null default 'fixe'::text, debut date, fin date, donnees jsonb, created_at timestamp with time zone not null default now());
alter table public.cartes add constraint cartes_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.cartes add constraint cartes_pkey PRIMARY KEY (id);
CREATE INDEX cartes_etab_idx ON public.cartes USING btree (etablissement_id, debut);
alter table public.cartes enable row level security;
create policy isolation_etablissement on public.cartes as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.cuissons (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, fiche_id uuid, produit_nom text, famille_haccp text, appareil text, heure_depart timestamp with time zone, duree_attendue_min integer, temperature_coeur_mesuree numeric, conforme boolean, statut text not null default 'en_cours'::text, employe_id uuid, donnees jsonb);
alter table public.cuissons add constraint cuissons_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.cuissons add constraint cuissons_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.cuissons add constraint cuissons_famille_haccp_check CHECK ((famille_haccp = ANY (ARRAY['general'::text, 'viande_hachee'::text, 'volaille'::text, 'poisson'::text])));
alter table public.cuissons add constraint cuissons_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE SET NULL;
alter table public.cuissons add constraint cuissons_pkey PRIMARY KEY (id);
alter table public.cuissons add constraint cuissons_statut_check CHECK ((statut = ANY (ARRAY['en_cours'::text, 'termine'::text])));
CREATE INDEX cuissons_etablissement_id_idx ON public.cuissons USING btree (etablissement_id);
alter table public.cuissons enable row level security;
create policy isolation_etablissement on public.cuissons as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.demandes_ajout (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, type text not null, valeur text not null, contexte text, demande_par uuid, traite boolean not null default false, cree_le timestamp with time zone not null default now());
alter table public.demandes_ajout add constraint demandes_ajout_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.demandes_ajout add constraint demandes_ajout_pkey PRIMARY KEY (id);
alter table public.demandes_ajout enable row level security;
create policy isolation_etablissement on public.demandes_ajout as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.etablissements (id uuid not null default gen_random_uuid(), nom text not null, siret text, exploitant text, responsable_hygiene text, sous_domaine text, email_compte text, mot_de_passe_hash text, abonnement text not null default 'standard'::text, ia_active boolean not null default false, ia_accepte_depassement_facture boolean, ia_bloquee boolean not null default false, ia_motif_blocage text, ia_seuil_alerte_euros numeric default 3, ia_seuil_blocage_euros numeric default 5, congelation_decrite_pms boolean default false, dispose_cellule_refroidissement boolean default false, created_at timestamp with time zone not null default now(), raison_sociale text, forme_juridique text, adresse_siege text, adresse_site text, telephone text, email_general text, code_naf text, couverts_jour integer, effectif integer, date_debut_activite date, date_declaration_activite date, exploitant_fonction text, responsable_hygiene_fonction text, convention_collective text, type_etablissement text, services text[], pms_demarrage_termine boolean not null default false, origine_eau text, suppleant_controles text, suppleant_controles_fonction text);
alter table public.etablissements add constraint etablissements_abonnement_check CHECK ((abonnement = ANY (ARRAY['standard'::text, 'complet'::text])));
alter table public.etablissements add constraint etablissements_email_compte_key UNIQUE (email_compte);
alter table public.etablissements add constraint etablissements_ia_motif_blocage_check CHECK (((ia_motif_blocage = ANY (ARRAY['abus'::text, 'impaye'::text])) OR (ia_motif_blocage IS NULL)));
alter table public.etablissements add constraint etablissements_origine_eau_check CHECK (((origine_eau IS NULL) OR (origine_eau = ANY (ARRAY['Réseau public'::text, 'Source privée (puits, forage)'::text]))));
alter table public.etablissements add constraint etablissements_pkey PRIMARY KEY (id);
alter table public.etablissements add constraint etablissements_sous_domaine_key UNIQUE (sous_domaine);
alter table public.etablissements add constraint ia_requires_complet CHECK (((NOT ia_active) OR (abonnement = 'complet'::text)));
alter table public.etablissements enable row level security;
create policy isolation_etablissement_racine on public.etablissements as permissive for all to public using ((id = etablissement_courant())) with check ((id = etablissement_courant()));

create table public.etiquettes (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, produit_id uuid, fiche_id uuid, lot_id uuid, dlc date, ddm date, quantite_utilisee numeric, nb_etiquettes integer not null default 1, decongele boolean default false, date_sortie_congelation timestamp with time zone, derniere_cuisson_id uuid, dernier_refroidissement_id uuid, dernier_maintien_id uuid, employe_id uuid, cree_le timestamp with time zone not null default now(), donnees jsonb, nom_libre text, jete boolean not null default false);
alter table public.etiquettes add constraint etiquettes_dernier_maintien_id_fkey FOREIGN KEY (dernier_maintien_id) REFERENCES maintiens_chaud(id) ON DELETE SET NULL;
alter table public.etiquettes add constraint etiquettes_dernier_refroidissement_id_fkey FOREIGN KEY (dernier_refroidissement_id) REFERENCES refroidissements(id) ON DELETE SET NULL;
alter table public.etiquettes add constraint etiquettes_derniere_cuisson_id_fkey FOREIGN KEY (derniere_cuisson_id) REFERENCES cuissons(id) ON DELETE SET NULL;
alter table public.etiquettes add constraint etiquettes_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.etiquettes add constraint etiquettes_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.etiquettes add constraint etiquettes_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE SET NULL;
alter table public.etiquettes add constraint etiquettes_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES lots_produits(id) ON DELETE SET NULL;
alter table public.etiquettes add constraint etiquettes_pkey PRIMARY KEY (id);
alter table public.etiquettes add constraint etiquettes_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL;
CREATE INDEX etiquettes_etablissement_id_idx ON public.etiquettes USING btree (etablissement_id);
alter table public.etiquettes enable row level security;
create policy isolation_etablissement on public.etiquettes as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.fiches_techniques (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, code text, nom text not null, sous_titre text, categorie text, poste text, type text, badge text, duree_conservation_jours integer, extension_30j boolean default false, temperature_conservation text, contenant_conservation text, rendement_total numeric, nb_portions numeric, prix_vente_ttc numeric, created_at timestamp with time zone not null default now(), donnees jsonb);
alter table public.fiches_techniques add constraint fiches_techniques_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.fiches_techniques add constraint fiches_techniques_pkey PRIMARY KEY (id);
alter table public.fiches_techniques add constraint fiches_techniques_type_check CHECK ((type = ANY (ARRAY['plat'::text, 'sous_recette'::text])));
CREATE INDEX fiches_techniques_etablissement_id_idx ON public.fiches_techniques USING btree (etablissement_id);
alter table public.fiches_techniques enable row level security;
create policy isolation_etablissement on public.fiches_techniques as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.fiches_techniques_allergenes (id uuid not null default gen_random_uuid(), fiche_id uuid not null, allergene text not null, confirme boolean default false);
alter table public.fiches_techniques_allergenes add constraint fiches_techniques_allergenes_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE CASCADE;
alter table public.fiches_techniques_allergenes add constraint fiches_techniques_allergenes_pkey PRIMARY KEY (id);
CREATE INDEX fiches_techniques_allergenes_fiche_id_idx ON public.fiches_techniques_allergenes USING btree (fiche_id);
alter table public.fiches_techniques_allergenes enable row level security;
create policy isolation_via_fiche on public.fiches_techniques_allergenes as permissive for all to public using ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant())))) with check ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant()))));

create table public.fiches_techniques_etapes (id uuid not null default gen_random_uuid(), fiche_id uuid not null, ordre integer not null, texte text not null, point_critique_haccp boolean default false);
alter table public.fiches_techniques_etapes add constraint fiches_techniques_etapes_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE CASCADE;
alter table public.fiches_techniques_etapes add constraint fiches_techniques_etapes_pkey PRIMARY KEY (id);
CREATE INDEX fiches_techniques_etapes_fiche_id_idx ON public.fiches_techniques_etapes USING btree (fiche_id);
alter table public.fiches_techniques_etapes enable row level security;
create policy isolation_via_fiche on public.fiches_techniques_etapes as permissive for all to public using ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant())))) with check ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant()))));

create table public.fiches_techniques_ingredients (id uuid not null default gen_random_uuid(), fiche_id uuid not null, nom text, quantite numeric, unite text, produit_id uuid, sous_fiche_id uuid);
alter table public.fiches_techniques_ingredients add constraint fiches_techniques_ingredients_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE CASCADE;
alter table public.fiches_techniques_ingredients add constraint fiches_techniques_ingredients_pkey PRIMARY KEY (id);
alter table public.fiches_techniques_ingredients add constraint fiches_techniques_ingredients_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL;
alter table public.fiches_techniques_ingredients add constraint fiches_techniques_ingredients_sous_fiche_id_fkey FOREIGN KEY (sous_fiche_id) REFERENCES fiches_techniques(id) ON DELETE SET NULL;
alter table public.fiches_techniques_ingredients add constraint un_seul_lien CHECK ((((produit_id IS NOT NULL) AND (sous_fiche_id IS NULL)) OR ((produit_id IS NULL) AND (sous_fiche_id IS NOT NULL)) OR ((produit_id IS NULL) AND (sous_fiche_id IS NULL))));
CREATE INDEX fiches_techniques_ingredients_fiche_id_idx ON public.fiches_techniques_ingredients USING btree (fiche_id);
alter table public.fiches_techniques_ingredients enable row level security;
create policy isolation_via_fiche on public.fiches_techniques_ingredients as permissive for all to public using ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant())))) with check ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant()))));

create table public.fiches_techniques_materiel (id uuid not null default gen_random_uuid(), fiche_id uuid not null, type text, nom text not null);
alter table public.fiches_techniques_materiel add constraint fiches_techniques_materiel_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE CASCADE;
alter table public.fiches_techniques_materiel add constraint fiches_techniques_materiel_pkey PRIMARY KEY (id);
alter table public.fiches_techniques_materiel add constraint fiches_techniques_materiel_type_check CHECK ((type = ANY (ARRAY['appareil'::text, 'materiel'::text, 'ustensile'::text])));
CREATE INDEX fiches_techniques_materiel_fiche_id_idx ON public.fiches_techniques_materiel USING btree (fiche_id);
alter table public.fiches_techniques_materiel enable row level security;
create policy isolation_via_fiche on public.fiches_techniques_materiel as permissive for all to public using ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant())))) with check ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant()))));

create table public.fiches_techniques_procedes (id uuid not null default gen_random_uuid(), fiche_id uuid not null, type text not null, actif boolean default true, famille_haccp text, duree_cuisson_min integer, passe_en_cellule boolean default false);
alter table public.fiches_techniques_procedes add constraint fiches_techniques_procedes_famille_haccp_check CHECK ((famille_haccp = ANY (ARRAY['general'::text, 'viande_hachee'::text, 'volaille'::text, 'poisson'::text])));
alter table public.fiches_techniques_procedes add constraint fiches_techniques_procedes_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE CASCADE;
alter table public.fiches_techniques_procedes add constraint fiches_techniques_procedes_pkey PRIMARY KEY (id);
alter table public.fiches_techniques_procedes add constraint fiches_techniques_procedes_type_check CHECK ((type = ANY (ARRAY['cuisson'::text, 'refroidissement'::text, 'maintien_chaud'::text, 'congelation'::text, 'decongelation'::text, 'remise_en_temperature'::text])));
CREATE INDEX fiches_techniques_procedes_fiche_id_idx ON public.fiches_techniques_procedes USING btree (fiche_id);
alter table public.fiches_techniques_procedes enable row level security;
create policy isolation_via_fiche on public.fiches_techniques_procedes as permissive for all to public using ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant())))) with check ((fiche_id IN ( SELECT fiches_techniques.id
   FROM fiches_techniques
  WHERE (fiches_techniques.etablissement_id = etablissement_courant()))));

create table public.fournisseurs (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, nom text not null, email text, telephone text, created_at timestamp with time zone not null default now(), contact_nom text, adresse text, numero_client text, jours_livraison text, note text, coordonnees_a_completer boolean not null default false, planning_commande jsonb, planning_livraison jsonb);
alter table public.fournisseurs add constraint fournisseurs_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.fournisseurs add constraint fournisseurs_pkey PRIMARY KEY (id);
CREATE INDEX fournisseurs_etablissement_id_idx ON public.fournisseurs USING btree (etablissement_id);
alter table public.fournisseurs enable row level security;
create policy isolation_etablissement on public.fournisseurs as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.horaires_service (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, jour text, date date, service text not null, debut text, fin text, ferme boolean not null default false, note text, created_at timestamp with time zone default now());
alter table public.horaires_service add constraint horaires_service_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.horaires_service add constraint horaires_service_pkey PRIMARY KEY (id);
alter table public.horaires_service add constraint horaires_service_service_check CHECK ((service = ANY (ARRAY['midi'::text, 'soir'::text])));
CREATE INDEX horaires_service_etab_idx ON public.horaires_service USING btree (etablissement_id);
alter table public.horaires_service enable row level security;
create policy isolation_etablissement on public.horaires_service as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.huile_friture_tests (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, date date not null default CURRENT_DATE, resultat text, photo_bandelette_url text, employe_id uuid, action_lendemain text, heure time without time zone);
alter table public.huile_friture_tests add constraint huile_friture_tests_action_lendemain_check CHECK ((action_lendemain = ANY (ARRAY['filtration'::text, 'remplacement'::text])));
alter table public.huile_friture_tests add constraint huile_friture_tests_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.huile_friture_tests add constraint huile_friture_tests_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.huile_friture_tests add constraint huile_friture_tests_pkey PRIMARY KEY (id);
alter table public.huile_friture_tests add constraint huile_friture_tests_resultat_check CHECK ((resultat = ANY (ARRAY['bon'::text, 'non_conforme'::text])));
CREATE INDEX huile_friture_tests_etablissement_id_idx ON public.huile_friture_tests USING btree (etablissement_id);
alter table public.huile_friture_tests enable row level security;
create policy isolation_etablissement on public.huile_friture_tests as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.ia_consommation (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, type_appel text not null, cout_estime_euros numeric not null default 0, date_heure timestamp with time zone not null default now());
alter table public.ia_consommation add constraint ia_consommation_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.ia_consommation add constraint ia_consommation_pkey PRIMARY KEY (id);
alter table public.ia_consommation add constraint ia_consommation_type_appel_check CHECK ((type_appel = ANY (ARRAY['photo_reception'::text, 'photo_tracabilite'::text, 'photo_fiche_technique'::text, 'commande_vocale'::text])));
CREATE INDEX ia_consommation_etablissement_id_idx ON public.ia_consommation USING btree (etablissement_id);
alter table public.ia_consommation enable row level security;
create policy isolation_etablissement on public.ia_consommation as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.inventaires_lignes (id uuid not null default gen_random_uuid(), inventaire_id uuid not null, produit_id uuid, quantite_systeme numeric, quantite_comptee numeric, ecart numeric);
alter table public.inventaires_lignes add constraint inventaires_lignes_inventaire_id_fkey FOREIGN KEY (inventaire_id) REFERENCES inventaires_mensuels(id) ON DELETE CASCADE;
alter table public.inventaires_lignes add constraint inventaires_lignes_pkey PRIMARY KEY (id);
alter table public.inventaires_lignes add constraint inventaires_lignes_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL;
CREATE INDEX inventaires_lignes_inventaire_id_idx ON public.inventaires_lignes USING btree (inventaire_id);
alter table public.inventaires_lignes enable row level security;
create policy isolation_via_inventaire on public.inventaires_lignes as permissive for all to public using ((inventaire_id IN ( SELECT inventaires_mensuels.id
   FROM inventaires_mensuels
  WHERE (inventaires_mensuels.etablissement_id = etablissement_courant())))) with check ((inventaire_id IN ( SELECT inventaires_mensuels.id
   FROM inventaires_mensuels
  WHERE (inventaires_mensuels.etablissement_id = etablissement_courant()))));

create table public.inventaires_mensuels (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, date date not null default CURRENT_DATE, statut text default 'en_cours'::text);
alter table public.inventaires_mensuels add constraint inventaires_mensuels_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.inventaires_mensuels add constraint inventaires_mensuels_pkey PRIMARY KEY (id);
CREATE INDEX inventaires_mensuels_etablissement_id_idx ON public.inventaires_mensuels USING btree (etablissement_id);
alter table public.inventaires_mensuels enable row level security;
create policy isolation_etablissement on public.inventaires_mensuels as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.invitations_appareil (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, token_hash text not null, auth_email text not null, employe_id uuid, expire_le timestamp with time zone not null, utilisee_le timestamp with time zone, created_at timestamp with time zone not null default now());
alter table public.invitations_appareil add constraint invitations_appareil_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id);
alter table public.invitations_appareil add constraint invitations_appareil_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id);
alter table public.invitations_appareil add constraint invitations_appareil_pkey PRIMARY KEY (id);
alter table public.invitations_appareil add constraint invitations_appareil_token_hash_key UNIQUE (token_hash);
alter table public.invitations_appareil enable row level security;

create table public.invitations_code (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, employe_id uuid not null, token_hash text not null, expire_le timestamp with time zone not null, utilisee_le timestamp with time zone, created_at timestamp with time zone not null default now());
alter table public.invitations_code add constraint invitations_code_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE CASCADE;
alter table public.invitations_code add constraint invitations_code_pkey PRIMARY KEY (id);
alter table public.invitations_code add constraint invitations_code_token_hash_key UNIQUE (token_hash);
alter table public.invitations_code enable row level security;

create table public.journal_activite (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, utilisateur_id uuid, action text not null, table_concernee text, ligne_id uuid, ancienne_valeur jsonb, nouvelle_valeur jsonb, date_heure timestamp with time zone not null default now());
alter table public.journal_activite add constraint journal_activite_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.journal_activite add constraint journal_activite_pkey PRIMARY KEY (id);
alter table public.journal_activite add constraint journal_activite_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
CREATE INDEX journal_activite_etablissement_id_idx ON public.journal_activite USING btree (etablissement_id);
alter table public.journal_activite enable row level security;
create policy isolation_etablissement on public.journal_activite as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.lots_produits (id uuid not null default gen_random_uuid(), produit_id uuid not null, etablissement_id uuid not null, numero_lot text, dlc date, ddm date, quantite_recue numeric, quantite_restante numeric, allergenes_lot text[], origine_lot text, agrement_sanitaire_lot text, date_reception timestamp with time zone default now());
alter table public.lots_produits add constraint lots_produits_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.lots_produits add constraint lots_produits_pkey PRIMARY KEY (id);
alter table public.lots_produits add constraint lots_produits_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE;
CREATE INDEX lots_produits_etablissement_id_idx ON public.lots_produits USING btree (etablissement_id);
CREATE INDEX lots_produits_produit_id_idx ON public.lots_produits USING btree (produit_id);
alter table public.lots_produits enable row level security;
create policy isolation_etablissement on public.lots_produits as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.maintiens_chaud (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, fiche_id uuid, produit_nom text, appareil text, heure_debut timestamp with time zone, heure_fin timestamp with time zone, temperature_sortie numeric, statut text not null default 'en_cours'::text, donnees jsonb, employe_id uuid);
alter table public.maintiens_chaud add constraint maintiens_chaud_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.maintiens_chaud add constraint maintiens_chaud_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE SET NULL;
alter table public.maintiens_chaud add constraint maintiens_chaud_pkey PRIMARY KEY (id);
alter table public.maintiens_chaud add constraint maintiens_chaud_statut_check CHECK ((statut = ANY (ARRAY['en_cours'::text, 'termine'::text])));
CREATE INDEX maintiens_chaud_etablissement_id_idx ON public.maintiens_chaud USING btree (etablissement_id);
alter table public.maintiens_chaud enable row level security;
create policy isolation_etablissement on public.maintiens_chaud as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.notifications_fournisseurs (id uuid not null default gen_random_uuid(), reception_id uuid not null, fournisseur_id uuid, sujet text, corps text, statut text not null default 'en_attente'::text, ecart_prix numeric, created_at timestamp with time zone not null default now(), donnees jsonb, mode_traitement text, traite_par uuid, traite_le timestamp with time zone);
alter table public.notifications_fournisseurs add constraint notifications_fournisseurs_fournisseur_id_fkey FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(id) ON DELETE SET NULL;
alter table public.notifications_fournisseurs add constraint notifications_fournisseurs_pkey PRIMARY KEY (id);
alter table public.notifications_fournisseurs add constraint notifications_fournisseurs_reception_id_fkey FOREIGN KEY (reception_id) REFERENCES receptions(id) ON DELETE CASCADE;
alter table public.notifications_fournisseurs add constraint notifications_fournisseurs_statut_check CHECK ((statut = ANY (ARRAY['en_attente'::text, 'envoye'::text])));
CREATE INDEX notifications_fournisseurs_reception_id_idx ON public.notifications_fournisseurs USING btree (reception_id);
alter table public.notifications_fournisseurs enable row level security;
create policy isolation_via_reception on public.notifications_fournisseurs as permissive for all to public using ((reception_id IN ( SELECT receptions.id
   FROM receptions
  WHERE (receptions.etablissement_id = etablissement_courant())))) with check ((reception_id IN ( SELECT receptions.id
   FROM receptions
  WHERE (receptions.etablissement_id = etablissement_courant()))));

create table public.planning_creneaux (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, utilisateur_id uuid, jour date, service text, heure_debut time without time zone, heure_fin time without time zone, jour_semaine text);
alter table public.planning_creneaux add constraint planning_creneaux_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.planning_creneaux add constraint planning_creneaux_jour_semaine_check CHECK ((jour_semaine = ANY (ARRAY['Lundi'::text, 'Mardi'::text, 'Mercredi'::text, 'Jeudi'::text, 'Vendredi'::text, 'Samedi'::text, 'Dimanche'::text])));
alter table public.planning_creneaux add constraint planning_creneaux_pkey PRIMARY KEY (id);
alter table public.planning_creneaux add constraint planning_creneaux_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE;
CREATE INDEX planning_creneaux_etablissement_id_idx ON public.planning_creneaux USING btree (etablissement_id);
alter table public.planning_creneaux enable row level security;
create policy isolation_etablissement on public.planning_creneaux as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.pms_documents (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, categorie text not null, titre text, date_document date, date_echeance date, chemin text not null, nom_fichier text, type_mime text, created_at timestamp with time zone not null default now());
alter table public.pms_documents add constraint pms_documents_categorie_check CHECK ((categorie = ANY (ARRAY['declaration_activite'::text, 'attestation_formation'::text, 'contrat_nuisibles'::text, 'attestation_eau'::text, 'autorisation_eau_privee'::text, 'analyse_eau'::text, 'rapport_laboratoire'::text, 'contrat_maintenance'::text, 'fds'::text, 'autre'::text])));
alter table public.pms_documents add constraint pms_documents_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.pms_documents add constraint pms_documents_pkey PRIMARY KEY (id);
alter table public.pms_documents enable row level security;
create policy isolation_etablissement on public.pms_documents as permissive for all to public using (((etablissement_id = etablissement_courant()) AND (abonnement_courant() = 'complet'::text))) with check (((etablissement_id = etablissement_courant()) AND (abonnement_courant() = 'complet'::text)));

create table public.pms_executions (id uuid not null default gen_random_uuid(), pms_tache_id uuid not null, date date not null default CURRENT_DATE, statut text, motif_non_fait text, employe_id uuid, etablissement_id uuid, moment text, photo_employe text, valide_chef text, note_chef text, photo_chef text, valide_par uuid, valide_le timestamp with time zone, donnees jsonb, created_at timestamp with time zone not null default now());
alter table public.pms_executions add constraint pms_executions_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.pms_executions add constraint pms_executions_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.pms_executions add constraint pms_executions_pkey PRIMARY KEY (id);
alter table public.pms_executions add constraint pms_executions_pms_tache_id_fkey FOREIGN KEY (pms_tache_id) REFERENCES pms_taches(id) ON DELETE CASCADE;
alter table public.pms_executions add constraint pms_executions_statut_check CHECK ((statut = ANY (ARRAY['fait'::text, 'non_fait'::text])));
alter table public.pms_executions add constraint pms_executions_valide_chef_check CHECK (((valide_chef IS NULL) OR (valide_chef = ANY (ARRAY['ok'::text, 'ko'::text]))));
alter table public.pms_executions add constraint pms_executions_valide_par_fkey FOREIGN KEY (valide_par) REFERENCES utilisateurs(id) ON DELETE SET NULL;
CREATE INDEX pms_executions_pms_tache_id_idx ON public.pms_executions USING btree (pms_tache_id);
alter table public.pms_executions enable row level security;
create policy isolation_etablissement on public.pms_executions as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));
create policy isolation_via_pms_tache on public.pms_executions as permissive for all to public using ((pms_tache_id IN ( SELECT pms_taches.id
   FROM pms_taches
  WHERE (pms_taches.etablissement_id = etablissement_courant())))) with check ((pms_tache_id IN ( SELECT pms_taches.id
   FROM pms_taches
  WHERE (pms_taches.etablissement_id = etablissement_courant()))));

create table public.pms_formations (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, type text not null, utilisateur_id uuid, personne_nom text, date_formation date, organisme text, derogation text, notes text, created_at timestamp with time zone not null default now());
alter table public.pms_formations add constraint pms_formations_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.pms_formations add constraint pms_formations_pkey PRIMARY KEY (id);
alter table public.pms_formations add constraint pms_formations_type_check CHECK ((type = ANY (ARRAY['hygiene_14h'::text, 'haccp'::text, 'instructions'::text, 'consigne_sante'::text])));
alter table public.pms_formations add constraint pms_formations_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.pms_formations enable row level security;
create policy isolation_etablissement on public.pms_formations as permissive for all to public using (((etablissement_id = etablissement_courant()) AND (abonnement_courant() = 'complet'::text))) with check (((etablissement_id = etablissement_courant()) AND (abonnement_courant() = 'complet'::text)));

create table public.pms_taches (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, zone text not null, protocole text, frequence text, poste text, tache text, donnees jsonb, created_at timestamp with time zone not null default now());
alter table public.pms_taches add constraint pms_taches_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.pms_taches add constraint pms_taches_frequence_check CHECK ((frequence = ANY (ARRAY['quotidien'::text, 'hebdomadaire'::text, 'mensuel'::text])));
alter table public.pms_taches add constraint pms_taches_pkey PRIMARY KEY (id);
CREATE INDEX pms_taches_etablissement_id_idx ON public.pms_taches USING btree (etablissement_id);
alter table public.pms_taches enable row level security;
create policy isolation_etablissement on public.pms_taches as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.prestataires (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, type text not null, nom text not null, email text, telephone text, date_dernier_passage date, date_prochaine_echeance date, created_at timestamp with time zone not null default now(), libelle text, frequence_rappel text, notes text);
alter table public.prestataires add constraint prestataires_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.prestataires add constraint prestataires_frequence_check CHECK (((frequence_rappel IS NULL) OR (frequence_rappel = ANY (ARRAY['mensuelle'::text, 'trimestrielle'::text, 'semestrielle'::text, 'annuelle'::text]))));
alter table public.prestataires add constraint prestataires_pkey PRIMARY KEY (id);
alter table public.prestataires add constraint prestataires_type_check CHECK ((type = ANY (ARRAY['antinuisibles'::text, 'huiles_usagees'::text, 'maintenance_froid_sondes'::text, 'entretien_materiel'::text, 'dechets'::text, 'laboratoire'::text, 'autre'::text])));
CREATE INDEX prestataires_etablissement_id_idx ON public.prestataires USING btree (etablissement_id);
alter table public.prestataires enable row level security;
create policy isolation_etablissement on public.prestataires as permissive for all to public using (((etablissement_id = etablissement_courant()) AND (abonnement_courant() = 'complet'::text))) with check (((etablissement_id = etablissement_courant()) AND (abonnement_courant() = 'complet'::text)));

create table public.produits (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, nom text not null, reference text, categorie text, fournisseur_id uuid, unite text, quantite_stock numeric default 0, quantite_cible numeric, type_date text, delai_jours_dlc integer, delai_apres_ouverture_jours integer, prix_achat numeric, allergenes_norme text[], origine_norme text, agrement_sanitaire_norme text, created_at timestamp with time zone not null default now(), conditionnement text, prix_unite text, poids_par_piece text, reference_verifiee boolean not null default false, note text, conservation text, decongel_methode text, decongel_jours integer, decongel_source text);
alter table public.produits add constraint produits_conservation_check CHECK (((conservation IS NULL) OR (conservation = ANY (ARRAY['frais'::text, 'viande'::text, 'hache'::text, 'abats'::text, 'plat'::text, 'laitier'::text, 'poisson'::text, 'legume'::text, 'surgele'::text, 'sec'::text, 'boisson'::text, 'emballage'::text, 'entretien'::text, 'autre'::text]))));
alter table public.produits add constraint produits_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.produits add constraint produits_fournisseur_id_fkey FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(id) ON DELETE SET NULL;
alter table public.produits add constraint produits_pkey PRIMARY KEY (id);
alter table public.produits add constraint produits_type_date_check CHECK ((type_date = ANY (ARRAY['DLC'::text, 'DDM'::text])));
CREATE INDEX produits_etablissement_id_idx ON public.produits USING btree (etablissement_id);
alter table public.produits enable row level security;
create policy isolation_etablissement on public.produits as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.rappelconso_alertes (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, produit_id uuid, motif text, date date, lien_fiche_officielle text, statut text not null default 'non_traite'::text);
alter table public.rappelconso_alertes add constraint rappelconso_alertes_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.rappelconso_alertes add constraint rappelconso_alertes_pkey PRIMARY KEY (id);
alter table public.rappelconso_alertes add constraint rappelconso_alertes_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL;
alter table public.rappelconso_alertes add constraint rappelconso_alertes_statut_check CHECK ((statut = ANY (ARRAY['traite'::text, 'non_traite'::text])));
CREATE INDEX rappelconso_alertes_etablissement_id_idx ON public.rappelconso_alertes USING btree (etablissement_id);
alter table public.rappelconso_alertes enable row level security;
create policy isolation_etablissement on public.rappelconso_alertes as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.receptions (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, fournisseur_id uuid, receptionne_par uuid, date_livraison date, heure_livraison time without time zone, created_at timestamp with time zone not null default now(), fournisseur_nom text);
alter table public.receptions add constraint receptions_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.receptions add constraint receptions_fournisseur_id_fkey FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(id) ON DELETE SET NULL;
alter table public.receptions add constraint receptions_pkey PRIMARY KEY (id);
alter table public.receptions add constraint receptions_receptionne_par_fkey FOREIGN KEY (receptionne_par) REFERENCES utilisateurs(id) ON DELETE SET NULL;
CREATE INDEX receptions_etablissement_id_idx ON public.receptions USING btree (etablissement_id);
alter table public.receptions enable row level security;
create policy isolation_etablissement on public.receptions as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.receptions_lignes (id uuid not null default gen_random_uuid(), reception_id uuid not null, produit_id uuid, quantite numeric, lot_cree_id uuid, temperature_controlee numeric, conforme boolean, motif_non_conformite text, ecart_prix numeric, photo_etiquette_url text, produit_nom text, reference text, lot text, dlc date, allergenes text, origine text, agrement_sanitaire text, quantite_nc numeric, photo_nc_url text, valide_chef boolean not null default false, conservation text);
alter table public.receptions_lignes add constraint receptions_lignes_lot_cree_id_fkey FOREIGN KEY (lot_cree_id) REFERENCES lots_produits(id) ON DELETE SET NULL;
alter table public.receptions_lignes add constraint receptions_lignes_pkey PRIMARY KEY (id);
alter table public.receptions_lignes add constraint receptions_lignes_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL;
alter table public.receptions_lignes add constraint receptions_lignes_reception_id_fkey FOREIGN KEY (reception_id) REFERENCES receptions(id) ON DELETE CASCADE;
CREATE INDEX receptions_lignes_reception_id_idx ON public.receptions_lignes USING btree (reception_id);
alter table public.receptions_lignes enable row level security;
create policy isolation_via_reception on public.receptions_lignes as permissive for all to public using ((reception_id IN ( SELECT receptions.id
   FROM receptions
  WHERE (receptions.etablissement_id = etablissement_courant())))) with check ((reception_id IN ( SELECT receptions.id
   FROM receptions
  WHERE (receptions.etablissement_id = etablissement_courant()))));

create table public.receptions_photos_bon (id uuid not null default gen_random_uuid(), reception_id uuid not null, url_photo text not null, ordre integer default 0);
alter table public.receptions_photos_bon add constraint receptions_photos_bon_pkey PRIMARY KEY (id);
alter table public.receptions_photos_bon add constraint receptions_photos_bon_reception_id_fkey FOREIGN KEY (reception_id) REFERENCES receptions(id) ON DELETE CASCADE;
alter table public.receptions_photos_bon enable row level security;
create policy isolation_via_reception on public.receptions_photos_bon as permissive for all to public using ((reception_id IN ( SELECT receptions.id
   FROM receptions
  WHERE (receptions.etablissement_id = etablissement_courant())))) with check ((reception_id IN ( SELECT receptions.id
   FROM receptions
  WHERE (receptions.etablissement_id = etablissement_courant()))));

create table public.refroidissements (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, fiche_id uuid, origine_cuisson_id uuid, origine_maintien_id uuid, mode text not null, temperature_depart numeric, heure_depart timestamp with time zone, temperature_fin numeric, heure_fin timestamp with time zone, duree_max_min integer, statut text not null default 'en_cours'::text, conforme boolean, motif_anomalie text, donnees jsonb, employe_id uuid);
alter table public.refroidissements add constraint refroidissements_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.refroidissements add constraint refroidissements_fiche_id_fkey FOREIGN KEY (fiche_id) REFERENCES fiches_techniques(id) ON DELETE SET NULL;
alter table public.refroidissements add constraint refroidissements_mode_check CHECK ((mode = ANY (ARRAY['positif'::text, 'negatif'::text])));
alter table public.refroidissements add constraint refroidissements_motif_anomalie_check CHECK ((motif_anomalie = ANY (ARRAY['panne_cellule'::text, 'maintien_temperature'::text, 'non_conforme'::text])));
alter table public.refroidissements add constraint refroidissements_origine_cuisson_id_fkey FOREIGN KEY (origine_cuisson_id) REFERENCES cuissons(id) ON DELETE SET NULL;
alter table public.refroidissements add constraint refroidissements_origine_maintien_id_fkey FOREIGN KEY (origine_maintien_id) REFERENCES maintiens_chaud(id) ON DELETE SET NULL;
alter table public.refroidissements add constraint refroidissements_pkey PRIMARY KEY (id);
alter table public.refroidissements add constraint refroidissements_statut_check CHECK ((statut = ANY (ARRAY['en_cours'::text, 'termine'::text])));
CREATE INDEX refroidissements_etablissement_id_idx ON public.refroidissements USING btree (etablissement_id);
alter table public.refroidissements enable row level security;
create policy isolation_etablissement on public.refroidissements as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.releves_temperature (id uuid not null default gen_random_uuid(), appareil_id uuid not null, etablissement_id uuid not null, valeur numeric not null, date_heure timestamp with time zone not null default now(), conforme boolean, note text, employe_id uuid, statut_surveillance text default 'normal'::text, motif_anomalie text);
alter table public.releves_temperature add constraint releves_temperature_appareil_id_fkey FOREIGN KEY (appareil_id) REFERENCES appareils(id) ON DELETE CASCADE;
alter table public.releves_temperature add constraint releves_temperature_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.releves_temperature add constraint releves_temperature_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.releves_temperature add constraint releves_temperature_motif_anomalie_check CHECK ((motif_anomalie = ANY (ARRAY['porte_ouverte'::text, 'panne_materiel'::text, 'autre'::text])));
alter table public.releves_temperature add constraint releves_temperature_pkey PRIMARY KEY (id);
alter table public.releves_temperature add constraint releves_temperature_statut_surveillance_check CHECK ((statut_surveillance = ANY (ARRAY['normal'::text, 'en_surveillance'::text, 'resolu'::text, 'anomalie_confirmee'::text])));
CREATE INDEX releves_temperature_appareil_id_idx ON public.releves_temperature USING btree (appareil_id);
CREATE INDEX releves_temperature_etablissement_id_idx ON public.releves_temperature USING btree (etablissement_id);
alter table public.releves_temperature enable row level security;
create policy isolation_etablissement on public.releves_temperature as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.reservations (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, date date not null, heure time without time zone, nom_client text, nb_personnes integer, table_numero text, telephone text, note_libre text, commande_pre_choisie_json jsonb, prepare_note text);
alter table public.reservations add constraint reservations_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.reservations add constraint reservations_pkey PRIMARY KEY (id);
CREATE INDEX reservations_etablissement_id_idx ON public.reservations USING btree (etablissement_id);
alter table public.reservations enable row level security;
create policy isolation_etablissement on public.reservations as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.surveillances_temperature (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, appareil_id uuid not null, employe_id uuid, detecte_le timestamp with time zone not null default now(), valeur_initiale numeric, rappel_a timestamp with time zone not null, statut text not null default 'attente'::text, alarme_acquittee boolean not null default false, motif text, note text, created_at timestamp with time zone not null default now());
alter table public.surveillances_temperature add constraint surveillances_temperature_appareil_id_fkey FOREIGN KEY (appareil_id) REFERENCES appareils(id) ON DELETE CASCADE;
alter table public.surveillances_temperature add constraint surveillances_temperature_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.surveillances_temperature add constraint surveillances_temperature_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.surveillances_temperature add constraint surveillances_temperature_pkey PRIMARY KEY (id);
alter table public.surveillances_temperature add constraint surveillances_temperature_statut_check CHECK ((statut = ANY (ARRAY['attente'::text, 'resolu'::text, 'anomalie'::text])));
alter table public.surveillances_temperature enable row level security;
create policy isolation_etablissement on public.surveillances_temperature as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.taches (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, utilisateur_id uuid, poste text, type text, date date, heure time without time zone, statut text default 'a_faire'::text, liee_type text, liee_id uuid);
alter table public.taches add constraint taches_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.taches add constraint taches_pkey PRIMARY KEY (id);
alter table public.taches add constraint taches_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
CREATE INDEX taches_etablissement_id_idx ON public.taches USING btree (etablissement_id);
alter table public.taches enable row level security;
create policy isolation_etablissement on public.taches as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.tiac_declarations (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, date_symptomes date, convives_json jsonb, personnel_json jsonb, produits_traces_json jsonb, malades_json jsonb, suivi_ars_ddcsp text, texte_genere text, statut text default 'en_cours'::text, created_at timestamp with time zone not null default now());
alter table public.tiac_declarations add constraint tiac_declarations_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.tiac_declarations add constraint tiac_declarations_pkey PRIMARY KEY (id);
CREATE INDEX tiac_declarations_etablissement_id_idx ON public.tiac_declarations USING btree (etablissement_id);
alter table public.tiac_declarations enable row level security;
create policy isolation_etablissement on public.tiac_declarations as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.tracabilites (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, produit_id uuid, nom text, lot text, dlc_ddm date, allergenes text[], origine text, agrement_sanitaire text, delai_apres_ouverture text, avec_ia boolean default false, employe_id uuid, date_heure timestamp with time zone not null default now());
alter table public.tracabilites add constraint tracabilites_employe_id_fkey FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE SET NULL;
alter table public.tracabilites add constraint tracabilites_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.tracabilites add constraint tracabilites_pkey PRIMARY KEY (id);
alter table public.tracabilites add constraint tracabilites_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL;
CREATE INDEX tracabilites_etablissement_id_idx ON public.tracabilites USING btree (etablissement_id);
alter table public.tracabilites enable row level security;
create policy isolation_etablissement on public.tracabilites as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

create table public.tracabilites_photos (id uuid not null default gen_random_uuid(), tracabilite_id uuid not null, url_photo text not null, ordre integer default 0);
alter table public.tracabilites_photos add constraint tracabilites_photos_pkey PRIMARY KEY (id);
alter table public.tracabilites_photos add constraint tracabilites_photos_tracabilite_id_fkey FOREIGN KEY (tracabilite_id) REFERENCES tracabilites(id) ON DELETE CASCADE;
CREATE INDEX tracabilites_photos_tracabilite_id_idx ON public.tracabilites_photos USING btree (tracabilite_id);
alter table public.tracabilites_photos enable row level security;
create policy isolation_via_tracabilite on public.tracabilites_photos as permissive for all to public using ((tracabilite_id IN ( SELECT tracabilites.id
   FROM tracabilites
  WHERE (tracabilites.etablissement_id = etablissement_courant())))) with check ((tracabilite_id IN ( SELECT tracabilites.id
   FROM tracabilites
  WHERE (tracabilites.etablissement_id = etablissement_courant()))));

create table public.utilisateurs (id uuid not null default gen_random_uuid(), etablissement_id uuid not null, nom text not null, poste text, role text not null, code_personnel_hash text, statut text not null default 'actif'::text, created_at timestamp with time zone not null default now(), email text, prenom text, services text[] not null default '{}'::text[]);
alter table public.utilisateurs add constraint utilisateurs_email_format CHECK (((email IS NULL) OR (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'::text)));
alter table public.utilisateurs add constraint utilisateurs_etablissement_id_fkey FOREIGN KEY (etablissement_id) REFERENCES etablissements(id) ON DELETE CASCADE;
alter table public.utilisateurs add constraint utilisateurs_pkey PRIMARY KEY (id);
alter table public.utilisateurs add constraint utilisateurs_role_check CHECK ((role = ANY (ARRAY['commis'::text, 'cuisinier'::text, 'apprenti'::text, 'chef'::text, 'directeur'::text, 'second_cuisine'::text, 'chef_partie'::text, 'plongeur'::text])));
alter table public.utilisateurs add constraint utilisateurs_statut_check CHECK ((statut = ANY (ARRAY['actif'::text, 'supprime'::text])));
CREATE INDEX utilisateurs_etablissement_id_idx ON public.utilisateurs USING btree (etablissement_id);
alter table public.utilisateurs enable row level security;
create policy isolation_etablissement on public.utilisateurs as permissive for all to public using ((etablissement_id = etablissement_courant())) with check ((etablissement_id = etablissement_courant()));

-- Fonctions SQL (schéma public)
create or replace function public.etablissement_courant() returns uuid language sql stable set search_path to 'public' as $$
  select nullif(current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'etablissement_id','')::uuid
$$;
create or replace function public.abonnement_courant() returns text language sql stable security definer set search_path to 'public' as $$
  select abonnement from public.etablissements where id = public.etablissement_courant()
$$;
create or replace function public.purger_photos_receptions() returns void language sql set search_path to 'public','pg_temp' as $$
  delete from public.receptions_photos_bon
   where reception_id in (select r.id from public.receptions r
      where r.date_livraison < current_date - 14
        and not exists (select 1 from public.notifications_fournisseurs n where n.reception_id = r.id and n.statut = 'en_attente'));
  update public.receptions_lignes set photo_nc_url = null
   where photo_nc_url is not null
     and reception_id in (select r.id from public.receptions r
        where r.date_livraison < current_date - 14
          and not exists (select 1 from public.notifications_fournisseurs n where n.reception_id = r.id and n.statut = 'en_attente'));
$$;
create or replace function public.purger_conservation_enregistrements() returns void language plpgsql set search_path to 'public','pg_temp' as $$
declare
  limite_6_mois timestamptz := (now() - interval '6 months');
  limite_5_ans timestamptz := (current_date - interval '5 years');
begin
  begin delete from public.releves_temperature where date_heure < limite_6_mois; exception when others then raise warning 'purge releves_temperature: %', sqlerrm; end;
  begin delete from public.surveillances_temperature where detecte_le < limite_6_mois; exception when others then raise warning 'purge surveillances_temperature: %', sqlerrm; end;
  begin delete from public.cuissons where heure_depart < limite_6_mois; exception when others then raise warning 'purge cuissons: %', sqlerrm; end;
  begin delete from public.refroidissements where heure_depart < limite_6_mois; exception when others then raise warning 'purge refroidissements: %', sqlerrm; end;
  begin delete from public.maintiens_chaud where heure_debut < limite_6_mois; exception when others then raise warning 'purge maintiens_chaud: %', sqlerrm; end;
  begin delete from public.huile_friture_tests where date < limite_6_mois::date; exception when others then raise warning 'purge huile_friture_tests: %', sqlerrm; end;
  begin delete from public.pms_executions where date < limite_6_mois::date; exception when others then raise warning 'purge pms_executions: %', sqlerrm; end;
  begin delete from public.journal_activite where date_heure < limite_6_mois; exception when others then raise warning 'purge journal_activite: %', sqlerrm; end;
  begin delete from public.tracabilites where date_heure < limite_5_ans; exception when others then raise warning 'purge tracabilites: %', sqlerrm; end;
  begin delete from public.etiquettes where cree_le < limite_5_ans; exception when others then raise warning 'purge etiquettes: %', sqlerrm; end;
  begin
    update public.etiquettes set donnees = donnees - 'photo' - 'photos' - 'photoEtiquette'
     where cree_le < limite_6_mois and (donnees ? 'photo' or donnees ? 'photos' or donnees ? 'photoEtiquette');
  exception when others then raise warning 'purge photos etiquettes: %', sqlerrm; end;
end;
$$;
