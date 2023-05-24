import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(token, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  await api.post(`/logout`, JSON.stringify(token)).then(success).catch(fail);
}

async function reissue(token, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  await api.post(`/reissue`, JSON.stringify(token)).then(success).catch(fail);
}

export { login, logout, reissue };
