import http from "./httpService";

export async function getMovies() {
  const { data: movies } = await http.get("/movies");
  return movies;
}

export async function getMovie(movieId) {
  const { data: movie } = await http.get("/movies/" + movieId);
  return movie;
}

export function deleteMovie(movieId) {
  return http.delete("/movies/" + movieId);
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  return movie._id
    ? http.put("/movies/" + movie._id, body)
    : http.post("/movies", body);
}
