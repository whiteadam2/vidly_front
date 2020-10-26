import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getGenres() {
  const { data: genres } = await http.get(apiUrl + "/genres");
  return genres;
}
