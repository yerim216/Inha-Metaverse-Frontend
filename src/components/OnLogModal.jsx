import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../APIs/userinfo";

function Modal({ onClose }) {
  const modalRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (user) {
      // axios
      //   .post("https://www.app.vpspace.net/userinfo", {
      //     email: user.email,
      //   })

      // JSON으로 받아오는 데이터가 배열 형태여서, 0번째 인덱스에 접근하여 값 설정.
      getUserInfo(user.user_index).then((res) => {
        setUserInfo(res.data[0]);
      });
    }
  }, [user]);

  const handleClose = () => {
    onClose?.();
  };
  const logout = () => {
    window.location.href = "/";
    setUser(null);

    window.localStorage.clear();
  };
  useOutSideClick(modalRef, handleClose);

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <LogoutButton onClick={logout}>
          <i className="fa-solid fa-xmark"></i>
        </LogoutButton>
        <Contents>
          <p>{userInfo && userInfo.user_name}</p>
          <Link to="/createmyprofile">
            <div>프로필 관리</div>
          </Link>
          <div
            onClick={() => {
              navigate("/createproject");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            프로젝트 만들기
          </div>
          <Button onClick={logout}>로그아웃</Button>
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
  height: 270px;
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
    font-family: "Avenir";
    font-size: 18px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.5);
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
  background-color: #000000;
  border-radius: 26px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;
export default Modal;
