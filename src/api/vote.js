import { apiInstance } from "./index.js";

const api = apiInstance();

function registVote(campno, vote, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  api.post(`/votes/${campno}`, JSON.stringify(vote)).then(success).catch(fail);
}

export { registVote };
