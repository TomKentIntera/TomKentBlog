# Blog App (Laravel 11 + Canvas + React)

Monorepo:

- `backend/`: Laravel 11 API + [Canvas](https://github.com/austintoddj/canvas) admin panel
- `frontend/`: React (Vite) public site consuming the API

## Local development (Docker Compose: Laravel + MySQL)

Prereqs: Docker + Docker Compose.

```bash
docker compose up --build
```

Then:

- **Canvas admin**: `http://localhost:8000/canvas/login`
  - default creds (from `canvas:install`): `email@example.com` / `password`
- **Posts API**: `http://localhost:8000/api/posts`
- **Frontend dev server**:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api/*` to `http://localhost:8000` (see `frontend/vite.config.ts`).

## Backend API

- `GET /api/posts?per_page=10`
- `GET /api/posts/{slug}`

Backed by Canvas models/tables (`canvas_posts`, etc.) and returns only **published** posts.

## CI deploy (frontend)

GitHub Actions workflow: `.github/workflows/deploy-frontend.yml`

Set these repository secrets to enable deployment:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_PORT` (optional; defaults to `22`)
- `DEPLOY_SSH_KEY` (private key)
- `DEPLOY_FRONTEND_PATH` (remote directory to sync `dist/` into)