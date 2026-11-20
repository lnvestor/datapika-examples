# Hotel & Rental Scraper

Searches hotels and vacation rentals for one or more locations on Airbnb, Booking.com, Google Hotels, Expedia, Hotels.com, Vrbo, Agoda, Hostelworld and Tripadvisor at the same time. Every site returns the same field names: property, location, rating, nightly and total price for your dates, and property details.

- Actor page: [datapika.com/actors/hotel-rental-scraper](https://datapika.com/actors/hotel-rental-scraper)
- Run it in the browser: [apify.com/openclawai/hotel-rental-scraper](https://apify.com/openclawai/hotel-rental-scraper)
- Every input field: [input schema](https://apify.com/openclawai/hotel-rental-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./hotel-rental-scraper/curl.sh > output.json     # curl, synchronous
python hotel-rental-scraper/python/run.py        # Python, apify-client
node hotel-rental-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "location": "Lisbon, Portugal",
  "checkIn": "30 days",
  "nights": 2,
  "adults": 2,
  "sites": [
    "booking",
    "airbnb",
    "vrbo"
  ],
  "maxResultsPerSite": 2,
  "currency": "USD"
}
```

| Field | Meaning |
|---|---|
| `location` | City or area, ideally as `City, Country`. Use `locations` (array) for several places. |
| `checkIn` | A date (YYYY-MM-DD) or a relative date such as `30 days` or `2 weeks`. |
| `nights` / `adults` | Length of stay and guests. |
| `sites` | `airbnb`, `booking`, `google_hotels`, `expedia`, `hotels_com`, `vrbo`, `agoda`, `hostelworld`, `tripadvisor`. |
| `maxResultsPerSite` | Maximum properties per site (1 to 1,000). |
| `currency` | Currency for prices. |

Other inputs: `locations`, `minPricePerNight`, `maxPricePerNight`, `includeThingsToDo`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `site` | Source site (`booking`, `airbnb`, `vrbo`, ...) |
| `type`, `propertyType` | Row type and property type |
| `id`, `name`, `url` | Property ID, name and link |
| `city`, `country`, `address`, `latitude`, `longitude` | Location |
| `rating`, `ratingOriginal` | Guest rating normalized to 0 to 10 across sites, and the rating as the site shows it (`4.92/5`) |
| `reviewsCount`, `stars` | Review count and hotel class |
| `pricePerNight`, `priceTotal`, `currency` | Price for your dates |
| `checkIn`, `checkOut`, `nights`, `adults` | The stay that was priced |
| `freeCancellation` | Free cancellation flag, when the site shows it |
| `bedrooms`, `beds`, `bathrooms`, `amenities`, `photos` | Property details |
| `otherSitePrices` | Prices from other sites (Google Hotels rows) |
| `searchLocation` | The location that produced the row |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Airbnb, Booking.com, Vrbo, Agoda and Hostelworld return in seconds; Tripadvisor can take up to a minute.
- Use `locations` to compare several cities in one run.

Pricing is per result. See the [actor page](https://datapika.com/actors/hotel-rental-scraper) for current prices.
