// Se importan las dependencias necesarias
import { configureStore } from "@reduxjs/toolkit";
import movies from "./slice/movies";

// Se configura el store de Redux utilizando la función configureStore de Redux Toolkit
export const store = configureStore({
  reducer: {
    // Se especifica el reducer "movies" que maneja el estado de las películas
    movies,
  },
});
