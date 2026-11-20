// Job Board Scraper: One search across LinkedIn, Indeed, Glassdoor, ZipRecruiter, Naukri, Bayt and more, deduplicated across boards.
//
// Usage (from the repository root):
//   npm install
//   export APIFY_TOKEN=<your Apify API token>
//   node job-board-scraper/node/run.mjs
//
// Docs: https://datapika.com/actors/job-board-scraper

import { writeFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR_ID = 'openclawai/job-board-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

// Input fields: https://apify.com/openclawai/job-board-scraper/input-schema
const input = {
    searchTerm: 'data engineer',
    location: 'Austin, TX',
    sites: ['linkedin', 'indeed'],
    maxResults: 5,
    hoursOld: 72,
};

const summarize = (item) =>
    `${item.site} | ${item.title} | ${item.company} | ${item.location}`;

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
