import React, { useState, useEffect } from "react";
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
  const plans = [
    "기획",
    "개발 기획",
    "서비스 기획",
    "프로덕트 기획",
    "영업 기획",
  ];

  const designs = [
    "디자인",
    "UX 디자인",
    "UI 디자인",
    "프로덕트 디자인",
    "편집 디자인",
  ];
  const options = [
    "개발",
    "프론트엔드 개발",
    "백엔드 개발",
    "머신러닝",
    "AI 개발",
    "QA 엔진",
    "IOS 개발",
    "Android 개발",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const [selectedValue, setSelectedValue] = useState(""); // 선택한 값을 저장할 상태 변수
  const [text, setText] = useState("");

  const [selectedOption1, setSelectedOption1] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState(0);
  const [selectedOption3, setSelectedOption3] = useState(0);

  const selectedValue1 = plans[selectedOption1];
  const selectedValue2 = designs[selectedOption2];
  const selectedValue3 = options[selectedOption3];

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setSelectedOption3(event.target.value);
  };

  const navigate = useNavigate();

  const onClickButton = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // 선택한 값을 상태 변수에 저장
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const userLoginString = userLogin.email.toString();

  useEffect(() => {
    axios
      .post("https://www.app.vpspace.net/userinfo", {
        email: userLoginString,
      })

      .then(function (res) {
        const myArray = Object.values(res.data);
        setUsers(myArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

  const userIndex = userData[0];

  const profileSave = () => {
    window.location.href = "/";
  };
  //경력 db 저장
  useEffect(() => {
    axios
      .post("https://www.app.vpspace.net/userinfo/put/job", {
        index: userIndex,
        job: 1,
      })

      .then(function (res) {
        const myArray = Object.values(res.data);

        setUsers(myArray);
        console.log("유저 직무 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //경력 저장
  useEffect(() => {
    axios
      .post("https://www.app.vpspace.net/userinfo/put/career", {
        index: userIndex,
        career: selectedValue,
      })

      .then(function (res) {
        const myArray = Object.values(res.data);

        setUsers(myArray);
        console.log("유저 경력 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(typeof text);
  console.log(text);

  //자기소개 저장
  useEffect(() => {
    axios
      .post("https://www.app.vpspace.net/userinfo/put/introduction", {
        index: userIndex,
        introduction: text,
      })

      .then(function (res) {
        const myArray = Object.values(res.data);

        setUsers(myArray);
        console.log("유저 소개 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const option = {
    width: "300px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };
  const option2 = {
    width: "600px",
    height: "200px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };

  const option3 = {
    display: "flex",
    width: "150px",
    flexDirection: "row",
    gap: "20px",
  };

  const option4 = {
    display: "flex",
    height: "30px",
    flexDirection: "row",
    gap: "20px",
  };
  const txts = {
    color: "white",
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
        {userLogin ? (
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
        <h1 className={styles.title}>{userData[1]}님 안녕하세요! 신나ㅎ.ㅎ</h1>

        <div className={styles.profileImg}>
          <span className={styles2.wrapper}>
            <img src="/public_assets/proex.png" />
            <p className={styles2.imgtxt}>이미지 교체하기</p>
          </span>
        </div>

        <div className={styles2.name}>
          <div className={styles2.careearSelectWrapper}>
            <span className={styles2.middleFont}>경력</span>
            <div className={styles2.n}></div>
            <select
              style={option}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">선택하세요</option>
              {/* 1부터 10까지의 선택지 생성 */}
              {Array.from({ length: 10 }, (_, index) => (
                <option style={option} key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <p>선택한 값: {selectedValue}</p>
          </div>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>자기소개</span>
          <div className={styles2.n}></div>
          <textarea style={option2} value={text} onChange={handleTextChange} />
          <p>입력한 내용: {text}</p>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>직무(관심 분야)</span>
          <div className={styles2.n}></div>
          <div style={option4}>
            <select
              style={option3}
              value={selectedOption1}
              onChange={handleOption1Change}
            >
              {plans.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            <select
              style={option3}
              value={selectedOption2}
              onChange={handleOption2Change}
            >
              {designs.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            <select
              style={option3}
              value={selectedOption3}
              onChange={handleOption3Change}
            >
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            <p style={txts}>직무선택 : </p>
            {selectedValue1 && <p style={txts}>{selectedValue1}</p>}
            {selectedValue2 && <p style={txts}>{selectedValue2}</p>}
            {selectedValue3 && <p style={txts}>{selectedValue3}</p>}
          </div>
        </div>
        <div className="flex w-full justify-center gap-8">
          <button onClick={profileSave} className={styles.changeBtn}>
            수정반영
          </button>
        </div>
      </section>
    </>
  );
}
