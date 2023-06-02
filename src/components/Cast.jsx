"use client";
// Importamos las dependencias necesarias
import { api_key, imageUrl } from "@/helpers/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Configuramos Swiper para que use la navegación
SwiperCore.use([Navigation]);

// Definimos el componente Cast
const Cast = ({ id }) => {
  // Definimos el estado inicial del componente
  const [cast, setCast] = useState([]);

  // Usamos useEffect para hacer una petición a la API de The Movie DB y actualizar el estado del componente
  useEffect(() => {
    const fetchData = async (id) => {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=es`
      );
      setCast(data.data.cast);
    };
    fetchData(id);
  }, []);

  // Renderizamos el componente
  return (
    <>
      <p className="text-3xl font-bold text-white text-center my-2">Elenco</p>
      <div className="mx-10">
        <Swiper
          // Configuramos Swiper con los parámetros necesarios
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
          {/* Iteramos sobre el array de actores y renderizamos cada uno de ellos */}
          {cast.map((c) => (
            <SwiperSlide key={c.id}>
              <div>
                <img
                  className="rounded-lg"
                  src={`${imageUrl}${c.profile_path}`}
                  alt={c.name}
                />
                <p
                  className={`${
                    c.name > c.name.slice(0, 30)
                      ? "text-xl text-center text-white"
                      : "text-xl text-center p-3 text-white"
                  }`}
                >
                  {c.name}
                </p>
                <p
                  className={`${
                    c.character > c.character.slice(0, 30)
                      ? "text-xl text-center text-white"
                      : "text-xl text-center p-3 text-white"
                  }`}
                >
                  Personaje: {c.character}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

// Exportamos el componente Cast por defecto
export default Cast;
