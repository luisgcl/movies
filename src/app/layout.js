import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/redux/provider";
import NavbarWrapper from "@/components/NavbarWrapper"; // Nuevo componente cliente

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pelis Next",
  description: "Pagina creada por Luis Castillo generado con create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarWrapper />
          {children}
          <footer className="bg-mi-color text-white text-xl text-center py-4">
            Hecho por Luis Castillo (Schneyder)
          </footer>
        </Providers>
      </body>
    </html>
  );
}
