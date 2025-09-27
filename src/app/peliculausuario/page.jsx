"use client";

import { createItem, getItems, updateItem, deleteItem } from "@/api";
import { useEffect, useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [movies, setMovies] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    showMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateItem(editId, { title, genre, sinopsis });
      setEditId(null);
    } else {
      await createItem({ title, genre, sinopsis });
    }
    showMovies();
    setTitle("");
    setGenre("");
    setSinopsis("");
  };

  const showMovies = () => {
    getItems().then((data) => setMovies(data));
  };

  const handleEdit = (movie) => {
    setEditId(movie.id);
    setTitle(movie.title);
    setGenre(movie.genre);
    setSinopsis(movie.sinopsis);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    showMovies();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6 mb-10"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          {editId ? "Editar Película" : "Crear Película"}
        </h2>
        <input
          type="text"
          placeholder="Ingresa el título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Ingresa el género"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Ingresa la sinopsis"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {editId ? "Guardar cambios" : "Crear película"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setTitle("");
              setGenre("");
              setSinopsis("");
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
          >
            Cancelar edición
          </button>
        )}
      </form>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {movies.length === 0 ? (
          <p className="text-white text-center col-span-3">
            No hay películas creadas
          </p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-blue-700 hover:scale-105 transition-transform flex flex-col"
            >
              <h3 className="text-2xl font-extrabold mb-2 text-blue-400">
                {movie.title}
              </h3>
              <p className="text-base font-semibold mb-1 text-blue-200">
                <span className="font-bold text-blue-300">Género:</span>{" "}
                {movie.genre}
              </p>
              <p className="text-sm mb-4 text-gray-200">
                <span className="font-bold text-blue-300">Sinopsis:</span>{" "}
                {movie.sinopsis}
              </p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(movie)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
