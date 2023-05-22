import { apiInstance } from "./index.js";

const api = apiInstance();

function listComment(board, param, success, fail) {
  console.log(board);
  let boardId = board.id;
  api.get(`/comments/${boardId}`, { params: param }).then(success).catch(fail);
}

// function writeComment(param, success, fail) {
//   api
//     .post(`/comments/${param.boardId}`, { params: param })
//     .then(success)
//     .catch(fail);
// }

// function modifyComment(param, success, fail) {
//   api.get(`/comments`, { params: param }).then(success).catch(fail);
// }

// function deleteComment(param, success, fail) {
//   api.delete(`/comments`, { params: param }).then(success).catch(fail);
// }

export { listComment };
