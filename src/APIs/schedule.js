import axios from "axios";

axios.defaults.baseURL = "https://www.app.vpspace.net/";

export function getSchedule(teamIndex) {
  return axios.post("/schedule/list", {
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
