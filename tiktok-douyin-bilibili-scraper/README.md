# TikTok, Douyin & Bilibili Scraper

One input form for TikTok, Douyin, Bilibili, Kuaishou and Xigua. Pick a `mode` (profile videos, video details, comments, keyword search, hashtags, sounds, trending, TikTok Shop and more) and paste links, @usernames or IDs. The platform is detected from each link, and every platform returns the same field names.

- Actor page: [datapika.com/actors/tiktok-douyin-bilibili-scraper](https://datapika.com/actors/tiktok-douyin-bilibili-scraper)
- Run it in the browser: [apify.com/openclawai/tiktok-douyin-bilibili-scraper](https://apify.com/openclawai/tiktok-douyin-bilibili-scraper)
- Every input field: [input schema](https://apify.com/openclawai/tiktok-douyin-bilibili-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./tiktok-douyin-bilibili-scraper/curl.sh > output.json     # curl, synchronous
python tiktok-douyin-bilibili-scraper/python/run.py        # Python, apify-client
node tiktok-douyin-bilibili-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "mode": "user_posts",
  "urls": [
    "https://www.tiktok.com/@tiktok"
  ],
  "maxItems": 5
}
```

| Field | Meaning |
|---|---|
| `mode` | What to collect. Common modes: `user_posts`, `video_detail`, `user_profile`, `video_comments`, `search_videos`, `hashtag_videos`, `trending`, `hot_search`. The actor page lists every mode and which platforms support it. |
| `urls` | Video or profile links, @usernames, BV ids (Bilibili) or hashtag names. Short share links work too. |
| `maxItems` | Maximum rows per input (1 to 5,000). |

Other inputs: `queries` (for search modes), `platform`, `includeReplies`, `downloadVideos`, `region`, `exploreCategory`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `platform` | `tiktok`, `douyin`, `bilibili`, `kuaishou` or `xigua` |
| `item_type` | Row type: `video`, `user`, `comment`, `danmaku`, `subtitle`, `product`, `review`, ... |
| `item_id`, `url` | Platform ID and link |
| `title`, `description` | Caption or title |
| `author_username`, `author_name`, `author_id` | Creator |
| `created_at` | Publish time (ISO 8601) |
| `duration_sec` | Video length in seconds |
| `play_count`, `like_count`, `comment_count`, `share_count`, `collect_count` | Engagement counts |
| `hashtags` | Hashtags in the caption |
| `music_title`, `music_author` | Sound used |
| `cover_url`, `video_url_nowm` | Cover image and video file URL |
| `raw` | The full original record (left out of the sample file for size) |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Use Chinese keywords in `queries` for Douyin, Bilibili and Kuaishou search modes.
- Set `downloadVideos` to `false` if you only need metadata.

Pricing is per result. See the [actor page](https://datapika.com/actors/tiktok-douyin-bilibili-scraper) for current prices.
