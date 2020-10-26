import http from "./httpService";
import jwtDecode from "jwt-decode";

const token = "token";

http.setJwt(localStorage.getItem(token));

export async function login(email, password) {
  const { data: jwt } = await http.post("/auth", {
    email,
    password,
  });
  localStorage.setItem(token, jwt);
}

export function loguot() {
  localStorage.removeItem(token);
}

export function saveJwt(jwt) {
  localStorage.setItem(token, jwt);
}

export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem(token));
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(token);
}

export default {
  login,
  loguot,
  saveJwt,
  getCurrentUser,
  getJwt,
};
