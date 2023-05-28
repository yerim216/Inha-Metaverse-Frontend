import React, { useContext, useState } from "react";
import styles from "../styles/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfoContext } from "../contexts/UserInfoProvider";

export default function SignIn() {
  const { userInfo, userInfoSet } = useContext(UserInfoContext);

  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  axios.defaults.baseURL = "http://app.vpspace.net/";

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
        navigate("/");
        return response.data;
      })
      .then((data) => {
        axios
          .post("/userinfo", { email: data.email })
          .then(function (response) {
            userInfoSet(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        setErrorMsg("아이디 또는 비밀번호를 잘못 입력하셨습니다!");
      });
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <section className={styles.fighteeingBox}>
          <h1 className={styles.fighteeing}>오늘도 힘내보아요!</h1>
          <div className={styles.iconBox}>
            <img src="/public_assets/icons/naver.svg" alt="naver" />
            <img src="/public_assets/icons/google.svg" alt="google" />
            <img src="/public_assets/icons/kakao.svg" alt="kakao" />
          </div>
          <span className={styles.areYouFirst}>처음오세요?</span>
          <br />
          <span
            className={styles.signUp}
            onClick={() => {
              navigate("/signup");
            }}
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
                <img src="/public_assets/icons/hide.svg" alt="kakao" />
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
      </div>
    </div>
  );
}
