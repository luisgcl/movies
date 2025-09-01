"use client";

import { useState } from "react";
import appFirebase from "@/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);

  const autenticarUsuario = async (e) => {
    e.preventDefault();
    // e.target.reset();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (registrando) {
      // Registro
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        e.target.reset();
        console.log("Usuario registrado:", userCredential.user);
      } catch (error) {
        alert(
          "El correo ya esta en uso, ingresaste un correo invalido o la contrasena es muy debil"
        );
      }
    } else {
      // Login
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        e.target.reset();
        console.log("Usuario logueado:", userCredential.user);
      } catch (error) {
        alert("El correo o la contrasena son incorrectos");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 min-h-screen flex flex-col">
      <div className="w-96 h-56 mx-auto mt-20 p-8 bg-slate-800 text-white rounded-lg">
        <form
          onSubmit={autenticarUsuario}
          className="flex flex-col items-center"
        >
          <input
            required
            id="email"
            type="text"
            placeholder="Ingresar Email:"
            className="mb-4 w-64 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            required
            type="password"
            placeholder="Ingresar Contrasena:"
            className="mb-4 w-64 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
          <button
            className="bg-slate-500 w-auto rounded-2xl p-2 mb-4"
            type="submit"
          >
            {registrando ? "Registrarse" : "Iniciar Sesion"}
          </button>
        </form>
        <p className="text-slate-300">
          {registrando ? "Ya tienes cuenta?" : "No tienes cuenta?"}
          <button
            onClick={() => setRegistrando(!registrando)}
            className=" bg-slate-600 rounded-2xl mx-2 p-1"
          >
            {registrando ? "Inicia Sesion" : "Registrate"}
          </button>
        </p>
      </div>
    </div>
  );
};
export default Login;
