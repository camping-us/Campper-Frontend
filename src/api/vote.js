import { apiInstance } from "./index.js";

const api = apiInstance();

function registVote(campno, vote, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api.post(`/votes/${campno}`, JSON.stringify(vote)).then(success).catch(fail);
}

function updateVote(voteno, vote, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api.put(`/votes/${voteno}`, JSON.stringify(vote)).then(success).catch(fail);
}

function checkVote(campno, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api.get(`/votes/check/${campno}`).then(success).catch(fail);
}

function viewVote(campno, success, fail) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  api.get(`/votes/${campno}`).then(success).catch(fail);
}

export { registVote, updateVote, checkVote, viewVote };
