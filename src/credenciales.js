// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt2NG9t8H0D5h2qHnI_padOh4jPqpUYgs",
  authDomain: "movies-form-232d7.firebaseapp.com",
  projectId: "movies-form-232d7",
  storageBucket: "movies-form-232d7.firebasestorage.app",
  messagingSenderId: "147735172100",
  appId: "1:147735172100:web:0661ad8f74ea22b6d95151",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase; // Importamos los hooks y módulos necesarios
