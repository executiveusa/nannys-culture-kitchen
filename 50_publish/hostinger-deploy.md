# Hostinger Deployment Plan

Target: owner-controlled Hostinger VPS / Docker-compatible environment.

## Current architecture
- Remix + Vite
- Node runtime
- pnpm workspace
- Convex remains the external data/backend service used by the existing Nanny OS and new public lead capture.

## Build
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run build
pnpm run start
```

## Required runtime environment
At minimum preserve the environment already required by the repository. Public lead capture specifically needs one of:
- `CONVEX_URL`
- `VITE_CONVEX_URL`

Existing authenticated Nanny OS may also require its current WorkOS / Convex / provider variables. Do not invent or commit secrets.

## Container path
Use `deploy/hostinger/Dockerfile`.

## Health check
`GET /api/health`

## Production proof
Do not mark PRODUCTION VERIFIED until:
1. exact commit SHA is deployed on Hostinger;
2. `/`, `/menu`, `/worksites`, `/events`, `/garden`, `/story`, `/contact`, `/nanny`, and `/api/health` render/respond as intended;
3. one real test lead is submitted with owner-approved test data and confirmed in Convex;
4. mobile routes are inspected on the actual Hostinger URL;
5. rollback target is recorded.
