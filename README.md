# ZET App

Monorepo for the ZET (제트) application.

## Structure

```
zet-app/
├── frontend/          # Expo (React Native) app
├── backend/           # LiteStar (Python) API server
├── scripts/           # Shared scripts (codegen, etc.)
└── docker-compose.yml # PostgreSQL for local dev
```

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.12+
- Docker & Docker Compose

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env

# Run migrations
alembic upgrade head

# Start dev server
litestar --app zet.app:create_app run --reload
```

API docs available at `http://localhost:8000/schema/swagger`

### 3. Frontend

```bash
cd frontend
yarn install
cp .env.example .env

# Start Expo dev server
yarn start
```

### 4. Type Generation (OpenAPI → TypeScript)

With the backend running:

```bash
./scripts/generate-types.sh
```

Generates `frontend/types/generated/api.ts` from the backend's OpenAPI schema.

## Type Conventions (Frontend)

- `I` prefix for object-shaped types (interfaces and type aliases): `IUser`, `IAuthState`
- `T` prefix for union/literal types: `TSocialProvider`, `TVariant`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Expo 54, React 19, TypeScript, Zustand, React Query, Zod |
| Backend | Litestar, SQLAlchemy 2.0 (async), Pydantic v2, PostgreSQL |
| Auth | Social login (Kakao/Naver/Apple) → JWT |
| Testing | pytest + httpx (backend), MSW (frontend) |
