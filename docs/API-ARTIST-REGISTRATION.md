# Artist Registration API — Register as Artist

**Version:** 1.0.0  
**Audience:** Backend / API developer  
**Consumer:** Excel Entertainment WordPress theme (`excel_ent`) — Contact page, **Register as Artist** tab  
**Source template:** `page-contactus.php` → `template-parts/section-contact.php` (panel `data-contact-panel="talent"`, form `data-contact-form="talent"`)  
**Last updated:** 2026-09-01

This document is the **authoritative specification** for the Register as Artist submission flow. The broader artist catalogue API is in [`API-ARTISTS.md`](./API-ARTISTS.md).

---

## 1. Summary

| Item | Value |
|------|-------|
| **Endpoint** | `POST /v1/artist-applications` |
| **Purpose** | Persist a new artist registration, store uploaded media, send confirmation email to applicant and alert email to Excel team |
| **Theme form action (current)** | `POST` `multipart/form-data` → `/artist-registration/` (WordPress route — **must proxy to this API in production**) |
| **Submit button** | “Register as Artist” |
| **Success copy (UI)** | “Our team will get back to you within 24 hours.” |
| **Required consent** | Applicant agrees for content to be shared on the Excel website |

**Recommended integration:** WordPress receives the browser form server-side (PHP), maps fields to the JSON/multipart shape below, and calls the vendor API with a server-held API key. Do **not** expose API keys in the browser.

---

## 2. Request

### 2.1 HTTP

```http
POST /v1/artist-applications HTTP/1.1
Host: {api-host}
Authorization: Bearer {token}   # or X-API-Key — to be agreed
Content-Type: multipart/form-data
Accept: application/json
Idempotency-Key: {optional-uuid}  # recommended — prevents duplicate submissions on double-click
```

**Alternative (no direct file upload):** `Content-Type: application/json` when media files were pre-uploaded via separate upload URLs and the request contains CDN URLs instead of binary parts. See §2.4.

### 2.2 Canonical JSON body shape

When using `multipart/form-data`, nested objects may be sent as JSON-encoded string parts **or** flattened — see §2.3. The logical payload is:

```json
{
  "type": "talent",
  "personal": {
    "full_name": "Alex Johnson",
    "stage_name": "Alex Rocksz",
    "email": "hello@example.com",
    "phone": "+44 7700 900000",
    "registered_address": "123 King Street, Flat 4B\nManchester\nM1 2AB\nUnited Kingdom"
  },
  "performance": {
    "years_performing": "3-6",
    "base_location": "M1 2AB",
    "set_lengths": ["flexible", "2-hours"],
    "rate_range": "starting from £600",
    "categories": ["male-solo", "covers", "wedding"]
  },
  "media": {
    "headshots": [],
    "performance_photos": [],
    "playlist_links": [
      "https://www.youtube.com/watch?v=example1",
      "https://vimeo.com/example2"
    ],
    "social_links": [
      "https://instagram.com/alexrocksz"
    ],
    "video_link": "https://www.youtube.com/watch?v=performance-demo",
    "reviews_link": "https://g.page/r/example/review"
  },
  "travel": {
    "radius": "50-100",
    "technical_requirements": "Sound, lighting, and staging needs",
    "public_liability_insurance": "yes",
    "pat_tested": "yes"
  },
  "bio": "Tell us about yourself, your performances...",
  "contact_preference": {
    "method": "email",
    "details": "Best time: weekdays after 6pm"
  },
  "consent": {
    "website_content_sharing": true
  },
  "meta": {
    "source": "wordpress",
    "submitted_from": "contact-register-artist",
    "user_agent": "Mozilla/5.0 ...",
    "locale": "en-GB"
  }
}
```

### 2.3 WordPress form field → API mapping

The theme submits these `name` attributes. A WordPress proxy **must** transform them into the canonical JSON above.

#### Personal details

