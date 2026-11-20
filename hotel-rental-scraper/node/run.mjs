// Hotel & Rental Scraper: Hotel and vacation rental prices from up to 9 booking sites in one run, in one schema.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node hotel-rental-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/hotel-rental-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/hotel-rental-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Input fields: https://apify.com/openclawai/hotel-rental-scraper/input-schema
const input = {
    location: 'Lisbon, Portugal',
    checkIn: '30 days',
    nights: 2,
    adults: 2,
    sites: ['booking', 'airbnb', 'vrbo'],
    maxResultsPerSite: 2,
    currency: 'USD',
};

const summarize = (item) =>
    `${item.site} | ${item.name} | ${item.pricePerNight} ${item.currency} per night | rating ${item.rating}`;

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
