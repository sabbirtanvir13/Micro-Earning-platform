import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';
import User from '../models/User.js';
import { createNotification } from '../utils/notificationHelper.js';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const generateToken = (userId, email, role) => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Verify Firebase token and issue JWT
export const verifyFirebase = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'Firebase token required' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture, uid } = decodedToken;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        displayName: name,
        photoURL: picture,
        role: 'worker', // Default role, will be set on role selection
      });
      await user.save();
    } else {
      // Update user info if changed
      user.displayName = name || user.displayName;
      user.photoURL = picture || user.photoURL;
      await user.save();
    }

    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        coins: user.coins,
        initialCoinsReceived: user.initialCoinsReceived,
      },
    });
  } catch (error) {
    console.error('Firebase verification error:', error);
    res.status(401).json({ message: 'Invalid Firebase token', error: error.message });
  }
};

// Select role and grant initial coins
export const selectRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.user._id;

    if (!['worker', 'buyer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'worker' && user.role !== role) {
      return res.status(400).json({ message: 'Role already set' });
    }

    // Grant initial coins if not received
    if (!user.initialCoinsReceived) {
      if (role === 'worker') {
        user.coins += 10;
      } else if (role === 'buyer') {
        user.coins += 50;
      }
      user.initialCoinsReceived = true;
    }

    user.role = role;
    await user.save();

    // Generate new token with updated role
    const token = generateToken(user._id, user.email, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        coins: user.coins,
        initialCoinsReceived: user.initialCoinsReceived,
      },
    });
  } catch (error) {
    console.error('Role selection error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get current user profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        coins: user.coins,
        totalEarned: user.totalEarned,
        totalSpent: user.totalSpent,
        profileImage: user.profileImage,
        isActive: user.isActive,
        initialCoinsReceived: user.initialCoinsReceived,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
