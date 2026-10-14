// Service worker volontairement minimal : il sert uniquement à rendre l'application installable
// (icône sur le bureau / l'écran d'accueil). Il ne met RIEN en cache : le logiciel se met toujours
// à jour tout seul et affiche toujours les données du serveur. (Un mode hors ligne n'est pas prévu.)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
