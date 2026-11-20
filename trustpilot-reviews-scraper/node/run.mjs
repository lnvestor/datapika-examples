// Trustpilot Reviews Scraper: Trustpilot reviews and TrustScore profiles by domain, company name or review page URL, with no login.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node trustpilot-reviews-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/trustpilot-reviews-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/trustpilot-reviews-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Input fields: https://apify.com/openclawai/trustpilot-reviews-scraper/input-schema
const input = {
    companies: ['www.notion.so'],
    maxReviews: 5,
    languages: ['en'],
};

const summarize = (item) =>
    item.dataType === 'company'
        ? `company | ${item.name} | TrustScore ${item.trustScore} | ${item.numberOfReviews} reviews`
        : `review | ${item.rating} stars | ${item.publishedAt} | ${item.title}`;

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
