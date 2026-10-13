#!/bin/bash
# Lance tous les parcours de test. À exécuter avant chaque publication (voir tests/README.md).
cd "$(dirname "$0")/.."
bash tests/banc/build.sh || exit 1
(cd tests/banc/sortie && python3 -m http.server 5199 --bind 127.0.0.1 >/dev/null 2>&1 & echo $! > /tmp/banc_srv.pid)
sleep 1
node tests/parcours.mjs; CODE=$?
kill "$(cat /tmp/banc_srv.pid)" 2>/dev/null
exit $CODE
