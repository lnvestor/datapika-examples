"""Job Board Scraper: One search across LinkedIn, Indeed, Glassdoor, ZipRecruiter, Naukri, Bayt and more, deduplicated across boards.

Usage (from the repository root):
    pip install -r requirements.txt
    export APIFY_TOKEN=<your Apify API token>
    python job-board-scraper/python/run.py

Docs: https://datapika.com/actors/job-board-scraper
"""

import json
import os
import sys

from apify_client import ApifyClient

ACTOR_ID = "openclawai/job-board-scraper"

# Input fields: https://apify.com/openclawai/job-board-scraper/input-schema
run_input = {
    "searchTerm": "data engineer",
    "location": "Austin, TX",
    "sites": ["linkedin", "indeed"],
    "maxResults": 5,
    "hoursOld": 72,
}


def summarize(item: dict) -> str:
    return f"{item.get('site')} | {item.get('title')} | {item.get('company')} | {item.get('location')}"


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
