🚀 UrbanAssist

A scalable MERN-based doorstep service booking platform with asynchronous provider assignment and SMS notifications.

🌟 Overview

UrbanAssist is a full-stack service booking platform that connects users with local service providers for services like:

Home Cook

Gardening

Pest Control

Electrician

Plumber

AC Repair

Cleaning

Salon at Home

And more...

The platform is designed with scalability in mind, using Redis-based job queues for handling high request loads efficiently.

🏗️ Tech Stack
🔹 Frontend

React.js

Tailwind CSS

Axios

React Router DOM

🔹 Backend

Node.js

Express.js

MongoDB Atlas

JWT Authentication

Redis (Upstash)

BullMQ (Job Queue)

Twilio SMS API

⚡ Key Features
✅ User Authentication

Secure Signup & Login

JWT-based authentication

Password hashing with bcrypt

✅ Smart Booking System

Service-based booking form

Pincode-based provider matching

Booking history for logged-in users

✅ Asynchronous Processing (Scalable Architecture)

Redis + BullMQ queue for handling bookings

Background worker for provider assignment

Non-blocking request handling

Ready for horizontal scaling

✅ SMS Notifications

Automatic SMS confirmation via Twilio

Sends provider details after assignment

Uses international format (+91XXXXXXXXXX)

🧠 Scalability Architecture

When a booking is submitted:

Booking is stored instantly in MongoDB

Booking ID is pushed to Redis queue

Worker processes provider assignment

SMS is sent asynchronously

User gets fast response (no blocking)

This ensures:

High concurrency handling

Reduced API response time

Better system stability under load
