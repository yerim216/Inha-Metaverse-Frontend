import React, { useEffect, useState } from "react";
import styles from "../styles/SignUp.module.css";
import "../styles/SignUp.css";
import "../components/javascript/signUp";
import { Collapse } from "react-collapse";

export default function SignUp() {
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
  const [nickName, setNickName] = useState();

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
                <h1 className="title">방문을 환영해요</h1>
                <section className="first-input">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input firstInput"
                  />
                  <div className="flex items-center">
                    <input
                      type="password"
                      placeholder="Password"
                      className="input"
                    />
                    <button
                      onClick={() => {
                        setIndex((cur) => {
                          return cur + 1;
                        });
                      }}
                      className="button"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="flex">
                    <input type="checkbox" id="checkId" className="mr-1 ml-3" />
                    <label htmlFor="checkId">아이디 저장</label>
                  </div>
                </section>
                <section className="otherSignUp">
                  <div className="flex gap-10">
                    <img src="/public_assets/naver.png" alt="naver" />
                    <img src="/public_assets/google.png" alt="google" />
                    <img src="/public_assets/kakao.png" alt="kakao" />
                  </div>
                  <div className="mt-6">이메일가입</div>
                </section>
              </li>
              <li className="screen secondScreen">
                <h1 className="title">닉네임을 정해보아요</h1>
                <section>
                  <input
                    type="text"
                    placeholder="닉네임"
                    className="input ml-auto mr-auto"
                    value={nickName}
                    onChange={(e) => {
                      setNickName(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      setIndex((cur) => {
                        return cur + 1;
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
                  {nickName} 님의 관심 분야를 알려주세요!
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
