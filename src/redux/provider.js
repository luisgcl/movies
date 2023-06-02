"use client";

// Se importan las dependencias necesarias
import { Provider } from "react-redux";
import { store } from "./store";

// Se define un componente Providers que envuelve a la aplicación con el Provider de Redux
const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Se exporta el componente Providers por defecto
export default Providers;
