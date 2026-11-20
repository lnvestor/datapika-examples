// Meta Ad Library Scraper: Facebook and Instagram ads from Meta's Ad Library by keyword, page URL or page ID, with no login.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node meta-ad-library-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/meta-ad-library-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/meta-ad-library-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Input fields: https://apify.com/openclawai/meta-ad-library-scraper/input-schema
const input = {
    queries: ['https://www.facebook.com/nike'],
    country: 'US',
    maxAdsPerQuery: 5,
};

const summarize = (item) =>
    `${item.page_name} | ${item.format} | since ${item.start_date} | ${(item.body || '').slice(0, 60)}`;

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
