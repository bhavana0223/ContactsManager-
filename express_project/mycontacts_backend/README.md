# Node.js Project
CONTACTS MANAGER Project 

A basic Node.js application using Express and MongoDB (with Mongoose), demonstrating CRUD operations.
So that users can  login  and manage their contacts such as getting all contacts ,adding,deleteing,updating etc

## Features

- Node.js with Express server
- MongoDB for data storage (via Mongoose)
- CRUD API for managing resources
- Environment variable management with .env
- Modular folder structure

### Prerequisites
- Node.js installed
- MongoDB installed or access to MongoDB Atlas

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhavana0223/ContactsManager.git
   cd ContactsManager

2. Install dependencies:
3. {
       "bcrypt": "^5.1.1",
        "dotenv": "^16.5.0",
        "express": "^5.1.0",
        "express-async-handler": "^1.2.0",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.14.0"
    },

    npm install


4. Set up environment variables: Create a .env file in the root and add:

PORT=5001
MONGODB_URI=your_mongodb_connection_string
SERCRET_ACCESS_TOKEN=jwt_secret_key


4. Run the server:

npm start--node server.js
npm run dev -- nodemon server.js



API Endpoints:

## API Endpoints
FOR USERS
| Method | Endpoint          | Description                     | Request Body | Response Format |
|--------|-------------------|---------------------------------|--------------|-----------------|
| POST   |/api/user/register | Creates a user                   | JSON Object  | JSON object     |
| POST   |/api/user/login    | Generates a Access Token         | JSON Object  | JSON object     |
| GET    |/api/user/current  | Returns Current User             | None         | JSON object     |




FOR CONTACTS
## API Endpoints

| Method | Endpoint          | Description                     | Request Body | Response Format |
|--------|-------------------|---------------------------------|--------------|-----------------|
| GET    | /api/contacts     | Returns all the contacts         | None         | JSON array      |
| POST   | /api/contacts     | Creates a new contact            | JSON object  | JSON object     |
| GET    | /api/contacts/:id | Returns a specific contact by ID | None         | JSON object     |
| PUT    | /api/contacts/:id | Updates a contact by ID          | JSON object  | JSON object     |
| DELETE | /api/contacts/:id | Deletes an item by ID            | None         | JSON object     |



Technologies Used

Node.js
Express.js
MongoDB
Mongoose
dotenv

---

