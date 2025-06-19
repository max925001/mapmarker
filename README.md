Map Marker Storage API
A Node.js API for storing, managing, and searching map markers, built with Express, MongoDB, and JWT authentication. Features include marker creation, retrieval, and advanced search by categories, keywords, and proximity, with pagination and rate limiting.
Features

User Authentication: Register and log in to receive a JWT token (HTTP-only cookie).
Marker Management: Create, read, update, and delete map markers.
Advanced Search: Filter markers by categories, keyword, and geographic proximity.
Pagination: Paginated results for marker lists and searches.
Rate Limiting: 5 requests per minute per user/IP.
Docker Support: Containerized API and MongoDB with Docker Compose.
API Documentation: Swagger UI for interactive endpoint documentation.
Unit Testing: Jest tests for marker endpoints.
Postman Collection: Pre-built requests for testing.

Prerequisites

Node.js >= 18
Docker and Docker Compose
MongoDB >= 6 (local or via Docker)
Postman (for API testing)
Git

Project Structure
map-marker-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── user.controller.js
        └── mapmakee.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── auth.middleware.js
│   │   
│   ├── models/
│   │   └── maker.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── maker.routes.js
│   │   └── user.route.js
│   ├── utils/
│   │   ├── validate.js
│   │   
│   ├── docs/
│   │   └── openapi.yaml
│   └── app.js
│   └── server.js
├── .env
├── Dockerfile
├── package.json
├── README.md

Installation
1. Clone the Repository
git clone <repository-url>
cd backend

2. Configure Environment Variables

NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://mongo:27017/map-marker
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:5173

Replace your_jwt_secret with a secure, random string (e.g., 32 characters).
MONGODB_URI assumes Docker Compose usage; for local MongoDB, use mongodb://localhost:27017/map-marker.

3. Install Dependencies
npm install

Installs all dependencies, including express, mongoose, jsonwebtoken, express-rate-limit, swagger-ui-express, yamljs, jest, and supertest.
4. Run Locally (Without Docker)

Start MongoDB:
Install MongoDB locally or run via Docker:docker run -d -p 27017:27017 --name mongo mongo:6

Start API:npm start
dev:npm run dev


API runs at http://localhost:5001.
Verify: curl http://localhost:5001/ping returns pong.




Usage
API Endpoints

POST /api/v1/user/register: Register a user (sets JWT cookie).
POST /api/v1/user/login: Log in (sets JWT cookie).
POST /api/v1/user/logout: Logout 
POST /api/v1/markers: Create a marker (requires JWT).
GET /api/v1/markers: List markers with pagination (requires JWT).
GET /api/v1/markers/search: Search markers by categories, keyword, proximity (requires JWT).
GET /api/v1/markers/:id: Get a marker (requires JWT).
PUT /api/v1/markers/:id: Update a marker (requires JWT).
DELETE /api/v1/markers/:id: Delete a marker (requires JWT).

Testing with Postman

Import Collection:
Copy the Postman collection JSON:{
  "info": {
    "name": "Map Marker API",
    "_postman_id": "a8b7c6d5-e1f2-4a3b-9c8d-7e6f5a4b3c2d",
    "description": "Postman collection for testing Map Marker Storage API endpoints.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "User",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/user/register",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "user", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/user/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "user", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Markers",
      "item": [
        {
          "name": "Create Marker",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\"title\":\"Coffee Shop\",\"description\":\"Great espresso\",\"latitude\":40.7128,\"longitude\":-74.0060,\"categories\":[\"restaurant\",\"coffee\"]}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/markers",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "markers"]
            }
          }
        },
        {
          "name": "Search Markers by Categories",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/markers/search?categories=restaurant,coffee&page=1&limit=2",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "markers", "search"],
              "query": [
                { "key": "categories", "value": "restaurant,coffee" },
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "2" }
              ]
            }
          }
        },
        {
          "name": "Search Markers by Proximity",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/markers/search?lat=40.7128&lng=-74.0060&radius=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "markers", "search"],
              "query": [
                { "key": "lat", "value": "40.7128" },
                { "key": "lng", "value": "-74.0060" },
                { "key": "radius", "value": "10" }
              ]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:5001", "type": "string" }
  ]
}


In Postman: File > Import > Paste JSON > Import.


Set Environment:
Create an environment with baseUrl=http://localhost:5001.


License
MIT License