| UI label | WP `name` | API path | Required | Notes |
|----------|-----------|----------|----------|-------|
| Full Name | `excel_ent_full_name` | `personal.full_name` | **Yes** | Max 200 chars |
| Stage name | `excel_ent_stage_name` | `personal.stage_name` | **Yes** | Max 200 chars |
| Email address | `excel_ent_email` | `personal.email` | **Yes** | Valid email |
| Phone Number | `excel_ent_phone` | `personal.phone` | **Yes** | E.164 preferred |
| Registered address | `excel_ent_address` | `personal.registered_address` | No | Multiline text |

#### Performance details

| UI label | WP `name` | API path | Required | Notes |
|----------|-----------|----------|----------|-------|
| Years Performing | `excel_ent_years` | `performance.years_performing` | No* | Enum — see §3.1 |
| Base location | `excel_ent_base_location` | `performance.base_location` | No | Postcode or city (free text) |
| Performance Set Lengths | `excel_ent_set_length` | `performance.set_lengths[]` | No | **Multi-select.** Hidden input value is comma-separated codes — split on `,` |
| Rate / Price Range | `excel_ent_rate` | `performance.rate_range` | No | Free text |
| Performance Category | `excel_ent_perf_category` | `performance.categories[]` | No** | **Multi-select** from taxonomy §3.2. Hidden input: comma-separated codes |

\*Theme marks Years Performing as required in HTML only when accordion section is validated; API should treat as optional unless business rules say otherwise.  
\*\*Strongly recommended — drives enquiry routing. Consider requiring at least one category server-side.

#### Media & reviews

| UI label | WP `name` | API path | Required | Notes |
|----------|-----------|----------|----------|-------|
| Headshot | `excel_ent_headshot[]` | `media.headshots[]` | No | File upload — see §4. Up to **3** rows |
| Performance Photos | `excel_ent_photos[]` | `media.performance_photos[]` | No | File upload — up to **8** rows |
| Playlist Website Links | `excel_ent_playlist[]` | `media.playlist_links[]` | No | URL inputs — up to **10**. YouTube / Vimeo |
| Social Media links | `excel_ent_social[]` | `media.social_links[]` | No | URL inputs — up to **3** |
| Video a Performance Link | `excel_ent_video_links` | `media.video_link` | No | Single URL |
| Add Customer Reviews | `excel_ent_reviews` | `media.reviews_link` | No | Single URL (e.g. Google reviews) |

Repeatable URL fields (`excel_ent_playlist[]`, `excel_ent_social[]`) omit empty rows. Only non-empty values are submitted.

#### Travel & technical

| UI label | WP `name` | API path | Required | Notes |
|----------|-----------|----------|----------|-------|
| Travel radius | `excel_ent_travel` | `travel.radius` | No | Enum — see §3.3 |
| Technical Requirements | `excel_ent_tech` | `travel.technical_requirements` | No | Free text |
| Public Liability Insurance | `excel_ent_pli` | `travel.public_liability_insurance` | No | `yes` \| `no` |
| P.A.T. tested equipment | `excel_ent_pat` | `travel.pat_tested` | No | `yes` \| `no` |

#### Artist bio

| UI label | WP `name` | API path | Required |
|----------|-----------|----------|----------|
| Tell us about yourself | `excel_ent_bio` | `bio` | No |

#### Contact preference

| UI label | WP `name` | API path | Required | Notes |
|----------|-----------|----------|----------|-------|
| How should we contact you? | `excel_ent_talent_contact_pref` | `contact_preference.method` | No | Default `email` — see §3.4 |
| Contact details | `excel_ent_talent_contact_details` | `contact_preference.details` | No | Free text |

#### Hidden / meta

| WP `name` | API path | Value |
|-----------|----------|-------|
| `excel_ent_contact_type` | `type` | Always `talent` |
| `excel_ent_agree` | `consent.website_content_sharing` | Must be `true` / `"1"` when checked |

### 2.4 Multipart file parts

When sending `multipart/form-data` with binary uploads, use **either**:

