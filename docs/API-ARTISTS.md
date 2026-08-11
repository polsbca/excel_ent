# Excel Entertainment — Artist REST API Specification

**Version:** 1.3.0  
**Audience:** Third-party API vendor  
**Consumer:** Excel Entertainment WordPress theme (`excel_ent`)  
**Last updated:** 2026-08-11

This document defines the REST APIs required to power all artist-related UI in the Excel Entertainment website. Today the theme uses hardcoded demo data. The vendor API must supply the same (or richer) data so the site can replace static arrays with live responses.

---

## 1. Goals

| Goal | Detail |
|------|--------|
| Front-page / global search | 5-field header search on the home page (artist, category, location, date, budget) |
| Explore Artists listing | Dedicated page: search, category pills, filter chips, sort, favourites, preview audio, card grid |
| Artist discovery | Search, filter, sort, and paginate the roster on Explore Artists and site search |
| Artist profile | `page-artist.php`: hero, performance venues, setlist player, photos/videos, similar artists |
| Autocomplete | Header / mobile search typeahead and contact “preferred artists” picker |
| Front-page modules | Occasion aggregates and featured/profile artist cards |
| Media | Images, preview audio, and video sources for players and cards |
| Optional persistence | Favourites / wishlist when authenticated (UI already exists) |

---

## 1.1 Front-page header search (theme contract)

On `front-page.php` the theme loads the **global header search** (`template-parts/header-search.php` + `header-search-mobile.php`), not the Explore-only search bar.

**Desktop form** (`GET` → WordPress home / search results):

| UI field | Form param | Example value | API mapping |
|----------|------------|---------------|-------------|
| Search Artist | `s` | `Andy Crosbie as Elton John` | `q` (text) **or** resolve via suggest `id`/`slug` |
| Browse Categories | `occasion` | `male-solo`, `elvis`, `jazz`, `80s`, `wedding` | See **occasion → taxonomy** below |
| Location | `location` | `london` | `location` |
| Event Date | `event_date` | `2026-09-14` (`YYYY-MM-DD`) | `event_date` |
| Budget | `budget` | `1000-2500` | `budget` |

**Mobile form** uses the same params; submit target is `/explore-artists/`. Occasion may be **comma-separated multi-select** (e.g. `wedding,djs`).

### Occasion → taxonomy mapping (critical)

Despite the form name `occasion`, the value is a **tag code from any Browse Categories group** (Figma “Browse Categories”). The theme does **not** send the group key—only the tag code. The API (or WP bridge) must resolve the group:

| Group (`browse_categories`) | Theme group key | Tag codes (current UI) |
|-----------------------------|-----------------|-------------------------|
| Artist Type | `artist-type` | `male-solo`, `female-solo`, `duos`, `bands`, `djs`, `celebrity-acts`, `professional-dancers`, `magicians-hypnotists`, `shows` |
| Tribute Acts | `tribute` | `elvis`, `queen`, `adele`, `abba`, `beatles`, `motown` |
| Music Genre | `genre` | `pop`, `rock`, `soul`, `jazz`, `rnb`, `classical`, `country` |
| Era / Decade | `era` | `60s`, `70s`, `80s`, `90s`, `2000s`, `modern` |
| Event Type | `event` | `wedding`, `corporate`, `pubs`, `private`, `festival` |

**API acceptance options (pick one and document):**

1. **Preferred:** accept `occasion` (and `occasion[]` / CSV) and resolve each code to the correct filter field server-side.  
2. Accept aliased query params: `artist_type`, `tribute`, `genre`, `era`, `event_type` (WP bridge maps `occasion` → one of these before calling the API).

Example home search URL:

```
/?s=Andy%20Crosbie&occasion=wedding&location=manchester&event_date=2026-09-14&budget=1000-2500
```

Maps to:

```
GET /v1/artists?q=Andy%20Crosbie&occasion=wedding&location=manchester&event_date=2026-09-14&budget=1000-2500
```

### Location dictionary (header)

Popular cities in the UI include **city + region**:

| Code | Label | Region |
|------|-------|--------|
| `london` | London | Greater London, UK |
| `manchester` | Manchester | North West, UK |
| `birmingham` | Birmingham | West Midlands, UK |
| `edinburgh` | Edinburgh | Lothian, Scotland |
| `bristol` | Bristol | South West, UK |

Locations must be searchable by city **or** region text in typeahead UIs.

### Budget bands (header)

| Code | Label |
|------|-------|
| `under-500` | Under £500 |
| `500-1000` | £500 - £1,000 |
| `1000-2500` | £1,000 - £2,500 |
| `2500-5000` | £2,500 - £5,000 |
| `over-5000` | Over £5,000 |

### Artist suggest (header typeahead)

While typing in “Search Artist”, the UI needs live results shaped as:

```json
{
  "id": "andy-elton",
  "slug": "andy-crosbie-elton-john",
  "label": "Andy Crosbie as Elton John",
  "avatar": { "url": "https://cdn.example.com/.../avatar.jpg", "width": 80, "height": 80 }
}
```

Selecting a result currently stores the **label** into `s` (not the id). Prefer also returning `slug` so WordPress can later submit `artist_id` / `slug` instead of free text.

---

## 1.2 Explore Artists page (theme contract)

**Templates:** `page-explore-artists.php` → `template-parts/section-explore-artists.php`  
**Header UI:** `template-parts/header-search-explore.php` (not the 5-field front-page search)  
**CTA footer:** Contact Us + Book As an Artist (`POST /v1/artist-applications` for registration)

