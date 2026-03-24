# E-Com Pro (MERN)

Production-style e-commerce application with a React + Tailwind frontend and Node/Express + MongoDB backend.

## Project Structure

- `backend/` - Express API (MVC architecture)
- `frontend/` - React SPA with Redux Toolkit

## Features Implemented

- JWT auth (register/login/profile) with roles (`admin`, `customer`)
- Product CRUD (admin), list/detail/search/filter
- Image upload endpoint (multer)
- Cart (Redux + localStorage persistence)
- Checkout and order creation
- My orders (customer) and all orders + status updates (admin)
- Ratings/reviews for products
- Tailwind responsive UI, loader states, toast notifications
- Input validation and centralized error handling

## Setup

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
npm install
npm run dev
```

Default URLs:
- API: `http://localhost:5000`
- App: `http://localhost:5173`

## Security Notes

- Never commit `.env`
- Use a long random `JWT_SECRET`
- Keep CORS origin restricted to your frontend origin

## Bonus Notes

- Stripe dependency is added in backend for payment integration extension.
- Product reviews are included as a bonus feature.
