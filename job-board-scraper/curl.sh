#!/usr/bin/env bash
# Job Board Scraper: One search across LinkedIn, Indeed, Glassdoor, ZipRecruiter, Naukri, Bayt and more, deduplicated across boards.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/job-board-scraper
# Input fields: https://apify.com/openclawai/job-board-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~job-board-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
    "searchTerm": "data engineer",
    "location": "Austin, TX",
    "sites": ["linkedin", "indeed"],
    "maxResults": 5,
    "hoursOld": 72
}
JSON
