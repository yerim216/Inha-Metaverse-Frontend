import axios from "axios";

// axios.defaults.baseURL = "https://app.vpspace.net/";
axios.defaults.baseURL = "http://43.201.166.82:3000/";

export function getSchedule(teamIndex) {
  return axios.post("/schedule/list", {
    index: teamIndex,
  });
}

export function getScheduleCalendar(teamIndex) {
  return axios.post("/schedule/list/calendar", {
    index: teamIndex,
  });
}

export function addManagerToSchedule(scheduleIdx, managerIdx) {
  return axios.post("/schedule/put/manager", {
    schedule: scheduleIdx,
    manager: managerIdx,
  });
}

export function addScheduleByToDo({
  team,
  title,
  content,
  status,
  start_date,
  end_date,
  writer,
  created_at,
  color,
}) {
  // console.log({
  //   team: team,
  //   title: title,
  //   content: content,
  //   status: status,
  //   start_date: start_date,
  //   end_date: end_date,
  //   writer: writer,
  //   created_at: created_at,
  //   color: color,
  // });
  return axios.post("/schedule/put", {
    team: team,
    title: title,
    content: content,
    status: status,
    start_date: start_date,
    end_date: end_date,
    writer: writer,
    created_at: created_at,
    color: color,
  });
}

export function deleteEvent(deleteEventIndex) {
  return axios.post("schedule/delete", {
    index: deleteEventIndex,
  });
}

export function modifyEvent({
  team,
  title,
  content,
  status,
  start_date,
  end_date,
  writer,
  last_update,
  color,
}) {
  // console.log({
  //   team: team,
  //   title: title,
  //   content: content,
  //   status: status,
  //   start_date: start_date,
  //   end_date: end_date,
  //   writer: writer,
  //   last_update: last_update,
  //   color: color,
  // });
  return axios.post("/schedule/modify  ", {
    team: team,
    title: title,
    content: content,
    status: 1,
    start_date: start_date,
    end_date: end_date,
    writer: writer,
    last_update: last_update,
    color: color,
  });
}
