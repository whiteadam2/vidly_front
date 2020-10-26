import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getMovies() {
  const { data: movies } = await http.get(apiUrl + "/movies");
  return movies;
}

export async function getMovie(movieId) {
  const { data: movie } = await http.get(apiUrl + "/movies/" + movieId);
  return movie;
}

export function deleteMovie(movieId) {
  return http.delete(apiUrl + "/movies/" + movieId);
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  return movie._id
    ? http.put(apiUrl + "/movies/" + movie._id, body)
    : http.post(apiUrl + "/movies", body);
}
