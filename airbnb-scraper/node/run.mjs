// Airbnb Scraper: Airbnb listings with prices for your dates, plus room details, reviews, calendars, host portfolios and experiences.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node airbnb-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/airbnb-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/airbnb-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Dates 30 days out, so the example always searches the future.
const isoDate = (days) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
const checkIn = isoDate(30);
const checkOut = isoDate(33);

// Input fields: https://apify.com/openclawai/airbnb-scraper/input-schema
const input = {
    mode: 'search_by_url',
    searchUrl: `https://www.airbnb.com/s/Lisbon--Portugal/homes?checkin=${checkIn}&checkout=${checkOut}&adults=2`,
    currency: 'USD',
    maxResults: 5,
};

const summarize = (item) =>
    `${item.name} | ${item.price_per_night != null ? `${item.price_currency_symbol ?? ''}${item.price_per_night} per night` : 'no price in search'} | rating ${item.rating}`;

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
