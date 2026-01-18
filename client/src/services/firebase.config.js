import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abc123'
};

// Check if Firebase is properly configured
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_firebase_api_key' &&
  import.meta.env.VITE_FIREBASE_API_KEY !== '';

let app;
let auth;
let googleProvider;
let facebookProvider;
let githubProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  githubProvider = new GithubAuthProvider();
} catch (error) {
  console.warn('Firebase initialization error (this is OK if you haven\'t set up Firebase yet):', error);
  // Create mock auth objects to prevent crashes
  auth = null;
  googleProvider = null;
  facebookProvider = null;
  githubProvider = null;
}

export { auth, googleProvider, facebookProvider, githubProvider, isFirebaseConfigured };
export default app;
