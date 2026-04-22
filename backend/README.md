# Room / PG Booking Web Application + Admin Panel (Internship Project)

This is a complete beginner-friendly full-stack project with:
- **Backend API** (Node.js + Express + SQLite)
- **Student/User Frontend** (React + Vite)
- **Admin Panel** (React + Vite)

## Features

### User side
- Register and login
- View room/PG listings
- Create booking requests
- Check own booking statuses

### Admin side
- Secure admin login
- Add room/PG listings
- View all bookings
- Approve/reject bookings

### Default Admin Login
- **Email:** `admin@rooms.com`
- **Password:** `admin123`

---

## 1) Prerequisites

Install:
- Node.js 20+ (recommended)
- npm 10+

Check versions:

```bash
node -v
npm -v
```

---

## 2) Project Structure

```text
ROOMS/
  backend/
  frontend/
  admin/
```

---

## 3) Start-to-End Commands (copy and run in order)

### A. Backend setup and run

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at: **http://localhost:5000**

---

### B. User frontend setup and run (open a new terminal)

```bash
cd frontend
npm install
npm run dev
```

User app runs at: **http://localhost:5173**

---

### C. Admin panel setup and run (open a new terminal)

```bash
cd admin
npm install
npm run dev
```

Admin panel runs at: **http://localhost:5174**

---

## 4) How to Use

1. Start backend, frontend, and admin servers.
2. Open `http://localhost:5173` and register a new student account.
3. Login and book available rooms.
4. Open `http://localhost:5174` and login with admin credentials.
5. Approve/reject booking requests from admin dashboard.

---

## 5) API Quick Reference

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Rooms
- `GET /api/rooms`
- `POST /api/rooms` (admin)
- `PUT /api/rooms/:id` (admin)
- `DELETE /api/rooms/:id` (admin)

### Bookings
- `POST /api/bookings` (user)
- `GET /api/bookings/me` (user)
- `GET /api/admin/bookings` (admin)
- `PATCH /api/admin/bookings/:id` (admin)

---

## 6) Build for Production

```bash
cd frontend && npm run build
cd ../admin && npm run build
cd ../backend && npm start
```

---

## 7) Notes for Internship Submission

- Keep this as a base project and customize UI, validations, and deployment.
- You can deploy backend (Render/Railway) and frontends (Vercel/Netlify).
- Add features like image uploads, payment integration, and filters for advanced version.

