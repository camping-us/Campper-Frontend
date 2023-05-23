import { apiInstance } from "./index.js";

const api = apiInstance();

function listComment(param, success, fail) {
  api.get(`/comments`, { params: param }).then(success).catch(fail);
}

function writeComment(param, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  api.post(`/comments`, JSON.stringify(param)).then(success).catch(fail);
}

function modifyComment(param, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;

  api.get(`/comments`, JSON.stringify(param)).then(success).catch(fail);
}

function deleteComment(param, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;

  api.delete(`/comments`, { params: param }).then(success).catch(fail);
}

export { listComment, writeComment, modifyComment, deleteComment };
