#!/usr/bin/env bash
# TikTok, Douyin & Bilibili Scraper: Videos, profiles, comments, search and trending feeds from TikTok, Douyin, Bilibili, Kuaishou and Xigua in one schema.
#
# One synchronous request: starts a run, waits for it (up to 300 seconds)
# and returns the dataset rows as JSON.
#
# Usage:
#   export APIFY_TOKEN=<your Apify API token>
#   ./curl.sh > output.json
#
# Docs: https://datapika.com/actors/tiktok-douyin-bilibili-scraper
# Input fields: https://apify.com/openclawai/tiktok-douyin-bilibili-scraper/input-schema
set -euo pipefail

: "${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first.}"

curl --silent --show-error --fail-with-body -X POST \
  "https://api.apify.com/v2/acts/openclawai~tiktok-douyin-bilibili-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
    "mode": "user_posts",
    "urls": ["https://www.tiktok.com/@tiktok"],
    "maxItems": 5
}
JSON
