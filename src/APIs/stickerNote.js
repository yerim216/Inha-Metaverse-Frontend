import axios from "axios";

axios.defaults.baseURL = "https://app.vpspace.net/";

export function getStickers(teamIndex) {
  return axios.post("/sticker_note/list/team", {
    index: teamIndex,
  });
}

export function createStickerMemo({
  teamIndex,
  content,
  writerIndex,
  x,
  y,
  size,
  color,
}) {
  let current = new Date();
  let cDate =
    current.getFullYear() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getDate();
  let cTime =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  let dateTime = cDate + " " + cTime;

  return axios.post("/sticker_note/put", {
    team: teamIndex,
    content: content,
    writer: writerIndex,
    x: x,
    y: y,
    size: size,
    color: color,
    created_at: dateTime,
  });
}
