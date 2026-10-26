-- Ajout (sans rien supprimer) : DLC / DDM après fabrication, en jours, pour les produits faits maison.
alter table produits add column if not exists delai_apres_fabrication_jours integer;
