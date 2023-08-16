import React from "react";
import styles from "../styles/Mycalendar.module.css";
import RenderCalendarCell from "../components/RenderCalendarCell";

export default function Mycalendar() {

    var monthNames=["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    var weekDay=['Su','Mo',"Tu","We","Th","Fr","Sa"]
    let a = new Date();
    console.log(a);
    let month = a.getMonth();
    let year = a.getFullYear();

    let currentMonth = monthNames[month];
    console.log(year);

    const smallCalendar = () => {
      alert("추가 예정");
    };

  return (<>
    <div className={styles.wrap}>
      <div className={styles.topDate}>
        <span className={styles.year}>
          {currentMonth} 
        </span>
        <span className={styles.month}>
          {year}
        </span>
        <img
              src="/public_assets/dateMore.svg"
              width="fit-content"
              height="fit-content"
              alt="profile"
              cursor ="pointer"
              onClick={smallCalendar}
            />
        <button className={styles.putEvent}>
          <p className={styles.putEventTxt}>일정등록</p>
        </button>
      </div>

      <div className={styles.weekDay}>
        {weekDay.map((day,index)=>{
          if(day ==='Su'||day ==='Sa'){
            return(
              <span className={styles.weekends}>
                {day}
              </span>
            );
          }else{
            return(
              <span className={styles.weekdays}>
                {day}
              </span>
            );
          }
        })}
      </div>

      <RenderCalendarCell />
    </div>
  </>);
}