### Search bar

| UI | Form / behaviour | API |
|----|------------------|-----|
| Search input | `GET /explore-artists/?s=` | `GET /v1/artists?q=` |
| Placeholder | “By Artists, Djs, Bands...” | Match names, act types, tags |
| Filters & Sort | Button `data-explore-sort` (panel to be wired) | Needs `sort` + taxonomy dictionaries (`GET /taxonomies` / list `facets`) |

Landing from mobile global search may also include `occasion`, `location`, `event_date`, `budget` on `/explore-artists/` — same mapping as §1.1.

### Category pills (`data-explore-cat`)

These are **taxonomy group scopes** (not individual tags), plus mobile shortcuts:

| `id` | Label | Surface | API |
|------|-------|---------|-----|
| `all` | ALL | Desktop + mobile | No group filter; show full catalog facets |
| `artist-type` | Artist Type | Both | Scope facets / filter UI to artist types |
| `tribute` | Tribute Acts | Both | Scope to tributes |
| `genre` | Music Genre | Desktop | Scope to genres |
| `era` | Era / Decade | Desktop | Scope to eras |
| `event` | Event Type | Desktop | Scope to event types |
| `wedding` | Wedding | Mobile only | Shortcut → `event_type=wedding` (or `occasion=wedding`) |
| `view-all` | View All Categories | Mobile only | Theme-only; open full category sheet from `/taxonomies` |

Each pill (except plain mobile shortcuts) shows a **count** from `facets.categories[].count` (demo uses `1200`). Active pill drives the results-area label (e.g. “All”).

Recommended query param:

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Pill id: `all` \| `artist-type` \| `tribute` \| `genre` \| `era` \| `event`. Does not replace tag filters; it scopes which facet group is primary. |

### Active filter chips + clear

Section chips (`data-explore-chip`) represent **applied** filters/sorts. Demo values:

| Chip label (UI) | Meaning | API param |
|-----------------|---------|-----------|
| Solo male | Artist type | `artist_type=male-solo` |
| budget :High to low | Sort | `sort=price_desc` |
| Most booked | Sort | `sort=most_booked` |

- Removing a chip drops that param and re-fetches.  
- **Clear All filters** resets all filters/sort (keep `q` only if product decides).  
- Chip **labels must come from API** facet/taxonomy labels (or an `applied` echo — see §4.1), not hardcoded English.

### Counts

| UI element | Source |
|------------|--------|
| Intro “1200 Artist” | `meta.catalog_total` (marketing / unfiltered roster size) |
| Results “1800 Artist” | `meta.total` (filtered match count) |
| Pill counts | `facets.categories[].count` |

### Artist card grid (required list fields)

Each card in `section-explore-artists.php` needs:

| UI | Field |
|----|-------|
| Portrait | `card_image` (≈ 560×779) |
| Featured treatment | `featured` |
| Heart toggle | `is_favorited` + `POST/DELETE /me/favorites/{id}` |
| Volume / preview | `preview_audio.url` (playable) |
| Availability | `availability.status_mod` + `status_label` (`weekend` / `later` / …) |
| Rating | `rating` → “{n} Rating” |
| Location | `location.label` |
| Name | `name` / `stage_name` |
| Price | `price_display` + fixed “Starting From” copy |
| Tags + overflow | `tags[]` (strings; UI may show N then “+”) |
| View Profile | `profile_path` or `/artist/{slug}/` |
| Get a Quote | Theme quote URL; optional `quote_path` |

Default demo grid shows **6** cards; support `per_page` (recommend `6` or `12`) and pagination / load-more via `meta.page` / `total_pages`.

Example Explore request:

```
GET /v1/artists?q=&category=all&artist_type=male-solo&sort=price_desc&page=1&per_page=6&include_facets=true
```

---

## 1.3 Artist profile page (theme contract)

**Templates:** `page-artist.php` → `template-parts/section-artist.php`  
**Routing:** Prefer `/artist/{slug}/` resolved by `GET /v1/artists/{slug}`  
**Header:** No search bar on this page; search icon links to `/explore-artists/`  
**CTA footer:** Contact Us + Book As an Artist (`POST /v1/artist-applications`)

Primary load:

```
GET /v1/artists/{slug}
```

Optional lazy loads (if not embedded on detail):

```
GET /v1/artists/{slug}/setlist
GET /v1/artists/{slug}/gallery
GET /v1/artists/{slug}/videos
GET /v1/artists/{slug}/similar?limit=8
```

### Section A — Hero / Profile

| UI | API field |
|----|-----------|
| Hero portrait | `hero_image` (≈ **851×958**) |
| Favorite heart | `is_favorited` + `POST/DELETE /me/favorites/{id}` |
| “Excel Approved Artist” badge | `excel_approved` (hide badge when `false`) |
| Name | `name` (display as provided, e.g. `ROSE SAX`) |
| Subtitle | `subtitle` (e.g. `Saxophonist · London & Nationwide`) |
| Price | `price_display` |
| Price note | `price_note` |
| Perks list | `perks[]` (demo: auditioned / PLI & PAT / no hidden fees) |
| Stars | `rating` (0–5; theme may render filled stars) |
| Reviews line | `reviews_summary` (e.g. `400 reviews on google · Highly Recommended`) |
| Socials | `socials[]` — theme currently shows **Facebook** + **Google**; support `instagram` etc. |
| Tag chips | `tags[]` |
| Get a quote now | Theme quote URL / optional `quote_path` |
| ADD TO WISHLIST | `is_wishlisted` + `POST/DELETE /me/wishlist/{id}` |

