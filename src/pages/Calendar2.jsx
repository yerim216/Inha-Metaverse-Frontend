import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import "../styles/calendar2.css";
import { useOutletContext,useHistory } from "react-router-dom";
import CalEventClickModal from "../components/CalEventClickModal";
import ReviseEvent from "../components/ReviseEvent";

const Calendar = () => {
  // 여기 팀인덱스에요
  const { teamIndex } = useOutletContext();

  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userLoginString = userLogin.email.toString();

  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState();
  const [selectedID,setSelectedId] = useState([]);
  const [selectedStart,setSelectedStart] = useState("");
  const [selectedEnd,setSelectedEnd] = useState("");

  const [modalDeleteButtons, setmodalDeleteButtons] = useState(false);
  const [modalReviseButtons, setmodalReviseButtons] = useState(false);
  const [dateClick, setDateClick] = useState(false);

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
      
      //db 보낼 용도 yyyymmdd
      const parts1 = startDateplus.split('-');
      // Create a new date string in 'yyyymmdd' format
      const dbstart = parts1[0] + parts1[1] + parts1[2];

      const parts2 = extractedEnd.split('-');
      // Create a new date string in 'yyyymmdd' format
      const dbend = parts2[0] + parts2[1] + parts2[2];

      try {
        const newEvent = {
          "title": title,
          "start": startDateplus,
          "end": endDateplus,
          "created_at": dateTime,
        };
        console.log(dbstart);

        console.log(dbend);
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

  const addEventToDB = (event) => { //이벤트 추가하기 
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

  //이벤트 클릭 -> 모달창(일정 수정 or 선택창) 나타나게
  const handleEventClick = (info) => { 

    const { event } = info;

    const eventTitle = event.title;
    setSelectedEventTitle(eventTitle); //삭제할 이벤트 제목 저장

    const eventId= event.id;
    setSelectedId(eventId); //삭제할 이벤트 아이디 저장

    const eventStart =event.start;
    setSelectedStart(eventStart);

    const eventEnd =event.end;
    setSelectedEnd(eventEnd);

    console.log("Clicked ID:", eventStart);

    setIsOpen(true);

    const a = JSON.stringify(eventTitle);

  };

  const deleteClick = () => {
    setmodalDeleteButtons(true);
    console.log("삭제 누르셨어여");
    deleteEvent(selectedID); //삭제함수호출

  };
  const reviseClick = () => {
    setmodalReviseButtons(true);
  };

  const deleteEvent = (deleteEventId) => { //이벤트 삭제하기 

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

  function modifyTimeToZero(dateString) {
    const dateParts = dateString.split(" ");
    const timeParts = dateParts[1].split(":");
  
    timeParts[0] = "0";
    timeParts[1] = "0";
    timeParts[2] = "0";
  
    const modifiedDateString = `${dateParts[0]} ${timeParts.join(":")}`;
    return modifiedDateString;
  }

  const dropEvent = (info) =>{ //이벤트 옮기기
    console.log("dropEvent 작동");
    
    const { event } = info;

    const eventTitle = event.title;
    setSelectedEventTitle(eventTitle); //수정할 이벤트 제목 저장
    console.log(event.title);
    const eventId= event.id;
    const integerNumber = parseInt(eventId);
    console.log(integerNumber);
    setSelectedId(integerNumber); //수정할 이벤트 아이디 저장

    const eventStart =event.start;

    if(eventStart!=null){    
      const cDateStart =
      eventStart.getFullYear() +
      "-" +
      (eventStart.getMonth() + 1) +
      "-" +
      eventStart.getDate();
    const cTimeStart =
    eventStart.getHours() +
      ":" +
      eventStart.getMinutes() +
      ":" +
      eventStart.getSeconds();
    const dateTime = cDateStart + " " + cTimeStart;
    const dateStringStart = dateTime.toLocaleString();
    
    const te=modifyTimeToZero(dateStringStart);

    console.log(te);

    setSelectedStart(te);
    }

    if(event.end===null){
      const eventEnd = event.start;
      setSelectedEnd(eventEnd);

      if(eventEnd!=null){    

      const cDateEnd =
        eventEnd.getFullYear() +
          "-" +
          (eventEnd.getMonth() + 1) +
          "-" +
          eventEnd.getDate();
        const cTimeEnd =
        eventEnd.getHours() +
          ":" +
          eventEnd.getMinutes() +
          ":" +
          eventEnd.getSeconds();
        const dateTimeEnd = cDateEnd + " " + cTimeEnd;
        const dateStringEnd = dateTimeEnd.toLocaleString();
        const te=modifyTimeToZero(dateStringEnd);

        console.log(te);

        setSelectedEnd(te);
      }
    }
    else{
      const eventEnd = event.end;
      setSelectedEnd(eventEnd);

      if(eventEnd!=null){    

        const cDateEnd =
          eventEnd.getFullYear() +
            "-" +
            (eventEnd.getMonth() + 1) +
            "-" +
            eventEnd.getDate();
          const cTimeEnd =
          eventEnd.getHours() +
            ":" +
            eventEnd.getMinutes() +
            ":" +
            eventEnd.getSeconds();
          const dateTimeEnd = cDateEnd + " " + cTimeEnd;
          const dateStringEnd = dateTimeEnd.toLocaleString();
          const te=modifyTimeToZero(dateStringEnd);

          console.log(typeof(te));
  
          setSelectedEnd(te);        
        }
    } 
    
  reviseEvent();
    

  };

  const reviseEvent = ()=>{
    axios
      .post(requestURL+"schedule/modify", {
        "index": selectedID,
        "name": selectedEventTitle,
        "start_date": selectedStart,
        "end_date": selectedEnd
      })
      .then((response) => {
        console.log("이벤트 수정완료 : "+response);
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error revise event to DB:", error);
      });
  };

  useEffect(() => {
    if(selectedStart != null){
      reviseEvent();
    }
  }, [selectedStart]);

  const wrapp = {
    marginTop: "20px", //왜 새로고침하면 적용이 안되는거야
    height:"90vh",
    width: "94vw",
    margin: "auto",
    position:"relative",
    /* 둥근 모서리가 잘려보이지 않도록 오버플로우 처리 */
  }

  const round ={
    marginTop: "10px",
    paddingTop: "5px",
    width:"100%",
    height:"100%",
    borderRadius: "10px",
    overflow: "hidden",
    border: '1px solid white',
    backgroundColor: "#1f1f1f"
  }
  
  return (
      <div style={wrapp}>
        <div style={round}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin,listPlugin]}
          initialView="dayGridMonth"

          headerToolbar={{
            start: 'title',
            // center: '', //timeGridWeek,timeGridDay
            end: 'prev,today,dayGridMonth,next',
          }}
          events={events}
          expandRows={true}
          navLinks={true}
          editable={true}
          droppable={true}
          // eventLimit={2}
          dayMaxEvents={true}
          height="100%"
          // aspectRatio={1}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop ={dropEvent}
        />
        </div>
        
        
        {isOpen && (
          <CalEventClickModal
            open={isOpen}
            eventTitle={selectedEventTitle}
            onClose={() => {
              setIsOpen(false);
            }}
            deleteButtonClick={deleteClick}
            reviseButtonClick={reviseClick}
          />
        )} 
           
        {modalReviseButtons && (
          <ReviseEvent
            open={isOpen}
            eventTitle={selectedEventTitle}
            selectEventId={selectedID}
            eventStartDate={selectedStart}
            eventEndDate={selectedEnd}
            onClose={() => {
              setmodalReviseButtons(false);
            }}
            fetch={fetchEvents}
          />
        )}   

      </div>
  );
};

export default Calendar;
