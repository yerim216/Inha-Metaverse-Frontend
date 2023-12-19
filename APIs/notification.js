import axios from "axios";

axios.defaults.baseURL = "http://43.201.166.82:3000/";
// axios.defaults.baseURL = "https://app.vpspace.net/";

export function getNotifications(userIdx) {
  return axios.post("/notification", {
    user: userIdx,
  });
}
