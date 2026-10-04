# BrigadeRestoPro

Logiciel de gestion de cuisine (HACCP, stock, planning, fiches techniques) — connu en
interne sous le nom "Ma Cuisine". Toute la documentation fonctionnelle (tuiles, flux,
décisions) vit dans le projet claude.ai "BrigadeRestoPro", pas dans ce dépôt.

## État du code

Ce dépôt contient la première version "vrai projet" de l'application, portée depuis le
dernier fichier unique fonctionnel retrouvé (version v79, construit pour tourner comme
Artifact Claude avec React/Babel/Tailwind chargés en CDN). Depuis le 01/10, le travail se
faisait uniquement en documentation (voir le projet claude.ai) en attendant cette
migration vers une structure React + Vite classique, plus facile à suivre commit par
commit et compatible avec un hébergement o2switch.

## Installation

```bash
npm install
cp .env.example .env   # puis remplir .env avec les identifiants Supabase réels
npm run dev            # serveur de développement local
npm run build          # build de production (dossier dist/)
```

## Variables d'environnement

Voir `.env.example`. La clé Supabase anon/publishable est sûre à exposer côté client.
**Aucune clé d'API IA (Anthropic, Gemini...) ne doit être mise dans une variable `VITE_*`**
— ces valeurs sont incluses en clair dans le code envoyé au navigateur. Cette clé devra
vivre uniquement dans un futur backend, pas dans ce projet front-end.

## Déploiement

Cible prévue : hébergement o2switch (déjà souscrit). Le build (`npm run build`) produit
un dossier `dist/` statique à déployer. Pas encore fait à ce stade.
