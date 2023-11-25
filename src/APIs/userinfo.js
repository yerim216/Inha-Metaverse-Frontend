import axios from 'axios';

// axios.defaults.baseURL = "https://app.vpspace.net/";
axios.defaults.baseURL = 'http://43.201.166.82:3000/';

export function getUserIndex(userEmail, pw) {
   return axios.post('/account', {
      email: userEmail,
      pw: pw,
   });
}

export function getUserInfo(userIndex) {
   return axios.post('/userinfo', {
      index: userIndex,
   });
}

export function getUserInterested() {
   return axios.get('/userinfo/interested');
}

export function addInterested(userIndex, fieldIndex) {
   return axios.post('/userinfo/interested/put', {
      user_index: userIndex,
      field_index: fieldIndex,
   });
}

export function getTeamIndex(userIndex) {
   return axios.post('/userinfo/team', {
      index: userIndex,
   });
}

export function getSkills() {
   return axios.get('/userinfo/skill');
}

export function putUserCareer(userIndex, userCareer, startYear, startMonth, endYear, endMonth) {
   console.log({
      index: userIndex,
      career: userCareer,
      start_year: startYear,
      start_month: startMonth,
      end_year: endYear,
      end_month: endMonth,
   });

   return axios.post('/userinfo/put/career', {
      index: userIndex,
      career: userCareer,
      start_year: startYear,
      start_month: startMonth,
      end_year: endYear,
      end_month: endMonth,
   });
}

export function getUserCareer(userIndex, userCareer) {
   return axios.post('/userinfo/get/career', {
      user: userIndex,
   });
}

export function putUserIntroduction(userIndex, userIntroduction) {
   return axios.post('/userinfo/put/introduction', {
      index: userIndex,
      introduction: userIntroduction,
   });
}

export function putUserJob(userIndex, userJob) {
   return axios.post('/userinfo/put/job', {
      index: userIndex,
      job: userJob,
   });
}

export function putUserInterest(userIndex, userInterest) {
   return axios.post('/userinfo/interested/put', {
      user_index: userIndex,
      field_index: userInterest,
   });
}

export function deleteUserInterest(userIndex, userInterest) {
   return axios.post('/userinfo/interested/delete', {
      user_index: userIndex,
      field_index: userInterest,
   });
}

export function putUserSkill(userIndex, skillIndex) {
   return axios.post('/userinfo/skill/put', {
      user_index: userIndex,
      skill_index: skillIndex,
   });
}

export function deleteUserSkill(userIndex, skillIndex) {
   return axios.post('/userinfo/skill/delete', {
      user_index: userIndex,
      skill_index: skillIndex,
   });
}

export function putUserProfileImg(userIndex, imgIndex) {
   return axios.post('/userinfo/put/img', {
      index: userIndex,
      image: imgIndex,
   });
}

export function putUserImg(userIndex, userImg) {
   return axios.post('/userinfo/put/img', {
      index: userIndex,
      image: userImg,
   });
}
