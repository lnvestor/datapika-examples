# Job Board Scraper

Runs one job search across several job boards at once and returns one row per job, with duplicates removed across boards. Rows carry the title, company, location, posting date, salary range (when the board shows one), remote flag, job and apply URLs, the full description and company details.

- Actor page: [datapika.com/actors/job-board-scraper](https://datapika.com/actors/job-board-scraper)
- Run it in the browser: [apify.com/openclawai/job-board-scraper](https://apify.com/openclawai/job-board-scraper)
- Every input field: [input schema](https://apify.com/openclawai/job-board-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./job-board-scraper/curl.sh > output.json     # curl, synchronous
python job-board-scraper/python/run.py        # Python, apify-client
node job-board-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "searchTerm": "data engineer",
  "location": "Austin, TX",
  "sites": [
    "linkedin",
    "indeed"
  ],
  "maxResults": 5,
  "hoursOld": 72
}
```

| Field | Meaning |
|---|---|
| `searchTerm` | Keywords to search for. Use `searchTerms` (array) to run several searches in one run. |
| `location` | City, state or country, as you would type it on the job board. |
| `sites` | Boards to search: `linkedin`, `indeed`, `glassdoor`, `zip_recruiter`, `bayt`, `naukri`. LinkedIn and Indeed return in seconds; the other boards load through a browser and take 1 to 3 minutes. |
| `maxResults` | Maximum jobs per board (1 to 100). |
| `hoursOld` | Only jobs posted in the last N hours, for example `24` or `168`. |

Other inputs: `isRemote`, `jobType`, `countryIndeed`, `distance`, `easyApply`, `linkedinFetchDescription`, `descriptionFormat`, `enforceAnnualSalary`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `id` | Job ID on the source board |
| `site` | Board the job came from (`linkedin`, `indeed`, ...) |
| `title` | Job title |
| `company` | Company name |
| `location` | Job location as shown on the board |
| `date_posted` | Posting date |
| `is_remote` | Remote flag |
| `job_type` | Full-time, part-time, contract, ... |
| `salary_min`, `salary_max` | Salary range, when the board shows one |
| `salary_currency`, `salary_interval` | Currency and pay period (`yearly`, `hourly`, ...) |
| `job_url`, `job_url_direct` | Listing URL and the employer's apply URL |
| `description` | Full job description, Markdown by default. LinkedIn rows include it when `linkedinFetchDescription` is on |
| `company_url`, `company_logo`, `company_industry` | Company details, when available |
| `search_term` | The search that produced the row |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- The synchronous endpoint in `curl.sh` waits up to 300 seconds. Searches that include the browser-based boards (`glassdoor`, `zip_recruiter`, `bayt`, `naukri`) can take longer, so use the Python or Node.js example for those: they start the run and wait for it to finish.
- Set `hoursOld` to `24` and schedule the run daily for a feed of fresh jobs.

Pricing is per result. See the [actor page](https://datapika.com/actors/job-board-scraper) for current prices.
