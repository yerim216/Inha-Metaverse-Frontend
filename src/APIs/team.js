import axios from "axios";

axios.defaults.baseURL = "http://43.201.166.82:3000/";
// axios.defaults.baseURL = "https://app.vpspace.net/";

export function getTeams() {
  return axios.get("/team/all");
}

export function addMember(teamName, userName) {
  return axios.post("team/member", {
    team_name: teamName,
    user_name: userName,
  });
}

export function applyToTeam(user, team, comment, job) {
  return axios.post("team/teamapply", {
    user: user,
    team: team,
    comment: comment,
    job: job,
  });
}

export function getApplied(teamIndex) {
  return axios.post("team/apply", {
    index: teamIndex,
  });
}

export function deleteMember(teamName, userName) {
  return axios.post("/team/member/delete", {
    team_name: teamName,
    user_name: userName,
  });
}

export function getTeamInfoByIndex(teamIndex) {
  return axios.post("/team/details", {
    index: teamIndex,
  });
}

export function createTeam({ inputData }) {
  console.log({ ...inputData });
  return axios.post("/team", { ...inputData });
}

export function modifyTeam({ inputData }) {
  console.log({ ...inputData });
  return axios.put("/team", { ...inputData });
}

export function viewUp(teamIndex) {
  return axios.post("team/viewup", {
    index: teamIndex,
  });
}

export function getJobs() {
  return axios.get("team/joblist");
}

export function addJob(teamName, jobName, recruitmentNum) {
  return axios.post("team/addjob", {
    team: teamName,
    job: jobName,
    num: recruitmentNum,
  });
}

export function getProjectCategory() {
  return axios.get("team/projectCategory");
}

export function getPageCount() {
  return axios.get("team/lastpage");
}

export function getPageCountWithFilter(indices) {
  console.log({
    filtering: indices,
  });
  return axios.post("team/filter_lastpage", {
    filtering: indices,
  });
}

export function getTeamsInPagination(pageNum) {
  return axios.get(`/team/?page=${pageNum}`);
}

export function getTeamsWithFilter(pageNum, indices) {
  return axios.post(`/team/filter/?page=${pageNum}`, {
    filtering_arr: indices,
  });
}
