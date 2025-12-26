# HireHand

A modern full-stack platform connecting trusted local workers with customers. Browse service categories, book instantly, and rate your experience.

## Project Structure

```
hirehand/
├── frontend/           # React frontend (Vercel-ready)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/   # API client
│   │   └── App.js      # Main app
│   ├── package.json
│   └── README.md
│
├── backend/            # Node/Express API (Render/Railway-ready)
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js      # Express server
│   ├── prisma/         # Database schema
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── .gitignore
└── README.md           # This file
```

## Tech Stack

**Frontend:**
- React 18 (Create React App)
- React-Bootstrap, custom Blue/Teal theme
- State management: local component state
- Deployment: Vercel

**Backend:**
- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT authentication (httpOnly refresh tokens)
- CORS-enabled
- Deployment: Render or Railway

## Getting Started (Local)

### Prerequisites
- Node.js 16+
- PostgreSQL (for backend)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file:
```
DATABASE_URL=postgresql://user:password@localhost:5432/hirehand
JWT_SECRET=your_secret_key
FRONTEND_ORIGIN=http://localhost:3000
```
Run migrations:
```bash
npx prisma migrate dev
```
Start backend:
```bash
npm run dev
```
Runs on http://localhost:4000

## Features

✅ **Browse Workers** – Filter by service category (Cleaning, Repairs, Painting, etc.)
✅ **Book Instantly** – Select a worker and book with pre-filled form
✅ **Rate & Review** – 5-star feedback system after job completion
✅ **User Authentication** – Register, login with JWT
✅ **Responsive Design** – Works on desktop and mobile

## Deployment

### Frontend (Vercel)
1. Push code to GitHub.
2. Import repo on Vercel.
3. Build: `npm run build`
4. Output directory: `build`
5. Add env vars (if backend is deployed): `REACT_APP_API_BASE`

### Backend (Render or Railway)
1. Create PostgreSQL database.
2. Deploy repo to Render/Railway.
3. Set env vars: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_ORIGIN`.
4. Run migrations: `npx prisma migrate deploy`
5. Get backend URL (e.g., `https://api.hirehand.com`).

### Connect Frontend to Deployed Backend
In Vercel project settings, add:
```
REACT_APP_API_BASE=https://your-backend-url
```
Redeploy frontend.

## Project Status

✅ Frontend: React app with all features (booking, rating, explore by category)
✅ Backend: Express API with auth, worker booking, and rating endpoints
✅ GitHub: Code pushed to [HireHand](https://github.com/Jahnavi-215/HireHand-.git)
⏳ Deployment: Ready for Vercel (frontend) + Render/Railway (backend)

## Contributing

Improvements welcome! Fork, branch, commit, and push a PR.

## License

MIT
