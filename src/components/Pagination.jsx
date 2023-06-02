"use client";

// Importamos React y las funciones necesarias desde react-redux
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Importamos las funciones necesarias desde el slice de movies
import { setCurrentPage } from "@/redux/slice/movies";

// Importamos los iconos necesarios desde FontAwesome
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Creamos el componente Pagination
const Pagination = () => {
  // Obtenemos el currentPage y totalPages desde el estado global de movies
  const { currentPage, totalPages } = useSelector((state) => state.movies);

  // Creamos una instancia de useDispatch para poder despachar acciones
  const dispatch = useDispatch();

  // Función para manejar el evento de la página anterior
  const handlePreviousPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  // Función para manejar el evento de la página siguiente
  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  // Renderizamos el componente
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-4 bg-mi-color text-white text-xl ">
        {/* Botón para la página anterior */}
        <button
          onClick={handlePreviousPage}
          className={`border-2 p-2 rounded-md hover:scale-105 transition-duration duration-500 ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* Botón para la página actual */}
        <button
          key={currentPage}
          onClick={() => {
            dispatch(setCurrentPage(currentPage));
            console.log(currentPage);
          }}
          className={`border-2 p-2 rounded-md hover:scale-105 transition-duration duration-500 bg-nuevo-color `}
        >
          {currentPage}
        </button>

        {/* Botones para las páginas restantes */}
        {Array.from({ length: Math.min(totalPages, 500) }, (_, i) => i + 1)
          .filter((currentPage) => currentPage === Math.min(totalPages, 500))
          .map((page) => (
            <button
              key={page}
              onClick={() => {
                dispatch(setCurrentPage(page));
                console.log(page);
              }}
              className={`border-2 p-2 rounded-md hover:scale-105 transition-duration duration-500 ${
                page === currentPage ? "bg-nuevo-color" : ""
              } `}
            >
              {page}
            </button>
          ))}

        {/* Botón para la página siguiente */}
        <button
          onClick={handleNextPage}
          className={`border-2 p-2 rounded-md hover:scale-105 transition-duration duration-500 ${
            currentPage === Math.min(totalPages, 500)
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
};

// Exportamos el componente Pagination
export default Pagination;
