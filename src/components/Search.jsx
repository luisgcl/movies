"use client";
// Importamos las funciones y componentes necesarios
import {
  getSearchMovies,
  setCurrentPage,
  setSearchTerm,
} from "@/redux/slice/movies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
library.add(faSearch);

// Creamos el componente Search
const Search = () => {
  // Obtenemos el dispatch y los estados necesarios del store
  const dispatch = useDispatch();
  const { searchTerm, currentPage } = useSelector((state) => state.movies);
  // Creamos un estado local para el valor del input
  const [nameMovie, setNameMovie] = useState(searchTerm);

  // Obtenemos el router de Next.js
  const router = useRouter();

  // Usamos useEffect para llamar a la función getSearchMovies cada vez que cambie el término de búsqueda o la página actual
  useEffect(() => {
    dispatch(getSearchMovies(searchTerm, currentPage));
  }, [dispatch, searchTerm, currentPage]);

  // Función para actualizar el estado local del valor del input
  function handleChange(e) {
    setNameMovie(e.target.value);
  }

  // Función para enviar el término de búsqueda al store y redirigir a la página de películas
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setSearchTerm(nameMovie));
    router.push("/peliculas");
    setNameMovie("");
    dispatch(setCurrentPage(1));
  }

  // Renderizamos el formulario con el input y el botón de búsqueda
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center text-white">
        <div className="rounded-l-full border border-gray-300 px-3 py-2 bg-nuevo-color">
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <input
          type="text"
          placeholder={`Buscar peliculas...`}
          value={nameMovie}
          onChange={handleChange}
          className="border border-gray-300 placeholder-gray-300 text-white rounded-r-full bg-nuevo-color px-3 py-2 w-full"
        />
      </form>
    </>
  );
};

// Exportamos el componente Search
export default Search;
