import { apiInstance } from "./index.js";

const api = apiInstance();

function listCamp(success, fail) {
  api.get(`/places`).then(success).catch(fail);
}

function viewCamp(campno, success, fail) {
  api.get(`/places/${campno}`).then(success).catch(fail);
}

function registDib(campno, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  api.post(`/camp-dibs/${campno}`).then(success).catch(fail);
}

export { listCamp, viewCamp, registDib };
