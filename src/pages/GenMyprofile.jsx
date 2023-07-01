import React, { useState,useEffect } from "react";
import styles2 from "../styles/GenMyprofile.module.css";
import styles from "../styles/modules/CreateProject.module.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import OnLogModal from "../components/OnLogModal";
import Dot from "../components/Dot";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  // 팀 이름, 팀 소개, 프로젝트 설명, 모집 인원
  // 팀 구성원 추가
  // 팀 기술스택 추가
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);

  const navigate = useNavigate();
  const userLoginString = userLogin.email.toString();

  const onClickButton = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    axios.post('http://43.201.166.82:3000/userinfo', {
        "email": userLoginString
    })

    .then(function (res){
        const myArray = Object.values(res.data);
        console.log('myArray = '+ myArray);
        setUsers(myArray);
        console.log("성공");
    })
    .catch(function (error){
        console.log(error);
    })
},[])

  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
    document.body.style.backgroundColor = "white";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";

    // 다크모드와 화이트모드 다르게 설정 필요
    document.body.style.backgroundColor = "#111111";
  };

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
    blockScroll();
  };
  const closeSignInModal = () => {
    setSignInModalOpen(false);
    freeScroll();
  };

  // 회원가입창 팝업 관리 state
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    blockScroll();
  };
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
    freeScroll();
  };
  const handleButtonClick = () => {
    window.location.href = "/myprofile";
  };

  return (
    <>
      <SignInModal
        open={signInModalOpen}
        close={closeSignInModal}
        openSignUpModal={openSignUpModal}
      ></SignInModal>
      <SignUpModal
        open={signUpModalOpen}
        close={closeSignUpModal}
      ></SignUpModal>
      <nav className={styles.navbar}>
        <span
          className={styles.navLink}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
        {user ? (
          <button
            className={styles.loginModal}
            onClick={() => {
              onClickButton();
            }}
          >
            {isOpen && (
              <OnLogModal
                open={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}
              />
            )}
            <img
              src="/public_assets/profileImg.png"
              width="44"
              height="44"
              alt="profile"
            />
            <img src="/public_assets/modal.png" alt="profile" />
          </button>
        ) : (
          <button className={styles.loginButton} onClick={openSignInModal}>
            <span>Login</span>
            <Dot />
          </button>
        )}
        <button onClick={handleButtonClick} className={styles.navLink}>
          Profile
        </button>
      </nav>
      <img src="/public_assets/VP.png" alt="darkModeBg" className={styles.VP} />
      <section className={styles.paddingSection}>
      <h1 className={styles.title}>프로필 만들기</h1>

        <div className={styles.profileImg}>
            <span className={styles2.wrapper}>
                <img src="/public_assets/proex.png" />
                <p className={styles2.imgtxt}>이미지 교체하기</p>
            </span>
        </div>
        
        <div className={styles2.name}>
          <span className={styles2.middleFont}>이름</span>
          {/* 관심기술 목록 API 호출 */}
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>경력</span>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>자기소개</span>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>직무(관심 분야)</span>
        </div>
        <div className="flex w-full justify-center gap-8">
          <button className={styles.changeBtn}>수정반영</button>
          <button className={styles.leaveBtn}>탈퇴</button>
        </div>
      </section>
    </>
  );
}
