# Firebase Setup Instructions for PLF App - New Project

## Current Project Status
✅ **New Firebase Project Created**: `tyriieappforplf`
✅ **Configuration Files Ready**: `firebase.config.ts` and `firebase.rn.config.js` already contain your new project credentials
✅ **Authentication System Implemented**: Complete AuthContext with Firebase integration
✅ **Login/Signup Screens Ready**: UI components prepared for real authentication

## Step 1: Firebase Console Configuration

### 1.1 Enable Authentication Service
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `tyriieappforplf`
3. Navigate to **Authentication** > **Sign-in method**
4. Enable **Email/Password** provider
5. Click **Save**

### 1.2 Create SuperUser Account
1. In Firebase Console, go to **Authentication** > **Users**
2. Click **Add user**
3. Enter:
   - Email: `superuser@plf.com`
   - Password: `Wawa@PLF2025`
4. Click **Add user**

### 1.3 Set Up Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location closest to your users
5. Click **Create**

### 1.4 Configure Firestore Security Rules (IMPORTANT)
Replace the default rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Public read access for member verification
    match /members/{memberId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Superusers have full access
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.email == 'superuser@plf.com';
    }
  }
}
```

### 1.5 Enable Storage (Optional)
1. Go to **Storage** > **Get started**
2. Choose **Start in test mode**
3. Select location
4. Click **Create**

## Step 2: Test Your Configuration

### 2.1 Test Authentication
1. Run the app: `npm start`
2. Try logging in with:
   - Email: `superuser@plf.com`
   - Password: `Wawa@PLF2025`

### 2.2 Test Firestore Access
The app should automatically:
- Create user profiles in Firestore when users sign up
- Read member data for verification
- Allow SuperUser full access

## Step 3: Switch from Mock to Real Authentication

### 3.1 Update App Configuration
The app is currently using `MockAuthProvider`. To switch to real Firebase authentication:

**In AppSimpleDirect.js:**
```javascript
// Change from:
import { MockAuthProvider } from './src/contexts/MockAuthContext';

// To:
import { AuthProvider } from './src/contexts/AuthContext';

// And change:
<MockAuthProvider> to <AuthProvider>
```

### 3.2 Update Login/Signup Screens
**In LoginScreen.tsx and SignUpScreen.tsx:**
```javascript
// Change from:
import { useMockAuth } from '../../contexts/MockAuthContext';

// To:
import { useAuth } from '../../contexts/AuthContext';

// And change:
const { login } = useMockAuth(); to const { login } = useAuth();
```

## Step 4: Data Migration (If Needed)

### 4.1 Import Existing Member Data
If you have existing member data, you can:
1. Export to CSV format
2. Use Firebase Admin SDK to import
3. Or use the Firebase Console import feature

### 4.2 Test User Accounts
Create test accounts in Firebase Authentication for different roles:
- admin@plf.com
- executive@plf.com 
- member@plf.com

## Step 5: Production Considerations

### 5.1 Security Rules for Production
Update Firestore rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /members/{memberId} {
      allow read: if request.auth != null;
      allow write: if false; // No writing in production
    }
    
    // Add role-based access for production
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

### 5.2 Environment Configuration
Consider creating separate Firebase projects for:
- Development (`tyriieappforplf-dev`)
- Staging (`tyriieappforplf-staging`) 
- Production (`tyriieappforplf-prod`)

## Troubleshooting

### Common Issues:

1. **"Missing or insufficient permissions"**
   - Check Firestore security rules
   - Ensure user is authenticated

2. **Authentication not working**
   - Verify Email/Password provider is enabled
   - Check Firebase project configuration

3. **SuperUser access issues**
   - Verify superuser@plf.com exists in Firebase Auth
   - Check custom claims if using role-based access

4. **Network connectivity**
   - Ensure device has internet access
   - Check Firebase project region settings

### Development Tips:

1. **Use Firebase Emulator** for local development:
   ```bash
   npm install -g firebase-tools
   firebase init emulators
   firebase emulators:start
   ```

2. **Monitor usage** in Firebase Console:
   - Authentication > Users
   - Firestore > Usage
   - Performance monitoring

3. **Set up alerts** for:
   - Authentication failures
   - Database rule violations
   - Storage usage spikes

## Next Steps After Setup

1. ✅ Test authentication flow
2. ✅ Verify Firestore data access
3. ✅ Test member verification functionality
4. ✅ Validate SuperUser privileges
5. ✅ Monitor performance and errors
6. ✅ Plan data migration strategy
7. ✅ Set up backup procedures

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
