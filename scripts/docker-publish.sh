#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Error: falta .env con NEXT_PUBLIC_* y DOCKER_IMAGE" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

if [[ -z "${DOCKER_IMAGE:-}" ]]; then
  echo "Error: DOCKER_IMAGE no está definido en .env" >&2
  exit 1
fi

docker compose -f docker-compose.build.yml build
docker push "$DOCKER_IMAGE"

echo "Imagen publicada: $DOCKER_IMAGE"
