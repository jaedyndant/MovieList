const API_KEY = '6b140b84';
const BASE_URL = 'https://www.omdbapi.com/';
const POSTER_URL = 'https://img.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { Error: 'Network error' };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { Error: 'Network error' };
  }
};

export const getPosterUrl = (imdbID, size = 'SX300') => {
  return `${POSTER_URL}?apikey=${API_KEY}&i=${imdbID}&h=${size}`;
};