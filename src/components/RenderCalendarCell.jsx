import React, { useState, useEffect } from "react";
import { useOutletContext, useHistory } from "react-router-dom";
import styles from "../styles/RenderCalendarCell.module.css";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import {
  isSameMonth,
  isSameDay,
  addDays,
  parse,
  format,
  addMonths,
} from "date-fns";
import CalEventBar from "../components/CalEventBar";
import { getScheduleCalendar } from "../APIs/schedule";

export default function RenderCalendarCell() {
  const { teamIndex } = useOutletContext();
  const [eventArr, setEventArr] = useState([]);
  const [startData, setStartData] = useState("2023-08-26T00:00:00.000Z");
  const [endData, setEndData] = useState("2023-08-27T00:00:00.000Z");
  const [title, setTitle] = useState("");

  const [num, setNum] = useState("");
  const events = ["1", "2"];
  // useEffect(() => {
  //     getScheduleCalendar(teamIndex)
  //     .then((res)=>{
  //         const jsonArray = Object.values(res.data);
  //         setEventArr(...[res.data]);
  //         console.log(eventArr);
  //         setStartData(jsonArray[6].start_date);

  //         setEndData(jsonArray[6].end_date);
  //         setTitle(jsonArray[6].schedule_title);
  //         console.log(startData);
  //         //   const s = JSON.stringify(res);
  //         console.log('일정 정보 불러오기')
  //     })
  //     .catch((err) => {
  //         console.error(err);
  //     });

  //   }, []); // data가 변경될 때마다 useEffect 실행

  let c = new Date(); // 현재는  month 를 현재 날짜로 받아오고 있음

  //현재 month 와 일치하는 일정 필터
  const curMonthNumber = String(c.getMonth() + 1).padStart(2, "0");

  // useEffect(()=>{
  // // 일정 배열에서 date 를 넘버로 바꿔주기 -- 배열 길이만큼 반복하게 바꾸기
  //     const startDateToMon = eventArr[0]?.start_date;
  //     const eventMonth = startDateToMon?.slice(5, 7);
  //     console.log(eventMonth);
  //     console.log(curMonthNumber);

  //     if(curMonthNumber === eventMonth){
  //         console.log('yes');
  //     }
  // },[eventArr]);

  // const { month } = props;
  const monthStart = startOfMonth(c);
  const monthEnd = endOfMonth(c);
  const oneMonthBeforeEnd = addMonths(monthEnd, -1);
  const oneMonthAfterStart = addMonths(monthStart, 1);

  let startDay = monthStart.getDay(); //숫자로 표현, 0부터 시작
  let endDay = monthEnd.getDay(); // 이번달 마지막 요일을 0 1 2로 표현

  let startplus = 6 - startDay; //전체 날짜 계산용. 앞뒤로 몇일 남는지 계싼
  let endplus = 6 - endDay; // 다음 달 요일 수 (이번 달 캘린더에 걸쳐진) -> 0이면 걸쳐진 날 없음

  let endDate = monthEnd.getDate(); //한달이 몇일인지 확인

  let fulldayCount = endDate + startDay + endplus; // 한 화면 전체 날짜 배열 크기
  let weekCount = fulldayCount / 7; //일주일 반복 횟수

  let beforeMonthEnd = oneMonthBeforeEnd.getDay(); //이전 달 마지막 요일이 일 월 화 등인지를 0 1 2로 표현
  let beforeMonthEndDate = oneMonthBeforeEnd.getDate(); //이전 달의 마지막 날짜

  // console.log(beforeMonthEnd);
  // console.log("tmk"+beforeMonthEndDate);

  // console.log(monthStart);
  // console.log(monthEnd);
  // console.log(oneMonthBeforeEnd);
  // console.log(oneMonthAfterStart);

  const rows = [];
  let days = []; //
  let wholeMonth = [];

  for (let i = beforeMonthEnd; i >= 0; i--) {
    let dayput = beforeMonthEndDate - i;
    // console.log(dayput);
    days.push(dayput);
  }

  for (let i = 1; i <= endDate; i++) {
    days.push(i);
  }

  for (let i = 1; i <= endplus; i++) {
    days.push(i);
  }

  //   console.log(days);
  let day = [];

  const date = new Date(startData);
  const dayOfWeek = date.getDay();
  //   console.log(dayOfWeek); // 출력: 1 (월요일)

  const edate = new Date(endData);
  const edayOfWeek = edate.getDay();
  //   console.log(edayOfWeek); // 출력: 1 (월요일)

  const dayOfStart = date.getDate(); //시작 날짜의 일
  const dayOfEnd = edate.getDate(); //종료 날짜의 일(ex. 14일 -> 14)
  const count1 = 5;
  const count2 = 0;
  let WholeDate = dayOfEnd - dayOfStart;

  //   console.log(WholeDate);

  const counts = 4;
  const counts2 = 5;
  for (let i = 0; i <= fulldayCount; i++) {
    if (days[i] === dayOfStart) {
      const sum = Math.floor(i / 7 + dayOfWeek);
      // setNum(sum);
    }
    if (i > 0 && i % 7 === 0) {
      wholeMonth.push(<div className={styles.daytable}>{day}</div>);

      day = [];

      day.push(
        <div className={styles.dayBoxHoliday}>
          <p className={styles.boxDate}>{days[i]}</p>
        </div>
      );
    } else {
      if (i === 0 || i % 7 === 6) {
        day.push(
          <div className={styles.dayBoxHoliday}>
            <p className={styles.boxDate}>{days[i]}</p>
          </div>
        );
      } else {
        day.push(
          <div className={styles.dayBox}>
            <p className={styles.boxDate}>{days[i]}</p>
          </div>
        );
      }
    }
  }

  const containerStyle = {
    marginTop: `${counts * 4.8}vw`,
    marginLeft: `${counts2 * 13.4}vw`,
    width: `${WholeDate * 10.2}vw`,
  };
  const containerStyle2 = {
    marginTop: `${count1 * 4.8 + 1}vw`,
    marginLeft: `${count2 * 13.4}vw`,
    width: `${WholeDate * 10.2}vw`,
  };
  const containerStyle3 = {
    marginTop: `${2.5 * 4.8 + 1}vw`,
    marginLeft: `${0.9 * 13.4}vw`,
    width: `${3 * 10.3}vw`,
  };
  return (
    <>
      {wholeMonth}
      {/* <CalEventBar style={containerStyle}/> */}
      {events &&
        events.map((events, index) => {
          return (
            <div key={index} style={containerStyle} className={styles.eventBar}>
              event title
            </div>
          );
        })}
      <div style={containerStyle2} className={styles.eventBar}>
        event title
      </div>
      <div style={containerStyle3} className={styles.eventBar1}>
        event title
      </div>
    </>
  );
}
