import React, {useRef} from "react";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

function Modal({ onClose }) {
  const modalRef = useRef(null)
  const [user, setUser] = useRecoilState(userState);

  const handleClose = () => {
    onClose?.();
  };
  const logout = () => {
    window.localStorage.clear();
    setUser(null) 
  }
  useOutSideClick(modalRef, handleClose);

  return (
      <Overlay>
        <ModalWrap ref={modalRef}>
          <LogoutButton onClick={logout}>
            <i className="fa-solid fa-xmark"></i>
          </LogoutButton>
          <Contents>
            <p>Profile</p>
            <div>내 프로젝트</div>
            <div>프로젝트 만들기</div>
            <div><span></span>내 소식</div>
            <Button onClick={logout}>로그아웃</Button>
          </Contents>
        </ModalWrap>
      </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 217px;
  height: 324px;
  margin: auto;
  margin-top: 92px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 9999;
`;

const ModalWrap = styled.div`

  display: felx;
  width: 217px;
  height: 324px;
  border-radius: 15px;
  background-color: #fff;
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

const Contents = styled.div`
  display: flex;
  gap: 26px;
  flex-direction: column;
  p {
    margin-top: 30px;
    font-family: 'Avenir';
    font-size: 18px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    letter-spacing: 0.04em;
  }
  div {
    font-family: 'Avenir';
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #000000;
  }
  span{
    margin-right: 9.5px;
    margin-bottom: 2px;

    align-items: center;
    display: inline-block;
    width: 10px;
    height: 10px;
    left: 72.75px;
    top: 195px;
    border-radius: 50px;
    background: #F53838;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
const Button = styled.button`
    margin: auto;
    font-family: 'Avenir';
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    text-align: center;
    width: 115px;
    height: 50px;
    padding: 10px 20px;
    border: none;
    background-color: #000000;
    border-radius: 26px;
    color: white;
    cursor: pointer;
    &:hover {
    background-color: #898989;
  }
`;
export default Modal;