import React, {useState, useRef, useEffect} from 'react';
import { useOutletContext, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker 스타일 가져오기
import "../styles/SetEventModal.css";
import { addScheduleByToDo } from "../APIs/schedule";

function ModalComponent({ isOpen, onRequestClose }) {
  const { teamIndex } = useOutletContext();
  const [userLogin, setUserLogin] = useRecoilState(userState);

  const [inputValue, setInputValue] = useState(''); //event 제목 입력 관리
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [inputNoteValue, setInputNoteValue] = useState(''); //event 메모 입력 관리
  const inputNoteRef = useRef(null);

  const handleInputNoteChange = (event) => {
    setInputNoteValue(event.target.value);
  };

  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); //event 시작 날짜 입력 관리
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); //event 종료 날짜 입력 관리

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const [selectedColor, setSelectedColor] = useState(null);
  const colors = [
    { name: '기획', code: '#FDEFAE' },
    { name: '개발', code: '#C7EBE8' },
    { name: '디자인', code: '#FFE9E9' },
  ];
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const addEventsToDB = async () => {

    const startDateObject = new Date(selectedStartDate);
    const sYear = startDateObject.getFullYear();
    const sMonth = String(startDateObject.getMonth() + 1).padStart(2, '0');
    const sDay = String(startDateObject.getDate()).padStart(2, '0');
    const formattedStartDate = `${sYear}${sMonth}${sDay}`;

    const endDateObject = new Date(selectedEndDate);
    const eYear = endDateObject.getFullYear();
    const eMonth = String(endDateObject.getMonth() + 1).padStart(2, '0');
    const eDay = String(endDateObject.getDate()).padStart(2, '0');
    const formattedEndDate = `${eYear}${eMonth}${eDay}`;

    const createTime = new Date();
    const createTimestamp = createTime.toISOString();
    
    const userIndex = userLogin.user_index;

    const status = '1';
    console.log(inputNoteValue);
    const a = JSON.stringify(inputValue);
    console.log(a);

    const color = "#FFC0CB";

    addScheduleByToDo({
      teamIndex: teamIndex, 
      title: inputValue || "New Event", 
      content: inputNoteValue,
      status: 1,
      startDate: formattedStartDate, 
      endDate: formattedEndDate, 
      writer: userIndex, 
      createdAt: createTimestamp, 
      color: null 
    })
    .then(function () {
      console.log("db에 일정 추가 성공");
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  const handleClose = () => {
    addEventsToDB(); 
    onRequestClose(); 
    setInputValue('');
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
    setInputNoteValue('');

  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="이벤트 등록"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(105, 105, 105, 0.8)'
        },
        content: {
          position: 'absolute',
          top: '5vh',
          left: '10vw',
          right: '5vw',
          bottom: '5vh',
          border: 'none',
          background: 'rgb(50,50,50)',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '3% 5% 3% 5%'
        },
        zIndex: '3'

      }}
    >
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="custom-input" 
          placeholder={`${inputValue ? {inputValue} : "New Event"}`}
        />
      </div>

      <div className="dateContainer">
        <p>Start Date</p>          
        <DatePicker
          className="custom-startDateInput" 
          selected={selectedStartDate}
          onChange={handleStartDateChange}
          popperPlacement="bottom-start"
          withPortal
          showYearDropdown
          dateFormatCalendar="MMMM yyyy"
          dateFormat="MMMM d, yyyy"
        />
      </div>

      <div className="dateContainer">
        <p>End Date  </p>          
        <DatePicker
          className="custom-endDateInput" 
          selected={selectedEndDate}
          onChange={handleEndDateChange}
          popperPlacement="bottom-start"
          withPortal
          showYearDropdown
          dateFormatCalendar="MMMM yyyy"
          dateFormat="MMMM d, yyyy"
        />
      </div>

      <div className="cate-select">
        <p>Category </p>          

        {colors.map((color,index) => {

          return(
          <div className="cate-inbox" key={index}>
          <div
            className={`color-circle ${selectedColor === color.code ? 'selected' : ''}`}
            style={{ backgroundColor: color.code }}
            onClick={() => handleColorSelect(color.code)}
          ></div>
          <span className="label">{color.name}</span>
          </div>
        );
        })}
      </div>

      <div className='line'></div>

      <div className="input-container">
        <textarea
          ref={inputNoteRef}
          value={inputNoteValue}
          onChange={handleInputNoteChange}
          className="custom-noteInput"
          placeholder="Add Note"
        />
      </div>

      <button className="closeButton" onClick={handleClose}>Save</button>
    </Modal>
  );
}

export default ModalComponent;
