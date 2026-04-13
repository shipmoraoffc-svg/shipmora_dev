# Shipmora Backend

Serverless Node.js backend for authentication, catalog, cart, wishlist, orders, OTP email delivery, and Supabase persistence.

## Stack

- Express.js
- Supabase PostgreSQL + Supabase Auth
- AWS Lambda via `serverless-http`
- AWS SES for OTP email delivery
- Google Sign-In verification with `google-auth-library`
- Zod request validation

## Structure

- `src/controllers` HTTP handlers
- `src/routes` route definitions
- `src/services` Supabase, auth, OTP, and business logic
- `src/middleware` auth, validation, rate limiting, error handling
- `src/config` environment, Supabase, and AWS clients
- `supabase/schema.sql` schema, indexes, triggers, RLS, and order RPC

## Local Run

1. Copy `.env.example` to `.env` and fill in real credentials.
2. Apply `supabase/schema.sql` in the Supabase SQL editor.
3. Run `npm install`.
4. Run `npm run dev`.

## Auth Flow Notes

- `POST /auth/signup` creates the user and sends an email OTP.
- `POST /auth/verify-otp` confirms the OTP and marks the Supabase user email as verified.
- `POST /auth/forgot-password` triggers Supabase's reset email flow and also sends an OTP through SES.
- `POST /auth/google` expects a Google ID token from the frontend and returns the app JWT.

## Deployment

Deploy with the Serverless Framework after exporting the required environment variables:

```bash
serverless deploy
```
