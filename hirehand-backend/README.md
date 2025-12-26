# HireHand Backend (Test Scaffold)

This is a minimal Express + Prisma backend used for integration testing and local dev.

## Getting Started

### Prerequisites
- Node.js 18+

### Install and initialize
```powershell
cd c:\Users\Jahnavi\OneDrive\Desktop\fsd_external\hirehand-backend
npm install

# Initialize Prisma (SQLite file)
$env:DATABASE_URL = "file:./test.db"
npx prisma generate
npx prisma db push --accept-data-loss
```

### Run locally
```powershell
# Optional: set a predictable origin for CORS
$env:FRONTEND_ORIGIN = "http://localhost:3000"
# Optional: set JWT secret
$env:JWT_SECRET = "dev-secret"
node src/index.js
# Server runs on http://localhost:4000
```

## API Docs (Swagger)
Open http://localhost:4000/docs to view Swagger UI.

### Auth
- `POST /auth/register` — body: `{ name?, email, password }` — 201 with `{ user }`
- `POST /auth/login` — body: `{ email, password }` — 200 with `{ accessToken, user }` and sets `refreshToken` (httpOnly cookie)
- `POST /auth/refresh` — uses httpOnly cookie; returns `{ accessToken, user }` and rotates cookie
- `POST /auth/logout` — clears cookie, returns `{ ok: true }`

### Jobs
- `GET /jobs` — returns `{ jobs: Job[] }`
- `POST /jobs` — requires `Authorization: Bearer <accessToken>` — body: `{ title, description, location?, budget? }` — 201 with `{ job }`

## Environment variables
- `DATABASE_URL` — Prisma database URL (SQLite for local: `file:./test.db`)
- `JWT_SECRET` — JWT signing secret (default `test-secret`)
- `FRONTEND_ORIGIN` — CORS origin (set to your frontend URL in production)
- `PORT` — server port (default `4000`)

## Testing
```powershell
# Run integration tests with coverage & lint
cd c:\Users\Jahnavi\OneDrive\Desktop\fsd_external\hirehand-backend
$env:DATABASE_URL = "file:./test.db"
npx prisma generate
npx prisma db push --accept-data-loss
npm run test:coverage
npm run lint
```

Coverage artifacts are uploaded in CI under `backend-coverage`.
