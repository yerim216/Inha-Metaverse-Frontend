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

export function applyToTeam(user_index, team_index, comment, job) {
   return axios.post('team/teamapply', {
      user: user_index,
      team: team_index,
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

export async function createTeam(leaderIndex, inputs) {
   let current = new Date();
   let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
   let cTime = current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
   let dateTime = cDate + ' ' + cTime;

   try {
      await axios.post('/team', {
         leader: leaderIndex,
         name: inputs.name,
         introduction: inputs.introduction,
         description: inputs.description,
         recruitment: inputs.recruitment,
         created_at: dateTime,
      });
      return inputs.name; // inputs.name 변수 리턴
   } catch (error) {
      console.error('Error creating team:', error);
   }
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
