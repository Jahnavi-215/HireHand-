# Getting Started with Create React App

## HireHand (Frontend)

Modern React frontend for HireHand: browse trusted local workers by category, book in minutes, and rate your experience.

### Tech
- React (CRA), React-Bootstrap, custom Blue/Teal theme
- State: local component state with view-based navigation
- Build: `react-scripts build`

### Features
- Hero + navbar with themed CTAs
- Category explore view (filters workers per category)
- Booking flow with worker cards and booking form handoff
- Auth forms with autocomplete hardened
- “Rate Your Worker” feedback card
- Responsive, gradient styling throughout

### Getting Started
```bash
npm install
npm start
```
Runs on http://localhost:3000

### Production Build
```bash
npm run build
```
Outputs to `build/` (already ignored).

### Deploying to Vercel (frontend)
1) Push this repo to GitHub (main branch).
2) On Vercel: New Project → import this repo.
3) Build command: `npm run build`
4) Output directory: `build`
5) Add env vars if needed (e.g., `REACT_APP_API_BASE`).

### Backend
Backend lives separately in `hirehand-backend` (Express/Prisma). Deploy it on Render/Railway, then set the frontend API base URL env var.
