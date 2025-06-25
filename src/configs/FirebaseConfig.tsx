// Firebase core
import { initializeApp } from "firebase/app";
// Firebase services
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV2tDHFyYvNX_jyTk-lx1Qes_u6fqBTCg",
  authDomain: "hand-pro.firebaseapp.com",
  databaseURL: "https://hand-pro-default-rtdb.firebaseio.com",
  projectId: "hand-pro",
  storageBucket: "hand-pro.appspot.com",
  messagingSenderId: "73117212791",
  appId: "1:73117212791:web:3599ee6b8408c8f3f86672",
  measurementId: "G-S6T70QL101",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
