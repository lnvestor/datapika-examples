# Meta Ad Library Scraper

Searches Meta's public Ad Library by keyword, Facebook page URL or page ID and returns one row per ad: advertiser page, run dates, format, ad text, call to action, image and video URLs and the platforms the ad ran on. Political, issue and EU ads also carry the reach, spend and audience ranges Meta publishes for them.

- Actor page: [datapika.com/actors/meta-ad-library-scraper](https://datapika.com/actors/meta-ad-library-scraper)
- Run it in the browser: [apify.com/openclawai/meta-ad-library-scraper](https://apify.com/openclawai/meta-ad-library-scraper)
- Every input field: [input schema](https://apify.com/openclawai/meta-ad-library-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./meta-ad-library-scraper/curl.sh > output.json     # curl, synchronous
python meta-ad-library-scraper/python/run.py        # Python, apify-client
node meta-ad-library-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "queries": [
    "https://www.facebook.com/nike"
  ],
  "country": "US",
  "maxAdsPerQuery": 5
}
```

| Field | Meaning |
|---|---|
| `queries` | Keywords, Facebook page URLs or numeric page IDs, in any mix. |
| `country` | 2-letter country code, or `ALL`. |
| `maxAdsPerQuery` | Maximum ads per query (1 to 50,000). |

Other inputs: `activeStatus` (`ACTIVE`, `INACTIVE`, `ALL`), `adType`, `formats`, `platforms`, `exactPhrase`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `item_type` | `ad`, or `hint` when a query finds nothing |
| `ad_id`, `ad_library_url` | Ad Library ID and link |
| `page_id`, `page_name`, `page_url` | Advertiser page |
| `is_active`, `start_date`, `end_date`, `days_active` | Run status and dates |
| `format` | `IMAGE`, `VIDEO` or `TEXT` |
| `body`, `title`, `caption`, `link_url` | Ad text and landing page |
| `cta_text`, `cta_type` | Call to action |
| `image_url`, `video_url`, `creatives` | Creative media |
| `publisher_platforms` | Facebook, Instagram, Messenger, ... |
| `impressions_low`, `high`, `spend_low`, `high`, `reach_low`, `high` | Ranges Meta publishes for political, issue and EU ads |
| `source_query`, `country` | The query and country that produced the row |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- A page URL or page ID returns that advertiser's ads; a keyword searches ad text across all advertisers.
- Set `activeStatus` to `ALL` to include ads that have stopped running.

Pricing is per result. See the [actor page](https://datapika.com/actors/meta-ad-library-scraper) for current prices.
