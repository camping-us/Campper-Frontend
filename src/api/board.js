import { apiInstance } from "./index.js";

const api = apiInstance();

function listBoard(param, success, fail) {
  api.get(`/boards`, { params: param }).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
    api.post(`/boards`, JSON.stringify(board)).then(success).catch(fail);
  }
  
  function getBoard(boardno, success, fail) {
    api.get(`/boards/${boardno}`).then(success).catch(fail);
  }
  
  function modifyBoard(board, success, fail) {
    api.put(`/boards`, JSON.stringify(board)).then(success).catch(fail);
  }
  
  function deleteBoard(boardno, success, fail) {
    api.delete(`/boards/${boardno}`).then(success).catch(fail);
  }

export { listBoard, writeBoard, getBoard, modifyBoard, deleteBoard };
