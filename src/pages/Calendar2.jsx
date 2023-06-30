import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import styles from "../styles/Calendar2.module.css";
import "../styles/calendar2.css";

const Calendar = () => {

  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);

  const userLoginString = userLogin.email.toString();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.post('http://43.201.166.82:3000/team/emailtoteam', {
        "email": userLoginString,
      }); // 이벤트를 저장하는 API 엔드포인트로 변경, userLoginString과 newEvent를 요청에 포함

      const index = response.data[0].team_index; // 받아온 인덱스 처리
      
      console.log('Team index loaded successfully with:', index);

      const response2 = await axios.post('http://43.201.166.82:3000/schedule/list', { //팀인덱스에 따라 db events 불러오기 
        "index": index,
      });


      const convertedEvents = response2.data.map(data => ({
        title: data.schedule_name,
        start: data.start_date,
        end: data.end_date,
        extendedProps: {
          writer_name: data.writer_name
        }
      }));

      setEvents(convertedEvents);

    } catch (error) {
      console.error('Error saving event:', error);
    }
  };


  const handleDateSelect = async (arg) => {  // 사용자가 이벤트 추가 
    const title = prompt('이벤트 이름을 입력하세요:');
    var timestamp = new Date().getTime();
    // var currentDate = new Date(timestamp); - timestamp -> Date 객체 변환

    if (title) {
      const newEvent = {
        title: title,
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay,
        writer: 1,
        created_at: timestamp,
      };

      try {
        const response = await axios.post('http://43.201.166.82:3000/team/emailtoteam', {
          "email": userLoginString,
        }); // 이벤트를 저장하는 API 엔드포인트로 변경, userLoginString과 newEvent를 요청에 포함
  
        const index = response.data[0].team_index; // 받아온 인덱스 처리
        console.log(index)
        // 이벤트를 state에 추가
        newEvent.team = index;
        console.log(newEvent)
        setEvents([...events, newEvent]);
      } catch (error) {
        console.error('Error saving event:', error);
      }

      saveEvent(newEvent); // 이벤트를 DB에 저장하는 함수 호출

    }
  };

  const saveEvent = async (event) => {
    try {
      await axios.post('http://43.201.166.82:3000/schedule/put', event); // 이벤트를 저장하는 API 엔드포인트로 변경
      console.log('Event saved successfully');
    } catch (error) {
      console.error('Error saving event:', error);
    }
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
