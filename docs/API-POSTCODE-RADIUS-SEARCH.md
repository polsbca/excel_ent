# Postcode + Travel Radius Search — API Vendor Requirement

**Version:** 1.0.0  
**Audience:** Backend / API vendor (Smartflows / artist catalogue API)  
**Consumer:** Excel Entertainment WordPress theme (`excel_ent`)  
**Related docs:** [`API-ARTISTS.md`](./API-ARTISTS.md), [`API-ARTIST-REGISTRATION.md`](./API-ARTIST-REGISTRATION.md)  
**Last updated:** 2026-09-17

This document specifies how **event postcode search** must use each artist’s **base postcode** and **travel radius** so results mean: *artists who will travel to the customer’s event location*.

---

## 1. Summary

| Item | Value |
|------|-------|
| **Problem** | Header search collects a UK **event postcode**. Artist registration collects **base location (postcode)** and **travel radius**. Today search treats `location` as a text/city match — it does **not** compute distance. |
| **Goal** | When the customer enters a postcode, return artists whose travel coverage includes that event. |
| **Primary owner** | **API vendor** (geocoding, distance filter, catalogue fields). |
| **Theme owner** | Pass event postcode on search; already sends base postcode + travel radius on registration. |

**Rule of thumb:** WordPress does **not** geocode or filter by miles. The vendor API must.

---

## 2. Product behaviour (required)

### 2.1 User story

1. Customer enters event postcode in header **Location** (e.g. `SW1A 1AA`) and submits search.  
2. API geocodes that postcode.  
3. For each searchable artist, API computes distance (miles) from the artist’s **base** coordinates to the event.  
4. Artist is included only if they cover that distance given their **travel radius** (or `nationwide`).  
5. Theme renders the returned list as today (cards / search results).

### 2.2 Inclusion rule

Let:

- \(D\) = great-circle (or road — see §5) distance in **miles** between event and artist base  
- \(R\) = artist’s maximum travel miles derived from `travel.radius` (§3.2)

**Include artist when:**

| Condition | Include? |
|-----------|----------|
| `travel.radius` = `nationwide` | **Yes** (skip distance check) |
| Artist has valid base lat/lng **and** \(D \le R\) | **Yes** |
| Artist missing base lat/lng | **No** (recommended) — or document an agreed fallback |
| Artist missing / invalid `travel.radius` | Treat as **not nationwide**; exclude unless fallback agreed |
| Event postcode cannot be geocoded | Return `400` with clear error **or** empty result set — pick one and document it |

---

## 3. Data the vendor must store on each artist

These fields already arrive via **Register as Artist** ([`API-ARTIST-REGISTRATION.md`](./API-ARTIST-REGISTRATION.md)). They must be copied onto the **searchable artist catalogue** record when an application is approved / artist is published — not left only on the application row.

### 3.1 Base location

| Source (registration) | Catalogue field | Notes |
|----------------------|-----------------|-------|
| `performance.base_location` | `base_location` (string) | UK postcode preferred (e.g. `M1 2AB`). City text may appear; geocode best-effort. |
| — | `base_lat` (float) | Required for radius search |
| — | `base_lng` (float) | Required for radius search |
| — | `base_geocode_status` | Optional: `ok` \| `failed` \| `pending` |
| — | `base_geocoded_at` | Optional ISO-8601 timestamp |

**When to geocode**

- On application approve / artist create / artist update of `base_location`  
- Retry failed geocodes on a background job if needed  

### 3.2 Travel radius → max miles

Registration enum (`travel.radius`) — authoritative for Excel Ent:

| Code | UI label | Max miles \(R\) |
|------|----------|-----------------|
| `0-20` | 0 to 20 miles | **20** |
| `20-50` | 20 to 50 miles | **50** |
| `50-100` | 50 - 100 miles | **100** |
| `nationwide` | Nationwide UK | **No limit** (always include if other filters match) |

Store both:

- `travel_radius` — original code (`0-20`, …)  
- `travel_radius_miles` — numeric max (`20`, `50`, `100`, or `null` for nationwide)

> **Note:** Older taxonomy sketches used `local` / `regional`. Live registration uses `0-20` / `20-50` / `50-100` / `nationwide`. Search must use the **registration** codes.

---

## 4. Search / list API changes

### 4.1 Endpoints in scope

| Endpoint (current production style) | Change |
|-------------------------------------|--------|
| `GET .../artists/search.php` | Apply postcode radius filter when location/postcode param present |
| `GET .../artists/list.php` | Same filter when the same param is present |
| Suggest / autocomplete | **Out of scope** for radius (name typeahead only) unless product asks later |

Auth remains `X-API-Key` / `Authorization: Bearer` as today.

### 4.2 Request parameter (preferred contract)

**Preferred (explicit):**

| Param | Type | Example | Meaning |
|-------|------|---------|---------|
| `event_postcode` | string | `SW1A 1AA` | Customer event postcode — **triggers radius search** |

**Backward compatible (acceptable):**

| Param | Behaviour |
|-------|-----------|
| `location` | If value matches UK postcode pattern → treat as `event_postcode` and run radius search. If value is a city code (`london`, `manchester`, …) → keep existing city/facet behaviour. |

The WordPress theme currently submits header Location as:

```http
GET /?s=...&location=SW1A+1AA&occasion=...&budget=...
```

Theme proxy maps that to the artist search API. Vendor should accept either `event_postcode` or postcode-shaped `location` (or both).

**Normalisation (vendor):**

- Trim, uppercase, collapse spaces (`sw1a1aa` → `SW1A 1AA` as needed for geocoder)  
- Accept with or without space  

### 4.3 Example requests

**Radius search (preferred):**

```http
GET /excel/api/artists/search.php?event_postcode=SW1A%201AA&per_page=24&page=1
X-API-Key: {key}
```

**Combined with existing filters:**

```http
GET /excel/api/artists/search.php?q=elvis&event_postcode=M1%202AB&category[]=artists-tributes&min_fee=500&max_fee=2500&per_page=24
X-API-Key: {key}
```

**City facet (non-postcode) — unchanged:**

```http
GET /excel/api/artists/search.php?location[]=manchester&per_page=24
X-API-Key: {key}
```

### 4.4 Filter combination

Apply **AND** logic with existing filters (`q`, category, fee/budget, etc.):

1. Text / category / fee filters as today  
2. **Then** (if event postcode present) apply radius inclusion rule §2.2  

Pagination (`page`, `per_page`) and sorting apply to the **post-filter** set.

### 4.5 Optional response fields

When radius search is active, each artist object **may** include:

```json
{
  "id": "123",
  "name": "Example Act",
  "distance_miles": 34.2,
  "covers_event": true,
  "travel_radius": "50-100",
  "base_location": "M1 2AB"
}
```

| Field | Type | Notes |
|-------|------|-------|
| `distance_miles` | number \| null | Rounded to 1 decimal recommended |
| `covers_event` | boolean | Always `true` for included rows if you emit it |
| `travel_radius` | string | Code from §3.2 |
| `base_location` | string | Display / debug |

Sort suggestion when `event_postcode` is set: **nearest first** (`distance_miles` ascending), unless client passes an explicit `sort`.

### 4.6 Error / empty responses

| Case | Recommended HTTP | Body |
|------|------------------|------|
| Valid postcode, zero artists in range | `200` | Empty `data` / `artists` array + pagination totals `0` |
| Invalid / ungeocodable postcode | `400` | `{ "ok": false, "error": "Invalid or unrecognized postcode" }` **or** `200` + empty — **choose one and keep stable** |
| Geocoder provider down | `503` or degrade to empty with logged error | Do not return unfiltered full roster |

---

## 5. Distance calculation