### Section B — Performance & Energy

| UI | API field |
|----|-----------|
| Title | Theme copy (“Performance & Energy”) |
| Two copy columns | `performance.paragraphs[]` (at least 1–2 strings) |
| Venue carousel | `performance.venues[]` |

Each venue slide:

```json
{ "label": "Cork Opera House in Ireland", "image": { "url": "...", "width": 900, "height": 879 } }
```

Theme drives prev/next, progress bar, and tablet pagination dots from this array (JSON already mirrored in markup via `data-venue-slides`).

### Section C — Music List & Repertoire (Example set lists)

| UI | API field |
|----|-----------|
| Featured artwork | `setlist.featured_image` (≈ **546×1040**) |
| Now-playing title / artist / index | Active song `title`, `original_artist`, `track_number` |
| Genre tabs | Distinct song `genre` codes + `all` — demo: `all`, `jazz`, `solo`, `pop` |
| Search | Client filter on `title` / `original_artist`; large lists → `GET .../setlist?q=` |
| Select category | Mobile control cycling the same genre tabs |
| Song rows | `setlist.songs[]` |
| Audio player | Each song **must** include `audio.url` + `duration_seconds` |

Song object (required for playable UI):

```json
{
  "id": "song_1",
  "track_number": 1,
  "title": "Fly Me To The Moon",
  "original_artist": "Frank Sinatra",
  "genre": "jazz",
  "audio": {
    "url": "https://cdn.example.com/.../fly-me.mp3",
    "mime_type": "audio/mpeg",
    "duration_seconds": 210
  }
}
```

Also expose `setlist.genres` (optional) so the theme can build tabs without scanning all songs:

```json
"genres": [
  { "code": "all", "label": "All Songs" },
  { "code": "jazz", "label": "Jazz" },
  { "code": "solo", "label": "Solo" },
  { "code": "pop", "label": "Pop" }
]
```

### Section D — Photos & Videos

**Photos tab** — `gallery[]` (demo: 6 items; stage ≈ **1682×886**):

| Meta label | Field |
|------------|-------|
| Venue | `venue` |
| Location | `location` |
| Duration | `duration` (display string, e.g. `7:00 PM - 11:00 PM (4 Hours)`) |
| Guest Count | `guests` (e.g. `250 Attendee`) |

Thumbnails switch the main stage image + meta (`data-media-thumb`).

**Videos tab** — `videos[]`:

| UI | Field |
|----|-------|
| Poster | `poster` |
| Playable source | `source.url` (+ `mime_type`, `duration_seconds`) and/or `external_url` |
| Prev / next | Ordered list; theme advances index |

### Section E — View Similar Artists

| UI | API |
|----|-----|
| Carousel cards | `GET /artists/{id}/similar` → **list/card objects** (§3.2), same Explore card UI |
| Count `1/4` | Based on returned length (demo 4; support `limit`, default ≥ 8) |
| Fav / preview / profile / quote | Same as Explore cards |

### Persistence on this page

| Control | Endpoint |
|---------|----------|
| Hero favorite | `POST` / `DELETE /v1/me/favorites/{artistId}` |
| Wishlist button | `POST` / `DELETE /v1/me/wishlist/{artistId}` |
| Similar-card hearts | Same favourites endpoints |

---

## 2. Conventions

### 2.1 Base URL

```
https://{api-host}/v1
```

Exact host and auth scheme (API key, OAuth2, JWT) to be agreed with Excel Entertainment. All examples below use `/v1`.

### 2.2 Format

- Protocol: **HTTPS**
- Content type: `application/json; charset=utf-8`
- Encoding: UTF-8
- Dates: ISO 8601 (`2026-08-11` or `2026-08-11T14:30:00Z`)
- Money: decimal string + ISO currency (`"1200.00"`, `"GBP"`) **and** display string optional (`"£1,200"`)
- IDs: stable opaque strings or UUIDs (preferred). Slugs must be URL-safe unique.

### 2.3 Standard response envelope

