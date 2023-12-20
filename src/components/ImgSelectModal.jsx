import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import styles from "../styles/ImgSelectModal.module.css";
import { getUserInfo, putUserImg } from "../APIs/userinfo";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

const ImageSelector = ({ userProfileIdx, setUserProfileIdx }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIdx = userLogin.user_index;

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.profile);

  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.profile);
    else setTm(theme.darkTheme.profile);
  }, [themeMode]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleImageChange = (userIdx, userProfileIdx) => {
    putUserImg(userIdx, userProfileIdx)
      .then(function () {
        // console.log('유저 프로필 이미지 저장 성공');
      })
      .catch(function (error) {
        //   console.log(error);
      });
  };

  const rerendering = () => {
    getUserInfo(userIdx)
      .then(function (res) {
        setUserProfileIdx(res.data[0].user_img_index);
      })
      .catch(function (error) {
        //   console.log(error);
      });
  };

  const clickApplyBtn = () => {
    handleImageChange(userIdx, userProfileIdx);
    setModalIsOpen(false);
  };

  const closeModal = () => {
    rerendering();
    setModalIsOpen(false);
  };

  const customModalStyles = {
    content: {
      backgroundColor: "#1C1D1E",
      width: "60%", // 모달의 너비
      height: "60%", // 모달의 높이
      top: "50%", // 모달이 화면의 중앙에 위치하도록 설정
      left: "50%", // 모달이 화면의 중앙에 위치하도록 설정
      transform: "translate(-50%, -50%)", // 모달이 정확한 중앙에 위치하도록 설정
      borderRadius: "40px",
    },
  };

  const close = {
    color: "white",
    float: "right",
    marginTop: "40px",
    marginBottom: "50px",
    fontSize: "20px",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
    backgroundColor: "#9B9B9B",
    padding: "5px 10px 5px 10px",
    borderRadius: "40px",
  };

  const apply = {
    color: "white",
    float: "right",
    marginTop: "40px",
    marginBottom: "50px",
    fontSize: "20px",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
    backgroundColor: "#0C6EED",
    padding: "5px 10px 5px 10px",
    borderRadius: "40px",
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        className={styles.imgtxt}
        onClick={openModal}
        style={{ color: tm.mainTextColor }}
      >
        프로필 사진
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div>
          <li className={styles.screen}>
            <h1 className={styles.title} style={{ color: tm.mainTextColor }}>
              프로필 이미지를 선택해 주세요!
            </h1>
            <section className="flex mr-auto ml-auto items-center gap-6">
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 1 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(1);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_1.png"
                  alt="profile1"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 2 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(2);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_2.png"
                  alt="profile2"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 3 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(3);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_3.png"
                  alt="profile3"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 4 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(4);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_4.png"
                  alt="profile4"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 5 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(5);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_5.png"
                  alt="profile5"
                  className="w-20 h-20 object-cover"
                />
              </button>
            </section>

            <section className="flex mr-auto ml-auto items-center gap-6">
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 11 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(11);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_11.png"
                  alt="profile11"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 12 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(12);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_12.png"
                  alt="profile12"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 13 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(13);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_13.png"
                  alt="profile13"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 14 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(14);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_14.png"
                  alt="profile14"
                  className="w-20 h-20 object-cover"
                />
              </button>
              <button
                className={`w-18 h-18 transition-all hover:scale-105 ${
                  userProfileIdx === 15 && "rotate-6 scale-125"
                }`}
                style={{
                  borderRadius: "10%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setUserProfileIdx(15);
                }}
              >
                <img
                  src="/public_assets/profileImg/profileImg_15.png"
                  alt="profile15"
                  className="w-20 h-20 object-cover"
                />
              </button>
            </section>
            <section className="flex mr-auto ml-auto items-center gap-[30px]">
              <button style={apply} onClick={clickApplyBtn}>
                적용하기
              </button>
              <button style={close} onClick={closeModal}>
                닫기
              </button>
            </section>
          </li>
        </div>
      </Modal>
    </div>
  );
};

export default ImageSelector;
