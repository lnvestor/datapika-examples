# Reddit Scraper

Collects public Reddit data without a Reddit API key or login: posts from any subreddit or listing URL, keyword search, user profiles and posts, comments with replies, and Reddit Answers. Every row has a `dataType` field (`post`, `comment`, `community`, `user` or `answer`).

- Actor page: [datapika.com/actors/reddit-scraper](https://datapika.com/actors/reddit-scraper)
- Run it in the browser: [apify.com/openclawai/reddit-scraper](https://apify.com/openclawai/reddit-scraper)
- Every input field: [input schema](https://apify.com/openclawai/reddit-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./reddit-scraper/curl.sh > output.json     # curl, synchronous
python reddit-scraper/python/run.py        # Python, apify-client
node reddit-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "startUrls": [
    "https://www.reddit.com/r/Python/top/?t=week"
  ],
  "maxItems": 5
}
```

| Field | Meaning |
|---|---|
| `startUrls` | Any Reddit URL: a subreddit listing, a post, a user page or a search page. |
| `maxItems` | Maximum rows per input (1 to 10,000). |

Other inputs: `subreddits`, `searches` with `searchType` (`posts`, `communities`, `users`), `users`, `sort`, `time`, `includeComments`, `maxCommentsPerPost`, `postedAfter`, `postedBefore`, `answerQueries`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `dataType` | Row type: `post`, `comment`, `community`, `user` or `answer` |
| `id`, `url` | Reddit ID and permalink |
| `title`, `body` | Post title and text |
| `subreddit` | Subreddit name |
| `score`, `upvoteRatio` | Score and upvote ratio |
| `numComments` | Comment count |
| `flair` | Post flair |
| `linkUrl`, `imageUrls`, `videoUrls` | Linked URL and media |
| `isNsfw`, `isSpoiler`, `isPinned`, `isLocked` | Post flags |
| `createdAt` | Creation time (ISO 8601) |
| `comments` | Comment tree, when `includeComments` is on |
| `author` | Username of the poster (redacted in the sample file) |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Set `includeComments` to `true` to attach the comment tree to each post, and `maxCommentsPerPost` to cap it.
- Use `postedAfter` and `postedBefore` (YYYY-MM-DD) to collect a date window.

Pricing is per result. See the [actor page](https://datapika.com/actors/reddit-scraper) for current prices.
