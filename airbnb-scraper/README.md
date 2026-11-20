# Airbnb Scraper

Collects Airbnb data in seven modes: search by Airbnb URL, search by map area, room details, room reviews, room calendars, all listings of a host, and experiences. The example searches Lisbon for dates 30 days out and returns listings with the nightly and total price for those dates, where Airbnb shows one.

- Actor page: [datapika.com/actors/airbnb-scraper](https://datapika.com/actors/airbnb-scraper)
- Run it in the browser: [apify.com/openclawai/airbnb-scraper](https://apify.com/openclawai/airbnb-scraper)
- Every input field: [input schema](https://apify.com/openclawai/airbnb-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./airbnb-scraper/curl.sh > output.json     # curl, synchronous
python airbnb-scraper/python/run.py        # Python, apify-client
node airbnb-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "mode": "search_by_url",
  "searchUrl": "https://www.airbnb.com/s/Lisbon--Portugal/homes?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=2",
  "currency": "USD",
  "maxResults": 5
}
```

The scripts fill in dates 30 days from today, so the example always searches the future.

| Field | Meaning |
|---|---|
| `mode` | `search_by_url`, `search_by_bbox`, `room_details`, `room_reviews`, `room_calendar`, `host_listings` or `experience_search`. |
| `searchUrl` | An airbnb.com/s/... search URL. Dates, guests and filters are read from the URL, so the easiest way is to filter on airbnb.com and copy the address bar. |
| `currency` | Currency for prices. |
| `maxResults` | Maximum rows (1 to 5,000). |

Other inputs: `roomUrls` (room modes), `hostId`, `neLat`/`neLng`/`swLat`/`swLng` (map search), `checkIn`, `checkOut`, `adults`, `priceMin`, `priceMax`, `placeType`, `freeCancellation`, `language`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `record_type` | Row type: `listing` (search), `room`, `review`, `calendar`, `host_listing` or `experience` |
| `room_id`, `room_url` | Listing ID and URL |
| `title`, `name`, `room_type` | Listing title, name and type |
| `person_capacity`, `bedrooms`, `beds`, `bathrooms` | Size |
| `price_per_night`, `price_total`, `price_unit_qualifier` | Price for the searched dates, and what the total covers (for example `for 3 nights`) |
| `price_per_night_original`, `price_currency_symbol`, `price_currency` | Price before discount, the currency symbol, and the ISO currency code (for example `USD`) |
| `rating`, `review_count` | Rating and number of reviews |
| `is_superhost`, `is_guest_favorite`, `free_cancellation` | Flags |
| `latitude`, `longitude`, `city`, `country` | Location |
| `images`, `amenities`, `description` | Listing content (room modes return the full set) |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Without dates in the search URL, Airbnb prices a 5-night stay.
- Search cards carry the stay total for your dates, hotel-type listings included. For a full quote on one listing, use `room_details` with `roomUrls`, `checkIn` and `checkOut`.
- For a larger area than one search page holds, the actor splits the map and keeps the same filters.

Pricing is per result. See the [actor page](https://datapika.com/actors/airbnb-scraper) for current prices.
