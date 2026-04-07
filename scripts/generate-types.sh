#!/usr/bin/env bash
set -euo pipefail

# Generate TypeScript types from the LiteStar OpenAPI schema.
#
# Prerequisites:
#   - Backend running: cd backend && litestar run
#   - npx available (Node.js installed)
#
# Usage:
#   ./scripts/generate-types.sh [openapi-url]

OPENAPI_URL="${1:-http://localhost:8000/schema/openapi.json}"
OUTPUT_DIR="frontend/types/generated"
OUTPUT_FILE="${OUTPUT_DIR}/api.ts"

echo "Fetching OpenAPI schema from ${OPENAPI_URL}..."

mkdir -p "${OUTPUT_DIR}"

npx openapi-typescript "${OPENAPI_URL}" \
  --output "${OUTPUT_FILE}" \
  --alphabetize \
  --export-type

echo "Generated TypeScript types at ${OUTPUT_FILE}"
