"""Trustpilot Reviews Scraper: Trustpilot reviews and TrustScore profiles by domain, company name or review page URL, with no login.

Usage (from the repository root):
    pip install -r requirements.txt
    export APIFY_TOKEN=<your Apify API token>
    python trustpilot-reviews-scraper/python/run.py

Docs: https://datapika.com/actors/trustpilot-reviews-scraper
"""

import json
import os
import sys

from apify_client import ApifyClient

ACTOR_ID = "openclawai/trustpilot-reviews-scraper"

# Input fields: https://apify.com/openclawai/trustpilot-reviews-scraper/input-schema
run_input = {
    "companies": ["www.notion.so"],
    "maxReviews": 5,
    "languages": ["en"],
}


def summarize(item: dict) -> str:
    return (f"company | {item.get('name')} | TrustScore {item.get('trustScore')} | {item.get('numberOfReviews')} reviews" if item.get("dataType") == "company" else f"review | {item.get('rating')} stars | {item.get('publishedAt')} | {item.get('title')}")


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
