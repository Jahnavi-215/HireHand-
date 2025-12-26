Integration test instructions

This folder is a lightweight test scaffold to run an end-to-end integration test for the register -> login -> post job -> list job flow using SQLite + Prisma + Supertest.

Prerequisites
- Node.js (16+ recommended)

Install deps

```powershell
cd c:\Users\Jahnavi\OneDrive\Desktop\fsd_external\hirehand-backend
npm install
```

Run the integration test

```powershell
# creates a temporary sqlite file (test.db) in the backend folder
$env:DATABASE_URL = "file:./test.db"
$env:NODE_ENV = "test"
npx prisma generate
npx prisma db push --accept-data-loss
npm test
```

Notes
- The test uses a SQLite file named `test.db` in the backend folder and removes it after the run.
- If you prefer an in-memory DB, adjust DATABASE_URL accordingly, but ensure Prisma push works for in-memory mode in your environment.
