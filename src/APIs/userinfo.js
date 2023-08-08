import axios from "axios";

axios.defaults.baseURL = "https://www.app.vpspace.net/";

export function getUserInfo(userEmail) {
  return axios.post("/userinfo", {
    email: userEmail,
  });
}

export function getUserInterested() {
  return axios.get("/userinfo/interested");
}
