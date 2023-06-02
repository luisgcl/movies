"use client";
// Importamos las dependencias necesarias
import { imageUrl } from "@/helpers/config";
import { useRouter } from "next/navigation";

// Definimos el componente Movie
const Movie = ({
  id,
  title,
  poster_path,
  overview,
  randomMovie,
  dataMoviesProx,
  release_date,
}) => {
  // Usamos useRouter para manejar la navegación
  const router = useRouter();

  // Renderizamos el componente
  return (
    <div
      className={`${
        randomMovie && "w-4/5"
      } flex-wrap justify-items-center cursor-pointer`}
      key={id}
      onClick={() => {
        router.push(`/pelicula/${id}`);
      }}
    >
      {/* Si randomMovie es verdadero, renderizamos un componente diferente */}
      {randomMovie ? (
        <>
          <div className="w-full sm:w-auto md:w-3/5 hover:bg-gradient-to-r  from-mi-color to-transparent p-10">
            <p className="flex items-center justify-center h-full text-5xl font bold text-white">
              {title}
            </p>
            <br />
            <p className="hidden sm:block text-md font-bold text-white">
              {overview}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Si no, renderizamos el componente normal */}
          <div className="hover:scale-105 transition-duration duration-500">
            <img
              className="rounded-lg"
              src={`${imageUrl}${poster_path}`}
              alt={title}
            />
            <p
              className={`${
                title > title.slice(0, 30)
                  ? "text-xl text-center text-white"
                  : "text-xl text-center p-3 text-white"
              }`}
            >
              {title}
            </p>
            <p className="text-md font-bold text-center text-white">
              {release_date}
            </p>
          </div>

          {/* Si dataMoviesProx es verdadero, renderizamos otro componente */}
          {dataMoviesProx && (
            <div className="hover:scale-105 transition-duration duration-500">
              <img
                className="rounded-lg"
                src={`${imageUrl}${poster_path}`}
                alt={title}
              />
              <p
                className={`${
                  title > title.slice(0, 30)
                    ? "text-xl text-center text-white"
                    : "text-xl text-center p-3 text-white"
                }`}
              >
                {title}
              </p>
              <p className="text-md font-bold text-center text-white">
                {release_date}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Exportamos el componente Movie por defecto
export default Movie;
