import React,{useEffect, useState} from "react";
import styles from "../styles/CalDayGrid.module.css";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import { useOutletContext, useHistory } from "react-router-dom";
import { isSameMonth, isSameDay, addDays, parse, format,addMonths} from 'date-fns';
import CalEventBar from "../components/CalEventBar";
import { getSchedule } from "../APIs/schedule";

export default function CalDayGrid(props) {
    const { teamIndex } = useOutletContext();
    const [eventArr,setEventArr] = useState([]);
    const [startData,setStartData] = useState('2023-08-26T00:00:00.000Z');
    const [endData,setEndData] = useState('2023-08-27T00:00:00.000Z');
    const [dayEvent,setDayEvent] = useState([]);
    
    const dummyEvents = [{
        "schedule_index": 16,
        "schedule_title": "기숙사 가기",
        "schedule_content": "가서 홈플러스에서 생필품 사기",
        "schedule_status": 1,
        "start_date": "2023-08-26T00:00:00.000Z",
        "end_date": "2023-08-27T00:00:00.000Z",
        "writer_name": "햄스터",
        "manager_names": [
            null
        ]
    },
    {
        "schedule_index": 17,
        "schedule_title": "why",
        "schedule_content": "하하",
        "schedule_status": 1,
        "start_date": "2023-08-16T00:00:00.000Z",
        "end_date": "2023-08-26T00:00:00.000Z",
        "writer_name": "햄스터",
        "manager_names": [
            null
        ]
    },
    {
        "schedule_index": 19,
        "schedule_title": "이벤트 제목",
        "schedule_content": "세부 내용이에요",
        "schedule_status": 1,
        "start_date": "2023-08-26T00:00:00.000Z",
        "end_date": "2023-08-30T00:00:00.000Z",
        "writer_name": "햄스터",
        "manager_names": [
            null
        ]
    }]

    let c = new Date(); // 현재는 month를 현재 날짜로 받아오고 있음'
    const monthStart =  startOfMonth(c);
    const monthEnd = endOfMonth(c);
    const lastDayOfPreviousMonth = new Date(c.getFullYear(), c.getMonth(), 0);

    let startDay = monthStart.getDay(); //숫자로 표현, 0부터 시작
    let endDay = monthEnd.getDay(); // 이번달 마지막 요일을 0 1 2로 표현

    let startplus = 6-startDay; //전체 날짜 계산용. 앞뒤로 몇일 남는지 계싼
    let endplus = 6-endDay; // 다음 달 요일 수 (이번 달 캘린더에 걸쳐진) -> 0이면 걸쳐진 날 없음

    let endDate = monthEnd.getDate(); //한달이 몇일인지 확인

    let fulldayCount = endDate+startDay+endplus; // 한 화면 전체 날짜 배열 크기
    let weekCount = fulldayCount/7; //일주일 반복 횟수

    let beforeMonthEnd =lastDayOfPreviousMonth.getDay(); //이전 달 마지막 요일이 일 월 화 등 인지를 0 1 2로 표현 
    console.log(beforeMonthEnd);
    console.log(lastDayOfPreviousMonth);

    let beforeMonthEndDate =lastDayOfPreviousMonth.getDate(); //이전 달의 마지막 날짜

    let days = []; // 

    for (let i = beforeMonthEnd; i >= 0 ; i--){
        let dayput = beforeMonthEndDate - i;
        console.log(dayput);
        days.push(dayput);
    }

    for (let i = 1; i <= endDate ; i++){
        days.push(i);
    } 

    for (let i = 1; i <= endplus ; i++){
        days.push(i);
    }
   
    let dayLength = days.length;
    console.log(dayLength);
    let day = [];

    const date = new Date(startData);
    const dayOfWeek = date.getDay();
    console.log(dayOfWeek); // 출력: 1 (월요일)

    const edate = new Date(endData);
    const edayOfWeek = edate.getDay();
    console.log(edayOfWeek); // 출력: 1 (월요일)
     
    const dayOfStart = date.getDate(); //시작 날짜의 일
    const dayOfEnd = edate.getDate(); //종료 날짜의 일(ex. 14일 -> 14)
    let WholeDate = dayOfEnd-dayOfStart;


    
    const lowerBound = new Date('2023-07-30'); //현재 페이지의 첫 날짜
    const upperBound = new Date('2023-09-02'); //현재 페이지의 마지막 날짜

    const filteredEvents = dummyEvents.filter(event => { //햔재 페이지에서 보여줄 events만 새로운 배열에 저장 
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        
    
        return (startDate >= lowerBound && startDate <= upperBound) ||
               (endDate >= lowerBound && endDate <= upperBound);
    });
    
    const eventToString = JSON.stringify(filteredEvents) // 콘솔창 찍어보기용
    console.log("이번달 이벤트들"+eventToString);

    const eventNum = filteredEvents.length; //전체 이벤트 개수

    const [num, setNum] =useState('');
    const events = ['1','2'];


    const dateCounts = {}; // 날짜별 카운트를 저장할 객체
    filteredEvents.forEach(event => {
        const eventStartDate = new Date(event.start_date);
        const eventEndDate = new Date(event.end_date);
    
        const minDate = eventStartDate > lowerBound ? eventStartDate : lowerBound;
        const maxDate = eventEndDate < upperBound ? eventEndDate : upperBound;
    
        for (let date = minDate; date <= maxDate; date.setDate(date.getDate() + 1)) {
            const dateString = date.toISOString().substr(0, 10); // yyyy-mm-dd 형식의 날짜 문자열
            if (dateCounts[dateString]) {
                dateCounts[dateString]++;
            } else {
                dateCounts[dateString] = 1;
            }
        }
    });
    
    console.log(dateCounts);

    useEffect(()=>{
        for (let i = 0; i < eventNum; i++){
            var eventDay = filteredEvents[i].start_date.substring(8, 10); //이벤트 시작 날짜 (숫자) 
            var eventDayNum = parseInt(eventDay); //string -> num
            var eventDayEnd = filteredEvents[i].end_date.substring(8, 10); //이벤트 종료 날짜 (숫자) 
            var eventDayEndNum = parseInt(eventDayEnd); //string -> num
            var eventLeng = eventDayEndNum - eventDayNum; //이벤트 길이

            var eventCal = (startDay+eventDayNum)/7;

        } 
        // }

    },[]);

    for (let i = 0; i < 42; i++){
        if(dayLength <= i){
            day.push(
                <div key={i} className={styles.emptyBox}></div>
            )
        }else{
            const value = dateCounts[days[i]] || 0; //한 달중에 이벤트 날짜에 해당하는 경우 ,value에 해당 이벤트 개수 저장 

            day.push(
                <div key={i} className={styles.dayBox}> 
                    <p 
                      className= {`${styles.boxDate} ${
                        i === 0 || i % 7 === 6 || i % 7 === 0 ? styles.blueText : ''
                      }`}>
                        {days[i]}
                    </p>
                    {/* <CalEventBar 
                      className={days[i] === startData ? styles.eventBar : ''}
                    />                  */}
                </div>
            ); 
        }
    }


    // for (let i = 0; i < eventNum; i++){
    //     var yearMonth = dummyEvents[i].start_date.substring(0, 7);

    //         if (yearMonth === '2023-08'){ //실제 현재 보여지는 year-month 값을 넣어야 함 
    //             var eventDay = ('0' + date.getUTCDate()).slice(-2);
    //             var eventDayNum = parseInt(eventDay);

    //             var eventCal = (startDay+eventDayNum)/7;
    //             var eventCol = (startDay+eventDayNum)%7;
    //             console.log(eventCol);

    //             if(eventCol != 0) {
    //                 var eventRow = Math.floor(eventCal)+1;
    //                 console.log(eventRow);

    //             }else{
    //                 var eventRow = Math.floor(eventCal);
    //                 console.log(eventRow);

    //             }
    //         } 
    // }
    
    var eventsNum = 1;
  return (    
    <>
    <div className={styles.dayGrid}>
        {day}
        {/* {dummyEvents.map ((event,index) => {
                const yearMonth = event.start_date.substring(0, 7);
                console.log(event.schedule_title);
                if (yearMonth === '2023-08'){ //실제 현재 보여지는 year-month 값을 넣어야 함 
                    const eventDay = event.start_date.substring(8, 10); //이벤트 시작 날짜 (숫자) 
                    const eventDayNum = parseInt(eventDay); //string -> num
                    const eventDayEnd = event.end_date.substring(8, 10); //이벤트 종료 날짜 (숫자) 
                    const eventDayEndNum = parseInt(eventDayEnd); //string -> num
                    const eventLeng = eventDayEndNum - eventDayNum; //이벤트 길이
    
                    console.log(startDay+eventDayNum);
                    const eventCal = (startDay + eventDayNum)/7; //grid row 계산에 사용하는 몫 (소수점 포함)
                    const eventCol = (startDay + eventDayNum) % 7 === 0 ? 7 : (startDay + eventDayNum) % 7; //gird col 계산
                    // const eventCol = (startDay+eventDayNum)%7; 
                    const eventRow = eventCol !== 0 ? Math.floor(eventCal) + 1 : Math.floor(eventCal); //grid row 계산
                    console.log("이벤트 시작 열"+eventCol);
                    console.log("이벤트 시작 행"+eventRow);

                    // setDayEvent([eventCol,eventRow]);
                    // console.log(dayEvent);

                    const eventBarLen = eventLeng * 10.3
                    console.log("이벤트 길이"+eventBarLen);
        
                    return (
                            <CalEventBar 
                            title={event.schedule_title}
                            width={eventBarLen}
                            colStart={eventCol}
                            rowStart={eventRow}
                            // top={top}
                            // colEnd={}
                            // rowEnd={}
                            key={index}
                            /> 
                    );
                }   
                return null; // 해당 월에 해당하지 않는 이벤트는 무시
            })} */}
        </div>
    </>        
  );
}
