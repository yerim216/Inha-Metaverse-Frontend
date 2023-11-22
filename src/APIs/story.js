import axios from "axios";

// axios.defaults.baseURL = "https://app.vpspace.net/";
axios.defaults.baseURL = "http://43.201.166.82:3000/";

export function writeStory({}) {
  return axios.post("/story", {});
}
