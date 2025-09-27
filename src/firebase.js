// // Importaciones principales de Firebase
// import { initializeApp, getApps } from "firebase/app";
// import {
//   getAuth,
//   setPersistence,
//   browserLocalPersistence,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   fetchSignInMethodsForEmail,
//   sendEmailVerification,
// } from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   updateDoc,
//   deleteDoc,
//   addDoc,
//   where,
//   onSnapshot,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Configuración de Firebase con variables de entorno (Next.js)
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_PROJECT_ID + ".firebaseapp.com",
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_PROJECT_ID + ".appspot.com",
// };

// // Inicialización segura de Firebase
// const firebaseApp =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// // Exportar instancias de los servicios
// export const db = getFirestore(firebaseApp);
// export const auth = getAuth(firebaseApp);
// export const storage = getStorage(firebaseApp);

// // Exportaciones de Firestore
// export {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   updateDoc,
//   deleteDoc,
//   addDoc,
//   where,
//   onSnapshot,
// };

// // Exportaciones de Auth
// export {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   fetchSignInMethodsForEmail,
//   sendEmailVerification,
// };

// // 🔒 Persistencia de sesión (para que el usuario no se desloguee al recargar la página)
// setPersistence(auth, browserLocalPersistence).catch((error) => {
//   console.error("Error al configurar persistencia de sesión:", error);
// });
