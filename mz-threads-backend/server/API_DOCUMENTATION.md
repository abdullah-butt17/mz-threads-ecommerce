# MZ Threads API Documentation

Base URL (local): `http://localhost:5000/api`

All responses follow a consistent envelope:

```json
{
  "success": true,
  "message": "optional human-readable message",
  "data": {},
  "pagination": { "...": "only present on paginated list endpoints" },
  "errors": ["...", "only present on validation failures"]
}
```

Authenticated requests use an httpOnly JWT cookie (`mz_token` by default), set automatically on login. API clients that can't use cookies (e.g. Postman, a mobile app) may instead send `Authorization: Bearer <token>` — the login response body also returns the raw token for this purpose.

---

## Auth

### POST /api/auth/login
Public. Rate-limited to 10 attempts / 15 minutes per IP.

Request body:
```json
{ "email": "owner@mzthreads.com", "password": "yourpassword" }
```

Response `200`:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": { "_id": "...", "name": "Boutique Owner", "email": "owner@mzthreads.com", "role": "admin" },
    "token": "eyJhbGciOi..."
  }
}
```

Errors: `400` (validation), `401` (invalid credentials), `403` (deactivated account).

### POST /api/auth/logout
Private. Clears the auth cookie.

### GET /api/auth/me
Private. Returns the currently authenticated admin.

---

## Categories

### GET /api/categories
Public. Query params:
| Param | Type | Description |
|---|---|---|
| `activeOnly` | `true`/`false` | Only return categories with `isActive: true` |
| `mainCategory` | string | Filter by exact main category |

Sorted by `displayOrder` ascending, then `mainCategory`.

### POST /api/categories
Private. Body: `{ mainCategory, subCategory, displayOrder?, isActive? }`

### PUT /api/categories/:id
Private. Body: any subset of the fields above.

### DELETE /api/categories/:id
Private.

---

## Products

### GET /api/products
Public. Powers both the public Shop page and the Admin product list.

| Param | Type | Description |
|---|---|---|
| `page` | number | Default `1` |
| `limit` | number | Default `12`, max `100` |
| `search` | string | Full-text search across name/description/material |
| `mainCategory`, `subCategory`, `collection`, `stockStatus` | string | Exact-match filters |
| `featured` | `true`/`false` | Filter featured products |
| `minPrice`, `maxPrice` | number | Price range filter |
| `sort` | `newest`\|`price_asc`\|`price_desc`\|`name_asc`\|`name_desc` | Default `newest` |

Response includes a `pagination` object: `{ page, limit, totalItems, totalPages }`.

### GET /api/products/:id
Public. `:id` may be either a Mongo `_id` or a product `slug` — the API detects which and looks up accordingly, so the same endpoint serves the Admin edit screen and the public Product Details page.

### POST /api/products
Private. Body must include: `name`, `mainCategory`, `subCategory`, `description`, `price`, `images` (array of `{ url, publicId }`, from `/api/upload`). Optional: `collection`, `material`, `availableSizes`, `availableColors`, `salePrice`, `stockStatus`, `featured`.

The `slug` is generated automatically from `name` and kept unique.

### PUT /api/products/:id
Private. Any subset of the fields above. Re-saves via the full document so the slug regenerates if the name changes.

### DELETE /api/products/:id
Private. Also deletes the product's images from Cloudinary.

---

## Settings

### GET /api/settings
Public. Returns the single settings document (auto-created with defaults on first read).

### PUT /api/settings
Private. Body: any subset of `businessName`, `logo`, `whatsappNumber`, `address`, `email`, `facebook`, `instagram`, `tiktok`, `deliveryCharges`, `returnPolicy`.

---

## Upload

### POST /api/upload
Private. `multipart/form-data` with one or more files under the field name `images` (max 10 per request, 5MB each, JPEG/PNG/WEBP/AVIF only).

Response `201`:
```json
{
  "success": true,
  "message": "2 image(s) uploaded successfully",
  "data": [
    { "url": "https://res.cloudinary.com/.../a.jpg", "publicId": "mz-threads/products/a" },
    { "url": "https://res.cloudinary.com/.../b.jpg", "publicId": "mz-threads/products/b" }
  ]
}
```

Attach the returned `{ url, publicId }` objects to a product's `images` array in a subsequent `POST`/`PUT /api/products`.

---

## Error Reference

| Status | Meaning |
|---|---|
| `400` | Validation failed — see `errors` array |
| `401` | Missing/invalid/expired auth token, or wrong credentials |
| `403` | Authenticated but account deactivated |
| `404` | Resource (or route) not found |
| `409` | Duplicate key (e.g. category main/sub pairing already exists) |
| `429` | Rate limit exceeded |
| `500` | Unexpected server error |

## Health Check

### GET /health
Public, unauthenticated, outside the `/api` prefix. For uptime monitors/hosting platforms.
