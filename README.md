# Micro Task & Earning Platform

A full-stack MERN application for micro-task marketplace with role-based dashboards for Workers, Buyers, and Admins.

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Firebase Authentication
- Axios
- Swiper
- Stripe

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Firebase Admin SDK
- Stripe API

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

## Setup Instructions

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your Firebase and API keys (see `.env.example`)

4. Run development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your MongoDB URI and other keys (see `.env.example`)

4. Run server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

## 🌐 Environment Configuration

To run this platform successfully, you must configure environment variables for both the **Client** and **Server**. 

### 🖥️ Client Configuration (`/client/.env`)
Create a `.env` file in the `client` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_IMGBB_API_KEY=your_imgbb_key
```

### ⚙️ Server Configuration (`/server/.env`)
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
IMGBB_API_KEY=your_imgbb_key
```

> **Note**: For Firebase Private Key, ensure it is wrapped in quotes and uses literal `\n` for newlines if stored in a `.env` file.

## Features

- Role-based authentication (Worker, Buyer, Admin)
- Task creation and management
- Submission system with approval workflow
- Payment processing with Stripe
- Withdrawal system
- Real-time notifications
- Image upload with imgBB

## License

ISC
