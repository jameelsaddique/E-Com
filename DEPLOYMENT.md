# Production Deployment Guide (Vercel + Render/Railway + MongoDB Atlas)

## 1) Pre-deployment checklist

1. Push repository to GitHub.
2. Confirm local production build works:
   - `cd frontend && npm install && npm run build`
   - `cd backend && npm install && npm start`
3. Create production environment secrets first (Atlas URI, JWT secret).

---

## 2) MongoDB Atlas setup

1. Create Atlas cluster and database user.
2. In **Network Access**:
   - During first deployment, allow `0.0.0.0/0`.
   - After deployment, restrict to provider egress IPs where possible.
3. Copy connection string and set backend `MONGO_URI`.
4. Enable indexes by running app once; Mongoose will create declared indexes.

---

## 3) Backend deployment (Render or Railway)

### Option A: Render

1. New Web Service -> select repository.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Set env vars:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=...`
   - `JWT_SECRET=...`
   - `JWT_EXPIRES_IN=7d`
   - `CLIENT_URLS=https://<your-vercel-domain>`
   - `COOKIE_SECURE=true`
   - `COOKIE_SAME_SITE=None`
6. Deploy and verify `GET /api/health`.

### Option B: Railway

1. New Project -> Deploy from GitHub.
2. Service root: `backend`
3. Start command: `npm start`
4. Add same environment variables as Render.
5. Deploy and verify health endpoint.

---

## 4) Frontend deployment (Vercel)

1. Import repository in Vercel.
2. Root directory: `frontend`
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Set env var:
   - `VITE_API_URL=https://<your-backend-domain>/api`
7. Deploy.
8. `vercel.json` rewrite ensures SPA routes like `/orders` do not 404 on refresh.

---

## 5) Auth in production

- Backend now sends JWT in an HTTP-only cookie and still returns token for Bearer fallback.
- Frontend client uses `withCredentials: true`, so cross-site cookies work when:
  - backend CORS allows Vercel domain,
  - `COOKIE_SECURE=true`,
  - `COOKIE_SAME_SITE=None`.

---

## 6) Performance + security in this repo

- Compression enabled (`compression`).
- Security headers (`helmet`).
- Request rate limiting (`express-rate-limit`).
- Query optimization with `lean()`, pagination limits, and text indexes.
- Code splitting + lazy-loaded routes in frontend.
- Vite production chunk splitting configured.

---

## 7) Common deployment issues & fixes

### Issue: CORS blocked requests
- Fix: ensure `CLIENT_URLS` includes exact Vercel URL(s), comma-separated.

### Issue: Login works locally but not in production
- Fix: set `COOKIE_SAME_SITE=None` and `COOKIE_SECURE=true`.

### Issue: Vercel 404 on direct route refresh
- Fix: keep `frontend/vercel.json` rewrite to `index.html`.

### Issue: Atlas timeout or auth errors
- Fix: check DB user credentials and network allow list.

### Issue: Mixed content errors
- Fix: both frontend and backend must use HTTPS in production.

---

## 8) Recommended post-deploy hardening

1. Rotate JWT secret every 60-90 days.
2. Add structured log shipping (Datadog/ELK).
3. Add monitoring alerts on p95 latency + 5xx spikes.
4. Move uploads to object storage (S3/Cloudinary) for scale.
