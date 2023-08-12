import axios from "axios";

axios.defaults.baseURL = "https://www.app.vpspace.net/";

export function getTeamMembers(teamIndex) {
  return axios.post("/team/member/teamidx", {
    index: teamIndex,
  });
}

export function getTeams() {
  return axios.get("/team/all");
}

export function addMember(teamName, userName) {
  alert(teamName);
  alert(userName);
  return axios.post("team/member", {
    team_name: teamName,
    user_name: userName,
  });
}

export function deleteMember(teamName, userName) {
  return axios.post("/team/member/delete", {
    team_name: teamName,
    user_name: userName,
  });
}

export function getTeamInfoByIndex(teamIndex) {
  return axios.post("/team/list", {
    index: teamIndex,
  });
}

export async function createTeam(inputs) {
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
  try {
    await axios.post("/team", {
      name: inputs.name,
      introduction: inputs.introduction,
      description: inputs.description,
      recruitment: inputs.recruitment,
      created_at: dateTime,
    });
    return inputs.name; // inputs.name 변수 리턴
  } catch (error) {
    console.error("Error creating team:", error);
  }
}
