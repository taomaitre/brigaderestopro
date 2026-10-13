# Tests automatiques

**But** : vérifier, avant chaque publication, que les parcours essentiels ne plantent pas (connexion, toutes les tuiles, cuisson jusqu'à « Terminer », remplaçant du chef, téléphone sans débordement…).

**Sécurité des données** : le banc d'essai remplace Supabase par un faux client vide (`banc/sb.js`). Aucun test ne peut lire ni écrire dans la vraie base (ni Games Factory, ni la nouvelle base). Chaque parcours tourne dans un navigateur neuf, jeté à la fin : rien n'est conservé.

**Quand** : sur la machine de développement / l'environnement de Claude, jamais sur les tablettes de la cuisine, jamais pendant un service.

**Lancer** : `bash tests/run.sh` (durée ≈ 4 min : l'appli étale volontairement le chargement de ses données). Résultat : une ligne ✓ / ✗ par parcours et un code de sortie non nul si un parcours échoue.

Dans l'environnement de Claude : `source tests/env-sandbox.sh` avant `bash tests/run.sh`.
