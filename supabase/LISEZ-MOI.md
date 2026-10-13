# Base Supabase – BrigadeRestoPro
- `structure-base.sql` : tables, contraintes, index, règles RLS, fonctions SQL (sans données).
- `functions/` : les 4 fonctions serveur (auth-etablissement, code-employe, invitation-appareil, ia-gemini).
- Secrets à recréer dans Supabase si on reconstruit : GEMINI_API_KEY (+ GEMINI_MODEL), RESEND_API_KEY et MAIL_EXPEDITEUR (facultatifs).
- Les DONNÉES se sauvegardent avec le bouton « Sauvegarde des données » (Contrôle & Gestion → Réglages), compte chef/directeur.
