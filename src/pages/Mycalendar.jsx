import React, { useContext, useEffect, useState } from "react";
import { useOutletContext, useHistory } from "react-router-dom";
import styles from "../styles/Mycalendar.module.css";
import RenderCalendarCell from "../components/RenderCalendarCell";
import SetEventModal from "../components/SetEventModal";
import CalDayGrid from "../components/CalDayGrid";

export default function Mycalendar() {
  const { teamIndex } = useOutletContext();
  const [changeEvent, setChangeEvent] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setChangeEvent(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setChangeEvent(true);
    setIsModalOpen(false);
  };

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var weekDay = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let today = new Date(); //re: Tue Aug 29 2023 14:39:43 GMT+0900 (한국 표준시)
  let month = today.getMonth(); //오늘 해당 달
  let year = today.getFullYear(); //오늘 해당 년도

  let currentMonth = monthNames[month]; //오늘 해당 달 숫자 -> 영어로
  console.log(year);

  const smallCalendar = () => {
    alert("추가 예정");
  };

  return (
    <>
      <div className={`${styles.wrap}`}>
        <div className={styles.topDate}>
          <span className={styles.year}>{currentMonth}</span>
          <span className={styles.month}>{year}</span>
          <img
            src="/public_assets/dateMore.svg"
            width="fit-content"
            height="fit-content"
            alt="profile"
            cursor="pointer"
            onClick={smallCalendar}
          />
          <button className={styles.putEvent} onClick={openModal}>
            <p className={styles.putEventTxt}>일정등록</p>
          </button>
        </div>

        <div className={styles.weekDay}>
          {weekDay &&
            weekDay.map((day, index) => {
              if (day === "Su" || day === "Sa") {
                return (
                  <span key={index} className={styles.weekends}>
                    {day}
                  </span>
                );
              } else {
                return (
                  <span key={index} className={styles.weekdays}>
                    {day}
                  </span>
                );
              }
            })}
        </div>
        <div className={styles.cellBox}>
          <CalDayGrid today={today} />
          {/* <RenderCalendarCell isModalOpen={isModalOpen} /> */}
          <SetEventModal
            className={styles.setEvnet}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="이벤트 등록"
          />
        </div>
      </div>

      <div className={styles.weekDay}>
        {weekDay &&
          weekDay.map((day, index) => {
            if (day === "Su" || day === "Sa") {
              return (
                <span key={index} className={styles.weekends}>
                  {day}
                </span>
              );
            } else {
              return (
                <span key={index} className={styles.weekdays}>
                  {day}
                </span>
              );
            }
          })}
      </div>
      <div className={styles.cellBox}>
        <CalDayGrid today={today} changeEvent={changeEvent} />
        {/* <RenderCalendarCell isModalOpen={isModalOpen} /> */}
        <SetEventModal
          className={styles.setEvnet}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="이벤트 등록"
        />
      </div>
    </>
  );
}
