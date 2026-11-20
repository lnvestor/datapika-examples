#!/usr/bin/env bash
# Add every Datapika actor to Claude Code as MCP tools.
# Docs: https://datapika.com/mcp
set -euo pipefail

URL="https://mcp.apify.com/?tools=fetch-actor-details,openclawai/job-board-scraper,openclawai/linkedin-jobs-scraper,openclawai/reddit-scraper,openclawai/tiktok-douyin-bilibili-scraper,openclawai/airbnb-scraper,openclawai/career-site-ats-jobs-scraper,openclawai/google-maps-scraper,openclawai/meta-ad-library-scraper,openclawai/google-flights-scraper,openclawai/threads-scraper,openclawai/tiktok-shop-scraper,openclawai/google-ads-transparency-scraper,openclawai/kuaishou-scraper,openclawai/hotel-rental-scraper,openclawai/indeed-ziprecruiter-scraper,openclawai/wechat-scraper,openclawai/youtube-video-scraper,openclawai/trustpilot-reviews-scraper,openclawai/bilibili-scraper"

# Option 1 (default): sign in with Apify in the browser on first use.
claude mcp add --transport http datapika "$URL"

# Option 2: use an API token instead of browser sign-in.
# The token is stored in your Claude Code MCP config.
# claude mcp add --transport http datapika "$URL" --header "Authorization: Bearer ${APIFY_TOKEN:?Set APIFY_TOKEN first}"
