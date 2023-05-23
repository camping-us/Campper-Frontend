import { apiInstance } from "./index.js";

const api = apiInstance();

function boardLike(boardno, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  api.post(`/board-like/${boardno}`).then(success).catch(fail);
}

export { boardLike };
