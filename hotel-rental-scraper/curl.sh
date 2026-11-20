#!/usr/bin/env bash
# Hotel & Rental Scraper: Hotel and vacation rental prices from up to 9 booking sites in one run, in one schema.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/hotel-rental-scraper
# Input fields: https://apify.com/openclawai/hotel-rental-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~hotel-rental-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
    "location": "Lisbon, Portugal",
    "checkIn": "30 days",
    "nights": 2,
    "adults": 2,
    "sites": ["booking", "airbnb", "vrbo"],
    "maxResultsPerSite": 2,
    "currency": "USD"
}
JSON
