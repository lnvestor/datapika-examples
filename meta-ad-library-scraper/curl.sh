#!/usr/bin/env bash
# Meta Ad Library Scraper: Facebook and Instagram ads from Meta's Ad Library by keyword, page URL or page ID, with no login.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/meta-ad-library-scraper
# Input fields: https://apify.com/openclawai/meta-ad-library-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~meta-ad-library-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
    "queries": ["https://www.facebook.com/nike"],
    "country": "US",
    "maxAdsPerQuery": 5
}
JSON