**Option A — separate file parts (recommended):**

| Part name | Maps to | Max count |
|-----------|---------|-----------|
| `headshots[]` | `media.headshots[]` | 3 |
| `performance_photos[]` | `media.performance_photos[]` | 8 |

Plus JSON string part `payload` containing all non-file fields from §2.2.

**Option B — pass-through WP field names:**

| Part name | Maps to |
|-----------|---------|
| `excel_ent_headshot[]` | `media.headshots[]` |
| `excel_ent_photos[]` | `media.performance_photos[]` |

WordPress proxy can rename parts when forwarding to vendor API.

**Option C — JSON-only:** Pre-upload files via `POST /v1/uploads` (vendor-defined), then submit `application/json` with URL objects in `media.headshots` / `media.performance_photos`.

---

## 3. Enumerations & taxonomy

### 3.1 Years performing (`performance.years_performing`)

| Code | UI label |
|------|----------|
| `lt-1` | Less than 1 year |
| `1-2` | 1-2 year |
| `3-6` | 3- 6 year |
| `7-10` | 7-10 year |
| `8-12` | 8-12 year |
| `16+` | 16+ years |

### 3.2 Performance set lengths (`performance.set_lengths[]`)

Multi-select. Codes:

| Code | UI label |
|------|----------|
| `flexible` | Flexible / Tailored to Event |
| `1-hour` | 1 hour |
| `2-hours` | 2 hours |
| `3-hours` | 3 hours |
| `4-hours` | 4 hours |

**Wire format from theme:** single hidden input `excel_ent_set_length` with comma-separated values, e.g. `"flexible,2-hours,3-hours"`.

### 3.3 Travel radius (`travel.radius`)

| Code | UI label |
|------|----------|
| `0-20` | 0 to 20 miles |
| `20-50` | 20 to 50 miles |
| `50-100` | 50 - 100 miles |
| `nationwide` | Nationwide UK |

### 3.4 Contact preference method (`contact_preference.method`)

| Code | UI label |
|------|----------|
| `email` | Email (default) |
| `phone` | Phone call |
| `text` | Text message/Whatsapp |

### 3.5 Performance categories (`performance.categories[]`)

Multi-select grouped picker. **Codes align with Explore Artists / header browse taxonomy** — use the same codes when indexing artists.

Theme sends comma-separated codes in `excel_ent_perf_category`. API should store as string array and optionally resolve group + label for admin UI.

#### Group: Artists & Tributes (`artists-tributes`)

| Code | Label |
|------|-------|
| `bands` | Bands |
| `big-band` | Big Band |
| `djs` | DJ's |
| `duo-tributes` | Duo Tributes |
| `duos` | Duos |
| `female-solo` | Female Solo |
| `female-tributes` | Female Tributes |
| `male-solo` | Male Solo |
| `male-tributes` | Male Tributes |
| `tribute` | Tribute |

#### Group: Decades (`era`)

| Code | Label |
|------|-------|
| `00s` | 00's |
| `10s` | 10's |
| `20s` | 20's |
| `30s` | 30's |
| `40s` | 40's |
| `50s` | 50's |
| `60s` | 60's |
| `70s` | 70's |
| `80s` | 80's |
| `90s` | 90's |

#### Group: Entertainment & Events (`event`)

| Code | Label |
|------|-------|
| `celebrity-act` | Celebrity Act |
| `comedy` | Comedy |
| `corporate` | Corporate |
| `drag-artists` | Drag Artists |
| `karaoke` | Karaoke |
| `magicians-hypnotists` | Magicians – hypnotists |
| `shows` | Shows |
| `variety` | Variety |
| `wedding` | Weddings |

#### Group: Music Genre (`genre`)

