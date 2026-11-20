"""Google Flights Scraper: Google Flights itineraries with price, airlines, stops, duration, segments and CO2 estimates.

Usage (from the repository root):
    pip install -r requirements.txt
    export APIFY_TOKEN=<your Apify API token>
    python google-flights-scraper/python/run.py

Docs: https://datapika.com/actors/google-flights-scraper
"""

import json
import os
import sys
from datetime import date, timedelta

from apify_client import ApifyClient

ACTOR_ID = "openclawai/google-flights-scraper"

# Dates 30 days out, so the example always searches the future.
check_in = date.today() + timedelta(days=30)
check_out = check_in + timedelta(days=3)

# Input fields: https://apify.com/openclawai/google-flights-scraper/input-schema
run_input = {
    "from_airport": "JFK",
    "to_airport": "LAX",
    "date": check_in.isoformat(),
    "trip": "one-way",
    "max_results": 5,
}


def summarize(item: dict) -> str:
    return f"{', '.join(item.get('airline_names') or [])} | {item.get('price')} | {item.get('stops')} stops | {item.get('duration_min_total')} min"


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
