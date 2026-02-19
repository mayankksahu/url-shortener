
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)

URL Shortener API

A production-ready URL Shortener built with Node.js, Express, and MongoDB, designed with clean architecture principles and scalable backend structure.

📌 Overview

This project provides a RESTful API that:

Generates short URLs for long links

Redirects users using short IDs

Tracks visit history with timestamps

Maintains structured backend architecture (MVC pattern)

The application follows separation of concerns using Controllers, Routes, Models, and Database Connection layers.

🏗️ Architecture
URL_SHORTENER
│
├── controllers      → Business logic
├── models           → Mongoose schema definitions
├── routes           → API route definitions
├── connect.js       → Database connection logic
├── index.js         → Application entry point
Architectural Principles Used:

MVC-inspired structure

Clean routing layer

Centralized database configuration

Middleware-driven request parsing

Proper error handling

RESTful design conventions

⚙️ Tech Stack

Node.js

Express.js

MongoDB

Mongoose

ShortID (ID generation)

Git for version control

🔗 API Endpoints
1️⃣ Create Short URL

POST /url

Request Body (JSON)
{
  "url": "https://example.com"
}
Response
{
  "id": "generatedShortId"
}
2️⃣ Redirect to Original URL

GET /:shortId

Redirects the user to the original URL and updates visit history.

If the short ID does not exist:

{
  "error": "Short URL not found"
}
📊 Data Model
{
  shortId: String,
  redirectUrl: String,
  visitHistory: [
    {
      timestamp: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
Features:

Unique short IDs

Automatic visit tracking

Timestamp-based analytics readiness

Extensible schema design

🧠 Design Decisions

express.json() middleware applied before routes (proper middleware ordering)

Case-sensitive route handling

Defensive null checks for database queries

Automatic protocol normalization (https:// prefix handling)

Clean separation between routing and business logic

🛠️ Installation & Setup
git clone <repo-url>
cd URL_SHORTENER
npm install

Start MongoDB locally, then:

npm start

Server runs on:

http://localhost:8001
🧪 Testing

You can test using:

Postman

Thunder Client

curl

🔮 Future Improvements

Click analytics endpoint

Custom short URLs

Authentication layer

Rate limiting

Deployment (Render / Railway)

Docker containerization

Caching with Redis

Production logging (Winston)

📈 What This Project Demonstrates

Backend architecture understanding

Database schema modeling

REST API development

Middleware flow control

Error handling strategy

Git workflow knowledge

👨‍💻 Author

Developed as part of backend engineering practice focusing on clean code and scalable structure.

