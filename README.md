# Event Booking System (MERN) with Email Confirmation

This repository contains a minimal MERN (MongoDB, Express, React, Node) application that demonstrates an Event Booking system with email confirmation using Nodemailer.

Project layout:

- backend/: Express server, Mongoose models, Nodemailer email integration
- frontend/: React app (simple pages and routing)
- .env.example: sample environment variables

Quick start

1. Copy `.env.example` to `.env` in the `backend` folder and fill values.

2. Backend

```powershell
cd backend
npm install
# Start server
npm run dev
```

3. Frontend (you can use CRA or any bundler; code is in `frontend/src`)

If you prefer to use a quick React dev server, create-react-app and copy the `src` and `public` folders into the CRA project, then run `npm start`.

API Endpoints

- `GET /api/events` - list events
- `GET /api/events/:id` - event details
- `POST /api/bookings` - create booking
  - body: `{ name, email, eventId, tickets }`
- `POST /api/bookings/:id/cancel` - cancel booking

Notes

- Email sending uses SMTP credentials defined in environment variables.
- The backend returns consistent `{ success: boolean, data?, message? }` JSON responses.

Docker

- Build and run all services (MongoDB, backend, frontend):

```powershell
cd <project-root>
docker compose up --build
```

- The frontend will be available at `http://localhost:3000` (served by nginx), backend at `http://localhost:5000/api`.

- The compose file passes SMTP env variables through — you can set them in your shell or a `.env` file at the project root. The backend will start even if SMTP variables are not provided (it will log simulated emails instead of failing).
