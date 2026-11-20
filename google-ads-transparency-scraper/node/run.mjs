// Google Ads Transparency Scraper: Advertiser creatives, run dates and reach data from the Google Ads Transparency Center.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node google-ads-transparency-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/google-ads-transparency-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/google-ads-transparency-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Input fields: https://apify.com/openclawai/google-ads-transparency-scraper/input-schema
const input = {
    queries: ['booking.com'],
    advertisersPerQuery: 1,
    maxAdsPerAdvertiser: 5,
    region: 'US',
};

const summarize = (item) =>
    item.item_type === 'advertiser'
        ? `advertiser | ${item.advertiser_name} | ${item.advertiser_id}`
        : `ad | ${item.format} | ${item.first_shown} to ${item.last_shown} | ${item.days_active} days`;

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
