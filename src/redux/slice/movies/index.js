// Se importan las dependencias necesarias
import { api_key } from "@/helpers/config";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Se define el estado inicial del slice de Redux
const initialState = {
  dataMovies: [],
  dataMoviesAll: [],
  dataMoviesProx: [],
  totalPages: 1,
  searchTerm: "",
  currentPage: 1,
  loading: false,
};

// Se define el slice de Redux utilizando la función createSlice
export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Se definen las acciones que pueden ser despachadas para actualizar el estado
    setDataMovies: (state, action) => {
      state.dataMovies = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDataMoviesAll: (state, action) => {
      state.dataMoviesAll = action.payload;
    },
    setDataMoviesProx: (state, action) => {
      state.dataMoviesProx = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Se define una acción asíncrona que hace una solicitud HTTP a la API de The Movie Database para obtener las películas populares
export const getMovies = () => async (dispatch) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-Es`
  );
  dispatch(setDataMovies(data.data.results));
};

// Se define una acción asíncrona que hace una solicitud HTTP a la API de The Movie Database para buscar películas por término de búsqueda
export const getSearchMovies =
  (searchTerm, currentPage) => async (dispatch) => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}&language=es-Es&page=${currentPage}`
    );
    dispatch(setDataMoviesAll(data.data.results));
    dispatch(setTotalPages(data.data.total_pages));
  };

// Se define una acción asíncrona que hace una solicitud HTTP a la API de The Movie Database para obtener las películas mejor valoradas
export const getMoviesAll = (currentPage) => async (dispatch) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=es&page=${currentPage}`
  );
  dispatch(setDataMoviesAll(data.data.results));
  dispatch(setTotalPages(data.data.total_pages));
};

// Se define una acción asíncrona que hace una solicitud HTTP a la API de The Movie Database para obtener las próximas películas
export const getMoviesProx = () => async (dispatch) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=es-Es`
  );
  dispatch(setDataMoviesProx(data.data.results));
};

export const getLoading = () => async (dispatch) => {
  dispatch(setLoading(true));
};

// Se exportan las acciones y el slice de Redux
export const {
  setDataMovies,
  setSearchTerm,
  setCurrentPage,
  setTotalPages,
  setDataMoviesAll,
  setDataMoviesProx,
  setLoading,
} = movieSlice.actions;

export default movieSlice.reducer;
