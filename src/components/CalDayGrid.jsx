import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../styles/CalDayGrid.module.css';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, set } from 'date-fns';
import { useOutletContext, useHistory } from 'react-router-dom';
import { isSameMonth, isSameDay, addDays, parse, format, addMonths } from 'date-fns';
import CalEventBar from '../components/CalEventBar';
import CalEventClickModal from '../components/CalEventClickModal';
import SetEventModal from '../components/SetEventModal';
import moment from 'moment';
import { getScheduleCalendar } from '../APIs/schedule';

import { ThemeModeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme/theme';

export default function CalDayGrid(props) {
   const { teamIndex } = useOutletContext();

   console.log(teamIndex);
   const [eventArr, setEventArr] = useState([]);
   let [scheduleByDate, setScheduleByDate] = useState({});
   const [eventOver, setEventOver] = useState(0);

   const { themeMode, toggleTheme } = useContext(ThemeModeContext);
   const [tm, setTm] = useState(theme.lightTheme.calendar);
   // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
   useEffect(() => {
      if (themeMode === 'light') setTm(theme.lightTheme.calendar);
      else setTm(theme.darkTheme.calendar);
   }, [themeMode]);

   const fetchData = () => {
      getScheduleCalendar(teamIndex)
         .then(function (response) {
            console.log(response.data);
            setEventArr([...response.data]);
            const a = JSON.stringify(response);
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   useEffect(() => {
      fetchData();
   }, [props.isModalOpen]);

   let c = new Date(); // 현재는 month를 현재 날짜로 받아오고 있음'
   c = props.today;

   const monthStart = startOfMonth(c); //이번 달의 시작 날짜
   const monthEnd = endOfMonth(c); //이번 달의 마지막 날짜

   const lastDayOfPreviousMonth = new Date(c.getFullYear(), c.getMonth(), 0); //이전 달의 마지막 날짜
   let nextMonthFirstDay = new Date(c.getFullYear(), c.getMonth() + 1, 1); // 다음달의 첫번째 날짜

   let startDay = monthStart.getDay(); //숫자로 표현, 0부터 시작
   let endDay = monthEnd.getDay(); // 이번달 마지막 요일을 0 1 2로 표현

   let endplus = 6 - endDay; // 다음 달 요일 수 (이번 달 캘린더에 걸쳐진) -> 0이면 걸쳐진 날 없음

   let endDate = monthEnd.getDate(); //오늘이 속해있는 달이 한달에 몇일이 있는지 확인

   let beforeMonthEnd = lastDayOfPreviousMonth.getDay(); //이전 달 마지막 요일이 일 월 화 등 인지를 0 1 2로 표현
   let beforeMonthEndDate = lastDayOfPreviousMonth.getDate(); //이전 달의 마지막 날짜

   let days = {}; //날짜 저장할 오브젝트

   for (let i = beforeMonthEnd; i != 6 && i >= 0; i--) {
      //현재 페이지에 걸쳐진 이전 달 날짜 저장
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

   for (let i = 1; i <= endDate; i++) {
      const newDate = new Date(monthStart);
      newDate.setDate(newDate.getDate() + i - 1);

      // "yy-mm-dd" 형식의 날짜 문자열로 변환
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const lastMonthDay = String(newDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${lastMonthDay}`;

      days[formattedDate] = i;
   }

   for (let i = 1; i <= endplus; i++) {
      const newDate = new Date(nextMonthFirstDay);
      newDate.setDate(newDate.getDate() + i - 1);

      // "yy-mm-dd" 형식의 날짜 문자열로 변환
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const lastMonthDay = String(newDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${lastMonthDay}`;

      days[formattedDate] = i;
   }

   const keys = Object.keys(days);
   const firstDayOfPage = keys[0];
   const lastDayOfPage = keys[keys.length - 1];

   const lowerBound = new Date(firstDayOfPage); //현재 페이지의 첫 날짜
   const upperBound = new Date(lastDayOfPage); //현재 페이지의 마지막 날짜

   const filteredEvents = [];
   eventArr.forEach((event) => {
      //햔재 페이지에서 보여줄 events만 새로운 배열에 저장
      // console.log(event.start_date);
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      const nextStartDate = new Date(startDate);
      nextStartDate.setDate(startDate.getDate() + 1);

      const nextEndDate = new Date(endDate);
      nextEndDate.setDate(endDate.getDate() + 1);

      const betweenDate = getDatesBetween(nextStartDate, nextEndDate); //시작날짜 ~ 종료날짜 사이의 날짜 구하기['yyyy-mm-dd','...']
      const betweenDateNum = betweenDate.length;

      if (
         (nextStartDate >= lowerBound && nextStartDate <= upperBound) ||
         (nextEndDate >= lowerBound && nextEndDate <= upperBound)
      ) {
         // Return the modified event or any other transformation
         filteredEvents.push({
            ...event,
            start_date: nextStartDate.toISOString(), // Convert to string if needed
            end_date: nextEndDate.toISOString(),
         });
         return;
      }
      for (let i = 0; i < betweenDateNum; i++) {
         if (event.start_date === null && event.end_date === null) {
            return;
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
            // console.log("시작날짜가 현재 페이지 이전날짜인 이벤트 탐지 완료");

            filteredEvents.push({
               ...event,
               start_date: nextStartDate.toISOString(), // Convert to string if needed
               end_date: nextEndDate.toISOString(),
            });
            return;
         }
      }
      return;
   });
   //   console.log(filteredEvents);

   let dayEventLast = [];
   const [eventChange, setEventChange] = useState(0);

   let control = 0;
   useEffect(() => {
      if (control === 0) {
         control = 1;
      }
   }, [filteredEvents]);

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
      nextSunday.setDate(nextSunday.getDate() + (6 - currentDayOfWeek) + 7 * weeks + 1);

      return nextSunday;
   }

   function formatDateToYYYYMMDD(dateString) {
      const inputDate = new Date(dateString);

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 패딩
      const day = String(inputDate.getDate()).padStart(2, '0'); // 일을 2자리로 패딩

      return `${year}-${month}-${day}`;
   }
   let weekCut = {};

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

   const clickEvent = (title, startDay, endDay, index, color, note) => {
      props.setStartDay(startDay);
      props.setEndDay(endDay);
      props.setTitle(title);
      props.setIsModalOpen(true);
      props.setScheduleIndex(index);
      props.setEventColor(color);
      props.setNote(note);
   };
   // let eventNumByDay = 0;
   const [eventNumByDay, setEventNumByDay] = useState(0);
   let eventCol = 0;

   const [clickedRow, setClickedRow] = useState(-1);
   const [clickedDate, setClickedDate] = useState();

   useEffect(() => {
      const dayBoxes = Array.from(document.querySelectorAll('.dayBox'));

      if (dayBoxes.length === 0 || dayEventLast.length === 0) return;
      // setEventNumByDay(dayEventLast[dayEventLast.length - 1].priority);

      dayBoxes.map((day, index) => {
         if (Math.floor(index / 7) === clickedRow) {
            day.style.gridTemplateRows = `repeat(5, 1fr) !important`;
         } else day.style.gridTemplateRows = 'repeat(4, 1fr)';
      });
   }, [clickedRow]);

   const showAllEvents = (dateValue, date) => {
      eventCol = Math.floor(dateValue / 7);
      // console.log(date[0]);
      setClickedDate(date[0]);

      setWideRow();
   };

   const setWideRow = () => {
      const rowHeightArr = [10.4, 10.4, 10.4, 10.4, 10.4, 10.4];
      rowHeightArr[eventCol] += 5;

      let styleVariable = '';
      rowHeightArr.map((height) => {
         styleVariable += height + 'vh ';
      });

      // eventCol이 몇줄까지 확장되어야 하는지 계산 => 그 값만큼만 더해주면 됨.

      if (eventCol === clickedRow) {
         // 같은 날짜 다시 누른 경우
         // 꺼주고 값을 다시 -1로
         gridRef.current.style.gridTemplateRows = 'repeat(6, 10.4vh)';

         // console.log("꺼주기");
         setClickedRow(-1);
      } else {
         gridRef.current.style.gridTemplateRows = styleVariable;
         // dayBoxRef.current.style.gridTemplateRows = 'repeat(6, 1fr)';
         // console.log(dayBoxRef);
         // console.log("켜주기");
         setClickedRow(eventCol);
      }
   };

   const gridRef = useRef();
   const dayBoxRef = useRef();

   //사용 X
   const [gridEventNums, setGridEventNums] = useState(0);

   useEffect(() => {
      const arrLen = dayEventLast.length;
      //현재 날짜 칸에서 보여줄 이벤트 바가 들어있는 배열(dayEventLast)에서, 가장 priority가 높은 값을 받아오는 코드
      if (arrLen !== 0) {
         setGridEventNums(4);
         // console.log(dayEventLast);
      } else {
         // console.log("빈배열이에요");
      }
   }, [dayEventLast]);

   if (props.update === true) {
      fetchData();

      props.setUpdate(false);
   }

   //  const showAllEvents = (dateValue, date) => {
   //     eventCol = Math.floor(dateValue / 7);
   //     console.log(date[0]);
   //     setClickedDate(date[0]);
   //     // setEventNumByDay(eventCount[clickedDate] && eventCount[clickedDate]);
   //     setWideRow();
   //  };
   return (
      <>
         <div
            className={styles.dayGrid}
            ref={gridRef}
            style={{
               gridTemplateRows: 'repeat(6, 10.4vh);',
            }}
         >
            {dayEntries.map((day, i) => {
               const dateValue = dayEntries[i][1];
               const dateKey = dayKeys[i]; //현재 페이지 캘린더 전체 날짜 yy-mm-dd
               const dateToString = String(dateKey); //yyyy-mm-dd 형식

               dayEventLast = [];
               let remainingItems = 0;
               let emptyBoxes = [];
               let maxItems = 3;
               let priorityCheck = 0;

               return (
                  <div
                     key={i}
                     className={`${styles.dayBox} dayBox`}
                     ref={dayBoxRef}
                     style={{
                        // gridTemplateRows: 'repeat(6, 1fr);',
                        background: tm.calBg,
                     }}
                  >
                     <div>
                        <p
                           className={`${styles.boxDate} ${
                              i === 0 || i % 7 === 6 || i % 7 === 0 ? styles.blueText : ''
                           }`}
                           onClick={() => {
                              showAllEvents(i, day);
                           }}
                           style={{
                              color: i === 0 || i % 7 === 6 || i % 7 === 0 ? '' : tm.subTextColor,
                           }}
                        >
                           {dateValue}
                        </p>
                     </div>

                     {filteredEvents &&
                        filteredEvents.map((event, index) => {
                           const formatStartDate = event.start_date.substring(0, 10);
                           const formatEndDate = event.end_date.substring(0, 10);

                           const dateForStart = new Date(event.start_date);
                           const dateForEnd = new Date(event.end_date);

                           const timeDiff = dateForEnd - dateForStart;
                           // 밀리초를 일로 변환
                           const daysDiff = timeDiff / (1000 * 60 * 60 * 24) + 1; //이벤트 전체 길이 반환

                           if (i === 0) {
                              event['schedule_length'] = daysDiff;
                           }

                           if (index === 0) {
                              //날짜 반복문 안에서 이벤트 계산하는건 첫 1회만 하도록

                              // 이벤트를 길이 순, 등록 순으로 나열
                              filteredEvents.sort(function (a, b) {
                                 // schedule_length 값이 큰 순서대로 정렬
                                 if (a.schedule_length !== b.schedule_length) {
                                    return b.schedule_length - a.schedule_length;
                                 } else {
                                    // schedule_length 값이 같으면 schedule_index 값이 작은 순서대로 정렬
                                    return a.schedule_index - b.schedule_index;
                                 }
                              });

                              //시작날짜 ~ 종료날짜 사이의 날짜 구하기['yy-mm-dd','...']
                              const dateArray = getDatesBetween(formatStartDate, formatEndDate);
                              for (let i = 0; i < dateArray.length; i++) {
                                 dateArray[i] = convertToFullDate(dateArray[i]);
                              }

                              dateArray.forEach((date) => {
                                 if (eventCount[date]) {
                                    eventCount[date] += 1;
                                 } else {
                                    eventCount[date] = 1;
                                 }
                              });

                              scheduleByDate = {};

                              filteredEvents.forEach((schedule, index) => {
                                 const startDate = new Date(schedule.start_date);
                                 const endDate = new Date(schedule.end_date);
                                 schedule['schedule_priority_arr'] = [];
                                 // schedule["todayStartDay"] = [];
                                 // 시작 날짜부터 종료 날짜까지의 모든 날짜를 처리
                                 for (
                                    let date = startDate;
                                    date <= endDate && date <= upperBound;
                                    date.setDate(date.getDate() + 1)
                                 ) {
                                    while (date < lowerBound) {
                                       // 이벤트 시작날짜가 현재 페이지 날짜보다 앞서면 시작날짜를 +1 해줌 . 여기서만 임의로
                                       date.setDate(date.getDate() + 1);
                                    }
                                    const dateString = date.toISOString().split('T')[0];
                                    // schedule["todayStartDay"].push(dateString);

                                    // 해당 날짜의 스케줄 인덱스를 배열에 추가
                                    if (!scheduleByDate[dateString]) {
                                       scheduleByDate[dateString] = [];
                                    }
                                    // 종료날짜 - 시작날짜 또는 토요일 날짜 - 시작날짜 등의 계산은 현재 페이지에서 진행
                                    scheduleByDate[dateString].push(schedule);
                                    const indexe = scheduleByDate[dateString].length;

                                    schedule['schedule_priority_arr'].push(indexe);

                                    const maxValue = Math.max(...schedule.schedule_priority_arr);
                                    schedule['schedule_priority'] = maxValue;
                                    const todayEvents = scheduleByDate[dateString];
                                    for (let i = 1; i < scheduleByDate[dateString].length; i++) {
                                       if (todayEvents[i].schedule_priority === todayEvents[i - 1].schedule_priority) {
                                          todayEvents[i].schedule_priority += 1;
                                       }
                                    }
                                    scheduleByDate[dateString].sort(
                                       (a, b) => a.schedule_priority - b.schedule_priority
                                    );

                                    // console.log(dateString + '우선순위 연산 발생');
                                 }
                              });
                           }

                           if (index === 0) {
                              {
                                 scheduleByDate[dateToString] &&
                                    scheduleByDate[dateToString].map((event, indexes) => {
                                       //priority 정상적으로 들어가있음

                                       const todayEvents = scheduleByDate[dateToString];
                                       for (let i = 1; i < scheduleByDate[dateToString].length; i++) {
                                          if (
                                             todayEvents[i].schedule_priority === todayEvents[i - 1].schedule_priority
                                          ) {
                                             todayEvents[i].schedule_priority += 1;
                                          }
                                       }

                                       scheduleByDate[dateToString].sort(
                                          (a, b) => a.schedule_priority - b.schedule_priority
                                       );

                                       const formatStartDate = event.start_date.substring(0, 10);
                                       const formatEndDate = event.end_date.substring(0, 10);

                                       const dateForStart = new Date(event.start_date);
                                       const dateForEnd = new Date(event.end_date);

                                       const timeDiff = dateForEnd - dateForStart;
                                       // 밀리초를 일로 변환
                                       const daysDiff = timeDiff / (1000 * 60 * 60 * 24) + 1; //이벤트 길이 반환

                                       const eventDay = event.start_date.substring(8, 10); //이벤트 시작 날짜 (숫자)
                                       const eventDayNum = parseInt(eventDay); //string -> num
                                       const eventDayEnd = event.end_date.substring(8, 10); //이벤트 종료 날짜 (숫자)
                                       const eventDayEndNum = parseInt(eventDayEnd); //string -> num
                                       let eventLeng = [daysDiff]; //[이벤트 첫 주 길이, 이벤트 반복 주차 횟수, 이벤트 마지막 주차 날짜 수]

                                       const startDayOfWeek = getDayOfWeek(formatStartDate); //이벤트 시작 날짜의 요일값 0~6중 하나
                                       const todayDayOfWeek = getDayOfWeek(dateKey); //오늘날짜의 요일값 0~6중 하나

                                       const forEndDate = new Date(event.end_date);
                                       const endDayOfWeek = forEndDate.getDay(); //이벤트 시작 날짜의 요일값 0~6중 하나

                                       const maxBarLen = 7 - startDayOfWeek;

                                       if (maxBarLen < eventLeng[0]) {
                                          //이벤트가 한 줄을 넘어가는 경우 예외 처리
                                          let eventRow = (eventLeng[0] - maxBarLen + 1) / 7;

                                          if (eventRow % 1 !== 0) {
                                             //이벤트가 전체 몇 주에 걸쳐있는지를 저장
                                             eventRow = Math.floor(eventRow) + 1;
                                          }
                                          const eventBarCol = Math.floor(eventRow); // 몫: 걸친 주 개수 , 나머지: 마지막 주의 일요일부터 종료 날짜까지의 날짜 개수

                                          eventLeng[0] = maxBarLen;

                                          for (let j = 0; j < eventBarCol; j++) {
                                             const resultDate = getNextSundayFromDate(dateForStart, j); // j주 이후의 일요일 날짜
                                             const formatResult = formatDateToYYYYMMDD(resultDate); //yyyy-mm-dd

                                             // formatResult 키가 weekCut 객체에 이미 존재하는지 확인
                                             if (weekCut.hasOwnProperty(formatResult)) {
                                                // 이미 추가된 이벤트가 아닌지 체크
                                                if (!weekCut[formatResult].includes(event)) {
                                                   // 이미 존재하는 경우 해당 키의 배열에 event 추가
                                                   weekCut[formatResult].push(event);
                                                }
                                             } else {
                                                // 존재하지 않는 경우 새로운 배열을 생성하고 event를 추가
                                                weekCut[formatResult] = [event];
                                             }

                                             if (weekCut[formatResult].length > 1) {
                                                weekCut[formatResult].sort(
                                                   (a, b) => a.schedule_priority - b.schedule_priority
                                                );
                                             }
                                          }
                                       }

                                       let eventBarLen = [eventLeng[0] * 10.4 + (eventLeng[0] - 1) * 0.8 - 0.8];

                                       //이벤트 추가, 수정 모달창에 전달할 시작 종료 날짜 변환 형식
                                       const formattedDStart = moment(formatStartDate, 'YYYY-MM-DD').toDate();

                                       const formattedDEnd = moment(formatEndDate, 'YYYY-MM-DD').toDate();

                                       //오늘 날짜와 이벤트 상의 시작 날짜가 같을 경우 이벤트 바 배열에 이벤트 추가 (하루 단위로 당일에 시작하는 이벤트 넣고 리셋)
                                       if (formatStartDate === dateToString) {
                                          const dateForStart = new Date(event.start_date);
                                          const dateForEnd = new Date(event.end_date);

                                          const timeDiff = dateForEnd - dateForStart;
                                          // 밀리초를 일로 변환
                                          const daysDiff = timeDiff / (1000 * 60 * 60 * 24) + 1; //이벤트 전체 길이 반환

                                          dayEventLast.push({
                                             priority: event.schedule_priority,
                                             startDay: formattedDStart,
                                             endDay: formattedDEnd,
                                             title: event.schedule_title,
                                             index: event.schedule_index,
                                             color: event.schedule_color,
                                             note: event.schedule_content,
                                             length: daysDiff,
                                             jsx: (
                                                <div key={event.schedule_index}>
                                                   <CalEventBar
                                                      title={event.schedule_title}
                                                      width={eventBarLen}
                                                      color={event.schedule_color}
                                                   />
                                                </div>
                                             ),
                                          });

                                          // dayEventLast.sort(function (a, b) {
                                          //    // schedule_length 값이 큰 순서대로 정렬
                                          //    if (a.length !== b.length) {
                                          //       return b.length - a.length;
                                          //    } else {
                                          //       // schedule_length 값이 같으면 schedule_index 값이 작은 순서대로 정렬
                                          //       return a.index - b.index;
                                          //    }
                                          // });

                                          // console.log(dayEventLast);
                                       }
                                       dayEventLast.sort((a, b) => a.priority - b.priority);
                                    });
                              }
                           }
                           if (index === 0) {
                              Object.keys(weekCut).map((dateKey) => {
                                 if (dateKey === dateToString) {
                                    // console.log(dateKey);
                                    console.log(weekCut[dateToString]);
                                    const event = Object.values(weekCut[dateKey]);
                                    const todayToDate = new Date(dateToString);
                                    {
                                       event.map((events, index) => {
                                          //priority 정상적으로 들어가있음

                                          let eventBarLen = 0;
                                          const formatStartDates = events.start_date.substring(0, 10);
                                          const formatEndDates = events.end_date.substring(0, 10);

                                          const endToDate = new Date(events.end_date);

                                          const timeDiff = endToDate - todayToDate;
                                          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; //이벤트 길이 반환

                                          let barLen = 0;

                                          if (daysDiff >= 7) {
                                             barLen = 7;
                                             eventBarLen = barLen * 10.4 + (barLen - 1) * 0.8 - 0.8;
                                          } else {
                                             barLen = daysDiff;
                                             eventBarLen = barLen * 10.4 + (barLen - 1) * 0.8 - 0.8;
                                          }

                                          const formattedDStart = moment(formatStartDates, 'YYYY-MM-DD').toDate();
                                          const nextDay = moment(formattedDStart).add(1, 'days').toDate();

                                          const formattedDEnd = moment(formatEndDates, 'YYYY-MM-DD').toDate();
                                          const nextEDay = moment(formattedDStart).add(1, 'days').toDate();

                                          // console.log(events);
                                          // console.log(events.schedule_priority + ' ' + events.schedule_title);

                                          const dateForStartForLen = new Date(events.start_date);
                                          const dateForEndForLen = new Date(events.end_date);

                                          const timeDiffForLen = dateForEndForLen - dateForStartForLen;
                                          // 밀리초를 일로 변환
                                          const daysDiffForLen = timeDiffForLen / (1000 * 60 * 60 * 24) + 1; //이벤트 전체 길이 반환

                                          dayEventLast.push({
                                             priority: events.schedule_priority,
                                             startDay: formattedDStart,
                                             endDay: formattedDEnd,
                                             title: events.schedule_title,
                                             index: events.schedule_index,
                                             color: events.schedule_color,
                                             note: events.schedule_content,
                                             length: daysDiffForLen,
                                             jsx: (
                                                <div key={events.schedule_index}>
                                                   <CalEventBar
                                                      title={events.schedule_title}
                                                      width={eventBarLen}
                                                      color={events.schedule_color}
                                                   />
                                                </div>
                                             ),
                                          });

                                          /////아래 소트 주석처리하고 priority 여기서 계산해서 (396line)dayEventLast에 priority 값으로 넣는 법 생각하기

                                          dayEventLast.sort((a, b) => a.priority - b.priority);

                                          // dayEventLast.sort(function (a, b) {
                                          //    // length 값이 큰 순서대로 정렬
                                          //    console.log(a, b);
                                          //    if (a.length !== b.length) {
                                          //       return b.length - a.length;
                                          //    } else {
                                          //       // length 값이 같으면 schedule_index 값이 작은 순서대로 정렬
                                          //       return a.index - b.index;
                                          //    }
                                          // });

                                          //////

                                          // console.log(dayEventLast);
                                       });
                                    }
                                 }
                              });
                           }
                        })}

                     {dayEventLast.map((events, index) => {
                        // eventNumByDay = dayEventLast.length !== 0 ? dayEventLast[dayEventLast.length - 1].priority : 0;
                        // eventNumByDay = dayEventLast[dayEventLast.length - 1].priority;
                        // console.log(events.title + '  ' + eventNumByDay);

                        if (clickedRow !== -1) {
                           //날짜 클릭된 경우 등록된 전체 이벤트 보여주기
                           // if (events.priority < 4 && index < 3) {
                           if (index === 0) {
                              //맨 처음 이벤트의 priority 가 1이 아닌 경우 처리
                              emptyBoxes = Array.from({ length: Math.min(events.priority - 1, maxItems) }, (_, i) => (
                                 <div key={i} className={styles.emptyBox}></div>
                              ));
                              remainingItems = maxItems - emptyBoxes.length;

                              // maxItems = events.priority -1;
                              priorityCheck = events.priority;
                           } else if (events.priority != index + 1 && events.priority - priorityCheck != 1) {
                              //이벤트 priority = 1, 3인 경우
                              maxItems -= index + 1;
                              emptyBoxes = Array.from({ length: maxItems }, (_, i) => (
                                 <div key={i} className={styles.emptyBox}></div>
                              ));
                              remainingItems = maxItems;
                           } else {
                              // 이벤트 prioity가 순차적인 경우
                              emptyBoxes = [];
                              // remainingItems = remainingItems-1;
                           }
                           return (
                              <>
                                 {emptyBoxes}
                                 {Array.from({ length: Math.min(remainingItems, 1) }, (_, i) => (
                                    <>
                                       <span
                                          key={index}
                                          onClick={() =>
                                             clickEvent(
                                                events.title,
                                                events.startDay,
                                                events.endDay,
                                                events.index,
                                                events.color,
                                                events.note
                                             )
                                          }
                                          className={styles.eventBarWrap}
                                       >
                                          {events.jsx}
                                       </span>
                                    </>
                                 ))}
                              </>
                           );
                           // }
                           // console.log(eventNumByDay);
                        } else if (clickedRow === -1) {
                           if (events.priority < 4 && index < 3) {
                              if (index === 0) {
                                 //맨 처음 이벤트의 priority 가 1이 아닌 경우 처리
                                 emptyBoxes = Array.from(
                                    { length: Math.min(events.priority - 1, maxItems) },
                                    (_, i) => <div key={i} className={styles.emptyBox}></div>
                                 );
                                 remainingItems = maxItems - emptyBoxes.length;

                                 // maxItems = events.priority -1;
                                 priorityCheck = events.priority;
                              } else if (events.priority != index + 1 && events.priority - priorityCheck != 1) {
                                 //이벤트 priority = 1, 3인 경우
                                 maxItems -= index + 1;
                                 emptyBoxes = Array.from({ length: maxItems }, (_, i) => (
                                    <div key={i} className={styles.emptyBox}></div>
                                 ));
                                 remainingItems = maxItems;
                              } else {
                                 // 이벤트 prioity가 순차적인 경우
                                 emptyBoxes = [];
                                 // remainingItems = remainingItems-1;
                              }
                              return (
                                 <>
                                    {emptyBoxes}
                                    {Array.from({ length: Math.min(remainingItems, 1) }, (_, i) => (
                                       <>
                                          <span
                                             key={index}
                                             onClick={() =>
                                                clickEvent(
                                                   events.title,
                                                   events.startDay,
                                                   events.endDay,
                                                   events.index,
                                                   events.color,
                                                   events.note
                                                )
                                             }
                                             className={styles.eventBarWrap}
                                          >
                                             {events.jsx}
                                          </span>
                                       </>
                                    ))}
                                 </>
                              );
                           }
                        }
                     })}
                  </div>
               );
            })}
         </div>
      </>
   );
}
