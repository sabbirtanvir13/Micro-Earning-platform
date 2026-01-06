# Quick Start Instructions

## Step 1: Create Environment Files

### Backend (.env file in `server/` folder)

Create `server/.env` with minimum required variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/micro-earning-platform
JWT_SECRET=change_this_to_a_random_secret_key
CLIENT_URL=http://localhost:5173
```

**Note:** For now, you can use these minimal settings. Add Firebase, Stripe, and imgBB keys later when you set up those services.

### Frontend (.env file in `client/` folder)

Create `client/.env` with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** Add Firebase keys later when you set up Firebase authentication.

## Step 2: Start MongoDB

Make sure MongoDB is running:
- If installed locally: MongoDB should be running as a service
- Or use MongoDB Atlas (free cloud): Update MONGODB_URI in server/.env

## Step 3: Start the Servers

Open **TWO** terminal windows:

### Terminal 1 - Backend Server:
```powershell
cd "c:\projects\Micro-Earning Platform\server"
npm start
```

You should see: `Server running on port 5000`

### Terminal 2 - Frontend Server:
```powershell
cd "c:\projects\Micro-Earning Platform\client"
npm run dev
```

You should see: `Local: http://localhost:5173`

## Step 4: Open in Browser

Open your browser and go to: **http://localhost:5173**

## Troubleshooting

### Backend won't start:
- Check if MongoDB is running
- Verify `server/.env` file exists
- Check if port 5000 is already in use

### Frontend won't start:
- Check if backend is running first
- Verify `client/.env` file exists
- Check if port 5173 is already in use

### Can't connect to backend:
- Make sure backend is running on port 5000
- Check `VITE_API_BASE_URL` in `client/.env`

## Next Steps

Once the app is running:
1. Set up Firebase for authentication (see SETUP_GUIDE.md)
2. Set up Stripe for payments (optional for now)
3. Set up imgBB for image uploads (optional for now)
