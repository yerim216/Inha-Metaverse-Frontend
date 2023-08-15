import axios from "axios";

axios.defaults.baseURL = "https://www.app.vpspace.net/";

export function getUserIndex(userEmail, pw) {
  return axios.post("/account", {
    email: userEmail,
    pw: pw,
  });
}

export function getUserInfo(userIndex) {
  return axios.post("/userinfo", {
    index: userIndex,
  });
}

export function getUserInterested() {
  return axios.get("/userinfo/interested");
}

export function addInterested(userIndex, fieldIndex) {
  return axios.post("/userinfo/interested/put", {
    user_index: userIndex,
    field_index: fieldIndex,
  });
}

export function getTeamIndex(userLoginString) {
  return axios.post("/userinfo/emailtoteam", {
    email: userLoginString,
  });
}

export function getSkills() {
  return axios.get("/userinfo/skill");
}
export function putUserCareer(userIndex, userCareer) {
  return axios.post("/userinfo/put/career", {
    index: userIndex,
    career: userCareer,
  });
}

export function putUserIntroduction(userIndex, userIntroduction) {
  return axios.post("/userinfo/put/introduction", {
    index: userIndex,
    introduction: userIntroduction,
  });
}

export function putUserJob(userIndex, userJob) {
  return axios.post("/userinfo/put/job", {
    index: userIndex,
    job: userJob,
  });
}

export function putUserInterest(userIndex, userInterest) {
  return axios.post("/userinfo/interested/put", {
    user_index: userIndex,
    field_index: userInterest,
  });
}

export function putUserSkill(userIndex, skillIndex) {
  return axios.post("/userinfo/skill/put", {
    user_index: userIndex,
    skill_index: skillIndex,
  });
}
