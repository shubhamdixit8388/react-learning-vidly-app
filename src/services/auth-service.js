import http from "./http-service";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export async function login(user) {
  const { data: token } = await http.post(apiUrl + "/auth", {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem(tokenKey, token);
}

export function loginWithJwt(jwtToken) {
  localStorage.setItem(tokenKey, jwtToken);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
