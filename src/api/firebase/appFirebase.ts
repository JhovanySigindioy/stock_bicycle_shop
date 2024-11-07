import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8W-q5ARJPikjPm9C43GJwdIH24uKR4l8",
  authDomain: "hiosvbicicleteria-c3391.firebaseapp.com",
  projectId: "hiosvbicicleteria-c3391",
  storageBucket: "hiosvbicicleteria-c3391.appspot.com",
  messagingSenderId: "101570464304",
  appId: "1:101570464304:web:e6eb2ad77ad21a6f367bf5",
  measurementId: "G-SYYYFPHJK3"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const storageFirebase = getStorage(appFirebase);
