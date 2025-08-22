// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "boymo-business",
  "appId": "1:1024962260170:web:abc609fe8864488b021833",
  "storageBucket": "boymo-business.firebasestorage.app",
  "apiKey": "AIzaSyCOxScddr_rVnwhZkO73Rz98kddFb2bdLM",
  "authDomain": "boymo-business.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1024962260170"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
