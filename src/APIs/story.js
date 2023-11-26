import axios from "axios";

// axios.defaults.baseURL = "https://app.vpspace.net/";
axios.defaults.baseURL = "http://43.201.166.82:3000/";

export function writeStory(input) {
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

  return axios.post("/story", { ...input, created_at: dateTime });
}

export function getStories() {
  return axios.get("/story/all");
}

export function getStoryCommentsInRecent(storyIdx) {
  return axios.post("/story/reply/recent", { story: storyIdx });
}

export function getStoryCommentsInThumb(storyIdx) {
  return axios.post("/story/reply/thumb", { story: storyIdx });
}

// 현재는 대댓글 기능 제외.
export function writeComment({ storyIdx, userIdx, content }) {
  console.log({
    story: storyIdx,
    user: userIdx,
    content,
    parent: null,
  });

  return axios.post("/story/reply", {
    story: storyIdx,
    user: userIdx,
    content,
    parent: null,
  });
}
