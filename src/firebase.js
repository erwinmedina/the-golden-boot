import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Checks if the envs are all there
if (!process.env.REACT_APP_FIREBASE_PROJECT_ID) {
  console.error('Firebase configuration missing. Check your .env file.');
}

// Tells me if we have it all or if we're missing pieces.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'missing-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'missing-auth-domain',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'missing-project-id',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'missing-storage-bucket',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'missing-sender-id',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'missing-app-id',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'missing-measurement-id'
};

// console.log('Firebase Config:', firebaseConfig);

// Only initialize if we have the minimum required config
if (firebaseConfig.projectId === 'missing-project-id') {
  throw new Error('Firebase project ID is missing. Check your env!');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;

// Initialize Firestore
const db = getFirestore(app);

// Only initialize analytics if in browser environment
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, db };