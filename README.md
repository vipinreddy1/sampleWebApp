# Sample Web Application

This repository is a sample web application with a backend API and a frontend user interface. Below are the instructions for setting up and running the project.

## Project Setup

### Clone the Repository:
`git clone https://github.com/vipinreddy1/sampleWebApp`

### Install Dependencies:
1. **For Backend**:
`cd backend && npm install`
2. **For Frontend**:
`cd frontend && npm install`

### Set Up the Database:
- The application uses **SQLite**.
- A pre-configured database file, `sampledata.db`, is included.
- If you need to seed the data again:
  - Navigate to: [http://localhost:10000/createdata](http://localhost:10000/createdata).
- If there are any issues, delete the `sampledata.db` file and reseed the data using the above endpoint.

## Run the Application

### Backend:
`cd backend`  
`node index.js`

### Frontend:
`cd frontend`  
`npm start`

### Access the Application:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:10000](http://localhost:10000)

## Authentication Details
- **Username**: `mike`
- **Password**: `longpassword`

> **Note**: Passwords are stored in plaintext in the database for simplicity. This is **insecure** and should be avoided in production.

## Features

### Authentication:
- Login functionality is implemented.
- A **JWT** is provided upon successful login.
- **Authorization**: Without a valid JWT, users will be redirected to the login page with an alert.

### Product Search:
- Search functionality for products is available via the `/products` API.

### APIs:
1. **`/products`**: 
   - Features authentication and search functionalities.
2. **`/products/:id`**: 
   - Fetches details for a single product by its unique `id`. Authentication is included
3. **`/login`**: 
   - Allows user login and returns a JWT for authenticated access.

## Security Notice
- Passwords are stored in plaintext in the database. I have not added hashing for the sake of simplicity, if this was a production database it would be a crucial issue.


