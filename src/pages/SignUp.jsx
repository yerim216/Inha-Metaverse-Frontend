import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/SignUp.module.css";
import "../styles/SignUp.css";
import "../components/javascript/signUp";
import { Collapse } from "react-collapse";
import axios from "axios";

export default function SignUp() {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState(0);
  const [screens, setScreens] = useState();
  const [field, setField] = useState([
    ["개발 기획", "서비스 기획", "프로덕트 기획", "영업 기획"],
    [
      "프론트엔드",
      "백엔드",
      "머신러닝",
      "AI 개발",
      "QA 엔진",
      "IOS 개발",
      "Android 개발",
    ],
    ["UX 디자인", "UI 디자인", "프로덕트 디자인", "편집 디자인"],
    ["일렉 기타", "어쿠스틱 기타", "클래식 기타"],
  ]);
  const [buttons, setButtons] = useState([
    { id: 0, value: false },
    { id: 1, value: false },
    { id: 2, value: false },
    { id: 3, value: false },
  ]);
  const handleToggle = (id) => {
    setButtons(
      buttons.map((button) =>
        button.id === id ? { ...button, value: !button.value } : button
      )
    );
  };
  const [nickName, setNickName] = useState("");
  const [nicknameDuplicated, setnicknameDuplicated] = useState(false);

  const secondScreen = useRef();

  axios.defaults.baseURL = "http://app.vpspace.net/";

  const checkNicknameDuplicated = async () => {
    return axios
      .post("/account/check-duplication", {
        name: nickName,
      })
      .then(function (response) {
        setnicknameDuplicated(false);
        return false;
      })
      .catch(function (error) {
        setnicknameDuplicated(true);
        return true;
      });
  };

  useEffect(() => {
    const screensList = document.querySelectorAll(".screen");
    setScreens(Object.values(screensList));
  }, []);
  useEffect(() => {
    // index가 변할 때마다 현재 index를 제외한 것 모두 active 클래스 제거.
    // 현재 index에는 active 클래스 추가 & z-index 조정.
    if (screens) {
      screens.map((screen, idx) => {
        if (idx === index) {
          screen.classList.add("active");
          screen.style.zIndex = 10;
        } else {
          screen.classList.remove("active");
          screen.style.zIndex = 9;
        }
        return screen;
      });
    }
  }, [index, screens]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className="walkthrough show reveal">
          <div className="walkthrough-body">
            <ul className="screens animate">
              <li className="screen active z-10">
                <h1 className="title">시작해볼까요?</h1>
                <section className="first-input">
                  <form className={styles.signUpInputBox}>
                    <span className="mr-auto">이메일</span>
                    <input
                      type="text"
                      className={styles.emailInput}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <span className="hidden">gd</span>
                    <div className="flex justify-between mt-5">
                      <span>비밀번호</span>
                      <div
                        className="flex gap-1 cursor-pointer"
                        onClick={() => {
                          setHide(!hide);
                        }}
                      >
                        {hide ? (
                          <img
                            src="/public_assets/icons/hide.svg"
                            alt="kakao"
                          />
                        ) : (
                          <img
                            src="/public_assets/icons/hide.svg"
                            alt="kakao"
                          />
                        )}
                        <span>숨기기</span>
                      </div>
                    </div>
                    <input
                      type={hide ? "password" : "text"}
                      className={styles.passwordInput}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </form>
                </section>
              </li>
              <li className="screen secondScreen" ref={secondScreen}>
                <h1 className="title">닉네임을 정해보아요</h1>
                <section>
                  <span className="relative">
                    <input
                      type="text"
                      placeholder="닉네임"
                      className="input ml-auto mr-auto"
                      value={nickName}
                      onChange={(e) => {
                        setNickName(e.target.value);
                      }}
                    />
                    {nicknameDuplicated && (
                      <span className="nicknameDuplicated">
                        !아쉽지만 중복되는 닉네임이네요
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => {
                      // 닉네임 중복 api 호출.
                      // 중복되지 않을 시 setIndex를 통해 다음 슬라이드로 넘어 감.
                      // 중복될 시 nicknameDuplicated를 true로 만들어 주고, 간단한 진동 효과 넣어 줌.
                      checkNicknameDuplicated().then((duplicated) => {
                        if (duplicated) {
                          secondScreen.current.classList.add("vibration");

                          setTimeout(function () {
                            secondScreen.current.classList.remove("vibration");
                          }, 300);
                        } else {
                          setIndex((cur) => {
                            return cur + 1;
                          });
                        }
                      });
                    }}
                    className="button"
                  >
                    &gt;
                  </button>
                </section>
              </li>
              <li className="screen thirdScreen">
                <h1 className="title">
                  {nickName} <br /> 님의 관심 분야를 알려주세요!
                </h1>
                <ul className="flex ml-auto mr-auto gap-10">
                  <li className="relative">
                    <button
                      className={`fieldBtn ${
                        buttons && buttons[0].value && "coloredFieldBtn"
                      }`}
                      onClick={() => {
                        handleToggle(0);
                      }}
                    >
                      기획
                    </button>
                    <Collapse isOpened={buttons && buttons[0].value}>
                      <ul className={`fields`}>
                        {field &&
                          field[0].map((item) => <button>{item}</button>)}
                      </ul>
                    </Collapse>
                  </li>
                  <li className="relative">
                    <button
                      className={`fieldBtn ${
                        buttons && buttons[1].value && "coloredFieldBtn"
                      }`}
                      onClick={() => {
                        handleToggle(1);
                      }}
                    >
                      디자인
                    </button>
                    <Collapse isOpened={buttons && buttons[1].value}>
                      <ul className={`fields`}>
                        {field &&
                          field[1].map((item) => <button>{item}</button>)}
                      </ul>
                    </Collapse>
                  </li>
                  <li className="relative">
                    <button
                      className={`fieldBtn ${
                        buttons && buttons[2].value && "coloredFieldBtn"
                      }`}
                      onClick={() => {
                        handleToggle(2);
                      }}
                    >
                      개발
                    </button>
                    <Collapse isOpened={buttons && buttons[2].value}>
                      <ul className={`fields`}>
                        {field &&
                          field[2].map((item) => <button>{item}</button>)}
                      </ul>
                    </Collapse>
                  </li>
                  <li className="relative">
                    <button
                      className={`fieldBtn ${
                        buttons && buttons[3].value && "coloredFieldBtn"
                      }`}
                      onClick={() => {
                        handleToggle(3);
                      }}
                    >
                      기타
                    </button>
                    <Collapse isOpened={buttons && buttons[3].value}>
                      <ul className={`fields`}>
                        {field &&
                          field[3].map((item) => <button>{item}</button>)}
                      </ul>
                    </Collapse>
                  </li>
                </ul>
              </li>
              {/* <li className="screen"></li> */}
            </ul>
          </div>
          {/* <button className="button finish close" disabled="true">
            Finish
          </button> */}
        </div>
      </div>
    </div>
  );
}
