# Event Booking System (MERN) with Email Confirmation

This repository contains a full-stack **MERN (MongoDB, Express, React, Node.js)** application that implements an **Event Booking System** with email notifications for booking confirmations and cancellations. The project is built with a real-world production mindset, focusing on cloud deployment, RESTful APIs, and reliable email delivery.

---

## Project Structure

Event-Bookings/
├── backend/ # Express server, MongoDB models, REST APIs, email service
├── frontend-app/ # React frontend application
└── .env.example # Sample environment variables for backend setup


---

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Email Service:** SendGrid HTTP Email API  
- **Frontend Hosting:** Vercel  
- **Backend Hosting:** Render  

---

## Features

- Browse and view events
- View detailed event information
- Book tickets for events
- Automatic seat availability management
- Cancel bookings with seat restoration
- Email notifications for booking confirmation and cancellation

---

## Environment Variables

Create a `.env` file inside the `backend` directory using the following format:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=event_booking
PORT=5000

SENDGRID_API_KEY=your_sendgrid_api_key
MAIL_FROM=your_verified_sender_email


Backend
cd backend
npm install
npm run dev
Backend will run at:

http://localhost:5000/api

Frontend
cd frontend-app
npm install
npm start


Frontend will run at:

http://localhost:3000

API Endpoints
Events

GET /api/events – Fetch all events

GET /api/events/:id – Fetch event details

Bookings

POST /api/bookings – Create a booking
Request body:

{
  "name": "User Name",
  "email": "user@example.com",
  "eventId": "event_id",
  "tickets": 2
}


POST /api/bookings/:id/cancel – Cancel a booking

All API responses follow a consistent format:

{
  "success": true,
  "data": {},
  "message": "Optional message"
}

Email Notification System

Emails are sent using SendGrid HTTP API

SMTP is intentionally avoided to ensure reliability on cloud platforms

Email sending is non-blocking and does not affect booking flow

Delivery and status tracking are handled by SendGrid

Deployment
Frontend (Vercel)

React app is built using npm run build

Deployed to Vercel with automatic HTTPS and global CDN

Backend (Render)

Node.js Express API hosted on Render

Environment variables managed securely

Connected to MongoDB Atlas and SendGrid
This project demonstrates a production-style MERN application with cloud deployment, RESTful APIs, database integration, and reliable email notifications using industry-standard tools.
