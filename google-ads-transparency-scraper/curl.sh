#!/usr/bin/env bash
# Google Ads Transparency Scraper: Advertiser creatives, run dates and reach data from the Google Ads Transparency Center.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/google-ads-transparency-scraper
# Input fields: https://apify.com/openclawai/google-ads-transparency-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~google-ads-transparency-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
    "queries": ["booking.com"],
    "advertisersPerQuery": 1,
    "maxAdsPerAdvertiser": 5,
    "region": "US"
}
JSON
