import axios from "axios";

axios.defaults.baseURL = "https://app.vpspace.net/";

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
  teamIndex,
  title,
  content,
  status,
  startDate,
  endDate,
  writer,
  createdAt,
  color,
}) {
  return axios.post("/schedule/put", {
    team: teamIndex,
    title: title,
    content: content,
    status: status,
    start_date: startDate,
    end_date: endDate,
    writer: writer,
    created_at: createdAt,
    color: color,
  });
}

export function deleteEvent(deleteEventIndex) {
  return axios.post("schedule/delete", { 
    index: deleteEventIndex 
  })
}

export function modifyEvent({
  teamIndex,
  title,
  content,
  status,
  startDate,
  endDate,
  writer,
  lastUpdate,
  color
}) {
  return axios.post("/schedule/modify  ", { 
    team: teamIndex,
    title: title,
    content: content,
    status: status,
    start_date: startDate,
    end_date: endDate,
    writer: writer,
    last_update: lastUpdate,
    color: color,
  })
}
