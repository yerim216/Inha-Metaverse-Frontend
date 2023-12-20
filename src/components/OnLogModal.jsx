import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../APIs/userinfo";
import styles from "../styles/modules/OnLogModal.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import ToggleSwitch from "./ToggleSwitch";

function Modal({ onClose, loginModalRef }) {
  const modalRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (user) {
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

    // window.localStorage.clear();
    window.localStorage.removeItem("recoil-persist");
  };
  useOutSideClick(modalRef, loginModalRef, handleClose);

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  const handleMouseEnter = (target) => {
    target.style.backgroundColor = tm.modalHover;
  };
  const handleMouseLeave = (target) => {
    target.style.backgroundColor = tm.modalBg;
  };

  return (
    <div
      className={styles.onLogModal}
      ref={modalRef}
      style={{
        backgroundColor: tm.modalBg,
        color: tm.hazyTextColor,
      }}
    >
      <div class={styles.arrowUp}></div>
      <div
        className="w-full h-full -mb-4 flex items-center justify-center text-sm"
        style={{
          color: tm.accentColor,
        }}
      >
        {userInfo ? userInfo.user_name + " (님)" : "유저 이름"}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/createmyprofile");
        }}
        onMouseEnter={(e) => {
          handleMouseEnter(e.target);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e.target);
        }}
      >
        <div className="w-1/12">
          <img src="/public_assets/icons/myPage.svg" alt="myPage" />
        </div>
        마이페이지
      </button>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/createproject");
          window.scrollTo({ top: 0, behavior: "auto" });
        }}
        onMouseEnter={(e) => {
          handleMouseEnter(e.target);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e.target);
        }}
      >
        <div className="w-1/12">
          <img
            src="/public_assets/icons/createProject.svg"
            alt="createProject"
          />
        </div>
        프로젝트 생성
      </button>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/projectlists");
          window.scrollTo({ top: 0, behavior: "auto" });
        }}
        onMouseEnter={(e) => {
          handleMouseEnter(e.target);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e.target);
        }}
      >
        <div className="w-1/12">
          <img
            src="/public_assets/icons/projectManage.svg"
            alt="projectManage"
          />
        </div>
        프로젝트 관리
      </button>
      <button
        className={styles.button}
        onMouseEnter={(e) => {
          handleMouseEnter(e.target);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e.target);
        }}
      >
        <div className="w-1/12">
          <img src="/public_assets/icons/darkMode.svg" alt="darkMode" />
        </div>
        다크모드
        <div className="mr-[27px]"></div>
        <ToggleSwitch />
      </button>
      <button
        className={`${styles.button} rounded-b-[20px]`}
        onClick={logout}
        onMouseEnter={(e) => {
          handleMouseEnter(e.target);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e.target);
        }}
      >
        <div className="w-1/12">
          <img src="/public_assets/icons/logOut.svg" alt="logOut" />
        </div>
        로그아웃
      </button>
    </div>
  );
}

export default Modal;
