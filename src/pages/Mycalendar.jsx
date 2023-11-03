import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext, BrowserRouter, Route, Link, Switch, useNavigate, useLocation } from 'react-router-dom';

import styles from '../styles/Mycalendar.module.css';
import SetEventModal from '../components/SetEventModal';
import CalDayGrid from '../components/CalDayGrid';
import DatePicker from 'react-datepicker';
import '../styles/Mycalendar.css';

export default function Mycalendar() {
   const { teamIndex } = useOutletContext();
   const [changeEvent, setChangeEvent] = useState(false);
   const [startDay, setStartDay] = useState(null);
   const [endDay, setEndDay] = useState(null);
   const [title, setTitle] = useState(null);
   const [scheduleIndex, setScheduleIndex] = useState(null);
   const [eventColor, setEventColor] = useState(null);
   const [createdTime, setCreatedTime] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [writer, setWriter] = useState(null);
   const [note, setNote] = useState(null);

   const openModal = () => {
      setChangeEvent(false);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setChangeEvent(true);
      setIsModalOpen(false);
      setStartDay(new Date());
      setEndDay(new Date());
      setTitle('');
      setScheduleIndex(null);
      setEventColor(null);
   };

   var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];
   var weekDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

   const [today, setSelectedStartDate] = useState(new Date());
   const [dayMove, setDayMove] = useState(0);

   useEffect(() => {
      if (dayMove) {
         localStorage.setItem('date', today);
         //  setDayMove(0);
      }
   }, [today]);

   useEffect(() => {
      if (localStorage.getItem('date') && localStorage.getItem('date') !== today) {
         const storageDate = String(localStorage.getItem('date'));

         const toDate = new Date(storageDate);
         setSelectedStartDate(toDate);
      }
   }, []);

   // let today = new Date(); //re: Tue Aug 29 2023 14:39:43 GMT+0900 (한국 표준시)
   let month = today.getMonth(); //오늘 해당 달 mm
   let year = today.getFullYear(); //오늘 해당 년도 yyyy

   let currentMonth = monthNames[month]; //오늘 해당 달 숫자 -> 영어로

   const [modalOpen, setModalOpen] = useState(false);

   const handleStartDateChange = (date) => {
      setSelectedStartDate(date);
      setDayMove(1);
      console.log(date);
      setModalOpen(false); // 모달을 닫습니다.
   };

   const handleDivClick = () => {
      setModalOpen(!modalOpen); // 모달의 열림/닫힘 상태를 토글합니다.
   };

   return (
      <>
         <div className={`${styles.wrap}`}>
            <div className={styles.topDate}>
               <div className={styles.datePointer} onClick={handleDivClick}>
                  <span className={styles.year}>{currentMonth}</span>
                  <span className={styles.month}>{year}</span>
               </div>

               <img
                  src="/public_assets/dateMore.svg"
                  width="fit-content"
                  height="fit-content"
                  alt="profile"
                  cursor="pointer"
                  onClick={handleDivClick}
               />

               <DatePicker
                  className="custom-startDate"
                  selected={today}
                  onChange={handleStartDateChange}
                  popperPlacement="bottom-start"
                  withPortal
                  showYearDropdown
                  dateFormatCalendar="MMMM yyyy"
                  // dateFormat="MMMM d, yyyy"
                  dateFormat="yyyy"
               />

               <button className={styles.putEvent} onClick={openModal}>
                  <p className={styles.putEventTxt}>일정등록</p>
               </button>
            </div>

            <div className={styles.weekDay}>
               {weekDay &&
                  weekDay.map((day, index) => {
                     if (day === 'Su' || day === 'Sa') {
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
               <CalDayGrid
                  today={today}
                  setStartDay={setStartDay}
                  setEndDay={setEndDay}
                  setTitle={setTitle}
                  setNote={setNote}
                  setIsModalOpen={setIsModalOpen}
                  setScheduleIndex={setScheduleIndex}
                  setEventColor={setEventColor}
                  isModalOpen={isModalOpen}
                  setCreatedTime={setCreatedTime}
                  setWriter={setWriter}
               />

               <SetEventModal
                  className={styles.setEvnet}
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="이벤트 등록"
                  startDay={startDay}
                  endDay={endDay}
                  title={title}
                  scheduleIndex={scheduleIndex}
                  eventColor={eventColor}
                  created={createdTime}
                  writer={writer}
                  note={note}
               />
            </div>
         </div>
      </>
   );
}
