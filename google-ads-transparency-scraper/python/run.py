"""Google Ads Transparency Scraper: Advertiser creatives, run dates and reach data from the Google Ads Transparency Center.

Usage (from the repository root):
    pip install -r requirements.txt
    export APIFY_TOKEN=<your Apify API token>
    python google-ads-transparency-scraper/python/run.py

Docs: https://datapika.com/actors/google-ads-transparency-scraper
"""

import json
import os
import sys

from apify_client import ApifyClient

ACTOR_ID = "openclawai/google-ads-transparency-scraper"

# Input fields: https://apify.com/openclawai/google-ads-transparency-scraper/input-schema
run_input = {
    "queries": ["booking.com"],
    "advertisersPerQuery": 1,
    "maxAdsPerAdvertiser": 5,
    "region": "US",
}


def summarize(item: dict) -> str:
    if item.get("item_type") == "advertiser":
        return f"advertiser | {item.get('advertiser_name')} | {item.get('advertiser_id')}"
    return f"ad | {item.get('format')} | {item.get('first_shown')} to {item.get('last_shown')} | {item.get('days_active')} days"


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
