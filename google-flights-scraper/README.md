# Google Flights Scraper

Searches Google Flights for a route and date and returns one row per itinerary: price, airlines, number of stops, total duration, departure and arrival times, each flight segment, and the CO2 estimate compared with the typical value for the route.

- Actor page: [datapika.com/actors/google-flights-scraper](https://datapika.com/actors/google-flights-scraper)
- Run it in the browser: [apify.com/openclawai/google-flights-scraper](https://apify.com/openclawai/google-flights-scraper)
- Every input field: [input schema](https://apify.com/openclawai/google-flights-scraper/input-schema)

## Run the examples

Set up once from the repository root (see the [main README](../README.md#quick-start)), then:

```bash
./google-flights-scraper/curl.sh > output.json     # curl, synchronous
python google-flights-scraper/python/run.py        # Python, apify-client
node google-flights-scraper/node/run.mjs           # Node.js, apify-client
```

The Python and Node.js scripts print one line per row and save every row to `output.json`.

## Input used in the examples

```json
{
  "from_airport": "JFK",
  "to_airport": "LAX",
  "date": "YYYY-MM-DD",
  "trip": "one-way",
  "max_results": 5
}
```

The scripts set `date` to 30 days from today, so the example always searches the future.

| Field | Meaning |
|---|---|
| `from_airport` / `to_airport` | IATA airport codes. |
| `date` | Departure date (YYYY-MM-DD). If left out, the actor uses today plus 30 days. |
| `trip` | `one-way`, `round-trip` or `multi-city`. Add `return_date` for a round trip. |
| `max_results` | Maximum itineraries (1 to 200). |

Other inputs: `return_date`, `seat` (`economy`, `premium-economy`, `business`, `first`), `adults`, `children`, `infants_in_seat`, `infants_on_lap`, `language`.

## What it returns

One JSON object per row. Main fields:

| Field | Description |
|---|---|
| `from_airport`, `to_airport`, `date`, `return_date` | The searched route and dates |
| `trip`, `seat`, `passengers` | Trip type, cabin and passenger count |
| `price` | Total itinerary price in the currency Google shows (typically USD); null when Google shows no price |
| `airline_codes`, `airline_names` | Airlines on the itinerary |
| `stops` | Number of stops |
| `duration_min_total` | Total travel time in minutes |
| `departure`, `arrival` | First departure and last arrival time |
| `segments` | Each flight leg with airports and departure and arrival times |
| `carbon_emission_g`, `carbon_typical_on_route_g` | CO2 estimate and the route's typical value, in grams |

[`sample-output.json`](sample-output.json) holds the first two rows of a real run of the Python example, made on 2026-11-20. Long text is shortened, and fields about private individuals are replaced with `[redacted]`.

## Tips

- Run one search per leg for multi-city trips.
- Schedule the same route daily to build a price history.

Pricing is per result. See the [actor page](https://datapika.com/actors/google-flights-scraper) for current prices.
