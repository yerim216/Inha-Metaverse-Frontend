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
  size_x,
  size_y,
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

  console.log({
    team: teamIndex,
    content: content,
    writer: writerIndex,
    x: x,
    y: y,
    size_x: size_x,
    size_y: size_y,
    color: color,
    created_at: dateTime,
  });

  return axios.post("/sticker_note/put", {
    team: teamIndex,
    content: content,
    writer: writerIndex,
    x: Math.round(x),
    y: Math.round(y),
    size_x: Math.round(size_x),
    size_y: Math.round(size_y),
    color: color,
    created_at: dateTime,
  });
}

export function modifySticker(stickerInfos) {
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

  const data = stickerInfos.map((item) => {
    const {
      team_name,
      note_writer,
      user_name,
      team_index,
      created_at,
      ...newItem
    } = item;
    return newItem;
  });

  const updatedData = data.map((item) => {
    return {
      index: item.note_index,
      content: item.note_content,
      x: Math.round(item.note_x),
      y: Math.round(item.note_y),
      size_x: Math.round(item.size_x),
      size_y: Math.round(item.size_y),
      color: item.note_color,
      last_update: dateTime,
    };
  });

  return axios.post("/sticker_note/modify", updatedData);
}
