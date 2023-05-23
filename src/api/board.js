import { apiInstance } from "./index.js";

const api = apiInstance();

function listBoard(param, success, fail) {
  api.get(`/boards`, { params: param }).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api.post(`/boards`, JSON.stringify(board)).then(success).catch(fail);
}

function getBoard(boardno, success, fail) {
  api.get(`/boards/${boardno}`).then(success).catch(fail);
}

function modifyBoard(boardno, board, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api
    .put(`/boards/${boardno}`, JSON.stringify(board))
    .then(success)
    .catch(fail);
}

function deleteBoard(boardno, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api.delete(`/boards/${boardno}`).then(success).catch(fail);
}

export { listBoard, writeBoard, getBoard, modifyBoard, deleteBoard };
