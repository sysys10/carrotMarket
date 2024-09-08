import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHiHzTSgy6KJDxYZE4IVR49xbLBORezW8",
  authDomain: "carrot-8d83c.firebaseapp.com",
  projectId: "carrot-8d83c",
  storageBucket: "carrot-8d83c.appspot.com",
  messagingSenderId: "1050784420733",
  appId: "1:1050784420733:web:7a6820366f921f4c173214",
  measurementId: "G-9C7TCYWYWN",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };