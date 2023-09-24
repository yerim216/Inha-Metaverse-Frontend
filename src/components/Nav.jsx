import React, { useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import OnLogModal from "../components/OnLogModal";
import Dot from "../components/Dot";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { useNavigate } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { getUserInfo } from "../APIs/userinfo";

export default function Nav() {
  const [user, setUser] = useRecoilState(userState);
  const [userProfileIndex, setUserProfileIndex] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onClickButton = () => {
    setIsOpen(true);
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
    document.body.style.backgroundColor = "white";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";

    // 다크모드와 화이트모드 다르게 설정 필요
    document.body.style.backgroundColor = "#111111";
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
            window.scrollTo({ top: 0, behavior: "auto" });
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

        {user ? (
          <div>
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
          </div>
        ) : (
          <div>
            <button onClick={LogClickAlert}>MyProject</button>
            <button onClick={LogClickAlert}>MyProfile</button>
          </div>
        )}
      </nav>
    </>
  );
}
