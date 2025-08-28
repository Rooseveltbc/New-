import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6TR7L7T1zCIV0uGuvf04nXIE5jIR5D1k",
  authDomain: "linkshare-pro-f9a1f.firebaseapp.com",
  projectId: "linkshare-pro-f9a1f",
  storageBucket: "linkshare-pro-f9a1f.firebasestorage.app",
  messagingSenderId: "73258524675",
  appId: "1:73258524675:web:90010b8f75492d3da76e36",
  measurementId: "G-34V0BWZEYK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
