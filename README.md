# Cleaning Service Booking App — Backend

Express + MongoDB + JWT auth. Minimal CRUD for bookings plus user auth.
## Quick Start

```bash
npm i
cp .env.example .env
# edit .env with your Mongo URI and JWT secret
npm run dev
```

### Endpoints

- `GET /` health
- `POST /api/auth/register` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }`
- `GET /api/auth/me` (Bearer token)

**Bookings (auth required):**
- `POST /api/bookings` `{ address, serviceType, date, timeSlot, notes?, price? }`
- `GET /api/bookings/mine`
- `GET /api/bookings` _(admin only)_
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id`
- `DELETE /api/bookings/:id`

### Roles
Default user role is `user`. Set someone to `admin` directly in DB if needed.


## Seed an admin user
```bash
# after configuring .env
npm run seed
# defaults to admin@cleaning.local / Admin@12345 (overridable in .env)
```

## Run MongoDB with Docker (optional)
```bash
docker compose up -d
# then set MONGO_URI=mongodb://root:example@127.0.0.1:27017/cleaning_booking_dev?authSource=admin
```
