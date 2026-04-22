# Exp8 - User Validation & JWT Authentication API

A Node.js/Express server that validates user credentials (email and Indian mobile numbers) and generates JWT tokens for authentication.

## Features

- Email format validation
- Indian mobile number validation (+91 format, 10 digits, starts with 6-9)
- JWT token generation
- Protected dashboard route with token verification

## Setup

### Prerequisites
- Node.js (v14+)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayushdobey/exp8.git
cd exp8
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### 1. Validate User & Get Token
**POST** `/validate`

**Request Body:**
```json
{
  "email": "abc@gmail.com",
  "mobile": "+919876543210"
}
```

**Valid Test Credentials:**
- `abc@gmail.com` + `+919876543210`
- `xyz@gmail.com` + `+919123456789`

**Success Response (200):**
```json
{
  "message": "Valid User",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Invalid email format
- `400`: Mobile must start with +91
- `400`: Invalid Indian mobile number
- `401`: User not found

### 2. Access Protected Dashboard
**GET** `/dashboard`

**Headers:**
```
Authorization: <jwt_token>
```

**Success Response (200):**
```
Welcome to My Dashboard
```

**Error Responses:**
- `403`: Token required
- `401`: Invalid token

## Testing with Postman

### Step 1: Get Token
1. Create a **POST** request to `http://localhost:3000/validate`
2. Set **Headers**: `Content-Type: application/json`
3. Set **Body** (JSON):
```json
{
  "email": "abc@gmail.com",
  "mobile": "+919876543210"
}
```
4. Send and copy the `token` from response

### Step 2: Access Dashboard
1. Create a **GET** request to `http://localhost:3000/dashboard`
2. Set **Headers**: 
   - `Authorization: <paste_your_token_here>`
3. Send request

## Validation Rules

### Email
- Must be in standard email format (user@domain.ext)

### Mobile Number
- Must start with `+91`
- Must have exactly 10 digits after `+91`
- First digit must be 6-9 (Indian standard)
- Complete format: `+91XXXXXXXXXX`

## Technologies Used

- **Express.js** - Web framework
- **jsonwebtoken** - JWT token generation & verification
- **CORS** - Cross-Origin Resource Sharing
- **Node.js** - Runtime environment

## JWT Details

- **Secret Key**: `mysecretkey`
- **Token Expiry**: 1 hour
- **Payload**: User email

## Project Structure

```
exp8/
├── server.js          # Main server file
├── package.json       # Dependencies
├── package-lock.json  # Lock file
└── node_modules/      # Dependencies folder
```

## Author
Ayush Dobey

## Repository
[GitHub - exp8](https://github.com/ayushdobey/exp8)
