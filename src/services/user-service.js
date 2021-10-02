import http from "./http-service";
import { apiUrl } from "../config.json";

export function register(user) {
  return http.post(apiUrl + "/users", {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
