# MZ Threads — Backend API

_Where Tradition Meets Elegance_

Production-quality Node.js/Express/MongoDB backend for the MZ Threads boutique catalog. Replaces the React frontend's mock data — no online payments, customers order via WhatsApp, and everything is managed from a secure Admin Portal.

## Tech Stack

Node.js · Express.js · MongoDB Atlas · Mongoose · JWT · bcrypt · Cloudinary · Multer · Helmet · CORS · express-validator · express-rate-limit · express-mongo-sanitize · Morgan · Jest/Supertest

## Getting Started

```bash
cd server
npm install
cp .env.example .env   # then fill in your real Mongo URI, JWT secret, Cloudinary keys, etc.
npm run seed:admin     # creates the first admin login from ADMIN_EMAIL/ADMIN_PASSWORD in .env
npm run dev            # starts on http://localhost:5000
```

Health check: `GET http://localhost:5000/health`

## Environment Variables

See `.env.example` for the full list with comments. Required at minimum: `MONGO_URI`, `JWT_SECRET`. For image uploads: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start` | Start in production mode |
| `npm run seed:admin` | Create/reset the admin account from `.env` |
| `npm test` | Run the Jest test suite |
| `npm run test:coverage` | Run tests with a coverage report |

## Project Structure

```
server/
├── config/        env.js, db.js, cloudinary.js
├── controllers/   auth, category, product, settings, upload
├── middlewares/   auth (protect), validate, errorHandler, upload (multer), rateLimiters
├── models/        User, Category, Product, Settings
├── routes/        auth, category, product, settings, upload
├── services/       cloudinary.service.js
├── utils/         ApiError, asyncHandler, logger, slugify, token
├── validators/    express-validator rule sets per resource
├── scripts/       seedAdmin.js
├── tests/         unit/ + integration/ (Jest + Supertest, models mocked)
├── app.js         Express app & middleware pipeline
└── server.js      entry point — connects DB, starts HTTP server
```

## API Reference

Full endpoint documentation: [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md)

## Testing

The suite mocks Mongoose models rather than requiring a live database connection, so it runs anywhere with no setup:

```bash
npm test
```

35 tests covering: route wiring, auth gating on every protected endpoint, login success/failure paths, pagination/filtering/search logic on the products list, slug vs. ObjectId lookup, and core utilities (slugify, ApiError, asyncHandler).

> Note: these are unit/integration tests against mocked models — they verify request handling, validation ordering, and auth enforcement, not real MongoDB behavior (indexes, unique constraints, etc.). Test that against a real Atlas cluster or local MongoDB before going live.

## Security Notes

- Passwords hashed with bcrypt (12 salt rounds), never returned in API responses.
- JWT stored in an httpOnly cookie; `secure`/`sameSite: none` enabled automatically in production.
- Helmet, CORS (locked to `CLIENT_URL`), and `express-mongo-sanitize` (NoSQL-injection protection) applied globally.
- Global rate limit (200 req/15min/IP by default) plus a stricter limit on `/api/auth/login` (10/15min/IP).
- All admin routes gated by JWT verification that re-fetches the user from the DB on every request (so a deactivated account is locked out immediately, not just at token expiry).

## What's Not Included

Per scope, this backend does **not** include deployment configuration (Dockerfile, CI/CD, hosting-specific setup) — everything else from the original roadmap (auth, categories, products, uploads, settings, and a test suite) is implemented.
