import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfoContext } from "../contexts/UserInfoProvider";
import "../styles/signInModal.css";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { getUserInfo } from "../APIs/userinfo";

export default function SignInModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  const { open, close, openSignUpModal } = props;

  const { userInfo, userInfoSet } = useContext(UserInfoContext);

  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const [user, setUser] = useRecoilState(userState);

  axios.defaults.baseURL = "https://www.app.vpspace.net/";

  const checkLogin = () => {
    if (email.trim() === "") {
      setErrorMsg("이메일을 입력해 주세요!");
      return;
    }
    if (password.trim() === "") {
      setErrorMsg("비밀번호를 입력해 주세요!");
      return;
    }

    axios
      .post("/account/", {
        email: email,
        pw: password,
      })
      .then(function (response) {
        setErrorMsg();
        console.log(response.data);
        setUser(response.data);
        window.location.reload();
        return response.data;
      })
      .then((data) => {
        // axios
        //   .post("/userinfo", { email: data.email })
        getUserInfo(data.user_index)
          .then(function (response) {
            userInfoSet(response.data);
          })
          .then(() => {
            close();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        setErrorMsg("아이디 또는 비밀번호를 잘못 입력하셨습니다!");
      });
  };

  const modalRef = useRef();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        // <section>
        //   <header>
        //     {header}
        //     <button className="close" onClick={close}>
        //       &times;
        //     </button>
        //   </header>
        //   <main>{props.children}</main>
        //   <footer>
        //     <button className="close" onClick={close}>
        //       close
        //     </button>
        //   </footer>
        // </section>
        <section className={styles.loginBox} ref={modalRef}>
          <section className={styles.fighteeingBox}>
            <h1 className={styles.fighteeing}>안녕하세요!</h1>
            <div className={styles.iconBox}>
              <img
                src="/public_assets/icons/naver.svg"
                alt="naver"
                className="cursor-pointer"
                onClick={() => {
                  alert("아직 준비중입니다. 조금만 기다려 주세요!");
                }}
              />
              <img
                src="/public_assets/icons/google.svg"
                alt="google"
                className="cursor-pointer"
                onClick={() => {
                  alert("아직 준비중입니다. 조금만 기다려 주세요!");
                }}
              />
              <img
                src="/public_assets/icons/kakao.svg"
                alt="kakao"
                className="cursor-pointer"
                onClick={() => {
                  alert("아직 준비중입니다. 조금만 기다려 주세요!");
                }}
              />
            </div>
            <span className={styles.areYouFirst}>처음오세요?</span>
            <br />
            <span
              className={styles.signUp}
              onClick={() => {
                close();
                openSignUpModal();
              }}
              // className={styles.signUp}
              // onClick={() => {
              //   navigate("/signup");
              // }}
            >
              3초만에 회원가입
            </span>
          </section>
          <form className={styles.loginInputBox}>
            <span>Email Address</span>
            <input
              type="text"
              className={styles.emailInput}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") checkLogin();
              }}
            />
            <div className="flex justify-between">
              <span>Password</span>
              <div
                className="flex gap-1 cursor-pointer"
                onClick={() => {
                  setHide(!hide);
                }}
              >
                {hide ? (
                  <img src="/public_assets/icons/hide.svg" alt="kakao" />
                ) : (
                  <img src="/public_assets/icons/show.svg" alt="kakao" />
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
              onKeyUp={(e) => {
                if (e.key === "Enter") checkLogin();
              }}
            />
            <div className={styles.findPasswordAndErrorMsg}>
              <span className={styles.findPassword}>비밀번호 찾기</span>
              {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
            </div>
          </form>
          <button
            className={styles.loginBtn}
            onClick={() => {
              checkLogin();
            }}
          >
            Log in
          </button>
        </section>
      ) : null}
    </div>
  );
}
