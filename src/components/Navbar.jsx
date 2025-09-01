"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import appFirebase from "@/credenciales";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHome } from "@fortawesome/free-solid-svg-icons";
import Search from "@/components/Search";

const auth = getAuth(appFirebase);

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
    return () => unsubscribe();
  }, []);

  if (!usuario) return null;

  return (
    <div className="fixed top-0 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between p-5">
        <div className="flex space-x-4">
          <Link href="/">
            <div className="text-white text-3xl hover:scale-105 transition-duration duration-500 flex items-center">
              <div className="p-1 mb-2">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <p>Inicio</p>
            </div>
          </Link>
          <Link href="/peliculas">
            <div className="text-white text-3xl hover:scale-105 transition-duration duration-500 flex items-center">
              <div className="p-1 mb-2">
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <p>Peliculas</p>
            </div>
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => signOut(auth)}
            className="bg-slate-400 text-white p-2 rounded-2xl"
          >
            Logout
          </button>
          <Search />
        </div>
      </div>
    </div>
  );
}
