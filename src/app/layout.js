// Importamos los módulos necesarios
"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/redux/provider";
import Search from "@/components/Search";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHome } from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import appFirebase from "@/credenciales";
import { useEffect, useState } from "react";
const auth = getAuth(appFirebase);

// Definimos la fuente Inter con el subconjunto "latin"
const inter = Inter({ subsets: ["latin"] });

// Definimos un objeto metadata con el título y la descripción del sitio
export const metadata = {
  title: "Pelis Next",
  description: "Pagina creada por Luis Castillo generado con create next app",
};

// Definimos un componente de diseño raíz llamado RootLayout que acepta un prop children
export default function RootLayout({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
    return () => unsubscribe();
  }, []);
  // Devolvemos un elemento JSX que contiene la estructura de la página
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {usuario && (
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
          )}
          {/* Renderizamos el contenido del componente children */}
          {children}
          {/* Agregamos un pie de página */}
          <footer className="bg-mi-color text-white text-xl text-center py-4">
            Hecho por Luis Castillo (Schneyder)
          </footer>
        </body>
      </Providers>
    </html>
  );
}
