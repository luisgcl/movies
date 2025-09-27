// Importaciones principales de Firebase
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  addDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt2NG9t8H0D5h2qHnI_padOh4jPqpUYgs",
  authDomain: "movies-form-232d7.firebaseapp.com",
  projectId: "movies-form-232d7",
  storageBucket: "movies-form-232d7.appspot.com", // <-- corregido .appspot.com
  messagingSenderId: "147735172100",
  appId: "1:147735172100:web:0661ad8f74ea22b6d95151",
};

// Inicializa Firebase primero
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exportar instancias de los servicios
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

// Exportaciones de Firestore
export {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  addDoc,
  where,
  onSnapshot,
};

// Exportaciones de Auth
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
};

// 🔒 Persistencia de sesión (para que el usuario no se desloguee al recargar la página)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error al configurar persistencia de sesión:", error);
});

export default firebaseApp;
