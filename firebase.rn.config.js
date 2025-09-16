// Firebase configuration for React Native/Expo
// Using Firebase v9 with modular imports for better React Native compatibility

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDofApPcy1hREMx9kBi8I2Fu7rr7rRK8g0",
  authDomain: "tyriieappforplf.firebaseapp.com",
  projectId: "tyriieappforplf",
  storageBucket: "tyriieappforplf.firebasestorage.app",
  messagingSenderId: "895450951863",
  appId: "1:895450951863:web:b1b95eafc30acf8026dd32",
  measurementId: "G-333L4E2JRS"
};

// Initialize Firebase with React Native compatibility
let app;
let auth = null;
let db = null;
let storage = null;
let isFirebaseInitialized = false;

// Enhanced initialization with retry mechanism
const initializeFirebase = async () => {
  try {
    // Initialize Firebase app
    app = initializeApp(firebaseConfig);
    
    // Wait a bit for components to register (React Native timing issue)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Initialize Firebase services with retry
    let retries = 3;
    
    while (retries > 0) {
      try {
        // Initialize auth with React Native persistence
        auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage)
        });
        
        db = getFirestore(app);
        storage = getStorage(app);
        isFirebaseInitialized = true;
        console.log('Firebase v9 initialized successfully for React Native');
        break;
      } catch (serviceError) {
        retries--;
        if (retries === 0) {
          throw serviceError;
        }
        console.warn(`Firebase service initialization failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  } catch (error) {
    console.error('Firebase initialization failed for React Native:', error);
    // Fallback to empty objects with enhanced error handling
    auth = createFallbackAuth();
    db = {};
    storage = {};
    isFirebaseInitialized = false;
  }
};

// Create enhanced fallback auth object with better error messages
const createFallbackAuth = () => {
  const fallbackAuth = {
    app: {},
    name: 'fallback-auth',
    config: {},
    currentUser: null,
    signInWithEmailAndPassword: (email, password) => {
      throw new Error('Firebase auth not available. Please check your internet connection and try again.');
    },
    createUserWithEmailAndPassword: (email, password) => {
      throw new Error('Firebase auth not available. Please check your internet connection and try again.');
    },
    signOut: () => {
      throw new Error('Firebase auth not available.');
    },
    onAuthStateChanged: (callback) => {
      // Immediately call with null user
      callback(null);
      return () => {}; // Return unsubscribe function
    },
    // Add other required properties to satisfy TypeScript
    setPersistence: () => Promise.resolve(),
    signInAnonymously: () => Promise.resolve({ user: null }),
    signInWithPopup: () => Promise.resolve({ user: null }),
    signInWithRedirect: () => Promise.resolve(),
    getRedirectResult: () => Promise.resolve({ user: null }),
    updateCurrentUser: () => Promise.resolve(),
    useDeviceLanguage: () => {},
    sendPasswordResetEmail: () => Promise.resolve(),
    confirmPasswordReset: () => Promise.resolve(),
    verifyPasswordResetCode: () => Promise.resolve(''),
    applyActionCode: () => Promise.resolve(),
    checkActionCode: () => Promise.resolve({ data: {} })
  };
  
  return fallbackAuth;
};

// Initialize Firebase with a small delay to allow React Native to register components
setTimeout(() => {
  initializeFirebase();
}, 1000);

export { auth, db, storage, app, isFirebaseInitialized };
export default app;
