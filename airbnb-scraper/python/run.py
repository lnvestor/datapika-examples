"""Airbnb Scraper: Airbnb listings with prices for your dates, plus room details, reviews, calendars, host portfolios and experiences.

Usage (from the repository root):
    pip install -r requirements.txt
    export APIFY_TOKEN=<your Apify API token>
    python airbnb-scraper/python/run.py

Docs: https://datapika.com/actors/airbnb-scraper
"""

import json
import os
import sys
from datetime import date, timedelta

from apify_client import ApifyClient

ACTOR_ID = "openclawai/airbnb-scraper"

# Dates 30 days out, so the example always searches the future.
check_in = date.today() + timedelta(days=30)
check_out = check_in + timedelta(days=3)

# Input fields: https://apify.com/openclawai/airbnb-scraper/input-schema
run_input = {
    "mode": "search_by_url",
    "searchUrl": f"https://www.airbnb.com/s/Lisbon--Portugal/homes?checkin={check_in}&checkout={check_out}&adults=2",
    "currency": "USD",
    "maxResults": 5,
}


def summarize(item: dict) -> str:
    price = item.get("price_per_night")
    price_text = f"{item.get('price_currency_symbol') or ''}{price} per night" if price is not None else "no price in search"
    return f"{item.get('name')} | {price_text} | rating {item.get('rating')}"


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
