import axios from "axios";

axios.defaults.baseURL = "https://app.vpspace.net/";

export function getDownload() {
  return axios.get("/get/download/archifree/build.zip");
}
