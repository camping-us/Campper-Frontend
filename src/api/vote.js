import { apiInstance } from "./index.js";

const api = apiInstance();

function registVote(campno, vote, success, fail) {
  api.get(`/vote/${campno}`, JSON.stringify(vote)).then(success).catch(fail);
}

export { registVote };
