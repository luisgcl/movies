"use client";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import appFirebase from "@/credenciales";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHome } from "@fortawesome/free-solid-svg-icons";
import Search from "@/components/Search";

const auth = getAuth(appFirebase);

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
    return () => unsubscribe();
  }, []);

  const handleEditPassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
        alert("Contraseña actualizada correctamente");
        setEditMode(false);
        setNewPassword("");
      }
    } catch (error) {
      alert("Error al actualizar contraseña: " + error.message);
    }
  };

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "¿Seguro que quieres borrar tu usuario? Esta acción es irreversible."
      )
    ) {
      try {
        await deleteUser(auth.currentUser);
        alert("Usuario borrado correctamente");
        await signOut(auth);
      } catch (error) {
        alert("Error al borrar usuario: " + error.message);
      }
    }
  };

  if (!usuario) return null;

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between p-5">
        <div className="flex space-x-4">
          <Link href="/">
            <div className="text-white text-2xl hover:scale-105 transition duration-500 flex items-center">
              <div className="p-1 mb-2">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <p className="text-sm">Inicio</p>
            </div>
          </Link>
          <Link href="/peliculas">
            <div className="text-white text-2xl hover:scale-105 transition duration-500 flex items-center">
              <div className="p-1 mb-2">
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <p className="text-sm">Peliculas</p>
            </div>
          </Link>
        </div>
        <div className="flex space-x-2 items-center">
          <Link href="/peliculausuario">
            <button className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow transition-colors">
              Peliculas del usuario
            </button>
          </Link>
          <span className="bg-gray-800 text-white px-2 py-1 rounded-lg font-mono text-xs">
            {usuario.email}
          </span>
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-bold py-2 px-3 rounded-lg transition-colors"
          >
            Editar contraseña
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
          >
            Borrar usuario
          </button>
          <button
            onClick={() => signOut(auth)}
            className="bg-slate-400 text-white text-xs p-2 rounded-2xl"
          >
            Logout
          </button>
          <Search />
        </div>
      </div>
      {/* Modal de edición de contraseña */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditPassword}
            className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6"
          >
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Editar Contraseña
            </h2>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition-colors"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setNewPassword("");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
