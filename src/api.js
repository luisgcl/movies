import { db } from "./credenciales"; // o "./credenciales"
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// CREATE
export const createItem = async (obj) => {
  const colRef = collection(db, "peliculas");
  const data = await addDoc(colRef, obj);
  return data.id;
};

// UPDATE
export const updateItem = async (id, obj) => {
  const docRef = doc(db, "peliculas", id);
  await updateDoc(docRef, obj);
};

// READ - obtener todos
export const getItems = async () => {
  const colRef = collection(db, "peliculas");
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

// READ - obtener por condición
export const getItemsByCondition = async (value) => {
  const colRef = collection(db, "peliculas");
  const result = await getDocs(query(colRef, where("age", "==", value)));
  return getArrayFromCollection(result);
};

// READ - obtener por ID
export const getItemById = async (id) => {
  const docRef = doc(db, "peliculas", id);
  const result = await getDoc(docRef);
  return result.data();
};

// DELETE
export const deleteItem = async (id) => {
  const docRef = doc(db, "peliculas", id);
  await deleteDoc(docRef);
};

// Función auxiliar para mapear docs a objetos
const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
