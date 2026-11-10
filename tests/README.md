# Tests automatiques

**But** : vérifier, avant chaque publication, que les parcours essentiels ne plantent pas (connexion, toutes les tuiles, cuisson jusqu'à « Terminer », remplaçant du chef, téléphone sans débordement…).

**Sécurité des données** : le banc d'essai remplace Supabase par un faux client vide (`banc/sb.js`). Aucun test ne peut lire ni écrire dans la vraie base (ni Games Factory, ni la nouvelle base). Chaque parcours tourne dans un navigateur neuf, jeté à la fin : rien n'est conservé.

**Quand** : sur la machine de développement / l'environnement de Claude, jamais sur les tablettes de la cuisine, jamais pendant un service.

**Lancer** : `bash tests/run.sh` (durée ≈ 4 min : l'appli étale volontairement le chargement de ses données). Résultat : une ligne ✓ / ✗ par parcours et un code de sortie non nul si un parcours échoue.

Dans l'environnement de Claude : `source tests/env-sandbox.sh` avant `bash tests/run.sh`.

## Deux niveaux de contrôle (ajouté le 10/11/2026)
1. **`node tests/contrats.mjs`** (quelques secondes, sans navigateur) : vérifie que chaque décision validée avec Loïc est toujours présente dans le code (ou toujours absente quand elle a été retirée). `tests/run.sh` le lance en premier : s'il échoue, rien d'autre ne part.
2. **`node tests/parcours.mjs`** : les parcours dans un navigateur. `FILTRE="texte"` ne lance que les parcours dont le nom contient ce texte.

**Règle** : quand une décision change, on modifie la ligne du test ET la fiche « comportements-valides » du projet. Un test qui échoue n'est jamais ignoré ni supprimé en silence : soit c'est une régression (on la corrige), soit la décision a changé (on met à jour le test et la fiche, avec la date).
