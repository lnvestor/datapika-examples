# Trustpilot Reviews Scraper

Collects Trustpilot reviews for any company, found by website domain, company name or Trustpilot URL. Each company also gets one profile row (`dataType: company`) with the TrustScore, review count, rating distribution and categories. A deep sweep goes past the 200-review limit of Trustpilot's own pages.

- Actor page: [datapika.com/actors/trustpilot-reviews-scraper](https://datapika.com/actors/trustpilot-reviews-scraper)
- Run it in the browser: [apify.com/openclawai/trustpilot-reviews-scraper](https://apify.com/openclawai/trustpilot-reviews-scraper)
- Every input field: [input schema](https://apify.com/openclawai/trustpilot-reviews-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./trustpilot-reviews-scraper/curl.sh > output.json     # curl, synchronous
python trustpilot-reviews-scraper/python/run.py        # Python, apify-client
node trustpilot-reviews-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "companies": [
    "www.notion.so"
  ],
  "maxReviews": 5,
  "languages": [
    "en"
  ]
}
```

| Field | Meaning |
|---|---|
| `companies` | A domain (`www.notion.so`), a company name (`Notion`) or a review page URL. |
| `maxReviews` | Maximum reviews per company (1 to 20,000). |
| `languages` | ISO language codes. Leave empty for every language. |

Other inputs: `stars`, `dateRange`, `sort`, `verifiedOnly`, `withReplyOnly`, `deepSweep`, `includeCompanyInfo`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `dataType` | `review` or `company` |
| `rating`, `title`, `text` | Star rating, review title and text |
| `language` | Review language |
| `publishedAt`, `experiencedAt` | Publish date and date of experience |
| `isVerified`, `source` | Verification flag and how the review was collected |
| `hasReply`, `replyText`, `replyPublishedAt` | The company's reply |
| `company`, `companyDomain` | Company the review is about |
| `trustScore`, `stars`, `numberOfReviews` | Company profile row: score and totals |
| `ratingDistribution`, `categories`, `isClaimed` | Company profile row: breakdown and metadata |
| `reviewerName`, `reviewerCountry` | Reviewer fields (redacted in the sample file) |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Use `stars: ["1", "2"]` with `dateRange: "last30days"` to monitor recent negative reviews.
- Set `includeCompanyInfo` to `false` if you only want review rows.

Pricing is per result. See the [actor page](https://datapika.com/actors/trustpilot-reviews-scraper) for current prices.
