# Google Ads Transparency Scraper

Looks up advertisers in the Google Ads Transparency Center by brand name, website domain, advertiser ID or URL, then returns their ads: format, first and last shown dates, days active, image or video URL, preview link and, where Google publishes it, reach by region. Each advertiser also gets one `advertiser` row.

- Actor page: [datapika.com/actors/google-ads-transparency-scraper](https://datapika.com/actors/google-ads-transparency-scraper)
- Run it in the browser: [apify.com/openclawai/google-ads-transparency-scraper](https://apify.com/openclawai/google-ads-transparency-scraper)
- Every input field: [input schema](https://apify.com/openclawai/google-ads-transparency-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./google-ads-transparency-scraper/curl.sh > output.json     # curl, synchronous
python google-ads-transparency-scraper/python/run.py        # Python, apify-client
node google-ads-transparency-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "queries": [
    "booking.com"
  ],
  "advertisersPerQuery": 1,
  "maxAdsPerAdvertiser": 5,
  "region": "US"
}
```

| Field | Meaning |
|---|---|
| `queries` | Brand names, website domains, advertiser IDs (`AR...`) or Transparency Center URLs. |
| `advertisersPerQuery` | How many matching advertisers to keep for a name query (1 to 20). |
| `maxAdsPerAdvertiser` | Maximum ads per advertiser (1 to 2,000). |
| `region` | 2-letter country code. Leave empty for worldwide. |

Other inputs: `fetchAds`, `formats` (`TEXT`, `IMAGE`, `VIDEO`), `fetchAdDetails`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `item_type` | `advertiser` or `ad` |
| `advertiser_id`, `advertiser_name`, `advertiser_domain` | Advertiser |
| `declared_ad_count` | Ad count Google shows for the advertiser, when available |
| `creative_id`, `ad_url`, `preview_url` | Ad ID, Transparency Center link and preview |
| `format` | `TEXT`, `IMAGE` or `VIDEO` |
| `first_shown`, `last_shown`, `days_active` | Run dates |
| `image_url`, `video_url` | Creative media |
| `variation_count` | Number of creative variations |
| `total_reach_low`, `total_reach_high`, `region_stats` | Reach ranges and per-region details, where Google publishes them |
| `region`, `source_query` | The region and query that produced the row |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- A domain (`booking.com`) is the most precise query; a brand name can match several advertisers, which `advertisersPerQuery` caps.
- Set `fetchAdDetails` to `false` for a faster run without reach and region data.

Pricing is per result. See the [actor page](https://datapika.com/actors/google-ads-transparency-scraper) for current prices.
