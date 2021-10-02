import http from "./http-service";
import { apiUrl } from "../config.json";

export function login(user) {
  return http.post(apiUrl + "/auth", {
    email: user.email,
    password: user.password,
  });
}
