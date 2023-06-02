"use client";
// Importamos los módulos necesarios
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/redux/provider";
import Search from "@/components/Search";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHome } from "@fortawesome/free-solid-svg-icons";

// Definimos la fuente Inter con el subconjunto "latin"
const inter = Inter({ subsets: ["latin"] });

// Definimos un objeto metadata con el título y la descripción del sitio
export const metadata = {
  title: "Pelis Next",
  description: "Pagina creada por Luis Castillo generado con create next app",
};

// Definimos un componente de diseño raíz llamado RootLayout que acepta un prop children
export default function RootLayout({ children }) {
  // Devolvemos un elemento JSX que contiene la estructura de la página
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {/* Creamos una barra de navegación fija en la parte superior de la página */}
          <div className="fixed top-0 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between p-5">
              {/* Creamos un menú de navegación con dos enlaces */}
              <div className="flex space-x-4">
                <Link href="/">
                  <div
                    className={`text-white text-3xl hover:scale-105 transition-duration duration-500 flex items-center`}
                  >
                    <div className="p-1 mb-2">
                      <FontAwesomeIcon icon={faHome} />
                    </div>
                    <p>Inicio</p>
                  </div>
                </Link>
                <Link href="/peliculas">
                  <div
                    className={` text-white text-3xl hover:scale-105 transition-duration duration-500 flex items-center`}
                  >
                    <div className="p-1 mb-2">
                      <FontAwesomeIcon icon={faCamera} />
                    </div>
                    <p>Peliculas</p>
                  </div>
                </Link>
              </div>
              {/* Agregamos un componente de búsqueda */}
              <div>
                <Search />
              </div>
            </div>
          </div>
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
