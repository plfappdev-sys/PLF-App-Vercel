import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your new Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDofApPcy1hREMx9kBi8I2Fu7rr7rRK8g0",
  authDomain: "tyriieappforplf.firebaseapp.com",
  projectId: "tyriieappforplf",
  storageBucket: "tyriieappforplf.firebasestorage.app",
  messagingSenderId: "895450951863",
  appId: "1:895450951863:web:b1b95eafc30acf8026dd32",
  measurementId: "G-333L4E2JRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
export default app;