**Success (collection):**

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 12,
    "total": 1200,
    "total_pages": 100
  },
  "facets": {}
}
```

**Success (single resource):**

```json
{
  "data": {}
}
```

**Error:**

```json
{
  "error": {
    "code": "not_found",
    "message": "Artist not found",
    "details": {}
  }
}
```

| HTTP | When |
|------|------|
| `200` | OK |
| `201` | Created |
| `400` | Validation / bad query |
| `401` | Missing/invalid auth |
| `403` | Forbidden |
| `404` | Not found |
| `422` | Semantic validation |
| `429` | Rate limited |
| `500` | Server error |

### 2.4 Pagination

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `page` | integer ≥ 1 | `1` | |
| `per_page` | integer 1–50 | `12` | Explore UI may request 6–24 |

### 2.5 Media objects

All images/audio/video use a shared shape:

```json
{
  "url": "https://cdn.example.com/artists/rose-sax/hero.webp",
  "alt": "Rose Sax performing",
  "width": 851,
  "height": 958,
  "mime_type": "image/webp"
}
```

For audio/video, include:

```json
{
  "url": "https://cdn.example.com/.../preview.mp3",
  "mime_type": "audio/mpeg",
  "duration_seconds": 30
}
```

Prefer CDN HTTPS URLs. Theme will not host vendor media.

---

## 3. Domain model

### 3.1 Enums / taxonomies

These power filters, chips, tabs, and registration. Values are **slug codes**; APIs should also return human `label`s.

#### Artist type (`artist_types`)

| Code | Label (example) |
|------|-----------------|
| `male-solo` | Solo Male |
| `female-solo` | Solo Female |
| `duos` | Duos |
| `bands` | Bands |
| `djs` | DJs |
| `celebrity-acts` | Celebrity Acts |
| `professional-dancers` | Professional Dancers |
| `magicians-hypnotists` | Magicians / Hypnotists |
| `shows` | Shows |

#### Tribute (`tributes`)

`elvis`, `queen`, `adele`, `abba`, `beatles`, `motown`, … (extensible)

#### Genre (`genres`)

`pop`, `rock`, `soul`, `jazz`, `rnb`, `classical`, `country`, `house`, `club-classics`, …

#### Era (`eras`)

`60s`, `70s`, `80s`, `90s`, `2000s`, `modern`

#### Event type (`event_types`)

`wedding`, `corporate`, `pubs`, `private`, `festival`, `nightclubs`

#### Location (search facets)

Popular cities (header): `london`, `manchester`, `birmingham`, `edinburgh`, `bristol`, … (extensible).

Each location object should include:

```json
{ "code": "london", "label": "London", "region": "Greater London, UK", "popular": true }
```

Free-text `location_label` on artists remains allowed for display.

#### Budget bands (`budget`)

| Code | Meaning (header label) |
|------|------------------------|
| `under-500` | Under £500 |
| `500-1000` | £500 - £1,000 |
| `1000-2500` | £1,000 - £2,500 |
| `2500-5000` | £2,500 - £5,000 |
| `over-5000` | Over £5,000 |

#### Availability status (`availability.status`)

| `status_mod` | Example `status_label` |
|--------------|------------------------|
| `weekend` | Available this weekend |
| `later` | Available After 30 days |
| `unavailable` | Currently unavailable |

#### Setlist genre tabs (profile)

Demo tabs: `all`, `jazz`, `solo`, `pop` (extensible; codes **must** match each song’s `genre`). Prefer returning `setlist.genres` on the detail payload.

### 3.2 Artist (list / card)

Used by: **Explore Artists grid** (`section-explore-artists.php`), front-page profile cards, Similar Artists, search results.

Card image target size for Explore: **560×779**. Price line is `price_display` + theme copy “Starting From”. Rating renders as `"{rating} Rating"`.

```json
{
  "id": "art_01HXYZ",
  "slug": "andy-crosbie-elton-john",
  "name": "Andy Crosbie as Elton John",
  "stage_name": "Andy Crosbie as Elton John",
  "card_image": { "url": "...", "alt": "...", "width": 560, "height": 779 },
  "avatar": { "url": "...", "alt": "...", "width": 80, "height": 80 },
  "price_from": "1200.00",
  "currency": "GBP",
  "price_display": "£1,200",
  "rating": 4.5,
  "rating_count": 400,
  "location": {
    "code": "manchester",
    "label": "Manchester"
  },
  "availability": {
    "status_mod": "weekend",
    "status_label": "Available this weekend"
  },
  "featured": true,
  "excel_approved": true,
  "act_type_label": "Solo Male",
  "era": "modern",
  "artist_types": ["male-solo"],
  "genres": ["pop", "rock"],
  "eras": ["70s", "80s"],
  "event_types": ["wedding", "nightclubs"],
  "tributes": ["elvis"],
  "tags": ["Nightclubs", "Wedding", "Tribute", "Solo"],
  "booking_count": 128,
  "preview_audio": {
    "url": "https://cdn.example.com/.../preview.mp3",
    "mime_type": "audio/mpeg",
    "duration_seconds": 30
  },
  "profile_path": "/artist/andy-crosbie-elton-john/",
  "quote_path": "/quote/?artist=andy-crosbie-elton-john",
  "is_favorited": true
}
```

### 3.3 Artist detail

Extends list artist. Used by **`page-artist.php` / `section-artist.php`** (see §1.3).

```json
{
  "id": "art_01HXYZ",
  "slug": "rose-sax",
  "name": "ROSE SAX",
  "subtitle": "Saxophonist · London & Nationwide",
  "hero_image": { "url": "...", "alt": "Rose Sax", "width": 851, "height": 958 },
  "price_from": "600.00",
  "currency": "GBP",
  "price_display": "£600",
  "price_note": "Price varies by event type, duration & location. Request a tailored quote for your event.",
  "excel_approved": true,
  "rating": 5,
  "rating_count": 400,
  "reviews_summary": "400 reviews on google · Highly Recommended",
  "socials": [
    { "network": "facebook", "url": "https://facebook.com/..." },
    { "network": "google", "url": "https://maps.google.com/..." },
    { "network": "instagram", "url": "https://instagram.com/..." }
  ],
  "perks": [
    "Personally auditioned by Excel",
    "PLI & PAT certified as standard",
    "No hidden fees — transparent pricing"
  ],
  "tags": [
    "Saxophonist",
    "DJ Service",
    "Corporate",
    "Wedding",
    "Jazz",
    "Club Classics",
    "Smooth Jazz",
    "Plug & Play"
  ],
  "quote_path": "/quote/?artist=rose-sax",
  "performance": {
    "paragraphs": [
      "Available as a 'plug and play' sax option...",
      "Performed at The Roundhouse Theatre..."
    ],
    "venues": [
      {
        "label": "Cork Opera House in Ireland",
        "image": { "url": "...", "width": 900, "height": 879 }
      },
      {
        "label": "The Roundhouse Theatre",
        "image": { "url": "...", "width": 900, "height": 879 }
      }
    ]
  },
  "setlist": {
    "featured_image": { "url": "...", "width": 546, "height": 1040 },
    "genres": [
      { "code": "all", "label": "All Songs" },
      { "code": "jazz", "label": "Jazz" },
      { "code": "solo", "label": "Solo" },
      { "code": "pop", "label": "Pop" }
    ],
    "songs": [
      {
        "id": "song_1",
        "track_number": 1,
        "title": "Fly Me To The Moon",
        "original_artist": "Frank Sinatra",
        "genre": "jazz",
        "audio": {
          "url": "https://cdn.example.com/.../fly-me.mp3",
          "mime_type": "audio/mpeg",
          "duration_seconds": 210
        }
      }
    ]
  },
  "gallery": [
    {
      "id": "gal_1",
      "type": "photo",
      "image": { "url": "...", "width": 1682, "height": 886 },
      "venue": "The Grand Ballroom, Manchester",
      "location": "Manchester, UK",
      "duration": "7:00 PM - 11:00 PM (4 Hours)",
      "guests": "250 Attendee"
    }
  ],
  "videos": [
    {
      "id": "vid_1",
      "title": "Live at The O2",
      "poster": { "url": "...", "width": 1682, "height": 886 },
      "source": {
        "url": "https://cdn.example.com/.../performance.mp4",
        "mime_type": "video/mp4",
        "duration_seconds": 210
      },
      "external_url": null
    }
  ],
  "similar_artist_ids": ["art_02", "art_03", "art_04", "art_05"],
  "is_favorited": true,
  "is_wishlisted": false
}
```

### 3.4 Occasion / category aggregate (front page)

```json
{
  "id": "occ_djs",
  "slug": "djs",
  "title": "DJs",
  "options_label": "1000+ OPTIONS",
  "options_count": 1000,
  "image": { "url": "..." },
  "category": "djs",
  "detail_title": "DJs",
  "bullets": [
    "Wedding & party specialists",
    "Full lighting packages available",
    "..."
  ],
  "link_path": "/explore-artists/?event_type=nightclubs&artist_type=djs"
}
```

### 3.5 Suggest / autocomplete hit

```json
{
  "id": "art_01HXYZ",
  "slug": "andy-crosbie-elton-john",
  "label": "Andy Crosbie as Elton John",
  "meta": "SOLO SINGER",
  "avatar": { "url": "..." }
}
```

---

## 4. Endpoints

### 4.1 List / search artists

`GET /v1/artists`

Powers:

- Front-page / global header search submit (`?s=&occasion=&location=&event_date=&budget=`)
- **Explore Artists page** (`page-explore-artists.php`): search, category pills, chips, sort, card grid
- Site search results
- Front-page artist carousel mode (with filters)

#### Query parameters

| Param | Type | Description |
|-------|------|-------------|
| `q` / `s` | string | Free-text search (name, tags, act type). Matches WP `s` (Explore header + global). |
| `category` | string | Explore pill scope: `all` \| `artist-type` \| `tribute` \| `genre` \| `era` \| `event` (see §1.2) |
| `occasion` | string\|csv | **Header search category tag(s).** Resolve to artist_type / tribute / genre / era / event_type (see §1.1). Mobile may send CSV. |
| `artist_type` | string\|csv | Taxonomy code(s) — use when group is known |
| `tribute` | string\|csv | |
| `genre` | string\|csv | |
| `era` | string\|csv | |
| `event_type` | string\|csv | Incl. Explore mobile shortcut `wedding` |
| `location` | string | Location code (`london`, …) or free text |
| `budget` | string | Budget band code (`under-500`, `500-1000`, …) |
| `event_date` | date (`YYYY-MM-DD`) | Filter acts available / bookable on that date |
| `page` | int | Page number |
| `per_page` | int | Page size (Explore demo grid: **6**; also support 12/24) |
| `availability` | string | `weekend` \| `later` \| `any` |
| `featured` | bool | Only featured |
| `excel_approved` | bool | |
| `sort` | string | See sort values |
| `include_facets` | bool | Default `true` on Explore (pills + Filters & Sort panel) |

**Availability vs `event_date`:** If `event_date` is provided, return only artists who can be booked on that date (calendar / blackout rules). Do not ignore the date when the header search sends it.

#### Sort values

| `sort` | Meaning (UI chip) |
|--------|-------------------|
| `relevance` | Default for text search |
| `price_asc` | Budget low → high |
| `price_desc` | Budget high → low (chip: “budget :High to low”) |
| `most_booked` | Most booked |
| `rating_desc` | Highest rated |
| `name_asc` | A–Z |

#### Response

```json
{
  "data": [ /* Artist list objects — §3.2 */ ],
  "meta": {
    "page": 1,
    "per_page": 6,
    "total": 1800,
    "total_pages": 300,
    "catalog_total": 1200
  },
  "applied": [
    { "key": "artist_type", "code": "male-solo", "label": "Solo male" },
    { "key": "sort", "code": "price_desc", "label": "budget :High to low" }
  ],
  "facets": {
    "artist_types": [{ "code": "male-solo", "label": "Solo Male", "count": 320 }],
    "tributes": [],
    "genres": [],
    "eras": [],
    "event_types": [{ "code": "wedding", "label": "Wedding", "count": 410 }],
    "locations": [],
    "budgets": [],
    "categories": [
      { "id": "all", "label": "ALL", "count": 1200 },
      { "id": "artist-type", "label": "Artist Type", "count": 1200 },
      { "id": "tribute", "label": "Tribute Acts", "count": 420 },
      { "id": "genre", "label": "Music Genre", "count": 900 },
      { "id": "era", "label": "Era / Decade", "count": 800 },
      { "id": "event", "label": "Event Type", "count": 1100 }
    ]
  }
}
```

- `catalog_total` → Explore intro “1200 Artist”  
- `meta.total` → results “1800 Artist”  
- `facets.categories` → category pill counts  
- `applied` (recommended) → active filter chip bar; theme can also rebuild chips from query + facet labels  

When `preview_audio` is null/missing, the volume control should be disabled (not 404).

---

### 4.2 Get artist by slug or ID

`GET /v1/artists/{idOrSlug}`

Powers: **Artist profile page** (`page-artist.php` / §1.3).

**Response:** `{ "data": { /* Artist detail §3.3 */ } }`

| Include | Required for first paint |
|---------|--------------------------|
| Hero fields (`hero_image`, name, subtitle, price*, perks, tags, socials, excel_approved, reviews*) | Yes |
| `performance.paragraphs` + `performance.venues` | Yes |
| `setlist` (or link to `/setlist`) | Yes for Music List section |
| `gallery` / `videos` (or dedicated endpoints) | Yes for Photos & Videos |
| `is_favorited` / `is_wishlisted` | Yes when user authenticated; else `false` |

`similar_artist_ids` may be omitted if the theme always calls `GET /v1/artists/{id}/similar` (preferred for payload size).

**404** when slug unknown. Prefer stable slugs; if renamed, return `301`-style redirect metadata or document mapping.

---

### 4.3 Similar artists

`GET /v1/artists/{idOrSlug}/similar`

| Param | Default | Notes |
|-------|---------|-------|
| `limit` | `8` | Profile carousel demo shows **4**; return enough for swipe / pager `1/N` |

**Response:** `{ "data": [ /* Artist list objects §3.2 */ ] }`

Cards must include Explore-compatible fields (image, price, rating, location, availability, tags, preview_audio, profile_path, is_favorited).

---

### 4.4 Setlist

`GET /v1/artists/{idOrSlug}/setlist`

| Param | Description |
|-------|-------------|
| `genre` | `all` or genre code (`jazz`, `solo`, `pop`, …) |
| `q` | Search title / original artist |

**Response:**

```json
{
  "data": {
    "featured_image": { "url": "...", "width": 546, "height": 1040 },
    "genres": [
      { "code": "all", "label": "All Songs" },
      { "code": "jazz", "label": "Jazz" }
    ],
    "songs": [ /* Song objects with audio.url */ ]
  }
}
```

Theme may filter client-side if the list is small (&lt; 100). For large repertoires, server-side `genre` + `q` is required.

Each song **must** include playable `audio.url` + `duration_seconds` (profile player UI: now playing, skip, progress).

---

### 4.5 Gallery & videos

Either embed on detail **or** expose:

- `GET /v1/artists/{idOrSlug}/gallery`
- `GET /v1/artists/{idOrSlug}/videos`

**Gallery** items need: `image` + `venue` + `location` + `duration` + `guests` (Photos tab meta row). Stage/thumb images ≈ **1682×886** (or responsive equivalents).

**Videos** need: `poster` + stream `source.url` and/or `external_url` (YouTube/Vimeo). Ordered list for prev/next controls.

---

### 4.6 Autocomplete / suggest

`GET /v1/artists/suggest`

| Param | Description |
|-------|-------------|
| `q` | Required, min 1–2 chars |
| `limit` | Default `8`, max `20` |
| `context` | `header` \| `contact` \| `explore` (optional ranking hint) |

**Response:** `{ "data": [ /* Suggest hits */ ] }`

```json
{
  "data": [
    {
      "id": "andy-elton",
      "slug": "andy-crosbie-elton-john",
      "label": "Andy Crosbie as Elton John",
      "meta": "SOLO SINGER",
      "avatar": { "url": "https://cdn.example.com/.../avatar.jpg", "width": 80, "height": 80 }
    }
  ]
}
```

Used by:

- **Front-page / global header** “Search Artist” typeahead (desktop + mobile)
- Explore search (if wired to suggest)
- Contact inquire “preferred artists” (max **5** ranked selections; `meta` used as type line)

Match against stage name, legal/act name, and common aliases. Empty list → theme shows “No artists found”.

---

### 4.7 Occasions / category cards

`GET /v1/occasions`

Powers: Front-page “EVERY ARTIST. EVERY VIBE.” occasion mode.

**Response:** `{ "data": [ /* Occasion aggregates */ ] }`

Filter chips on front page: `all`, `wedding`, `corporate`, `pubs` (and optionally `djs`). Each card’s `category` must match a chip id.

> Note: Front-page **header** “Browse Categories” is **not** this endpoint — that uses taxonomy / browse-category dictionaries (§4.8). `/occasions` is only for the artists-section occasion carousel cards.

---

### 4.8 Taxonomies & search dictionaries

`GET /v1/taxonomies`

Returns all filter dictionaries used by the **front-page header search**, Explore filters, and registration. Prefer this over hardcoding enums in WordPress.

```json
{
  "data": {
    "browse_categories": [
      {
        "key": "artist-type",
        "label": "Artist Type",
        "tags": [
          { "code": "male-solo", "label": "Male Solo" },
          { "code": "female-solo", "label": "Female Solo" },
          { "code": "duos", "label": "Duos" },
          { "code": "bands", "label": "Bands" },
          { "code": "djs", "label": "DJ's" },
          { "code": "celebrity-acts", "label": "Celebrity Acts" },
          { "code": "professional-dancers", "label": "Professional Dancers" },
          { "code": "magicians-hypnotists", "label": "Magicians & Hypnotists" },
          { "code": "shows", "label": "Shows" }
        ]
      },
      {
        "key": "tribute",
        "label": "Tribute Acts",
        "tags": [
          { "code": "elvis", "label": "Elvis" },
          { "code": "queen", "label": "Queen" }
        ]
      },
      {
        "key": "genre",
        "label": "Music Genre",
        "tags": [{ "code": "pop", "label": "Pop" }]
      },
      {
        "key": "era",
        "label": "Era / Decade",
        "tags": [{ "code": "80s", "label": "80's" }]
      },
      {
        "key": "event",
        "label": "Event Type",
        "tags": [
          { "code": "wedding", "label": "Wedding" },
          { "code": "corporate", "label": "Corporate" },
          { "code": "pubs", "label": "Pubs & Clubs" },
          { "code": "private", "label": "Private Party" },
          { "code": "festival", "label": "Festival" }
        ]
      }
    ],
    "locations": [
      {
        "code": "london",
        "label": "London",
        "region": "Greater London, UK",
        "popular": true
      }
    ],
    "budgets": [
      { "code": "under-500", "label": "Under £500" },
      { "code": "500-1000", "label": "£500 - £1,000" },
      { "code": "1000-2500", "label": "£1,000 - £2,500" },
      { "code": "2500-5000", "label": "£2,500 - £5,000" },
      { "code": "over-5000", "label": "Over £5,000" }
    ],
    "artist_types": [{ "code": "male-solo", "label": "Male Solo" }],
    "genres": [],
    "eras": [],
    "event_types": [],
    "tributes": []
  }
}
```

Optional convenience endpoints (same payloads as subsets of `/taxonomies`):

- `GET /v1/locations?q=` — location typeahead (filter by city/region)
- `GET /v1/budgets` — budget band list

---

### 4.9 Favourites / wishlist (optional — auth required)

UI already toggles favourite heart and “ADD TO WISHLIST”. If product requires persistence:

| Method | Path | Body |
|--------|------|------|
| `POST` | `/v1/me/favorites/{artistId}` | — |
| `DELETE` | `/v1/me/favorites/{artistId}` | — |
| `GET` | `/v1/me/favorites` | paginated artist cards |
| `POST` | `/v1/me/wishlist/{artistId}` | — |
| `DELETE` | `/v1/me/wishlist/{artistId}` | — |
| `GET` | `/v1/me/wishlist` | |

Unauthenticated sites may omit these; theme will keep local-only toggles.

---

### 4.10 Artist registration intake (optional)

Theme form posts to `/artist-registration/` with fields such as:

- Personal: full name, stage name, email, phone, address  
- Performance: years, rate, category, offering text  
- Media: headshots, photos, video links, portfolio, socials  
- Travel/tech: radius, tech requirements, PLI, PAT  
- Bio + contact preference  

Vendor may expose:

`POST /v1/artist-applications`

Accept multipart or JSON + uploaded media URLs. Exact schema to be confirmed with Excel ops; not required for read-only launch of browse/profile.

---

## 5. Theme surfaces → endpoints map

| Theme surface | Primary endpoint(s) |
|---------------|---------------------|
| **Front-page header search (5 fields)** | `GET /artists/suggest` + `GET /taxonomies` (or locations/budgets) → submit `GET /artists` |
| Front-page occasion cards | `GET /occasions` |
| Front-page artist cards | `GET /artists?sort=most_booked&per_page=9` (or curated flag) |
| **Explore Artists** search (`?s=`) | `GET /artists?q=` |
| **Explore Artists** category pills | `GET /artists?category=` + `facets.categories` |
| **Explore Artists** chips / clear / Filters & Sort | `GET /artists` (+ taxonomies, `sort`, `applied`) |
| **Explore Artists** card grid | `GET /artists` list objects (§3.2) |
| **Explore Artists** favourite heart | `POST/DELETE /me/favorites/{id}` |
| **Explore Artists** preview volume | `preview_audio` on list object |
| **Explore Artists** CTA “Book As an Artist” | `POST /artist-applications` |
| **Artist profile** hero | `GET /artists/{slug}` — hero_image, price*, perks, tags, socials, excel_approved, reviews* |
| **Artist profile** favorite / wishlist | `POST/DELETE /me/favorites/{id}`, `POST/DELETE /me/wishlist/{id}` |
| **Artist profile** Performance & Energy | `performance.paragraphs` + `performance.venues` |
| **Artist profile** Music List & Repertoire | `setlist` or `GET .../setlist` (songs + audio + genres) |
| **Artist profile** Photos & Videos | `gallery` / `videos` (or dedicated endpoints) |
| **Artist profile** View Similar Artists | `GET /artists/{id}/similar` → §3.2 cards |
| **Artist profile** CTA “Book As an Artist” | `POST /artist-applications` |
| Contact preferred artists | `GET /artists/suggest?context=contact` |
| WP search results page (`/?s=…`) | `GET /artists` with header params (`s`, `occasion`, `location`, `event_date`, `budget`) |
| Quote CTA | Theme builds quote URL; API may return `quote_path` if custom |

---

## 6. Non-functional requirements

| Requirement | Expectation |
|-------------|-------------|
| Latency | p95 &lt; 300ms for suggest; &lt; 600ms for list/detail (CDN for media) |
| Caching | `ETag` / `Cache-Control` on GET; facet-heavy list cacheable briefly |
| CORS | Allow WordPress origin(s) if browser-called; or theme proxies server-side |
| Rate limits | Document limits; return `429` + `Retry-After` |
| Availability | Images always absolute HTTPS; broken media must not 500 the API |
| Slugs | Immutable preferred; redirects if changed |
| Locale | Initially `en-GB` copy and GBP pricing |
| Privacy | No PII in public artist payloads beyond published promo contacts/socials |

---

## 7. Acceptance checklist (vendor)

- [ ] Front-page header search params supported: `s`/`q`, `occasion` (incl. CSV), `location`, `event_date`, `budget`  
- [ ] `occasion` tag codes resolve correctly across all five Browse Categories groups  
- [ ] `event_date` filters real bookable availability (not ignored)  
- [ ] Locations include `code`, `label`, `region` for Popular Cities UI  
- [ ] Budget bands match header labels exactly  
- [ ] `GET /artists/suggest` returns `id`, `slug`, `label`, `avatar` for header typeahead  
- [ ] `GET /taxonomies` (or equivalents) supplies browse_categories, locations, budgets  
- [ ] **Explore:** `GET /artists?q=` matches Explore header `?s=`  
- [ ] **Explore:** `category` pill ids + `facets.categories` counts  
- [ ] **Explore:** filter chips via `applied` (or equivalent labels) + clearable params  
- [ ] **Explore:** `sort` values including `price_desc` and `most_booked`  
- [ ] **Explore:** card fields — image 560×779, featured, favorited, preview_audio, availability, rating, location, name, price_display, tags, profile_path  
- [ ] **Explore:** pagination (`page` / `per_page`, `meta.total`, `catalog_total`)  
- [ ] Favourites toggle endpoints for Explore hearts  
- [ ] `GET /artists` supports text search, taxonomies, budget, location, date, sort, pagination, facets  
- [ ] **Profile:** `GET /artists/{slug}` returns hero, price_note, perks, socials, excel_approved, reviews_summary, tags  
- [ ] **Profile:** `performance.paragraphs` (2 cols) + `performance.venues[]` (label + image)  
- [ ] **Profile:** setlist `featured_image`, `genres`, songs with `genre` + playable `audio.url` + duration  
- [ ] **Profile:** gallery items include venue, location, duration, guests  
- [ ] **Profile:** videos include poster + playable/external URL  
- [ ] **Profile:** wishlist + favourite flags/endpoints  
- [ ] **Profile:** similar artists endpoint returns Explore-card-compatible objects (`limit` ≥ 4)  
- [ ] Occasions endpoint powers front-page occasion carousel (separate from header categories)  
- [ ] Error envelope + pagination meta as specified  
- [ ] Staging environment + sample Postman/OpenAPI collection provided  

---

## 8. Out of scope (for this API version)

- Payment / checkout  
- Live chat  
- Full CMS for Excel staff (unless vendor also provides admin)  
- Replacing WordPress page routing (theme keeps `/`, `/explore-artists/`, `/artist/{slug}/` templates)

---

## 9. Open questions for Excel + vendor

1. Will WordPress call the API **server-side** (PHP) or **client-side** (JS)? Affects CORS and key storage.  
2. Auth model for public read vs favourites/wishlist.  
3. Source of truth for “Available this weekend” and **`event_date` calendar** — inventory vs manual flag.  
4. Audio licensing: can setlist / card previews be streamed publicly?  
5. Curated vs algorithmic “similar artists” and front-page featured set.  
6. Exact slug strategy and mapping to WP pages/rewrites (`/artist/{slug}/`).  
7. Should header search submit `artist_id`/`slug` instead of free-text `s` once suggest is live?  
8. Should mobile multi-`occasion` values be AND or OR when filtering?  
9. Explore **Filters & Sort** panel: confirm full filter set (budget, location, availability, multi-tag) vs sort-only.  
10. Explore pagination UX: numbered pages vs infinite scroll / “Load more”?  
11. Can only one `sort` be active, or may chips show both a filter and a sort (as in the demo)?  
12. Profile videos: self-hosted MP4 vs YouTube/Vimeo only?  
13. Are setlist genre tabs per-artist (dynamic) or a fixed global list (`all` / `jazz` / `solo` / `pop`)?  
14. Embed full setlist/gallery/videos on detail, or always lazy-load sub-resources?

---

## 10. Sample OpenAPI paths (summary)

```
GET  /v1/artists
GET  /v1/artists/suggest
GET  /v1/artists/{idOrSlug}
GET  /v1/artists/{idOrSlug}/similar
GET  /v1/artists/{idOrSlug}/setlist
GET  /v1/artists/{idOrSlug}/gallery
GET  /v1/artists/{idOrSlug}/videos
GET  /v1/occasions
GET  /v1/taxonomies
GET  /v1/locations
GET  /v1/budgets
POST /v1/me/favorites/{artistId}
DELETE /v1/me/favorites/{artistId}
POST /v1/me/wishlist/{artistId}
DELETE /v1/me/wishlist/{artistId}
POST /v1/artist-applications
```

A machine-readable OpenAPI 3.1 file can be produced as a follow-up once host, auth, and the open questions above are confirmed.
