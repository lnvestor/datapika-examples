# Datapika examples

[![AllMCPs Verified](https://allmcps.com/api/badge/datapika)](https://allmcps.com/mcp/datapika?verify=9cd5f7d8-b2cc-4b2f-a4bb-90b7541dd8af) [![Datapika MCP connector](https://glama.ai/mcp/connectors/io.github.lnvestor/datapika/badges/score.svg)](https://glama.ai/mcp/connectors/io.github.lnvestor/datapika)

Working code examples for the [Datapika](https://datapika.com) web data APIs, which run on [Apify](https://apify.com). Each API is an Apify actor published by `openclawai`: you send a JSON input, it collects public web data, and you read the results as JSON, CSV or Excel.

The examples cover jobs, Reddit, TikTok, Douyin and Bilibili, Trustpilot reviews, the Meta Ad Library, Google Ads Transparency, Google Maps, Airbnb, Google Flights and hotels.

Every actor folder has the same layout:

| File | What it is |
|---|---|
| `curl.sh` | One synchronous REST request that returns the rows as JSON |
| `python/run.py` | The official Python client, [`apify-client`](https://pypi.org/project/apify-client/) |
| `node/run.mjs` | The official JavaScript client, [`apify-client`](https://www.npmjs.com/package/apify-client) |
| `README.md` | The input used, other useful inputs, and the output fields |
| `sample-output.json` | The first two rows of a real run, with personal fields redacted |

Every Python example was run against the live actor on 2026-11-20 before it was published here.

## Actors

| Actor | What you get | Examples | Actor page |
|---|---|---|---|
| Job Board Scraper | Jobs from LinkedIn, Indeed, Glassdoor, ZipRecruiter, Naukri, Bayt and more in one run | [job-board-scraper](job-board-scraper/) | [datapika.com/actors/job-board-scraper](https://datapika.com/actors/job-board-scraper) |
| Reddit Scraper | Posts, comments, subreddits, users and Reddit Answers | [reddit-scraper](reddit-scraper/) | [datapika.com/actors/reddit-scraper](https://datapika.com/actors/reddit-scraper) |
| TikTok, Douyin & Bilibili Scraper | Videos, profiles, comments, search and trending feeds | [tiktok-douyin-bilibili-scraper](tiktok-douyin-bilibili-scraper/) | [datapika.com/actors/tiktok-douyin-bilibili-scraper](https://datapika.com/actors/tiktok-douyin-bilibili-scraper) |
| Trustpilot Reviews Scraper | Reviews and TrustScore profiles | [trustpilot-reviews-scraper](trustpilot-reviews-scraper/) | [datapika.com/actors/trustpilot-reviews-scraper](https://datapika.com/actors/trustpilot-reviews-scraper) |
| Meta Ad Library Scraper | Facebook and Instagram ads by keyword or page | [meta-ad-library-scraper](meta-ad-library-scraper/) | [datapika.com/actors/meta-ad-library-scraper](https://datapika.com/actors/meta-ad-library-scraper) |
| Google Ads Transparency Scraper | Google ads by advertiser, domain or ID | [google-ads-transparency-scraper](google-ads-transparency-scraper/) | [datapika.com/actors/google-ads-transparency-scraper](https://datapika.com/actors/google-ads-transparency-scraper) |
| Google Maps Scraper | Places with address, phone, website and ratings | [google-maps-scraper](google-maps-scraper/) | [datapika.com/actors/google-maps-scraper](https://datapika.com/actors/google-maps-scraper) |
| Airbnb Scraper | Listings, prices, reviews, calendars and hosts | [airbnb-scraper](airbnb-scraper/) | [datapika.com/actors/airbnb-scraper](https://datapika.com/actors/airbnb-scraper) |
| Google Flights Scraper | Itineraries with prices, stops, segments and CO2 | [google-flights-scraper](google-flights-scraper/) | [datapika.com/actors/google-flights-scraper](https://datapika.com/actors/google-flights-scraper) |
| Hotel & Rental Scraper | Hotel and rental prices from up to 9 booking sites | [hotel-rental-scraper](hotel-rental-scraper/) | [datapika.com/actors/hotel-rental-scraper](https://datapika.com/actors/hotel-rental-scraper) |

The full catalog is at [datapika.com/actors](https://datapika.com/actors).

Ready-made, tested inputs for Reddit, TikTok, Douyin, Bilibili and influencer search (65 tasks, one JSON file each) are in [lnvestor/datapika-tasks](https://github.com/lnvestor/datapika-tasks) and on [datapika.com/tasks](https://datapika.com/tasks).

Both repos are on Context7 for coding agents: [`/lnvestor/datapika-examples`](https://context7.com/lnvestor/datapika-examples) and [`/lnvestor/datapika-tasks`](https://context7.com/lnvestor/datapika-tasks).

## Use it from your AI agent

**Claude Code plugin** (Datapika skill + MCP server in one install):

```
/plugin install datapika --marketplace lnvestor/datapika-examples
```

On older Claude Code versions, run `/plugin marketplace add lnvestor/datapika-examples` first, then `/plugin install datapika@datapika`.

**Skill only** (any agent that reads SKILL.md files): copy [`plugins/datapika/skills/datapika/SKILL.md`](plugins/datapika/skills/datapika/SKILL.md) into your agent's skills folder, or run `npx skills add lnvestor/datapika-examples`.

**MCP only**: see [`mcp/`](mcp/) or [datapika.com/mcp](https://datapika.com/mcp) for Claude Code, Cursor, VS Code and Codex configs.

The MCP server is listed in the [official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=io.github.lnvestor/datapika) as `io.github.lnvestor/datapika`. Its entry is [`server.json`](server.json), published by [`.github/workflows/mcp-registry.yml`](.github/workflows/mcp-registry.yml).

## Quick start

1. Create an Apify account at [console.apify.com/sign-up](https://console.apify.com/sign-up). A free account is enough to start.
2. Copy your API token from **Settings > API & Integrations** ([console.apify.com/settings/integrations](https://console.apify.com/settings/integrations)) and put it in an environment variable:

   ```bash
   export APIFY_TOKEN=<your Apify API token>
   ```

3. Clone the repository and install the clients you want to use:

   ```bash
   git clone https://github.com/lnvestor/datapika-examples.git
   cd datapika-examples

   python -m pip install -r requirements.txt   # Python 3.11 or newer
   npm install                                 # Node.js 20 or newer
   ```

4. Run an example from the repository root:

   ```bash
   ./google-maps-scraper/curl.sh
   python google-maps-scraper/python/run.py
   node google-maps-scraper/node/run.mjs
   ```

The Python and Node.js scripts stream the run log, print one line per result and save every row to `output.json` in the current folder.

## How the examples call the API

**curl** uses the synchronous endpoint. It starts a run, waits for it to finish and returns the dataset rows in one response:

```bash
curl -X POST "https://api.apify.com/v2/acts/openclawai~google-maps-scraper/run-sync-get-dataset-items?format=json" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "coffee shops in Austin, TX", "maxResults": 5}'
```

The synchronous endpoint waits up to 300 seconds and returns HTTP 408 if the run takes longer. The run keeps going, and its results stay in your Apify account.

**Python and Node.js** start the run and wait for it as long as it takes, then read the rows from the run's default dataset:

```python
run = client.actor("openclawai/google-maps-scraper").call(run_input=run_input)
items = client.dataset(run.default_dataset_id).list_items().items
```

```js
const run = await client.actor('openclawai/google-maps-scraper').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

Use the client examples for large runs. Each actor README lists every input field the example uses, and the input schema link there shows the rest.

### Set a spending limit

Actors are priced per result. To cap what one run can cost, pass a maximum total charge in USD:

```python
from decimal import Decimal

run = client.actor("openclawai/google-maps-scraper").call(
    run_input=run_input,
    max_total_charge_usd=Decimal("1.00"),
)
```

```js
const run = await client.actor('openclawai/google-maps-scraper').call(input, { maxTotalChargeUsd: 1 });
```

With curl, add `&maxTotalChargeUsd=1` to the URL. The run is not charged more than this amount: it ends when it reaches the limit, and the rows collected so far stay in the dataset.

Prices change, so they are not listed in this repository. Each actor page on [datapika.com/actors](https://datapika.com/actors) shows the current price.

### Other output formats

The synchronous endpoint and the dataset endpoint both accept `format=json`, `jsonl`, `csv`, `xlsx`, `xml`, `html` or `rss`. To download a finished run's rows as CSV:

```bash
curl -H "Authorization: Bearer $APIFY_TOKEN" \
  "https://api.apify.com/v2/datasets/<datasetId>/items?format=csv" > output.csv
```

## Use the actors from an AI agent (MCP)

Every Datapika actor is available as a tool through the Apify MCP server. This config URL, from [datapika.com/llms.txt](https://datapika.com/llms.txt), loads all of them:

```text
https://mcp.apify.com/?tools=fetch-actor-details,openclawai/job-board-scraper,openclawai/linkedin-jobs-scraper,openclawai/reddit-scraper,openclawai/tiktok-douyin-bilibili-scraper,openclawai/airbnb-scraper,openclawai/career-site-ats-jobs-scraper,openclawai/google-maps-scraper,openclawai/meta-ad-library-scraper,openclawai/google-flights-scraper,openclawai/threads-scraper,openclawai/tiktok-shop-scraper,openclawai/google-ads-transparency-scraper,openclawai/kuaishou-scraper,openclawai/hotel-rental-scraper,openclawai/indeed-ziprecruiter-scraper,openclawai/wechat-scraper,openclawai/youtube-video-scraper,openclawai/trustpilot-reviews-scraper,openclawai/bilibili-scraper
```

Claude Code:

```bash
claude mcp add --transport http datapika "https://mcp.apify.com/?tools=fetch-actor-details,openclawai/job-board-scraper,openclawai/linkedin-jobs-scraper,openclawai/reddit-scraper,openclawai/tiktok-douyin-bilibili-scraper,openclawai/airbnb-scraper,openclawai/career-site-ats-jobs-scraper,openclawai/google-maps-scraper,openclawai/meta-ad-library-scraper,openclawai/google-flights-scraper,openclawai/threads-scraper,openclawai/tiktok-shop-scraper,openclawai/google-ads-transparency-scraper,openclawai/kuaishou-scraper,openclawai/hotel-rental-scraper,openclawai/indeed-ziprecruiter-scraper,openclawai/wechat-scraper,openclawai/youtube-video-scraper,openclawai/trustpilot-reviews-scraper,openclawai/bilibili-scraper"
```

On first use, the client opens Apify sign-in in your browser. The [`mcp/`](mcp/) folder has ready-to-copy configs for Claude Code, Cursor and VS Code, a token-based setup for clients without browser sign-in, and one-tool URLs for each actor.

## Learn more

- [All actors](https://datapika.com/actors): descriptions, input and output details and current prices
- [Blog](https://datapika.com/blog): original data studies and guides
- [MCP setup](https://datapika.com/mcp) and [REST API overview](https://datapika.com/api)
- [llms.txt](https://datapika.com/llms.txt) and [AGENTS.md](https://datapika.com/AGENTS.md) for agents
- [Apify API reference](https://docs.apify.com/api/v2)

## Issues

If an example stops working or an input field changes, please [open an issue](https://github.com/lnvestor/datapika-examples/issues) with the actor name and the error you see.

## License

[MIT](LICENSE)
