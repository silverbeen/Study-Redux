import { AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./types";
import { request } from "../utils/axios";

const USER_URL = "/api/user";

export function registerUser(dataToSubmit) {
  const data = request("post", USER_URL + "/register", dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function loginUSER(dataToSubmit) {
  const data = request("post", USER_URL + "/login", dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logoutUser() {
  const data = request("post", USER_URL + "/logout");

  return {
    type: LOGOUT_USER,
    payload: data,
  };
}

export function authUser() {
  const data = request("post", USER_URL + "/auth");

  return {
    type: AUTH_USER,
    payload: data,
  };
}
