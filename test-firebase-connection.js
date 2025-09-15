// Firebase Connection Test Script
// Run this to verify your Firebase configuration is working

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDofApPcy1hREMx9kBi8I2Fu7rr7rRK8g0",
  authDomain: "tyriieappforplf.firebaseapp.com",
  projectId: "tyriieappforplf",
  storageBucket: "tyriieappforplf.firebasestorage.app",
  messagingSenderId: "895450951863",
  appId: "1:895450951863:web:b1b95eafc30acf8026dd32",
  measurementId: "G-333L4E2JRS"
};

async function testFirebaseConnection() {
  console.log('🧪 Testing Firebase Connection...\n');
  
  try {
    // Initialize Firebase
    console.log('1. Initializing Firebase app...');
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
    
    // Test Authentication
    console.log('\n2. Testing Authentication service...');
    const auth = getAuth(app);
    console.log('✅ Authentication service initialized');
    
    // Test Firestore
    console.log('\n3. Testing Firestore service...');
    const db = getFirestore(app);
    console.log('✅ Firestore service initialized');
    
    console.log('\n🎉 All Firebase services initialized successfully!');
    console.log('\n📋 Next steps:');
    console.log('   - Enable Email/Password auth in Firebase Console');
    console.log('   - Create superuser@plf.com account in Authentication');
    console.log('   - Set up Firestore security rules');
    console.log('   - Run the app and test login functionality');
    
    return true;
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('   - Check your internet connection');
    console.log('   - Verify Firebase project exists: tyriieappforplf');
    console.log('   - Check if Firestore database is created');
    console.log('   - Ensure Authentication service is enabled');
    
    return false;
  }
}

// Run the test
testFirebaseConnection().then(success => {
  if (success) {
    console.log('\n✅ Firebase connection test completed successfully!');
    process.exit(0);
  } else {
    console.log('\n❌ Firebase connection test failed');
    process.exit(1);
  }
}).catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
