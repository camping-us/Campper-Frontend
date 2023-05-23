import { apiInstance } from "./index.js";

const api = apiInstance();

function commentLike(commentno, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  api.post(`/comment-like/${commentno}`).then(success).catch(fail);
}

export { commentLike };
