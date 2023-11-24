import axios from 'axios';

axios.defaults.baseURL = 'http://43.201.166.82:3000/';
// axios.defaults.baseURL = "https://app.vpspace.net/";

export function getTeams() {
   return axios.get('/team/all');
}

export function addMember(teamName, userName) {
   return axios.post('team/member', {
      team_name: teamName,
      user_name: userName,
   });
}

export function applyToTeam(user, team, comment, job) {
   return axios.post('team/teamapply', {
      user: user,
      team: team,
      comment: comment,
      job: job,
   });
}

export function deleteMember(teamName, userName) {
   return axios.post('/team/member/delete', {
      team_name: teamName,
      user_name: userName,
   });
}

export function getTeamInfoByIndex(teamIndex) {
   return axios.post('/team/details', {
      index: teamIndex,
   });
}

export function createTeam({ inputData }) {
   console.log({ ...inputData });
   return axios.post('/team', { ...inputData });
}

export function modifyTeam({ inputData }) {
   console.log({ ...inputData });
   return axios.put('/team', { ...inputData });
}

export function viewUp(teamIndex) {
   return axios.post('team/viewup', {
      index: teamIndex,
   });
}

export function getJobs() {
   return axios.get('team/joblist');
}

export function addJob(teamName, jobName, recruitmentNum) {
   return axios.post('team/addjob', {
      team: teamName,
      job: jobName,
      num: recruitmentNum,
   });
}

export function getProjectCategory() {
   return axios.get('team/projectCategory');
}
