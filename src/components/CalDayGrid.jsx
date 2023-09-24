import React,{useEffect, useState} from "react";
import styles from "../styles/CalDayGrid.module.css";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import { useOutletContext, useHistory } from "react-router-dom";
import { isSameMonth, isSameDay, addDays, parse, format,addMonths} from 'date-fns';
import CalEventBar from "../components/CalEventBar";
import CalEventClickModal from "../components/CalEventClickModal";
import { getSchedule } from "../APIs/schedule";
import { object } from "prop-types";
import axios from 'axios';

import ReviseEvent from "../components/ReviseEvent";


export default function CalDayGrid(props) {
    const { teamIndex } = useOutletContext();
    const [eventArr,setEventArr] = useState([]);
    const [startData,setStartData] = useState('2023-08-26T00:00:00.000Z');
    const [endData,setEndData] = useState('2023-08-27T00:00:00.000Z');
    // const [dayEvent,setDayEvent] = useState([]);
    let [scheduleByDate,setScheduleByDate] = useState({});
    // const [control,setControl] = useState(0);
    const [dayEvent,setDayEvent] = useState([]);
    // const [filteredEvents,setFilteredEvents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalDeleteButtons, setmodalDeleteButtons] = useState(false);
    const [modalReviseButtons, setmodalReviseButtons] = useState(false);
    const [selectedID, setSelectedId] = useState([]);
    const requestURL = `${window.baseURL}`;

    const handleEventClick = (info) => {
        const { event } = info;
    
        // const eventTitle = event.title;
        // setSelectedEventTitle(eventTitle); //삭제할 이벤트 제목 저장
    
        const eventId = info.schedule_index;
        setSelectedId(eventId); //삭제할 이벤트 아이디 저장
    
        // const eventStart = event.start;
        // setSelectedStart(eventStart);
    
        // const eventEnd = event.end;
        // setSelectedEnd(eventEnd);
    
        // console.log("Clicked ID:", eventStart);
    
        setIsOpen(true);
    
        // const a = JSON.stringify(eventTitle);
      };

      const deleteEvent = (deleteEventId) => {
        //이벤트 삭제하기
    
        axios
          .post(requestURL + "schedule/delete", { index: deleteEventId })
          .then((response) => {
            console.log("이벤트 삭제 완료 : " + response);
            fetchData();
          })
          .catch((error) => {
            console.error("Error adding event to DB:", error);
          });
      };

      
      const deleteClick = () => {
        setmodalDeleteButtons(true);
        console.log("삭제 누르셨어여");
        deleteEvent(selectedID); //삭제함수호출
      };
      const reviseClick = () => {
        setmodalReviseButtons(true);
      };

    const fetchData = () => {
        getSchedule(teamIndex)
        .then(function (response) {
            setEventArr([...response.data]);
            })
            .catch(function (error) {
            console.log(error);
            });
      };
      useEffect(()=>{
        fetchData();
    },[]);

    // useEffect(()=>{
    //     // fetchData();
    //     getSchedule(teamIndex)
    //     .then(function (response) {
    //         console.log(response.data);
    //         setEventArr([...response.data]);
    //         })
    //         .catch(function (error) {
    //         console.log(error);
    //         });
    // },[]);

    let c = new Date(); // 현재는 month를 현재 날짜로 받아오고 있음'

    const monthStart =  startOfMonth(c); //이번 달의 시작 날짜
    const monthEnd = endOfMonth(c); //이번 달의 마지막 날짜

    const lastDayOfPreviousMonth = new Date(c.getFullYear(), c.getMonth(), 0); //이전 달의 마지막 날짜
    let nextMonthFirstDay = new Date(c.getFullYear(), c.getMonth() + 1, 1); // 다음달의 첫번째 날짜

    let startDay = monthStart.getDay(); //숫자로 표현, 0부터 시작
    let endDay = monthEnd.getDay(); // 이번달 마지막 요일을 0 1 2로 표현

    let startplus = 6-startDay; //전체 날짜 계산용. 앞뒤로 몇일 남는지 계싼
    let endplus = 6-endDay; // 다음 달 요일 수 (이번 달 캘린더에 걸쳐진) -> 0이면 걸쳐진 날 없음

    let endDate = monthEnd.getDate(); //오늘이 속해있는 달이 한달에 몇일이 있는지 확인 

    let fulldayCount = endDate+startDay+endplus; // 한 화면 전체 날짜 배열 크기
    let weekCount = fulldayCount/7; //일주일 반복 횟수

    let beforeMonthEnd =lastDayOfPreviousMonth.getDay(); //이전 달 마지막 요일이 일 월 화 등 인지를 0 1 2로 표현 
    console.log(beforeMonthEnd);
    console.log(lastDayOfPreviousMonth);

    let beforeMonthEndDate =lastDayOfPreviousMonth.getDate(); //이전 달의 마지막 날짜
    

    let days = {}; //날짜 저장할 오브젝트 
    let eventPriority = {};

    for (let i = beforeMonthEnd; i >= 0 ; i--){ //현재 페이지에 걸쳐진 이전 달 날짜 저장
        const newDate = new Date(lastDayOfPreviousMonth);
        newDate.setDate(newDate.getDate() - i);

        // "yy-mm-dd" 형식의 날짜 문자열로 변환
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const lastMonthDay = String(newDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${lastMonthDay}`;

        let dayput = beforeMonthEndDate - i;

        days[formattedDate] = dayput;
    }

    for (let i = 1; i <= endDate ; i++){

        const newDate = new Date(monthStart);
        newDate.setDate(newDate.getDate() + i - 1);

        // "yy-mm-dd" 형식의 날짜 문자열로 변환
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const lastMonthDay = String(newDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${lastMonthDay}`;
        
        days[formattedDate] = i;

    } 

    for (let i = 1; i <= endplus ; i++){
        const newDate = new Date(nextMonthFirstDay);
        newDate.setDate(newDate.getDate() + i - 1);

        // "yy-mm-dd" 형식의 날짜 문자열로 변환
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const lastMonthDay = String(newDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${lastMonthDay}`;
        
        days[formattedDate] = i;
    }

    const date = new Date(startData);
    const dayOfWeek = date.getDay();
    console.log(dayOfWeek); // ex. 1 (월요일)

    const edate = new Date(endData);
    const edayOfWeek = edate.getDay();
    console.log(edayOfWeek); // 출력: 1 (월요일)
     
    const dayOfStart = date.getDate(); //시작 날짜의 일
    const dayOfEnd = edate.getDate(); //종료 날짜의 일(ex. 14일 -> 14)
    let WholeDate = dayOfEnd-dayOfStart;

    const keys = Object.keys(days);
    const firstDayOfPage = keys[0];
    const lastDayOfPage = keys[keys.length - 1];

    const lowerBound = new Date(firstDayOfPage); //현재 페이지의 첫 날짜
    const upperBound = new Date(lastDayOfPage); //현재 페이지의 마지막 날짜

    const filteredEvents = eventArr.filter(event => { //햔재 페이지에서 보여줄 events만 새로운 배열에 저장 
        
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        const betweenDate = getDatesBetween(startDate, endDate); //시작날짜 ~ 종료날짜 사이의 날짜 구하기['yyyy-mm-dd','...']
        const betweenDateNum = betweenDate.length;
        if (
            (startDate >= lowerBound && startDate <= upperBound) ||
            (endDate >= lowerBound && endDate <= upperBound) 
        ) {
            return true;
        }
        for (let i = 0; i < betweenDateNum;i++) {
            if(event.start_date === null&&event.end_date === null){
                return false;
            }
            const parts = betweenDate[i].split('-');
            const year = `20${parts[0]}`;
            const month = parts[1];
            const day = parts[2];

            const formattedDateStr = `${year}-${month}-${day}`;
            let currentDate = new Date(formattedDateStr);
       
            const keys = Object.keys(days);
            const firDay = new Date(keys[0]);
          if (currentDate > firDay) {
            console.log("시작날짜가 현재 페이지 이전날짜인 이벤트 탐지 완료");
            

            return true;
          }
        }
        return false;
    });

    console.log(filteredEvents);
    // let countForFilter = 0;

    // useEffect(()=>{

    //     if(filterData.length > 0){
    //         countForFilter = 1;
    //     }

    // },[filterData]);

    // useEffect(()=>{
        
    //     if(countForFilter === 1){
    //         setFilteredEvents(filterData);
    //     }

        
    // },[countForFilter]);

    const eventNum = filteredEvents.length > 0 ? filteredEvents.length : 0;

    useEffect(()=>{
        for (let i = 0; i < eventNum; i++){
            var eventDay = filteredEvents[i].start_date.substring(8, 10); //이벤트 시작 날짜 (숫자) 
            var eventDayNum = parseInt(eventDay); //string -> num
            var eventDayEnd = filteredEvents[i].end_date.substring(8, 10); //이벤트 종료 날짜 (숫자) 
            var eventDayEndNum = parseInt(eventDayEnd); //string -> num
            var eventLeng = eventDayEndNum - eventDayNum; //이벤트 길이

            var eventCal = (startDay+eventDayNum)/7;
        } 
    },[]);

    let lastWeekEvent = [];
    let dayEvnetLast = [];
    let sum = [];

    let result = [];
    let control = 0;
    useEffect(()=>{
        if(control === 0){
            control = 1;
        }

    },[filteredEvents]);

    // 날짜 별 이벤트 인덱스 저장

        // console.log(filteredEvents);
    
        // filteredEvents.forEach((schedule) => {
        //   const startDate = new Date(schedule.start_date);
        //   const endDate = new Date(schedule.end_date);
    
        //   // 나머지 로직
        // });

    // useEffect(()=>{
    //     // if (filteredEvents !== 'undefined'&& Array.isArray(filteredEvents)) {
    //     if(control === 1){
    //         control = 2;
    //         console.log(filteredEvents);
    //         filteredEvents&&filteredEvents.forEach((schedule) => {
    //             const startDate = new Date(schedule.start_date);
    //             const endDate = new Date(schedule.end_date);
    
    //             // 시작 날짜부터 종료 날짜까지의 모든 날짜를 처리
    //             for (let date = startDate; date <= endDate && date <= upperBound; date.setDate(date.getDate() + 1)) {
    //                 while (date < lowerBound) {
    //                     date.setDate(date.getDate() + 1); // 이벤트 시작날짜가 현재 페이지 날짜보다 앞서면 시작날짜를 +1 해줌 . 여기서만 임의로
    //                 }
    //                 const dateString = date.toISOString().split('T')[0];
    
    //                 // 해당 날짜의 스케줄 인덱스를 배열에 추가
    //                 if (!scheduleByDate[dateString]) {
    //                     scheduleByDate[dateString] = [];
    //                 } 
    //                 // 날짜별로 인덱스, 시작날짜, 종료날짜, 색깔 저장하고 그걸eventbar 에 넘겨주기
    //                 // 종료날짜 - 시작날짜 또는 토요일 날짜 - 시작날짜 등의 계산은 현재 페이지에서 진행
    //                 scheduleByDate[dateString].push(schedule);
    //                 // scheduleByDate[dateString].push(schedule.schedule_index);
    
    //             } 
    //         }); 
    //     }else{
    //         console.log("filteredEvent가 빈배열입니다.");
    //     }
           
    //         console.log(scheduleByDate);
        
    // },[filteredEvents]);
    
    const dayEntries = Object.entries(days);
    
    const dayKeys = Object.keys(days);
    
    function formatDate(date) {
        const year = date.getFullYear().toString().slice(-2); // 연도 뒤의 두 자리만 사용
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
        const day = String(date.getDate()).padStart(2, '0'); // 날짜를 두 자리로 포맷팅
        return `${year}-${month}-${day}`;
      }
      
    function getDatesBetween(formatStartDate, formatEndDate) {
    const startDate = new Date(formatStartDate);
    const endDate = new Date(formatEndDate);
    const datesArray = [];
    let currentDate = startDate;
    
    while (currentDate <= endDate) {
        datesArray.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
    }
    
    return datesArray;
    }

    const eventCount = {};
      
    function getNextSundayFromDate(date, weeks) {
    const inputDate = new Date(date);
    const nextSunday = new Date(inputDate);
    
    // 현재 요일(0: 일요일, 1: 월요일, ..., 6: 토요일)
    const currentDayOfWeek = inputDate.getDay();
    
    // 6주를 일요일 기준으로 더함
    nextSunday.setDate(nextSunday.getDate() + (6 - currentDayOfWeek) + (7 * weeks)+1);
    
    return nextSunday;
    }

function formatDateToYYYYMMDD(dateString) {
    const inputDate = new Date(dateString);
    
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 패딩
    const day = String(inputDate.getDate()).padStart(2, '0'); // 일을 2자리로 패딩
    
    return `${year}-${month}-${day}`;
    }
    let weekCut={};

    function getDayOfWeek(dateString) {
        const dayOfWeek = new Date(dateString).getDay(); 
    
    //0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토
    return dayOfWeek;
      }

     
    function convertToFullDate(yyMMddDate) {
    // 'yy-mm-dd' 형태의 날짜 문자열을 분리
    const parts = yyMMddDate.split('-');
    
    // 'yy'를 '20yy'로 변환 (예: 21 -> 2021)
    const year = `20${parts[0]}`;
    
    // 'mm'과 'dd'는 그대로 사용
    const month = parts[1];
    const day = parts[2];
    
    // 'yyyy-mm-dd' 형태로 변환
    const fullDate = `${year}-${month}-${day}`;
    
    return fullDate;
    }

      
  return (    
    <>
    <div className={styles.dayGrid}>
    
    {dayEntries.map ((day,i) => {
        const dateValue = dayEntries[i][1];
        const dateKey = dayKeys[i]; //현재 페이지 캘린더 전체 날짜 yy-mm-dd
        const dateToString = String(dateKey); //yyyy-mm-dd 형식


        // eventIndex.push(scheduleByDate[dateToString]);
        // const date = new Date(dateToString);


        // let dayEventData = [];
        // dayEventData = scheduleByDate && scheduleByDate[dateToString];      
        // if(dayEventData != []){
        //     setDayEvent([dayEventData]);
        // }  

        
        // const dateString = date.toISOString().split('T')[0];
        dayEvnetLast = [];
        sum = [];
        
        let eventCountperDay = 0;
        // console.log(dayEvent);
           return (
            <div key={i} className={styles.dayBox}>
                <div>
                    <p
                    className={`${styles.boxDate} ${
                        i === 0 || i % 7 === 6 || i % 7 === 0 ? styles.blueText : ''
                    }`}
                    >
                    {dateValue}
                    </p>
                </div>

                    {filteredEvents&&filteredEvents.map ((event,index) => {
                        lastWeekEvent = [];

                        const formatStartDate = event.start_date.substring(0,10);
                        const formatEndDate = event.end_date.substring(0,10);
                        
                        const dateForStart = new Date(event.start_date);
                        const dateForEnd = new Date(event.end_date);

                        const timeDiff = dateForEnd - dateForStart ;
                        // 밀리초를 일로 변환
                        const daysDiff = timeDiff / (1000 * 60 * 60 * 24) + 1;//이벤트 전체 길이 반환
                        const eventDay = event.start_date.substring(8, 10); //이벤트 시작 날짜 (숫자) 
                        const eventDayNum = parseInt(eventDay); //string -> num
                        const eventDayEnd = event.end_date.substring(8, 10); //이벤트 종료 날짜 (숫자) 
                        const eventDayEndNum = parseInt(eventDayEnd); //string -> num
                        let eventLeng = [daysDiff]; //[이벤트 첫 주 길이, 이벤트 반복 주차 횟수, 이벤트 마지막 주차 날짜 수]

                        const startDayOfWeek = getDayOfWeek(formatStartDate);  //이벤트 시작 날짜의 요일값 0~6중 하나
                        const todayDayOfWeek = getDayOfWeek(dateKey);  //오늘날짜의 요일값 0~6중 하나

                        const forEndDate = new Date(event.end_date);
                        const endDayOfWeek = forEndDate.getDay(); //이벤트 시작 날짜의 요일값 0~6중 하나

                        const maxBarLen = 7 - startDayOfWeek;

                        if(i===0){
                            event["schedule_length"] = daysDiff;
                        }

                        if(maxBarLen < eventLeng[0]){ //이벤트가 한 줄을 넘어가는 경우 예외 처리 
                            // console.log(event);
                            let eventRow = (eventLeng[0] - maxBarLen + 1) / 7 ;
                            
                            if (eventRow % 1 !== 0) {
                                eventRow = Math.floor(eventRow) + 1;
                            }
                            const eventBarCol = Math.floor(eventRow) // 몫: 걸친 주 개수 , 나머지: 마지막 주의 일요일부터 종료 날짜까지의 날짜 개수 
                            
                            eventLeng.push(eventBarCol);
                            const remainder = (eventLeng[0] - maxBarLen + 1) % 7; // 나머지
                            eventLeng.push(remainder);
                            eventLeng[0]=maxBarLen;

                        
                            if(i===0){ //날짜 반복문 안에서 이벤트 계산하는건 첫 1회만 하도록

                                // 주어진 배열
                                filteredEvents.sort(function(a, b) {
                                    // schedule_length 값이 큰 순서대로 정렬
                                    if (a.schedule_length !== b.schedule_length) {
                                        return b.schedule_length - a.schedule_length;
                                    } else {
                                        // schedule_length 값이 같으면 schedule_index 값이 작은 순서대로 정렬
                                        return a.schedule_index - b.schedule_index;
                                    }
                                });
                                        
                                // 정렬된 배열 출력
                                console.log(filteredEvents);
                                
                                  const dateArray = getDatesBetween(formatStartDate, formatEndDate); //시작날짜 ~ 종료날짜 사이의 날짜 구하기['yy-mm-dd','...']
                                  for (let i = 0;i<dateArray.length;i++){
                                      dateArray[i]=convertToFullDate(dateArray[i]);
                                  }

                                  dateArray.forEach(date => {
                                    if (eventCount[date]) {
                                        eventCount[date] += 1; 
                    
                                    } else {
                                        eventCount[date] = 1; 
                                    }
                                });

                                // const eventValues = dateArray&&dateArray.map(date => eventCount[date]);
                                // const maxNumber = Math.max(...eventValues);
                                scheduleByDate={};

                                filteredEvents.forEach((schedule,index) => {
                                    const startDate = new Date(schedule.start_date);
                                    const endDate = new Date(schedule.end_date);
                        
                                    // 시작 날짜부터 종료 날짜까지의 모든 날짜를 처리
                                    for (let date = startDate; date <= endDate && date <= upperBound; date.setDate(date.getDate() + 1)) {
                                        while (date < lowerBound) {
                                            date.setDate(date.getDate() + 1); // 이벤트 시작날짜가 현재 페이지 날짜보다 앞서면 시작날짜를 +1 해줌 . 여기서만 임의로
                                        }
                                        const dateString = date.toISOString().split('T')[0];
                                        event["schedule_priority"] = [];

                                        // 해당 날짜의 스케줄 인덱스를 배열에 추가
                                        if (!scheduleByDate[dateString]) {
                                            scheduleByDate[dateString] = [];

                                        } 
                                        // 날짜별로 인덱스, 시작날짜, 종료날짜, 색깔 저장하고 그걸eventbar 에 넘겨주기
                                        // 종료날짜 - 시작날짜 또는 토요일 날짜 - 시작날짜 등의 계산은 현재 페이지에서 진행
                                        scheduleByDate[dateString].push(schedule);
                                        // const indexe = scheduleByDate[dateString].length;
                                        // for(let i = 0;i<)
                                        var arrayLength = scheduleByDate[dateString].length;
                                        // var index = scheduleByDate[dateString].indexOf(schedule);

                                        // console.log(schedule.schedule_title+"  "+dateString+"스케줄의 인덱스:"+ arrayLength);
                                        // scheduleByDate[dateString].push([...arrayLength]);
                                        event["schedule_priority"].push(arrayLength);

                                        // schedule["schedule_priority"] = [...arrayLength];
                                        // scheduleByDate[dateString].push(schedule.schedule_index);
                        
                                    } 
                                }); 
                                console.log(scheduleByDate);
                            }
                            
                        }            
            
                        const eventCal = (startDay + eventDayNum)/7; //grid row 계산에 사용하는 몫 (소수점 포함)
                        const eventCol = (startDay + eventDayNum) % 7 === 0 ? 7 : (startDay + eventDayNum) % 7; //gird col 계산
                        // const eventCol = (startDay+eventDayNum)%7; 
                        const eventRow = eventCol !== 0 ? Math.floor(eventCal) + 1 : Math.floor(eventCal); //grid row 계산
                        
                        let eventBarLen = [eventLeng[0] * 10.4 + (eventLeng[0]-1)*0.4 - 0.4];
            
                        const weekChange = eventBarLen - eventCol;                   
                   
                        Object.keys(weekCut).map((dateKey,i) => {
                            if (dateKey === dateToString) {
                            const event = Object.values( weekCut[dateKey]);
                            const todayToDate = new Date(dateToString);
                        
                            {event.map((events,index)=>{
                                console.log(dateToString+"  "+events);
                                const formatStartDates = events.start_date.substring(0,10);
                                const formatEndDates = events.end_date.substring(0,10);

                                const endToDate = new Date(events.end_date);

                                const timeDiff = endToDate - todayToDate; 
                                const daysDiff = timeDiff / (1000 * 60 * 60 * 24) +1;//이벤트 길이 반환

                                let barLen = 0;
                                // eventBarLen = 0;

                                if(daysDiff>=7){
                                    barLen = 7;
                                    eventBarLen = barLen*10.4 + (barLen -1)*0.4 -0.4;
                                }else{
                                    barLen = daysDiff;
                                    eventBarLen = barLen*10.4 + (barLen -1)*0.4 -0.4;
                                }
                                lastWeekEvent.push(
                                    <div>
                                        <CalEventBar 
                                            title={events.schedule_title}
                                            width={eventBarLen}
                                            key={index}
                                        />
                                    </div>
                                )
                                if(i===0){
                                const dateArray = getDatesBetween(formatStartDates, formatEndDates); //시작날짜 ~ 종료날짜 사이의 날짜 구하기['yy-mm-dd','...']
                                  for (let i = 0;i<dateArray.length;i++){
                                      dateArray[i]=convertToFullDate(dateArray[i]);
                                  }

                                  dateArray.forEach(date => {
                                    if (eventCount[date]) {
                                        eventCount[date] += 1; 
                                        // console.log(date + "  "+eventCount[date]);
                    
                                    } else {
                                        eventCount[date] = 1; 
                                    }
                                });

                                const eventValues = dateArray&&dateArray.map(date => eventCount[date]);
                                const maxNumber = Math.max(...eventValues);

                            }
                            })
                            }
                            
                        }})
                        

                            // sum = [...lastWeekEvent,...dayEvnetLast];
                        
//다시 활성화해줄것!      
                        
                            eventCountperDay = eventCountperDay+1;

                            if(index===0){

                            {scheduleByDate[dateToString].map((event,indexes)=>{
                                // console.log(event);

                                const formatStartDate = event.start_date.substring(0,10);
                                const formatEndDate = event.end_date.substring(0,10);
                                
                                const dateForStart = new Date(event.start_date);
                                const dateForEnd = new Date(event.end_date);

                                const timeDiff = dateForEnd - dateForStart ;
                                // 밀리초를 일로 변환
                                const daysDiff = timeDiff / (1000 * 60 * 60 * 24) + 1;//이벤트 길이 반환

                                const eventDay = event.start_date.substring(8, 10); //이벤트 시작 날짜 (숫자) 
                                const eventDayNum = parseInt(eventDay); //string -> num
                                const eventDayEnd = event.end_date.substring(8, 10); //이벤트 종료 날짜 (숫자) 
                                const eventDayEndNum = parseInt(eventDayEnd); //string -> num
                                let eventLeng = [daysDiff]; //[이벤트 첫 주 길이, 이벤트 반복 주차 횟수, 이벤트 마지막 주차 날짜 수]

                                const startDayOfWeek = getDayOfWeek(formatStartDate);  //이벤트 시작 날짜의 요일값 0~6중 하나
                                const todayDayOfWeek = getDayOfWeek(dateKey);  //오늘날짜의 요일값 0~6중 하나

                                const forEndDate = new Date(event.end_date);
                                const endDayOfWeek = forEndDate.getDay(); //이벤트 시작 날짜의 요일값 0~6중 하나

                                const maxBarLen = 7 - startDayOfWeek;  

                                if(maxBarLen < eventLeng[0]){ //이벤트가 한 줄을 넘어가는 경우 예외 처리 
                                    // console.log(event);
                                    let eventRow = (eventLeng[0] - maxBarLen + 1) / 7 ;
                                    
                                    if (eventRow % 1 !== 0) {
                                        eventRow = Math.floor(eventRow) + 1;
                                    }
                                    const eventBarCol = Math.floor(eventRow) // 몫: 걸친 주 개수 , 나머지: 마지막 주의 일요일부터 종료 날짜까지의 날짜 개수 
                                    
                                    eventLeng.push(eventBarCol);
                                    const remainder = (eventLeng[0] - maxBarLen + 1) % 7; // 나머지
                                    eventLeng.push(remainder);
                                    eventLeng[0]=maxBarLen;
        
                                
                                    if(i===0){ //날짜 반복문 안에서 이벤트 계산하는건 첫 1회만 하도록
                                        for (let i = 0; i < eventBarCol; i++) {
                                            const resultDate = getNextSundayFromDate(dateForStart, i); // i 주 이후의 일요일 날짜
                                            const formatResult = formatDateToYYYYMMDD(resultDate);
                                          
                                            // formatResult 키가 weekCut 객체에 이미 존재하는지 확인
                                            if (weekCut.hasOwnProperty(formatResult)) {
                                              // 이미 존재하는 경우 해당 키의 배열에 event 추가
                                              weekCut[formatResult].push(event);
                                            } else {
                                              // 존재하지 않는 경우 새로운 배열을 생성하고 event를 추가
                                              weekCut[formatResult] = [event];
                                            }
                                          }
        
                                          const dateArray = getDatesBetween(formatStartDate, formatEndDate); //시작날짜 ~ 종료날짜 사이의 날짜 구하기['yy-mm-dd','...']
                                          for (let i = 0;i<dateArray.length;i++){
                                              dateArray[i]=convertToFullDate(dateArray[i]);
                                          }
        
                                          dateArray.forEach(date => {
                                            if (eventCount[date]) {
                                                eventCount[date] += 1; 
                            
                                            } else {
                                                eventCount[date] = 1; 
                                            }
                                        });

                                        // const eventValues = dateArray&&dateArray.map(date => eventCount[date]);
                                        // const maxNumber = Math.max(...eventValues);
        
                                    }
                                    
                                }
                                let eventBarLen = [eventLeng[0] * 10.4 + (eventLeng[0]-1)*0.4 - 0.4];

                                // if (formatStartDate!=dateToString) {
                                //     const onedayWidth = "10.4vw";
                                //     const onedayTitle = " ";

                                //     dayEvnetLast.push(
                                //         <div>
                                //             <CalEventBar 
                                //                 title={onedayTitle}
                                //                 width={onedayWidth}
                                //                 key={index}  
                                //             />
                                //         </div>
                                //     ) 
                                //   }

                                if(formatStartDate===dateToString){
                            
                                    dayEvnetLast.push(
                                        <div onClick={()=>handleEventClick(dayEvent)}>
                                            <CalEventBar 
                                                title={event.schedule_title}
                                                width={eventBarLen}
                                                key={indexes}  
                                            />
                                        </div>
                                    )
                                }
                                
                            })}
                            // console.log(scheduleByDate);

                            }
               

                        // if (index === filteredEvents.length - 1 && eventCountperDay < eventCount[dateToString]) {
                        //     const onedayWidth = "10.4vw";
                        //     const onedayTitle = " ";

                        //     dayEvnetLast.push(
                        //         <div>
                        //             <CalEventBar 
                        //                 title={onedayTitle}
                        //                 width={onedayWidth}
                        //                 key={index}  
                        //             />
                        //         </div>
                        //     ) 
                        //   }
                        
                    })}


                    {lastWeekEvent.map((event, index) => {
                    if (index < 3) {
                        return (
                        <>
                            <div key={index}>
                                {event}
                            </div>
                        
                        </>
                        );
                    }return null;                    
                    })}
                
                    {dayEvnetLast.map((events, indexes) => {
                        if (indexes < 3) {
                            return (
                            <div key={indexes}>
                                {events}
                            </div>
                            );  
                        } return null;                         
                    })} 


                </div>
        );
    })}
        </div>
        {/* {isOpen && (
            <CalEventClickModal 
                open={isOpen}
                onClose={() => {
                setIsOpen(false);
                }}
                deleteButtonClick={deleteClick}
                reviseButtonClick={reviseClick}
            />
            )} */}

        {/* {modalReviseButtons && (
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
      )} */}
    </>        
  );
}
