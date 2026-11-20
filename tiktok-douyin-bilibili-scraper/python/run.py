"""TikTok, Douyin & Bilibili Scraper: Videos, profiles, comments, search and trending feeds from TikTok, Douyin, Bilibili, Kuaishou and Xigua in one schema.

Usage (from the repository root):
    pip install -r requirements.txt
    export APIFY_TOKEN=<your Apify API token>
    python tiktok-douyin-bilibili-scraper/python/run.py

Docs: https://datapika.com/actors/tiktok-douyin-bilibili-scraper
"""

import json
import os
import sys

from apify_client import ApifyClient

ACTOR_ID = "openclawai/tiktok-douyin-bilibili-scraper"

# Input fields: https://apify.com/openclawai/tiktok-douyin-bilibili-scraper/input-schema
run_input = {
    "mode": "user_posts",
    "urls": ["https://www.tiktok.com/@tiktok"],
    "maxItems": 5,
}


def summarize(item: dict) -> str:
    return f"{item.get('platform')} | {item.get('play_count')} plays | {item.get('like_count')} likes | {(item.get('title') or item.get('description') or '')[:60]}"


def main() -> None:
    token = os.environ.get("APIFY_TOKEN")
    if not token:
        sys.exit("Set the APIFY_TOKEN environment variable first.")

    client = ApifyClient(token)

    # Start the run and wait for it to finish. The run log streams to the console.
    run = client.actor(ACTOR_ID).call(run_input=run_input)
    if run is None:
        sys.exit("The run could not be found.")

    status = getattr(run.status, "value", run.status)
    print(f"Run {run.id} finished with status {status}")
    if status != "SUCCEEDED":
        sys.exit(f"See the log: https://console.apify.com/actors/runs/{run.id}")

    items = client.dataset(run.default_dataset_id).list_items().items
    print(f"{len(items)} rows")
    for item in items:
        print(" ", summarize(item))

    with open("output.json", "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print("Saved every row to output.json")


if __name__ == "__main__":
    main()
