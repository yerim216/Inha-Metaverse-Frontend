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

const Calendar = () => {
  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);

  const userLoginString = userLogin.email.toString();

  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.post(
        "https://www.app.vpspace.net/team/emailtoteam",
        {
          email: userLoginString,
        }
      ); // 이벤트를 저장하는 API 엔드포인트로 변경, userLoginString과 newEvent를 요청에 포함

      const index = response.data[0].team_index; // 받아온 인덱스 처리
      setIndex(index);

      console.log("Team index loaded successfully with:", index);

      const response2 = await axios.post(
        "https://www.app.vpspace.net/schedule/list",
        {
          //팀인덱스에 따라 db events 불러오기
          index: index,
        }
      );

      // const eventDataTransform = (event) => {
      //   if (event.allDay) {
      //       event.end = moment(event.end).subtract(1, 'days');
      //   }
      //   return event;
      // };
      const convertedEvents = response2.data.map((data) => ({
        title: data.schedule_name,
        start: data.start_date,
        end: data.end_date,
        extendedProps: {
          writer_name: data.writer_name,
        },
      }));

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

      var sstart = arg.start.toISOString();
      var endd = arg.end.toISOString();

      var nstart = sstart.substring(0, 10).replace(/-/g, "");
      var nend = endd.substring(0, 10).replace(/-/g, "");

      try {
        const newEvent = {
          title: title,
          start: sstart,
          end: endd,
          created_at: dateTime,
        };

        const newEvent2 = {
          name: title,
          start_date: nstart,
          end_date: nend,
          created_at: dateTime,
          writer: 1,
          team: index,
        };

        console.log(newEvent2);
        console.log(events);

        var jsondata = JSON.stringify(newEvent2);
        console.log(jsondata);
        setEvents([...events, newEvent]);
        addEventToDB(newEvent2);
      } catch (error) {
        console.error("Error saving event:", error);
      }
    }
  };
  const addEventToDB = (event) => {
    axios
      .post("https://app.vpspace.net/schedule/put", event)
      .then((response) => {
        // 요청 성공 시 처리할 코드
        console.log(response.data);
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
          eventLimit={2}
          dayMaxEvents={true}
          height="90vh"
          selectable={true}
          select={handleDateSelect}
        />
      </div>
    </div>
  );
};

export default Calendar;
