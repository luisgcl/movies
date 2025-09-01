"use client";
import appFirebase from "@/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import PageMovie from "./PageMovie";
import Login from "@/components/Login";
const auth = getAuth(appFirebase);

function HomePage() {
  const [usuario, setUsuario] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!mounted) return null; // Espera a que el componente se monte en el cliente

  return (
    <div>
      {usuario ? <PageMovie correoUsuario={usuario.email} /> : <Login />}
    </div>
  );
}

export default HomePage;
