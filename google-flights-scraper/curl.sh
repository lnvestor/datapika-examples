#!/usr/bin/env bash
# Google Flights Scraper: Google Flights itineraries with price, airlines, stops, duration, segments and CO2 estimates.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/google-flights-scraper
# Input fields: https://apify.com/openclawai/google-flights-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

# Dates 30 days out, so the example always searches the future.
# Tries GNU date first, then BSD/macOS date.
iso_date() { date -u -d "+$1 days" +%F 2>/dev/null || date -u -v+"$1"d +%F; }
CHECK_IN=$(iso_date 30)
CHECK_OUT=$(iso_date 33)

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~google-flights-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<JSON
{
    "from_airport": "JFK",
    "to_airport": "LAX",
    "date": "${CHECK_IN}",
    "trip": "one-way",
    "max_results": 5
}
JSON
