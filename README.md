# 🚀 UrbanAssist — MERN Service Booking Platform
UrbanAssist is a scalable MERN-based doorstep service booking platform designed to connect users with trusted local service providers.
It uses Redis + BullMQ for asynchronous provider assignment and integrates Twilio SMS notifications for real-time booking updates.

# Overview
UrbanAssist allows users to book essential home services such as:
🧑‍🍳 Home Cook
🌿 Gardening
🐜 Pest Control
⚡ Electrician
🚰 Plumber
❄️ AC Repair
🧹 Cleaning
💇 Salon at Home
➕ And more...
The system is designed for high scalability and performance, ensuring smooth booking experiences even under heavy load.

# Features
✅ Secure User Authentication — JWT-based login & signup with bcrypt password hashing.
✅ Service-Based Booking System — Dynamic service selection with pincode-based provider matching.
✅ Booking History — Users can view all past bookings.
✅ Asynchronous Provider Assignment — Redis + BullMQ queue ensures non-blocking booking flow.
✅ Background Worker Architecture — Provider matching handled separately from API request lifecycle.
✅ SMS Notifications — Automatic booking confirmation and provider details via Twilio SMS API.
✅ Scalable & Production-Ready Design — Built to support horizontal scaling.

# Tech Stack

## Frontend
| Technology           | Purpose             |
| -------------------- | ------------------- |
| **React JS**         | Component-based UI  |
| **Tailwind CSS**     | Responsive styling  |
| **Axios**            | API communication   |
| **React Router DOM** | Client-side routing |

## Backend
| Technology          | Purpose              |
| ------------------- | -------------------- |
| **Node.js**         | Server runtime       |
| **Express.js**      | REST API framework   |
| **MongoDB Atlas**   | Cloud database       |
| **JWT**             | Authentication       |
| **bcrypt**          | Password hashing     |
| **Redis (Upstash)** | In-memory data store |
| **BullMQ**          | Background job queue |
| **Twilio SMS API**  | SMS notifications    |

# Scalable Architecture

🏗️ Scalable Architecture

UrbanAssist follows an event-driven asynchronous architecture.

🔄 Booking Flow

1️⃣ User submits booking request
2️⃣ Booking is stored instantly in MongoDB
3️⃣ Booking ID is pushed into Redis queue
4️⃣ Background worker assigns provider
5️⃣ Twilio sends SMS confirmation
6️⃣ API responds immediately (non-blocking)

# Folder Structure

UrbanAssist/
├── client/                 # React Frontend
│   ├── components/
│   ├── pages/
│   ├── services/           # Axios API calls
│   ├── App.jsx
│   └── main.jsx
│
├── server/                 # Node Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   ├── redis.js        # Redis connection
│   ├── queues/
│   │   ├── bookingQueue.js # BullMQ queue setup
│   ├── workers/
│   │   ├── bookingWorker.js # Provider assignment logic
│   ├── server.js
│
├── package.json
└── README.md



# 🧠 Why Redis + BullMQ?

UrbanAssist uses Redis + BullMQ to implement asynchronous job processing.

# 🔥 Advantages:

🏎️ Faster API responses (no blocking operations)
⚙️ Background job execution
📊 Better load management
🔄 Retry mechanisms for failed jobs
📈 Ready for microservices transition

This architecture makes UrbanAssist production-grade and scalable, unlike traditional synchronous booking systems.