| Requirement | Recommendation |
|-------------|----------------|
| Units | **Miles** (UK product copy) |
| Method | Great-circle (Haversine) on WGS84 lat/lng is acceptable for v1 |
| Road distance | Optional later; not required for first release |
| Precision | Compare \(D\) to \(R\) with \(D\) rounded to 1 decimal or use raw float consistently |
| Boundary | Inclusive: \(D \le R\) (e.g. exactly 50.0 miles matches `20-50`) |

**UK geocoding:** Use a provider that handles UK postcodes reliably (e.g. postcodes.io, Ordnance Survey, Google, Mapbox — vendor choice). Cache results for artist base postcodes.

---

## 6. Registration → catalogue pipeline

```
Register as Artist
  POST artist-applications
       │
       │  performance.base_location  (postcode)
       │  travel.radius              (0-20 | 20-50 | 50-100 | nationwide)
       ▼
Application stored
       │
       │  on approve / publish
       ▼
Artist catalogue record
  + base_location
  + base_lat / base_lng   ← geocode here
  + travel_radius
  + travel_radius_miles
       │
       ▼
GET search.php / list.php
  + event_postcode → distance filter
```

**Checklist for vendor**

- [ ] Geocode on publish/update of base location  
- [ ] Persist lat/lng + radius miles on catalogue artist  
- [ ] Backfill existing artists that already have postcode + radius  
- [ ] Search/list apply §2.2 when event postcode present  
- [ ] Do not require WordPress to send radius on search (radius is on the artist)

---

## 7. Theme responsibilities (for vendor context)

| Theme behaviour | Detail |
|-----------------|--------|
| Header Location UI | Collects UK postcode → query param `location` |
| Proxy | `inc/api-artists.php` forwards location/postcode to vendor search/list |
| Registration | Sends `performance.base_location` + `travel.radius` on applications |
| Not done in theme | Geocoding, Haversine, radius filtering |

Once the vendor exposes `event_postcode` (or postcode-aware `location`), the theme will map:

```text
$_GET['location']  →  event_postcode   (when value is a postcode)
```

No theme release is required for the vendor to start accepting postcode-shaped `location` with the new filter logic.

---

## 8. Acceptance tests (vendor)

| # | Setup | Request | Expected |
|---|--------|---------|----------|
| 1 | Artist A: base `M1 2AB`, radius `0-20` | `event_postcode` near Manchester centre | A **included** if \(D \le 20\) |
| 2 | Same artist A | `event_postcode` in London | A **excluded** |
| 3 | Artist B: radius `nationwide`, base anywhere | Any valid UK postcode | B **included** (other filters permitting) |
| 4 | Artist C: base set, geocode failed | Any postcode search | C **excluded** (if following recommended rule) |
| 5 | Artist D: radius `50-100`, \(D = 50.0\) | Matching postcode | D **included** (inclusive boundary) |
| 6 | Valid postcode, no one in range | — | `200` + empty list |
| 7 | `location[]=manchester` (city code) | — | Existing city behaviour **unchanged** |
| 8 | Search with `q` + `event_postcode` | — | Both filters applied (AND) |

---

## 9. Out of scope (v1)

- Theme-side geocoding  
- Customer-chosen “search radius” override (customer does not pick miles; artist travel radius applies)  
- International addresses outside UK postcodes  
- Road-time / traffic-based distance  
- Changing registration field names (`excel_ent_base_location`, `excel_ent_travel`)

---

## 10. Open points (confirm with Excel Ent)

| # | Question | Default if unanswered |
|---|----------|------------------------|
| 1 | Param name: `event_postcode` vs reuse `location`? | Accept **both**; prefer documenting `event_postcode` |
| 2 | Artists with no lat/lng: exclude or text-fallback? | **Exclude** from postcode searches |
| 3 | Invalid postcode: `400` vs empty `200`? | Empty **`200`** for simpler UI |
| 4 | Default sort when postcode set? | **Nearest first** |
| 5 | Haversine vs driving distance? | **Haversine** for v1 |

---

## 11. Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2026-09-17 | Initial vendor requirement for postcode + travel radius search |
