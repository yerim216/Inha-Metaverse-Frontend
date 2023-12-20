import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Nav.module.css";
import OnLogModal from "../components/OnLogModal";
import Dot from "../components/Dot";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { useNavigate } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { getUserInfo } from "../APIs/userinfo";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Nav({ isMainPage }) {
  // isMainPage를 T/F로 전달받아, 해당 값에 따라 backgroundColor 변경.
  const [user, setUser] = useRecoilState(userState);
  const [userProfileIndex, setUserProfileIndex] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  // const [tm, setTm] = useState(theme.lightTheme.nav);
  // // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  // useEffect(() => {
  //   if (themeMode === "light") setTm(theme.lightTheme.nav);
  //   else setTm(theme.darkTheme.nav);
  // }, [themeMode]);

  const onClickButton = () => {
    setIsOpen((cur) => !cur);
  };
  useEffect(() => {
    if (user) {
      getUserInfo(user.user_index).then((res) => {
        setUserProfileIndex(res.data[0].user_img_index);
      });
    }
  }, []);

  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";
  };

  // 로그인창 팝업 관리 state
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
    blockScroll();
  };
  const closeSignInModal = () => {
    setSignInModalOpen(false);
    freeScroll();
  };

  const LogClickAlert = () => {
    alert("로그인을 해주세요!");
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

  const logout = () => {
    window.location.href = "/";
    setUser(null);

    // window.localStorage.clear();
    window.localStorage.removeItem("recoil-persist");
  };

  const loginModalRef = useRef();

  return (
    <>
      {/* Nav가 absolute라, 따로 margin-top을 주었음 */}
      <div className="mt-[64px]"></div>
      <SignInModal
        open={signInModalOpen}
        close={closeSignInModal}
        openSignUpModal={openSignUpModal}
      ></SignInModal>
      <SignUpModal
        open={signUpModalOpen}
        close={closeSignUpModal}
      ></SignUpModal>
      <nav
        className={styles.navbar}
        style={{
          backgroundColor: isMainPage ? "white" : "#F1F3F7",
        }}
      >
        <div className="w-1/3 flex items-center gap-6">
          <img
            src="/public_assets/icons/VPSpaceLogo.svg"
            alt="VPSpaceLogo"
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="flex gap-10 w-1/3 justify-center">
          <span
            className={styles.navLink}
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            Home
          </span>
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/projectlists");
                }}
                className={styles.navLink}
              >
                MyProject
              </button>
              <button
                onClick={() => {
                  navigate("/myprofile");
                }}
                className={styles.navLink}
              >
                MyProfile
              </button>
            </>
          ) : (
            <>
              <button onClick={LogClickAlert} className={styles.navLink}>
                Project
              </button>
              <button onClick={LogClickAlert} className={styles.navLink}>
                MyProfile
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-10 w-1/3 justify-end">
          {user ? (
            <button
              className={styles.loginModal}
              onClick={(e) => {
                // console.log(e.target);
                setIsOpen(true);
                // onClickButton();
              }}
              ref={loginModalRef}
            >
              {isOpen && (
                <OnLogModal
                  open={isOpen}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                  loginModalRef={loginModalRef}
                />
              )}
              <img
                src={`/public_assets/profileImg/profileImg_${
                  userProfileIndex ? userProfileIndex : 1
                }.png`}
                alt="profile"
                style={{
                  border: "1px solid black",
                  borderRadius: "100%",
                  width: "44px",
                  height: "44px",
                  objectFit: "cover",
                }}
              />
              <img src="/public_assets/modal.png" alt="profile" />
            </button>
          ) : (
            <button className={styles.loginButton} onClick={openSignInModal}>
              <span>Login</span>
              <Dot />
            </button>
          )}
          <button
            className="hover:scale-110"
            onClick={() => {
              user ? navigate("/notification") : LogClickAlert();
            }}
          >
            <img src="/public_assets/icons/bell.svg" alt="bell" />
          </button>
          {user && (
            <button
              onClick={() => {
                logout();
              }}
              className={`text-sm font-bold cursor-pointer hover:scale-105`}
            >
              로그아웃
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
