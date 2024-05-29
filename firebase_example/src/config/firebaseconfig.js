// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw3pFUPr_mX5rHnwB0P8tex8zRhyP6hrs",
  authDomain: "task-61457.firebaseapp.com",
  projectId: "task-61457",
  storageBucket: "task-61457.appspot.com",
  messagingSenderId: "430168868599",
  appId: "1:430168868599:web:76258f008fe21614a335f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;