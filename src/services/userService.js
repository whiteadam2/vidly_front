import http from "./httpService";

export function register(user) {
  return http.post("/users", {
    name: user.name,
    password: user.password,
    email: user.login,
  });
}
