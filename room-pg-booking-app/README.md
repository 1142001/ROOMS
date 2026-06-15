# Room/PG Booking App

A MERN stack Room/PG Booking web application with user login, room listings, booking requests, and an admin panel.

## Tech Stack

- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- CSS

## Folder Structure

```txt
room-pg-booking-app/
├── backend/
└── frontend/
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Backend runs on:

```txt
http://localhost:5001
```

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Environment Variables

Create `backend/.env` from `backend/.env.example` and add your MongoDB connection string.

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
```

## Features

- User registration and login
- View room and PG listings
- Book a room visit
- View user bookings
- Admin dashboard
- Admin add/delete rooms
- Admin approve/reject bookings

## Admin Login

Use the email and password you set in `backend/.env`, then run:

```bash
npm run seed
```
