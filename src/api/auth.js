import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("accessToken")}`;
  //   console.log("모야모야" + api.defaults.headers.common["Authorization"]);
  await api.post(`/logout`).then(success).catch(fail);
}

export { login, logout };
