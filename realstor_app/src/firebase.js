// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//apiKey: import.meta.env.firebase_API,
  apiKey:'AIzaSyDeoeSTz9NsM55F1zmEcvizAWEsW_-C0y8',
  authDomain: "mern-state-e5387.firebaseapp.com",
  projectId: "mern-state-e5387",
  storageBucket: "mern-state-e5387.appspot.com",
  messagingSenderId: "466459503906",
  appId: "1:466459503906:web:280a1702e5b3bfc06e497b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

