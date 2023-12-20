import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Modal({ open, onClose, eventTitle,deleteButtonClick,reviseButtonClick }) {
  const modalRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();

  const handleClose = () => {
    onClose?.();
  };

  const reviseButton = () => {
    reviseButtonClick();
    handleClose();
    
  };
  const deleteButton = () => {
    // window.location.href = "/";
    deleteButtonClick();
    handleClose();
  };
  
  useOutSideClick(modalRef, handleClose);

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        {/* <LogoutButton onClick={logout}>
          <i className="fa-solid fa-xmark"></i>
        </LogoutButton> */}
        <Contents>
          <p> 선택된 일정 : {eventTitle}</p>
          
          <Span>
            <Button onClick={reviseButton}>일정 수정</Button>

            <Button onClick={deleteButton}>일정 삭제</Button>
          </Span>
          
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
  margin-top: 32px;
  margin-left: 44.7vw;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 9999;
`;

const ModalWrap = styled.div`
  display: felx;
  width: 370px;
  height: 176px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
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
    padding-top:7px;
    padding-bottom:7px;
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
    background-color: #B0C4DE; /* 슬라이드 바의 색상 */
    border-radius: 10px; /* 슬라이드 바의 모서리 반경 */
  }
  
  p::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 슬라이드 바의 트랙 색상 */
    border-radius: 10px; /* 슬라이드 바의 모서리 반경 */
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
  background-color: #4682B4;
  border-radius: 26px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #B0C4DE;
  }
`;
export default Modal;
