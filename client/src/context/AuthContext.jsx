import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase.config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      // If Firebase is not configured, just check for existing token
      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        // Try to verify token with backend
        api.get('/auth/me')
          .then((response) => {
            setUser(response.data.user);
            setToken(existingToken);
          })
          .catch(() => {
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const response = await api.post('/auth/verify-firebase', {
            idToken,
          });
          const { token: jwtToken, user: userData } = response.data;
          setToken(jwtToken);
          localStorage.setItem('token', jwtToken);
          setUser(userData);
        } catch (error) {
          console.error('Error verifying Firebase token:', error);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    if (!auth || !isFirebaseConfigured) {
      return { success: false, error: 'Firebase is not configured. Please set up Firebase authentication.' };
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const response = await api.post('/auth/verify-firebase', { idToken });
      const { token: jwtToken, user: userData } = response.data;
      setToken(jwtToken);
      localStorage.setItem('token', jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, displayName) => {
    if (!auth || !isFirebaseConfigured) {
      return { success: false, error: 'Firebase is not configured. Please set up Firebase authentication.' };
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (displayName) {
        await userCredential.user.updateProfile({ displayName });
      }
      const idToken = await userCredential.user.getIdToken();
      const response = await api.post('/auth/verify-firebase', { idToken });
      const { token: jwtToken, user: userData } = response.data;
      setToken(jwtToken);
      localStorage.setItem('token', jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    if (!auth || !isFirebaseConfigured || !googleProvider) {
      return { success: false, error: 'Firebase is not configured. Please set up Firebase authentication.' };
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await api.post('/auth/verify-firebase', { idToken });
      const { token: jwtToken, user: userData } = response.data;
      setToken(jwtToken);
      localStorage.setItem('token', jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: error.message };
    }
  };

  const selectRole = async (role) => {
    try {
      const response = await api.post('/auth/select-role', { role });
      const { token: jwtToken, user: userData } = response.data;
      setToken(jwtToken);
      localStorage.setItem('token', jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Role selection error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (auth && isFirebaseConfigured) {
        await firebaseSignOut(auth);
      }
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if Firebase logout fails
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    loginWithGoogle,
    selectRole,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
