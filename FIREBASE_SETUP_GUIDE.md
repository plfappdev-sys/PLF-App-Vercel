# Firebase Setup Guide for PLF App

## Current Status
✅ Firebase project configured with your existing credentials
✅ Authentication system implemented
✅ Login/Signup screens created
✅ SuperUser account ready (username: `superuser@plf.com`, password: `Wawa@PLF2025`)

## Next Steps Required

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `plf-app-27194`
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider

### 2. Firestore Security Rules
You need to set up security rules in Firestore to allow read/write operations:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null;
    }
    
    // Allow public read access to member data (for verification)
    match /members/{memberId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.superuser == true;
    }
    
    // Allow superusers full access
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.token.superuser == true;
    }
  }
}
```

### 3. Create SuperUser Account in Firebase Auth
Since we can't programmatically create the superuser in Firebase Auth (due to permissions), you need to:

1. Go to Authentication > Users in Firebase Console
2. Click "Add user"
3. Enter:
   - Email: `superuser@plf.com`
   - Password: `Wawa@PLF2025`
4. Click "Add user"

### 4. Test Accounts File
The accounts file at `C:\Projects\Test\September\V5\Resources\PLFaccounts.txt` should contain test user credentials in this format:
```
email1@example.com:password1
email2@example.com:password2
superuser@plf.com:Wawa@PLF2025
```

### 5. Authentication Inspiration
Check the folder `C:\Projects\Test\September\V5\Resources\auth` for design inspiration and authentication flow examples.

## Testing the App

### Current Test Credentials
- **Email**: `superuser@plf.com`
- **Password**: `Wawa@PLF2025`

### Development Notes
- The app is currently running with tunnel connection
- Firebase permissions warnings are expected until security rules are set up
- Async storage is now properly configured for auth persistence

## Firebase Project Recommendations

### Should you create a new Firebase project?
✅ **Yes, for production** - Create a new project specifically for production use
✅ **Keep current project** - Use the existing project for development/testing

### Reasons to create new project:
1. Separate development and production environments
2. Better security control
3. Isolated testing data
4. Different configuration settings

### Steps to create new project:
1. Go to Firebase Console
2. Click "Create project"
3. Name it (e.g., `plf-app-production`)
4. Configure the same services: Authentication, Firestore, Storage
5. Update the `firebase.config.ts` with new credentials

## Troubleshooting

### Common Issues:
1. **"Missing or insufficient permissions"** - Set up Firestore security rules
2. **Auth persistence warnings** - Already fixed with AsyncStorage integration
3. **SuperUser login issues** - Manually create the user in Firebase Console

### Development Mode Workaround:
For development, you can temporarily set Firestore rules to:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Warning**: This is insecure and should only be used for development!

## Next Steps
1. Set up Firestore security rules in Firebase Console
2. Create superuser account in Firebase Authentication
3. Test the login functionality
4. Review the authentication flow in the app
5. Consider creating a separate production Firebase project
