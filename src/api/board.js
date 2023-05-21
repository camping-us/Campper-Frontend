import { apiInstance } from "./index.js";

const api = apiInstance();

function listBoard(param, success, fail) {
  api.get(`/boards`, { params: param }).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
    api.post(`/board`, JSON.stringify(board)).then(success).catch(fail);
  }
  
  function getBoard(boardno, success, fail) {
    api.get(`/board/${boardno}`).then(success).catch(fail);
  }
  
  function modifyBoard(board, success, fail) {
    api.put(`/board`, JSON.stringify(board)).then(success).catch(fail);
  }
  
  function deleteBoard(boardno, success, fail) {
    api.delete(`/board/${boardno}`).then(success).catch(fail);
  }

export { listBoard, writeBoard, getBoard, modifyBoard, deleteBoard };
