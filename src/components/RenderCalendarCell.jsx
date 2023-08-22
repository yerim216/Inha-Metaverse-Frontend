import React from "react";
import styles from "../styles/RenderCalendarCell.module.css";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse, format,addMonths} from 'date-fns';

export default function RenderCalendarCell() {
    let c = new Date();

    console.log("셀 불러오기");
    const monthStart =  startOfMonth(c);
    const monthEnd = endOfMonth(c);
    const oneMonthBeforeEnd = addMonths(monthEnd, -1);
    const oneMonthAfterStart = addMonths(monthStart, 1);

    let startDay = monthStart.getDay(); //숫자로 표현, 0부터 시작
    let endDay = monthEnd.getDay(); // 이번달 마지막 요일을 0 1 2로 표현

    let startplus = 6-startDay; //전체 날짜 계산용. 앞뒤로 몇일 남는지 계싼
    let endplus = 6-endDay; // 다음 달 요일 수 (이번 달 캘린더에 걸쳐진) -> 0이면 걸쳐진 날 없음

    let endDate = monthEnd.getDate(); //한달이 몇일인지 확인

    let fulldayCount = endDate+startDay+endplus; // 한 화면 전체 날짜 배열 크기
    let weekCount = fulldayCount/7; //일주일 반복 횟수

    let beforeMonthEnd =oneMonthBeforeEnd.getDay(); //이전 달 마지막 요일이 일 월 화 등인지를 0 1 2로 표현 
    let beforeMonthEndDate =oneMonthBeforeEnd.getDate(); //이전 달의 마지막 날짜

    // console.log(beforeMonthEnd);
    // console.log("tmk"+beforeMonthEndDate);

    // console.log(monthStart);
    // console.log(monthEnd);
    // console.log(oneMonthBeforeEnd);
    // console.log(oneMonthAfterStart);

    const rows = [];;
    let days = []; // 
    let wholeMonth = [];

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
   
    console.log(days);
    let day = [];

    for (let i = 0; i <= fulldayCount; i++){
        
        if (i > 0 && i%7 === 0){
            wholeMonth.push(
                <div className={styles.daytable}>
                    {day}
                </div>
            );

            day=[];

            day.push(
                <div className={styles.dayBoxSu}> 
                    <p className={styles.boxDate}>{days[i]}</p>
                </div>
            ); 
            
        }else{
            if(i===0 || i % 7 === 6){
                day.push(
                    <div className={styles.dayBoxSu}> 
                        <p className={styles.boxDate}>{days[i]}</p>
                    </div>
                ); 
            }else{
                day.push(
                    <div className={styles.dayBox}> 
                        <p className={styles.boxDate}>{days[i]}</p>
                    </div>
                ); 
            } 
        }
    }
        
    return(
        <>
            {wholeMonth}
        </>
    
    );       
}