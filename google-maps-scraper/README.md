# Google Maps Scraper

Runs a Google Maps search, such as `coffee shops in Austin, TX`, and returns one row per place: name, category, address, phone, website, rating, review count, opening status, coordinates and Google IDs. Optionally adds the top reviews for each place.

- Actor page: [datapika.com/actors/google-maps-scraper](https://datapika.com/actors/google-maps-scraper)
- Run it in the browser: [apify.com/openclawai/google-maps-scraper](https://apify.com/openclawai/google-maps-scraper)
- Every input field: [input schema](https://apify.com/openclawai/google-maps-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./google-maps-scraper/curl.sh > output.json     # curl, synchronous
python google-maps-scraper/python/run.py        # Python, apify-client
node google-maps-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "query": "coffee shops in Austin, TX",
  "maxResults": 5
}
```

| Field | Meaning |
|---|---|
| `query` | What you would type in the Google Maps search box, including the place. |
| `maxResults` | Maximum places (1 to 500). |

Other inputs: `scrapeReviews` (top reviews per place), `concurrency`, `proxyConfiguration`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `title`, `category` | Place name and category |
| `address` | Full address |
| `phone`, `website` | Contact details |
| `review_rating`, `review_count` | Average rating and number of reviews |
| `latitude`, `longitude`, `plus_code` | Location |
| `place_id`, `cid`, `link` | Google identifiers and Maps link |
| `status` | Opening status |
| `price_range`, `description`, `thumbnail` | Extra details, when shown |
| `reviews` | Top reviews, when `scrapeReviews` is on |
| `search_query` | The query that produced the row |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Put the place in the query (`dentists in Leeds`) rather than relying on location settings.
- `scrapeReviews` adds a few seconds per place.

Pricing is per result. See the [actor page](https://datapika.com/actors/google-maps-scraper) for current prices.
