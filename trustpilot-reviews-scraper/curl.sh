#!/usr/bin/env bash
# Trustpilot Reviews Scraper: Trustpilot reviews and TrustScore profiles by domain, company name or review page URL, with no login.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/trustpilot-reviews-scraper
# Input fields: https://apify.com/openclawai/trustpilot-reviews-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~trustpilot-reviews-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
    "companies": ["www.notion.so"],
    "maxReviews": 5,
    "languages": ["en"]
}
JSON
