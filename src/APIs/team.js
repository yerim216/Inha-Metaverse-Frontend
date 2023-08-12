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
  return axios.post("team/member", {
    team_name: teamName,
    user_name: userName,
  });
}

// export function getTeamIndex(userLoginString) {
//   return axios.post("/team/emailtoteam", {
//     email: userLoginString,
//   });
// }

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
