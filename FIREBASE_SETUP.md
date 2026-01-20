# Firebase Setup Instructions for NAZ3 Game

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "NAZ3-Game"
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

## Step 3: Create Firestore Database

1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Production mode**
4. Select your location (closest to India: asia-south1)
5. Click "Enable"

## Step 4: Set Firestore Rules

Go to **Rules** tab and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 5: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web icon** (</>)
4. Register app with nickname "NAZ3-Game-Web"
5. Copy the Firebase configuration object

## Step 6: Update firebase-config.js

Replace the configuration in `firebase-config.js` with your Firebase project credentials.

## Next Steps

After setting up Firebase:
1. Update all HTML files with the new Firebase integration
2. Test user registration
3. Test login functionality
4. Verify coin balance synchronization

## Security Notes

- Never commit your Firebase API keys to public repositories
- Use Firebase Security Rules to protect user data
- Enable App Check for additional security (optional)
