# CF Starter

TanStack Start + Cloudflare SaaS starter with D1, Drizzle, Better Auth, Tailwind CSS, shadcn/ui, and TanStack Query already wired.

## Start Here

```bash
bun install
cp .dev.vars.example .dev.vars
openssl rand -base64 32
```

Put the generated secret in `.dev.vars` as `BETTER_AUTH_SECRET`, then fill the Google OAuth values:

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
BETTER_AUTH_SECRET=your-generated-secret
BETTER_AUTH_URL=http://localhost:3000
```

Create the D1 database:

```bash
wrangler login
wrangler d1 create cfstarter
```

Copy the returned database ID into `wrangler.jsonc`:

```jsonc
"database_id": "your-real-d1-database-id"
```

Run everything locally:

```bash
bun run d1:migrations:apply
bun run dev
```

Open `http://localhost:3000`.

## One-Time Production Setup

Set secrets:

```bash
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put BETTER_AUTH_URL
```

Use your production URL for `BETTER_AUTH_URL`, for example `https://app.example.com`.

Apply remote migrations and deploy:

```bash
bun run d1:migrations:apply:remote
bun run deploy
```

## Daily Commands

```bash
bun run dev          # local dev
bun run typecheck    # TypeScript check
bun run lint         # Biome check
bun run build        # production build
bun run test         # Vitest tests
```

## Database Commands

```bash
bun run db:generate                  # generate migration after schema changes
bun run d1:migrations:apply          # apply local D1 migrations
bun run d1:migrations:apply:remote   # apply production D1 migrations
bun run db:studio                    # open Drizzle Studio
```

Schema lives in `src/db/schema.ts`.

Current tables:

- `user`, `session`, `account`, `verification`
- `organization`
- `membership`
- `subscription`

## Add UI Components

```bash
bunx shadcn add input label dropdown-menu
```

shadcn config is in `components.json`. Tailwind CSS is in `src/styles.css`.

## Code Quality

This project uses Biome for linting, formatting, and import organization.

```bash
bun run lint      # check lint/format/imports
bun run format    # write Biome fixes
bun run typecheck # TypeScript check
bun run test      # Vitest tests
```

Biome config is in `biome.jsonc`.

## Useful Files

- `src/routes/index.tsx`: public landing page
- `src/routes/app.tsx`: protected app dashboard
- `src/routes/api/auth/$.ts`: Better Auth handler
- `src/lib/auth.ts`: Better Auth server config
- `src/lib/auth-client.ts`: browser auth helpers
- `src/db/index.ts`: Drizzle D1 client
- `src/db/schema.ts`: database schema
- `wrangler.jsonc`: Cloudflare Worker and bindings

## When Starting A Product

1. Rename `name` in `package.json` if needed.
2. Rename Worker and D1 database in `wrangler.jsonc`.
3. Update title/description in `src/routes/__root.tsx`.
4. Replace landing page content in `src/routes/index.tsx`.
5. Replace dashboard content in `src/routes/app.tsx`.
6. Add product tables in `src/db/schema.ts`.
7. Run `bun run db:generate` and apply migrations.

## Cloudflare Bindings

If you add R2, KV, Queues, AI, or Durable Objects, update `wrangler.jsonc`, then run:

```bash
bun run cf-typegen
```

Keep Cloudflare-only imports like `cloudflare:workers` in server-side files.

## Common Fixes

- Google auth redirect fails: check `BETTER_AUTH_URL` and Google OAuth redirect URI.
- D1 missing locally: check `database_id` and run `bun run d1:migrations:apply`.
- New binding not typed: run `bun run cf-typegen`.
- New route not found: restart `bun run dev`.

## Not Included Yet

- Billing checkout and webhooks
- Invite flow
- RBAC helpers
- Account/settings pages
- Email sending
- Product-specific API routes
