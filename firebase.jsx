// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsJ2h-xQJ31cLsdlhxlbvfVNEmsYdxFdQ",
  authDomain: "entertainment-app-6e699.firebaseapp.com",
  projectId: "entertainment-app-6e699",
  storageBucket: "entertainment-app-6e699.appspot.com",
  messagingSenderId: "243341860608",
  appId: "1:243341860608:web:7106fca48d070d55199de5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth};