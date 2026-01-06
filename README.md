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

## Environment Variables

See `.env.example` files in both client and server directories for required environment variables.

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
