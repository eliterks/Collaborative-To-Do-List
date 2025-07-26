<<<<<<< HEAD
# Collaborative To-Do List

A real-time collaborative to-do list application built with Firebase and vanilla JavaScript.

## Features
- Google Authentication
- Real-time synchronization
- Add, complete, and delete tasks
- Responsive design with Tailwind CSS

## Local Development

1. Install Python (for local server)
2. Run the local server:
   ```bash
   python server.py
   ```
3. Open http://localhost:8000 in your browser

## Deployment to Vercel

### Prerequisites
- Vercel account
- Firebase project set up with:
  - Authentication enabled (Google provider)
  - Firestore database created
  - Web app configured

### Steps

1. **Install Vercel CLI (optional)**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Connect your GitHub repository
   - Import the project
   - Set environment variables (see below)

3. **Set Environment Variables in Vercel**:
   Go to Project Settings → Environment Variables and add:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Configure Firebase Console**:
   - Add your Vercel domain to Firebase Authentication → Settings → Authorized domains
   - Example: `your-app.vercel.app`

### Firebase Security Rules

Make sure your Firestore rules allow authenticated users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Tech Stack
- HTML5
- CSS3 (Tailwind CSS)
- Vanilla JavaScript
- Firebase Authentication
- Firebase Firestore
- Vercel (deployment)

## File Structure
```
├── index.html          # Main HTML file
├── app.js             # JavaScript application logic
├── server.py          # Local development server
├── vercel.json        # Vercel deployment configuration
├── .env.local         # Local environment variables (not deployed)
└── .gitignore         # Git ignore rules
```
=======
# Collaborative To-Do List

A real-time collaborative to-do list application built with Firebase and vanilla JavaScript.

## Features
- Google Authentication
- Real-time synchronization
- Add, complete, and delete tasks
- Responsive design with Tailwind CSS

## Local Development

1. Install Python (for local server)
2. Run the local server:
   ```bash
   python server.py
   ```
3. Open http://localhost:8000 in your browser

## Deployment to Vercel

### Prerequisites
- Vercel account
- Firebase project set up with:
  - Authentication enabled (Google provider)
  - Firestore database created
  - Web app configured

### Steps

1. **Install Vercel CLI (optional)**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Connect your GitHub repository
   - Import the project
   - Set environment variables (see below)

3. **Set Environment Variables in Vercel**:
   Go to Project Settings → Environment Variables and add:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Configure Firebase Console**:
   - Add your Vercel domain to Firebase Authentication → Settings → Authorized domains
   - Example: `your-app.vercel.app`

### Firebase Security Rules

Make sure your Firestore rules allow authenticated users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Tech Stack
- HTML5
- CSS3 (Tailwind CSS)
- Vanilla JavaScript
- Firebase Authentication
- Firebase Firestore
- Vercel (deployment)

## File Structure
```
├── index.html          # Main HTML file
├── app.js             # JavaScript application logic
├── server.py          # Local development server
├── vercel.json        # Vercel deployment configuration
├── .env.local         # Local environment variables (not deployed)
└── .gitignore         # Git ignore rules
```
>>>>>>> eb83fff6f4c11d2c13e6e8e216e532c0b78c5b60
