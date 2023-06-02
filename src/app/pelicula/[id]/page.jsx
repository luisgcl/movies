// Importamos el componente Cast desde el directorio @/components
import Cast from "@/components/Cast";
// Importamos las constantes api_key e imageUrl desde el módulo @/helpers/config
import { api_key, imageUrl } from "@/helpers/config";

// Definimos una función asincrónica llamada getMovie que toma un parámetro id
const getMovie = async (id) => {
  // Hacemos una solicitud GET a la API de The Movie Database con el id y la api_key
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es`
  );
  // Parseamos la respuesta como JSON y la almacenamos en la variable data
  const data = await res.json();
  // Devolvemos los datos
  return data;
};

// Definimos una función asincrónica llamada page que toma un objeto params como parámetro
const page = async ({ params }) => {
  // Llamamos a la función getMovie con el parámetro id de params y destructuramos los datos devueltos en variables individuales
  const { title, id, poster_path, overview, backdrop_path, genres } =
    await getMovie(params.id);

  // Devolvemos un elemento JSX que muestra los datos de la película
  return (
    <>
      <div key={id} className="bg-mi-color w-full">
        <div
          className="bg-cover flex items-center h-screen "
          style={{
            // Establecemos la imagen de fondo utilizando la constante imageUrl y el valor de backdrop_path
            backgroundImage: `url(${imageUrl}${backdrop_path})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="bg-gradient-to-r  from-mi-color to-transparent">
            <div className="flex sm:w-5/5 lg:w-3/5 ml-10 justify-center items-center bg-gradient-to-r  from-mi-color to-transparent">
              <img
                className="w-80 rounded-lg hidden sm:block"
                // Establecemos la imagen del póster utilizando la constante imageUrl y el valor de poster_path
                src={`${imageUrl}${poster_path}`}
                alt={title}
              />
              <div className=" lg:m-10 w-5/5 mt-20">
                <p className="text-4xl sm:text-7xl font-bold text-white p-5">
                  {title}
                </p>
                <div className="sm:flex-wrap gap-4 lg:flex px-4 text-center ">
                  {genres.map((g) => (
                    // Mostramos cada género en un elemento p con estilo
                    <p className="border-4 border-white rounded-3xl p-2 text-white text-xl font-bold">
                      {g.name}
                    </p>
                  ))}
                </div>
                <p className="text-xl font-bold text-white p-5">{overview}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Renderizamos el componente Cast con el parámetro id de params */}
        <Cast id={params.id} />
      </div>
    </>
  );
};

// Exportamos la función page como valor predeterminado
export default page;
