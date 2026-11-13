#!/bin/sh
# Browser-Prüfung /geschichte/ im Playwright-Image (1.48.2). dist wird unter /waybuild_website/ ausgeliefert.
# Aufruf: sh tests/geschichte/pw.sh <Ausgabeordner> [teile]   (aus der Arbeitskopie, nach dem Vorschau-Build)
# Braucht playwright@1.48.2 (+ axe-core) unter $PW_MODULE (Standard: Scratchpad der Sitzung) oder installiert sie im Container.
set -e
HIER=$(cd "$(dirname "$0")" && pwd)
REPO=$(cd "$HIER/../.." && pwd)
OUT=$(mkdir -p "${1:-/tmp/geschichte-test}" && cd "${1:-/tmp/geschichte-test}" && pwd); shift || true
PORT=${PORT:-8811}
SRV=$(mktemp -d)
ln -s "$REPO/dist" "$SRV/waybuild_website"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$SRV" >/dev/null 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null; rm -rf "$SRV"' EXIT
sleep 1
MOD=${PW_MODULE:-/tmp/claude-1001/-home-can-projekte/9f09c3f5-cd07-5f2c-ad26-9f47f2c052c9/scratchpad/node_modules}
if [ -d "$MOD/playwright" ]; then
  docker run --rm --ipc=host --network host -u "$(id -u):$(id -g)" -e HOME=/tmp -e NODE_PATH=/m \
    -v "$HIER":/t:ro -v "$OUT":/o -v "$MOD":/m:ro mcr.microsoft.com/playwright:v1.48.2-jammy \
    node /t/geschichte-test.js "http://127.0.0.1:$PORT/waybuild_website" /o "$@"
else
  docker run --rm --ipc=host --network host -u "$(id -u):$(id -g)" -e HOME=/tmp -e NODE_PATH=/tmp/node_modules \
    -v "$HIER":/t:ro -v "$OUT":/o mcr.microsoft.com/playwright:v1.48.2-jammy \
    sh -c "cd /tmp && npm i -s playwright@1.48.2 axe-core >/dev/null 2>&1 && node /t/geschichte-test.js http://127.0.0.1:$PORT/waybuild_website /o $*"
fi
