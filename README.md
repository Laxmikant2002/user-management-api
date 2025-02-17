# User Management API

## Overview
This project is a simple User Management API built using Node.js, Express, and MongoDB. It provides basic CRUD operations for managing users along with JWT-based authentication.

## Features
- User Authentication (Signup and Login)
- JWT Token Generation
- Protected Routes for User Management
- Role-Based Access Control (Admin only for user deletion)
- Input Validation
- Error Handling

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Jest (for testing)

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:Laxmikant2002/user-management-api.git
   ```

2. Navigate to the project directory:
   ```
   cd user-management-api
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

## Running the Application

To start the server, run:
```
npm start
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Authentication
- **Signup**: `POST /api/auth/signup`
  - Request Body: `{ name, email, password }`
  
- **Login**: `POST /api/auth/login`
  - Request Body: `{ email, password }`
  - Response: Returns a JWT token on successful authentication.

### User Management (Protected Routes)
- **Create User**: `POST /api/users`
  - Request Body: `{ name, email, role }`
  
- **Get All Users**: `GET /api/users`
  
- **Get Single User**: `GET /api/users/:id`
  
- **Update User**: `PUT /api/users/:id`
  
- **Delete User**: `DELETE /api/users/:id` (Admin only)

## Testing

To run the tests, use:
```
npm test
```

## Folder Structure
```
user-management-api
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── app.js
├── config
├── tests
├── package.json
├── .env
└── README.md
```


## License
This project is licensed under the MIT License.
