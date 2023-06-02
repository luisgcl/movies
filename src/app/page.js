// Importamos los módulos necesarios
"use client";
import React, { useState } from "react";
import Movie from "@/components/Movie";
import { getMovies, getMoviesProx, setLoading } from "@/redux/slice/movies";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { imageUrl } from "@/helpers/config";
import Loading from "@/components/Loading";

// Inicializamos Swiper con el módulo de navegación
SwiperCore.use([Navigation]);

export default function Home() {
  // Obtenemos los datos de películas populares y próximas desde el estado global
  const { dataMovies, dataMoviesProx, loading } = useSelector(
    (state) => state.movies
  );

  // Inicializamos el estado local para una película aleatoria
  const [randomMovie, setRandomMovie] = useState(null);

  // Obtenemos la función dispatch para enviar acciones al store
  const dispatch = useDispatch();

  // Cargamos los datos de películas populares y próximas al montar el componente
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getMoviesProx());
    dispatch(setLoading(true));
    console.log(loading);
  }, [dispatch]);

  // Seleccionamos una película aleatoria de las populares al cargar los datos
  useEffect(() => {
    if (dataMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataMovies.length);
      setRandomMovie(dataMovies[randomIndex]);
    }
  }, [dataMovies]);

  // Renderizamos el componente
  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <div className="bg-mi-color w-full">
          {/* Mostramos la película aleatoria como fondo */}
          {randomMovie && (
            <div
              className="bg-cover flex items-center h-screen"
              style={{
                backgroundImage: `url(${imageUrl}${randomMovie.backdrop_path})`,
                backgroundSize: "100% 100%",
              }}
            >
              <div className="h-full">
                <div className="px-10 py-80 h-full bg-gradient-to-t  from-mi-color to-transparent ml-0">
                  {/* Mostramos los detalles de la película aleatoria */}
                  <Movie
                    id={randomMovie.id}
                    title={randomMovie.title}
                    randomMovie={randomMovie}
                    overview={randomMovie.overview}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Mostramos las películas populares */}
          <p className="text-3xl font-bold text-white text-center my-2">
            Populares
          </p>
          <div className="mx-10">
            <Swiper
              spaceBetween={10}
              slidesPerView={8}
              slidesPerGroup={8}
              speed={1000}
              navigation
              breakpoints={{
                340: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1024: {
                  spaceBetween: 10,
                  slidesPerColumn: 1,
                  slidesPerView: 8,
                  slidesPerGroup: 8,
                },
              }}
            >
              {/* Mostramos cada película popular en un slide */}
              {dataMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Movie
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date.slice(0, 4)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Mostramos las películas próximas */}
          <p className="text-3xl font-bold text-white text-center my-2">
            Próximas
          </p>
          <div className="mx-10">
            <Swiper
              spaceBetween={10}
              slidesPerView={8}
              slidesPerGroup={8}
              speed={1000}
              navigation
              breakpoints={{
                340: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1024: {
                  spaceBetween: 10,
                  slidesPerColumn: 1,
                  slidesPerView: 8,
                  slidesPerGroup: 8,
                },
              }}
            >
              {/* Mostramos cada película próxima en un slide */}
              {dataMoviesProx.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Movie
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date.slice(0, 4)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
