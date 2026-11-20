# MCP setup

Every Datapika actor is available as an MCP tool through the Apify MCP server, which speaks streamable HTTP. One config URL loads the whole catalog, and the `fetch-actor-details` tool lets the model read each actor's input schema and current pricing before it runs anything.

The config URL, from [datapika.com/llms.txt](https://datapika.com/llms.txt):

```text
https://mcp.apify.com/?tools=fetch-actor-details,openclawai/job-board-scraper,openclawai/linkedin-jobs-scraper,openclawai/reddit-scraper,openclawai/tiktok-douyin-bilibili-scraper,openclawai/airbnb-scraper,openclawai/career-site-ats-jobs-scraper,openclawai/google-maps-scraper,openclawai/meta-ad-library-scraper,openclawai/google-flights-scraper,openclawai/threads-scraper,openclawai/tiktok-shop-scraper,openclawai/google-ads-transparency-scraper,openclawai/kuaishou-scraper,openclawai/hotel-rental-scraper,openclawai/indeed-ziprecruiter-scraper,openclawai/wechat-scraper,openclawai/youtube-video-scraper,openclawai/trustpilot-reviews-scraper,openclawai/bilibili-scraper
```

By default the client signs you in with Apify in the browser on first use. A free Apify account is enough to start. If your client cannot open a browser, use the token configs below with your API token from [console.apify.com/settings/integrations](https://console.apify.com/settings/integrations).

## Files

| Client | Browser sign-in | API token |
|---|---|---|
| Claude Code | [`claude-code.sh`](claude-code.sh), option 1 | [`claude-code.sh`](claude-code.sh), option 2 |
| Cursor (`.cursor/mcp.json`) | [`cursor.json`](cursor.json) | [`cursor-token.json`](cursor-token.json), reads `APIFY_TOKEN` from your environment |
| VS Code (`.vscode/mcp.json`) | [`vscode.json`](vscode.json) | [`vscode-token.json`](vscode-token.json), asks for the token once and stores it securely |

## Claude Code

```bash
./mcp/claude-code.sh
```

Or run the command yourself:

```bash
claude mcp add --transport http datapika "<config URL>"
```

Check that the server is connected with `claude mcp list`, or `/mcp` inside a session.

## Cursor

Copy [`cursor.json`](cursor.json) to `.cursor/mcp.json` in your project, or to `~/.cursor/mcp.json` for every project. If you already have an `mcpServers` block, add the `datapika` entry to it.

For token auth, use [`cursor-token.json`](cursor-token.json) instead and start Cursor from a shell where `APIFY_TOKEN` is set.

## VS Code

Copy [`vscode.json`](vscode.json) to `.vscode/mcp.json` in your workspace, then start the server from the file or from the **MCP: List Servers** command.

For token auth, use [`vscode-token.json`](vscode-token.json). VS Code prompts for the token the first time the server starts.

## One tool per actor

To give an agent a single actor instead of the whole catalog, use that actor's own URL:

| Actor | MCP URL |
|---|---|
| Job Board Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/job-board-scraper` |
| Reddit Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/reddit-scraper` |
| TikTok, Douyin & Bilibili Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/tiktok-douyin-bilibili-scraper` |
| Trustpilot Reviews Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/trustpilot-reviews-scraper` |
| Meta Ad Library Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/meta-ad-library-scraper` |
| Google Ads Transparency Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/google-ads-transparency-scraper` |
| Google Maps Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/google-maps-scraper` |
| Airbnb Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/airbnb-scraper` |
| Google Flights Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/google-flights-scraper` |
| Hotel & Rental Scraper | `https://mcp.apify.com/?tools=fetch-actor-details,openclawai/hotel-rental-scraper` |

[datapika.com/mcp](https://datapika.com/mcp) lists the URL for every actor in the catalog.

## Try a prompt

> Find remote senior data engineer jobs posted in the last 24 hours and return them as a table with salary ranges.

> Get the 20 most recent 1-star and 2-star Trustpilot reviews for notion.so and group them by topic.

> Which ads is booking.com running in the US right now? List the format and the first date each ad was shown.

Agent runs are billed like any other run. Check the actor and its input limits before you approve a run.
