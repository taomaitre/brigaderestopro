#!/bin/bash
# Construit l'appli dans tests/banc/sortie/ avec Supabase REMPLACÉ par un faux client vide (sb.js) :
# aucune donnée réelle (ni Games Factory, ni la nouvelle base) ne peut être lue ou écrite par ces tests.
set -e
RACINE="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$RACINE/tests/banc/sortie"; mkdir -p "$OUT"
ESB="${ESBUILD:-$(command -v esbuild || echo "$RACINE/node_modules/.bin/esbuild")}"
TW="${TAILWIND:-$RACINE/node_modules/.bin/tailwindcss}"
cd "$RACINE"
ALIAS=(); [ -n "$REACT_DIR" ] && ALIAS=(--alias:react="$REACT_DIR/react" --alias:react-dom="$REACT_DIR/react-dom")
"$ESB" src/main.jsx --bundle --minify --loader:.js=jsx --jsx=automatic --outfile="$OUT/app.js" \
  --alias:@supabase/supabase-js="$RACINE/tests/banc/sb.js" --alias:xlsx="$RACINE/tests/banc/xl.js" \
  --define:process.env.NODE_ENV=\"production\" --define:import.meta.env='{}' --log-level=error "${ALIAS[@]}"
"$ESB" tests/banc/reel.jsx --bundle --minify --loader:.js=jsx --jsx=automatic --outfile="$OUT/reel.js" \
  --alias:@supabase/supabase-js="$RACINE/tests/banc/sb.js" --alias:xlsx="$RACINE/tests/banc/xl.js" \
  --define:process.env.NODE_ENV=\"production\" --define:import.meta.env='{}' --log-level=error "${ALIAS[@]}"
"$TW" -c tailwind.config.js -i src/index.css -o "$OUT/tw.css" >/dev/null 2>&1
cp tests/banc/index.html "$OUT/index.html"
sed 's/app.js/reel.js/' tests/banc/index.html > "$OUT/reel.html"
echo BUILD_OK
