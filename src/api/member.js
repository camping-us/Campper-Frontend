import { apiInstance } from "./index.js";

const api = apiInstance();

async function signup(user, success, fail) {
  await api.post(`/users`, JSON.stringify(user)).then(success).catch(fail);
}

async function getProfile(user, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  await api.get(`/users/profile`).then(success).catch(fail);
}

export { signup, getProfile };
