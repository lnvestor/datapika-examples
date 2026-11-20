// TikTok, Douyin & Bilibili Scraper: Videos, profiles, comments, search and trending feeds from TikTok, Douyin, Bilibili, Kuaishou and Xigua in one schema.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node tiktok-douyin-bilibili-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/tiktok-douyin-bilibili-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/tiktok-douyin-bilibili-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Input fields: https://apify.com/openclawai/tiktok-douyin-bilibili-scraper/input-schema
const input = {
    mode: 'user_posts',
    urls: ['https://www.tiktok.com/@tiktok'],
    maxItems: 5,
};

const summarize = (item) =>
    `${item.platform} | ${item.play_count} plays | ${item.like_count} likes | ${(item.title || item.description || '').slice(0, 60)}`;

const client = new ApifyClient({ token });

// Start the run and wait for it to finish. The run log streams to the console.
const run = await client.actor(ACTOR_ID).call(input);
console.log(`Run ${run.id} finished with status ${run.status}`);
if (run.status !== 'SUCCEEDED') {
    console.error(`See the log: https://console.apify.com/actors/runs/${run.id}`);
    process.exit(1);
}

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(`${items.length} rows`);
for (const item of items) console.log(' ', summarize(item));

await writeFile('output.json', JSON.stringify(items, null, 2));
console.log('Saved every row to output.json');
