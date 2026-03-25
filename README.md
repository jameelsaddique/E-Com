# E-Com Pro (MERN)

Production-style e-commerce application with a React + Tailwind frontend and Node/Express + MongoDB backend.

## Project Structure

- `backend/` - Express API (MVC architecture)
- `frontend/` - React SPA with Redux Toolkit
- `DEPLOYMENT.md` - full production deployment runbook (Vercel + Render/Railway + Atlas)

## Features Implemented

- JWT auth (register/login/logout/profile) with roles (`admin`, `customer`)
- Product CRUD (admin), list/detail/search/filter, and reviews
- Image upload endpoint (multer)
- Cart (Redux + localStorage persistence)
- Checkout and order creation
- My orders (customer) and all orders + status updates (admin)
- Tailwind responsive UI, loader states, toast notifications
- Input validation and centralized error handling

## Production Readiness Enhancements

- Compression + Helmet + Rate Limiting on backend
- CORS allowlist driven by environment variables
- HTTP-only JWT cookie support for safer auth in production
- Lazy loading + code splitting on frontend routes
- Vercel SPA rewrite configuration for refresh-safe routing

## Setup (Local)

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Default URLs:
- API: `http://localhost:5000`
- App: `http://localhost:5173`

## Deployment

Follow `DEPLOYMENT.md` for step-by-step production deployment to Vercel + Render/Railway.
