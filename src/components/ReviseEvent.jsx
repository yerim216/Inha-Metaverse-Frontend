import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Modal({
  open,
  onClose,
  eventTitle,
  selectEventId,
  eventStartDate,
  eventEndDate,
  fetch,
}) {
  const modalRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState();
  const [reviseEventTitle, setReviseEventTitle] = useState();
  const [reviseEventID, setReviseEventId] = useState();
  const [reviseEventStart, setReviseEventStart] = useState();
  const [reviseEventEnd, setReviseEventEnd] = useState();

  const requestURL = `${window.baseURL}`;

  useEffect(() => {
    setReviseEventTitle(eventTitle);
    const num = parseInt(selectEventId);
    setReviseEventId(num);
    // const timestampStart = new Date(eventStartDate).getTime();
    // const timestampEnd = new Date(eventEndDate).getTime();
    if (eventStartDate != null) {
      const cDateStart =
        eventStartDate.getFullYear() +
        "-" +
        (eventStartDate.getMonth() + 1) +
        "-" +
        eventStartDate.getDate();
      const cTimeStart =
        eventStartDate.getHours() +
        ":" +
        eventStartDate.getMinutes() +
        ":" +
        eventStartDate.getSeconds();
      const dateTime = cDateStart + " " + cTimeStart;
      const dateStringStart = dateTime.toLocaleString();
      setReviseEventStart(dateStringStart);
    }

    if (eventEndDate != null) {
      const cDateEnd =
        eventEndDate.getFullYear() +
        "-" +
        (eventEndDate.getMonth() + 1) +
        "-" +
        eventEndDate.getDate();
      const cTimeEnd =
        eventEndDate.getHours() +
        ":" +
        eventEndDate.getMinutes() +
        ":" +
        eventEndDate.getSeconds();
      const dateTimeEnd = cDateEnd + " " + cTimeEnd;
      const dateStringEnd = dateTimeEnd.toLocaleString();
      setReviseEventEnd(dateStringEnd);
    }
  }, []);

  const handleClose = () => {
    onClose?.();
  };

  const handleInputChange = (e) => {
    setReviseEventTitle(e.target.value);
  };

  useOutSideClick(modalRef, handleClose);

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    if (date != null) {
      const cDateStart =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const cTimeStart =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const dateTime = cDateStart + " " + cTimeStart;
      const dateStringStart = dateTime.toLocaleString();
      setReviseEventStart(dateStringStart);
    }
  };

  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    if (date === "undefined") {
      setReviseEventEnd(reviseEventStart);
    }

    if (date != "undefined") {
      const cDateEnd =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const cTimeEnd =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const dateTimeEnd = cDateEnd + " " + cTimeEnd;
      const dateStringEnd = dateTimeEnd.toLocaleString();
      setReviseEventEnd(dateStringEnd);
    }
  };

  const reviseEvent = () => {
    //이벤트 수정사항 DB 저장
    console.log(reviseEventID);
    console.log(reviseEventTitle);

    console.log(reviseEventStart);
    console.log(reviseEventEnd);

    axios
      .post(requestURL + "schedule/modify", {
        index: reviseEventID,
        name: reviseEventTitle,
        start_date: reviseEventStart,
        end_date: reviseEventEnd,
      })
      .then((response) => {
        fetch();
      })
      .catch((error) => {
        console.error("Error revise event to DB:", error);
      });
    handleClose();
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <Contents>
          <input
            type="text"
            value={reviseEventTitle}
            onChange={handleInputChange}
          />
          <div>
            시작일 :
            <DatePicker
              selected={selectedStartDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="날짜 선택"
            />
          </div>
          <div>
            종료일 :
            <DatePicker
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="날짜 선택"
            />
          </div>
          <Button onClick={reviseEvent}>저장하기</Button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 217px;
  height: 300px;
  margin: auto;
  margin-top: 132px;
  margin-left: 44.7vw;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 9999;
`;

const ModalWrap = styled.div`
  display: felx;
  width: 400px;
  height: 350px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LogoutButton = styled.div`
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Span = styled.div`
  display: flex;
  flex-direction: row;
`;

const Contents = styled.div`
  display: flex;
  gap: 26px;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  p {
    width: 90%;
    overflow-x: auto;

    margin: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 10px;
    margin-top: 30px;
    font-family: "Avenir";
    font-size: 18px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.9);
    text-align: center;
    letter-spacing: 0.04em;
  }
  p::-webkit-scrollbar {
    width: 4px; /* 슬라이드 바의 너비 */
  }

  p::-webkit-scrollbar-thumb {
    background-color: #b0c4de; /* 슬라이드 바의 색상 */
    border-radius: 10px; /* 슬라이드 바의 모서리 반경 */
  }

  p::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 슬라이드 바의 트랙 색상 */
    border-radius: 10px; /* 슬라이드 바의 모서리 반경 */
  }

  input {
    width: 90%;
    overflow-x: auto;

    margin: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 10px;
    margin-top: 30px;
    font-family: "Avenir";
    font-size: 18px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.9);
    text-align: center;
    letter-spacing: 0.04em;
  }
  div {
    font-family: "Avenir";
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #000000;
  }
  span {
    margin-right: 9.5px;
    margin-bottom: 2px;

    align-items: center;
    display: inline-block;
    width: 10px;
    height: 10px;
    left: 72.75px;
    top: 195px;
    border-radius: 50px;
    background: #f53838;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
const Button = styled.button`
  display: inline-block;

  margin: auto;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  text-align: center;
  width: 115px;
  height: 50px;
  padding: 10px 20px;
  border: none;
  background-color: #4682b4;
  border-radius: 26px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #b0c4de;
  }
`;
export default Modal;