| Code | Label |
|------|-------|
| `blues` | Blues |
| `classical` | Classical |
| `covers` | Covers |
| `country` | Country |
| `dance` | Dance |
| `disco` | Disco |
| `glam-rock` | Glam Rock |
| `indie-mod` | Indie & Mod |
| `irish-music` | Irish music |
| `irish` | Irish |
| `jazz` | Jazz |
| `latin-party-bands` | Latin and party bands |
| `opera` | Opera |
| `pop` | Pop |
| `rnb` | R&B |
| `rat-pack` | Rat Pack |
| `reggae` | Reggae |
| `rock` | Rock |
| `rock-n-roll` | Rock n Roll |
| `ska` | Ska |
| `soul-motown` | Soul & Motown |
| `swing` | Swing |
| `vintage-music` | Vintage music |

**Suggested stored shape (optional enrichment):**

```json
{
  "categories": ["male-solo", "covers", "wedding"],
  "categories_detail": [
    { "code": "male-solo", "label": "Male Solo", "group": "artists-tributes" },
    { "code": "covers", "label": "Covers", "group": "genre" },
    { "code": "wedding", "label": "Weddings", "group": "event" }
  ]
}
```

---

## 4. File upload rules

| Field | WP input | Accept | Min | Max files | Max size (recommended) |
|-------|----------|--------|-----|-----------|------------------------|
| Headshot | `excel_ent_headshot[]` | `image/*` | 0 | 3 | 5 MB each |
| Performance Photos | `excel_ent_photos[]` | `image/*` | 0 | 8 | 5 MB each |

**Allowed MIME types (recommended):** `image/jpeg`, `image/png`, `image/webp`, `image/gif`.

**Processing:** Store originals on CDN/object storage; return `{ id, url, filename, mime_type, size_bytes }` per file in the stored application record.

**Total request size (recommended cap):** 50 MB.

Empty file inputs are not submitted by the browser.

---

## 5. Validation

### 5.1 Required fields (server-side)

| Field | Rule |
|-------|------|
| `type` | Must be `talent` |
| `personal.full_name` | Non-empty, max 200 |
| `personal.stage_name` | Non-empty, max 200 |
| `personal.email` | Valid email (RFC 5322 practical subset) |
| `personal.phone` | Non-empty |
| `consent.website_content_sharing` | Must be `true` |

All other fields optional unless Excel defines stricter business rules.

### 5.2 Field-level rules

| Field | Rule |
|-------|------|
| `performance.years_performing` | Must be enum §3.1 if present |
| `performance.set_lengths[]` | Each value enum §3.2; max 5 items |
| `performance.categories[]` | Each value valid code §3.5; recommend min 1 |
| `travel.radius` | Enum §3.3 if present |
| `travel.public_liability_insurance` | `yes` \| `no` if present |
| `travel.pat_tested` | `yes` \| `no` if present |
| `contact_preference.method` | Enum §3.4 if present |
| `media.playlist_links[]` | Valid URL; max 10 |
| `media.social_links[]` | Valid URL; max 3 |
| `media.video_link` | Valid URL if present |
| `media.reviews_link` | Valid URL if present |
| `media.headshots[]` | Max 3 files |
| `media.performance_photos[]` | Max 8 files |

