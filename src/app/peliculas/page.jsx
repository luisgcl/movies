"use client";
// Importamos las constantes api_key e imageUrl desde el módulo @/helpers/config
import { api_key, imageUrl } from "@/helpers/config";
// Importamos las funciones getMoviesAll, getSearchMovies, y setDataMoviesAll desde el módulo @/redux/slice/movies
import {
  getMoviesAll,
  getSearchMovies,
  setDataMoviesAll,
} from "@/redux/slice/movies";
// Importamos el módulo axios para hacer solicitudes HTTP
import axios from "axios";
// Importamos el hook useRouter de Next.js
import { useRouter } from "next/navigation";

// Importamos los hooks useEffect y useState de React y el hook useDispatch y useSelector de Redux
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Importamos el componente Pagination
import Pagintation from "@/components/Pagination";
import Loading from "@/components/Loading";

// Definimos una función llamada page
const page = () => {
  // Obtenemos los datos de dataMoviesAll, searchTerm y currentPage del estado de Redux utilizando el hook useSelector
  const { dataMoviesAll, searchTerm, currentPage } = useSelector(
    (state) => state.movies
  );
  // Definimos el estado de genres y selectedGenre utilizando el hook useState
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);

  // Obtenemos la función dispatch del hook useDispatch
  const dispatch = useDispatch();

  // Obtenemos el objeto router del hook useRouter
  const router = useRouter();

  // Definimos un efecto que se ejecuta cuando cambia searchTerm o currentPage
  useEffect(() => {
    // Si no hay un término de búsqueda, llamamos a la función getMoviesAll con el currentPage actual
    if (!searchTerm) {
      dispatch(getMoviesAll(currentPage));
    } else {
      // De lo contrario, llamamos a la función getSearchMovies con el término de búsqueda y el currentPage actual
      dispatch(getSearchMovies(searchTerm, currentPage));
    }
  }, [dispatch, searchTerm, currentPage]);

  useEffect(() => {
    if (dataMoviesAll.length > 0) {
      setDataLoaded(false);
    }
  }, [dataMoviesAll]);

  // Definimos un efecto que se ejecuta una vez al cargar la página
  useEffect(() => {
    // Hacemos una solicitud GET a la API de The Movie Database para obtener la lista de géneros
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=es-Es`
      )
      .then((response) => {
        // Almacenamos la lista de géneros en el estado de genres
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Definimos una función llamada handleGenreChange que se ejecuta cuando cambia el valor del select de género
  const handleGenreChange = (event) => {
    // Obtenemos el valor seleccionado del select
    const genreId = event.target.value;
    // Almacenamos el valor seleccionado en el estado de selectedGenre
    setSelectedGenre(genreId);
    // Hacemos una solicitud GET a la API de The Movie Database para obtener las películas del género seleccionado
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreId}`
      )
      .then((response) => {
        // Almacenamos las películas devueltas en el estado de dataMoviesAll utilizando la función setDataMoviesAll de Redux
        dispatch(setDataMoviesAll(response.data.results));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Devolvemos un elemento JSX que muestra las películas y el select de género
  return (
    <>
      {dataLoaded ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-mi-color">
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="bg-mi-color text-3xl text-white cursor-pointer w-auto whitespace-normal mb-5 hover:scale-105 transition-duration duration-500 mt-32 ml-5"
            >
              <option value="">Género</option>
              {genres.map((genre) => (
                // Mostramos cada género en una opción del select
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-mi-color gap-5 p-5">
            {dataMoviesAll.map((m) => (
              // Mostramos cada película en un div con estilo
              <div
                key={m.id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-duration duration-500 w-64"
                onClick={() => router.push(`/pelicula/${m.id}`)}
              >
                <img
                  className="rounded-lg"
                  // Establecemos la imagen de la película utilizando la constante imageUrl y el valor de poster_path
                  src={`${imageUrl}${m.poster_path}`}
                  alt={m.title}
                />
                <p
                  className={`${
                    m.title > m.title.slice(0, 30)
                      ? "text-xl text-center text-white"
                      : "text-xl text-center p-3 text-white"
                  }`}
                >
                  {m.title}
                </p>
                <p className="text-xl text-center text-white">
                  {m.release_date.slice(0, 4)}
                </p>
              </div>
            ))}
          </div>
          {/* Renderizamos el componente Pagination */}
          <Pagintation />
        </div>
      )}
    </>
  );
};

// Exportamos la función page como valor predeterminado
export default page;
