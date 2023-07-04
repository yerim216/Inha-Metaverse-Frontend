import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from "../styles/Calendar2.module.css";
import "../styles/calendar2.css";
import { useOutletContext } from "react-router-dom";

const Calendar = () => {
  // 여기 팀인덱스에요
  const { teamIndex } = useOutletContext();

  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userLoginString = userLogin.email.toString();
  const [deleteEv,setDelete] = useState([]);

  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState([]);

  const requestURL = `${window.baseURL}`;

  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      const response2 = await axios.post(
        "https://www.app.vpspace.net/schedule/list", 
        {
          //팀인덱스에 따라 db events 불러오기
          "index": teamIndex
        }
      );

      const convertedEvents = response2.data.map((data) => ({
        title: data.schedule_name,
        start: data.start_date,
        end: data.end_date,
        id: data.schedule_index,
        extendedProps: {
          writer_name: data.writer_name,
        },
      }));
      console.log(convertedEvents);
      setEvents(convertedEvents);

    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDateSelect = async (arg) => {
    // 사용자가 이벤트 추가
    const title = prompt("이벤트 이름을 입력하세요:");

    var timestamp = new Date().getTime();
    // var currentDate = new Date(timestamp); - timestamp -> Date 객체 변환
    var eventString = new Array();
    if (title) {
      const current = new Date();
      const cDate =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const cTime =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      const dateTime = cDate + " " + cTime;
      const dateString = dateTime.toLocaleString();

      //db용 타임스탬프변환
      const dbtimestamp = new Date(dateTime).getTime();

      var sstart = arg.start.toISOString();
      var endd = arg.end.toISOString();
      const extractedStart = sstart.substr(0, 10); //yyyy-mm-dd
      const extractedEnd = endd.substr(0, 10);
      
      //하루 늦추기
      const startDate = new Date(arg.start);
      startDate.setDate(startDate.getDate() + 1);

      const startDateplus = startDate.toISOString().split('T')[0]; // Convert back to 'yyyy-mm-dd' format
      console.log("시작 하루 늦추는 중"+startDateplus);

      const endDate = new Date(arg.end);
      endDate.setDate(endDate.getDate() + 1);

      const endDateplus = endDate.toISOString().split('T')[0]; // Convert back to 'yyyy-mm-dd' format
      console.log(" 끝 날 하루 늦추는 중"+endDateplus);
      //
     
      var nstart = sstart.substring(0, 10).replace(/-/g, ""); //yyyymmdd
      var nend = endd.substring(0, 10).replace(/-/g, "");
      
      //db 보낼 용도 yyyymmdd
      const parts1 = startDateplus.split('-');

      // Create a new date string in 'yyyymmdd' format
      const dbstart = parts1[0] + parts1[1] + parts1[2];

      const parts2 = extractedEnd.split('-');

      // Create a new date string in 'yyyymmdd' format
      const dbend = parts2[0] + parts2[1] + parts2[2];
      console.log(dbstart);
      console.log(dbend);

      ////

      try {
        const newEvent = {
          "title": title,
          "start": startDateplus,
          "end": endDateplus,
          "created_at": dateTime,
        };

        const newEvent2 = {
          name: title,
          start_date: dbstart,
          end_date: dbend,
          created_at: dateString,
          writer: 1,
          team: teamIndex
        };
        var jsondata = JSON.stringify(newEvent2); //json형태의 obj 변수 내용 확인용
        console.log("디비야 어디갔어"+jsondata);
        setEvents([...events, newEvent]);
        addEventToDB(newEvent2);
      } catch (error) {
        console.error("Error saving event:", error);
      }
    }
  };

  const addEventToDB = (event) => {
    console.log(event);
    axios
      .post(requestURL+"schedule/put", event)
      .then((response) => {
        console.log("이벤트 추가 완료 : "+response);

      })
      .catch((error) => {
        console.error("Error adding event to DB:", error);
      });
  };

  const editEvent=(info)=>{
    const { event } = info;
    const eventTitle = event.title;
    const no = window.confirm(eventTitle + " 이벤트 옮겨?");

  }

  const handleEventClick = (info) => {
    const { event } = info;
    const eventTitle = event.title;
    const confirmDelete = window.confirm(eventTitle + " 이벤트를 삭제하시겠습니까?");

    console.log("Clicked event title:", eventTitle);

    const eventId= event.id;
    console.log("Clicked ID:", eventId);

    if (confirmDelete) {
      deleteEvent(eventId); //삭제함수호출
      setDelete(eventId); //삭제할 아이디 저장?

    }
  };

  const deleteEvent = (deleteEventId) => {
    
    // const eventTitle = deleteEv.title;
    console.log("DB check Clicked event ID:", deleteEventId);

    // var etoj = JSON.stringify(events); //json형태의 obj 변수 내용 확인용

    // console.log(etoj);

    axios
      .post(requestURL+"schedule/delete", {"index": deleteEventId})
      .then((response) => {
        console.log("이벤트 삭제 완료 : "+response);
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error adding event to DB:", error);
      });
  };

  
  return (
    <div className={styles.wrapper}>
      <div className={styles.child}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          expandRows={true}
          navLinks={true}
          editable={true}
          droppable={true}
          drop={editEvent}
          eventLimit={2}
          dayMaxEvents={true}
          height="90vh"
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
        
        

      </div>
    </div>
  );
};

export default Calendar;