### 5.3 Validation error response (`422 Unprocessable Entity`)

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid application payload",
    "fields": {
      "personal.email": ["Invalid email address"],
      "performance.categories": ["At least one performance category is required"],
      "consent.website_content_sharing": ["Consent is required"],
      "media.headshots": ["Maximum 3 headshot images allowed"]
    }
  }
}
```

---

## 6. Success response

### 6.1 `201 Created`

```json
{
  "data": {
    "id": "app_01JXYZABCDEF",
    "reference": "EXL-2026-00482",
    "type": "talent",
    "status": "received",
    "submitted_at": "2026-09-01T12:00:00Z",
    "message": "Our team will get back to you within 24 hours.",
    "notifications": {
      "applicant_email_sent": true,
      "team_email_sent": true,
      "team_recipient": "info@excelentertainment.co.uk"
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `id` | Opaque application ID |
| `reference` | Human-readable reference for applicant support |
| `status` | Initial value: `received` |
| `message` | Display to user on success (theme uses this or default copy) |
| `notifications` | Email delivery status — see §7 |

### 6.2 Partial success (`207 Multi-Status` or `201` with flags)

If the application is stored but one or both emails fail:

```json
{
  "data": {
    "id": "app_01JXYZABCDEF",
    "reference": "EXL-2026-00482",
    "status": "received",
    "submitted_at": "2026-09-01T12:00:00Z",
    "message": "Our team will get back to you within 24 hours.",
    "notifications": {
      "applicant_email_sent": true,
      "team_email_sent": false,
      "partial_failure": true,
      "errors": ["team_email: SMTP timeout"]
    }
  }
}
```

**Do not roll back** the stored application if email fails.

### 6.3 Stored resource shape (full record)

Returned by `GET /v1/artist-applications/{id}` (admin):

```json
{
  "id": "app_01JXYZABCDEF",
  "reference": "EXL-2026-00482",
  "type": "talent",
  "status": "received",
  "submitted_at": "2026-09-01T12:00:00Z",
  "personal": { "...": "..." },
  "performance": {
    "years_performing": "3-6",
    "years_performing_label": "3- 6 year",
    "base_location": "M1 2AB",
    "set_lengths": ["flexible", "2-hours"],
    "set_length_labels": ["Flexible / Tailored to Event", "2 hours"],
    "rate_range": "starting from £600",
    "categories": ["male-solo", "covers"],
    "categories_detail": [
      { "code": "male-solo", "label": "Male Solo", "group": "artists-tributes" }
    ]
  },
  "media": {
    "headshots": [
      { "id": "file_1", "url": "https://cdn.example.com/.../headshot.jpg", "filename": "headshot.jpg" }
    ],
    "performance_photos": [
      { "id": "file_2", "url": "https://cdn.example.com/.../live-1.jpg", "filename": "live-1.jpg" }
    ],
    "playlist_links": ["https://youtube.com/..."],
    "social_links": ["https://instagram.com/..."],
    "video_link": "https://youtube.com/...",
    "reviews_link": "https://g.page/..."
  },
  "travel": {
    "radius": "50-100",
    "radius_label": "50 - 100 miles",
    "technical_requirements": "...",
    "public_liability_insurance": "yes",
    "pat_tested": "yes"
  },
  "bio": "...",
  "contact_preference": {
    "method": "email",
    "method_label": "Email",
    "details": "Weekdays after 6pm"
  },
  "consent": {
    "website_content_sharing": true,
    "accepted_at": "2026-09-01T12:00:00Z"
  }
}
```

**Status lifecycle:** `received` | `under_review` | `approved` | `rejected` | `more_info_needed`

---

## 7. Email notifications (mandatory)

On successful persist, send **two** emails:

| # | Recipient | When | Content |
|---|-----------|------|---------|
| 1 | `personal.email` | Always | Confirmation + reference + 24h SLA |
| 2 | Excel ops inbox (env config, e.g. `info@excelentertainment.co.uk`) | Always | Full application summary + media links |

### Applicant email

- Subject example: “We received your artist registration — EXL-2026-00482”
- Applicant name + stage name
- Summary: categories, set lengths, travel radius, contact preference
- SLA: “Our team will get back to you within 24 hours.”
- Reference ID

### Excel team email

- Full application (all sections)
- Clickable links to uploaded media (prefer links over attachments if total size > 10 MB)
- Applicant email + phone
- Reference + timestamp

**Note:** `contact_preference.method` guides ops follow-up only. Confirmation always goes to `personal.email`.

---

## 8. Other HTTP responses

| Code | When |
|------|------|
| `400` | Malformed request / invalid multipart |
| `401` / `403` | Auth failure (server-to-server) |
| `413` | Payload too large |
| `422` | Validation errors (§5.3) |
| `429` | Rate limit — include `Retry-After` header |
| `500` | Internal error |

**Rate limit (recommended):** Max 3 submissions per email per 24 hours.

**Idempotency:** When `Idempotency-Key` header repeats within 24h, return the original `201` response without creating a duplicate record.

---

## 9. WordPress proxy example

The theme currently posts native form fields. Example PHP mapping pseudocode:

```php
$set_lengths = array_filter( array_map( 'trim', explode( ',', $_POST['excel_ent_set_length'] ?? '' ) ) );
$categories  = array_filter( array_map( 'trim', explode( ',', $_POST['excel_ent_perf_category'] ?? '' ) ) );

$payload = [
  'type' => 'talent',
  'personal' => [
    'full_name'          => sanitize_text_field( $_POST['excel_ent_full_name'] ?? '' ),
    'stage_name'         => sanitize_text_field( $_POST['excel_ent_stage_name'] ?? '' ),
    'email'              => sanitize_email( $_POST['excel_ent_email'] ?? '' ),
    'phone'              => sanitize_text_field( $_POST['excel_ent_phone'] ?? '' ),
    'registered_address' => sanitize_textarea_field( $_POST['excel_ent_address'] ?? '' ),
  ],
  'performance' => [
    'years_performing' => sanitize_key( $_POST['excel_ent_years'] ?? '' ),
    'base_location'    => sanitize_text_field( $_POST['excel_ent_base_location'] ?? '' ),
    'set_lengths'      => $set_lengths,
    'rate_range'       => sanitize_text_field( $_POST['excel_ent_rate'] ?? '' ),
    'categories'       => $categories,
  ],
  // ... media URLs from $_POST['excel_ent_playlist'], files from $_FILES['excel_ent_headshot']
  'consent' => [
    'website_content_sharing' => ! empty( $_POST['excel_ent_agree'] ),
  ],
];
```

Forward `$payload` + files to `POST /v1/artist-applications`.

---

## 10. Example cURL (multipart)

```bash
curl -X POST "https://{api-host}/v1/artist-applications" \
  -H "Authorization: Bearer {token}" \
  -H "Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000" \
  -F 'payload={
    "type":"talent",
    "personal":{"full_name":"Alex Johnson","stage_name":"Alex Rocksz","email":"hello@example.com","phone":"+447700900000"},
    "performance":{"years_performing":"3-6","base_location":"M1 2AB","set_lengths":["2-hours"],"categories":["male-solo","covers"]},
    "travel":{"radius":"nationwide","public_liability_insurance":"yes","pat_tested":"yes"},
    "contact_preference":{"method":"email"},
    "consent":{"website_content_sharing":true}
  };type=application/json' \
  -F "headshots[]=@/path/to/headshot.jpg;type=image/jpeg" \
  -F "performance_photos[]=@/path/to/live-1.jpg;type=image/jpeg"
```

---

## 11. Optional admin endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/v1/artist-applications` | List applications (auth required) |
| `GET` | `/v1/artist-applications/{id}` | View single application |
| `PATCH` | `/v1/artist-applications/{id}` | Update status |
| `POST` | `/v1/artist-applications/{id}/resend-emails` | Re-send emails |

Not required for theme launch.

---

## 12. Acceptance checklist

- [ ] Accepts full field set from §2.3 including multi-value comma-separated transforms
- [ ] Validates `consent.website_content_sharing === true`
- [ ] Validates performance category codes against §3.5
- [ ] Accepts up to 3 headshots and 8 performance photos
- [ ] Accepts up to 10 playlist URLs and 3 social URLs
- [ ] Returns `id`, `reference`, `status`, `message`, `notifications` on success
- [ ] Sends applicant confirmation and Excel team alert emails
- [ ] Supports `Idempotency-Key` header
- [ ] Returns `422` with field-level errors
- [ ] Documents auth scheme and staging base URL for WordPress integration

---

## 13. Related documents

- [`API-ARTISTS.md`](./API-ARTISTS.md) — §1.4 summary, §3.6 resource shape, §4.10 endpoint index
- Theme source: `template-parts/section-contact.php` (lines ~1172–1502)
