# Setup Guide - Micro Task & Earning Platform

## Quick Start

### 1. Backend Server Setup

Navigate to the server directory and create a `.env` file:

```bash
cd server
```

Create `server/.env` with the following:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/micro-earning-platform
JWT_SECRET=your_super_secret_jwt_key_change_this
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
IMGBB_API_KEY=your_imgbb_api_key
CLIENT_URL=http://localhost:5173
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2. Frontend Setup

Navigate to the client directory and create a `.env` file:

```bash
cd client
```

Create `client/.env` with the following:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### 3. Start the Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## Important Notes

1. **MongoDB:** Make sure MongoDB is running on your system or use MongoDB Atlas (cloud)
2. **Firebase:** Set up a Firebase project and enable Email/Password and Google authentication
3. **Stripe:** Create a Stripe account and get your test API keys
4. **imgBB:** Get a free API key from https://api.imgbb.com/

## Development Mode

For auto-reload during development:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

## Troubleshooting

- If backend fails: Check MongoDB connection and environment variables
- If frontend fails: Check if backend is running and API_BASE_URL is correct
- Port conflicts: Change PORT in server/.env or Vite port in client/vite.config.js
