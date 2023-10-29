import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import style from "../styles/Myprofile.module.css";

import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import {
  addMember,
  deleteMember,
  getTeamInfoByIndex,
  viewUp,
} from "../APIs/team";
import { getUserInfo } from "../APIs/userinfo";
import ApplyModal from "../components/ApplyModal";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Profile() {
  const { index } = useParams(); // URL 파라미터 값 가져오기

  // 지원 모달
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const openApplyModal = () => {
    setApplyModalOpen(true);
  };
  const closeApplyModal = () => {
    setApplyModalOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.add("profileOnly");
    return () => {
      document.documentElement.classList.remove("profileOnly");
    };
  }, []);
  const getUserInfos = async () => {
    try {
      const response = await getUserInfo(userLogin.user_index);
      return response.data[0].user_name;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleApplyBtn = async () => {
    const userName = await getUserInfos();
    addMember(teamDetail.teamInfo.team_name, userName)
      .then(() => {
        alert("성공적으로 처리되었습니다!");
        window.location.reload();
      })
      .catch((error) => {
        alert("이미 해당 프로젝트에 속해 있습니다!");
      });
  };

  const handleLeaveBtn = async () => {
    const userName = await getUserInfos();
    deleteMember(teamDetail.teamInfo.team_name, userName)
      .then(() => {
        alert("성공적으로 처리되었습니다!");
        window.location.reload();
      })
      .catch((error) => {
        alert("해당 프로젝트의 팀원이 아닙니다!");
      });
  };
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  // 팀 정보 관련 변수. 팀 인덱스로 불러 옴.
  const [teamDetail, setTeamDetail] = useState();

  // 팀 멤버 정보 변수. 팀 인덱스로 불러 옴.
  const [teamMembers, setTeamMembers] = useState();
  const [teamSkill, setTeamSkill] = useState();

  //전달받은 팀 인덱스값 취득 : teamIndex 변수에 저장
  const location = useLocation();
  const teamIndex = location.state.teamIndex;

  useEffect(() => {
    getTeamInfoByIndex(teamIndex)
      .then((res) => {
        setTeamDetail(res.data);
        setTeamSkill(res.data.teamInfo.skills);
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setTeamMembers(data.teamMembers);
      })
      .then(() => {
        viewUp(teamIndex);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logout = () => {
    // window.localStorage.clear();
    window.localStorage.removeItem("recoil-persist");

    setUserLogin(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const pImage = {
    paddingTop: "23px",
    boxSizing: "border-box",
    width: "110px",
    height: "110px",
    borderRadius: "100px",
    marginLeft: "-50px",
  };
  const pIntro = {
    marginLeft: "90px",
    width: "348px",
    height: "160px",
    background: "#FFFFFF",
    boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.2)",
    borderRadius: "80px 40px 40px 80px",
  };

  const no = {
    paddingBottom: "0",
    marginBottom: "0",
  };

  const hahaha = {
    display: "flex",
    flexDirection: "row",
    gap: "9px",
    marginLeft: "-20px",
  };

  const dot = {
    marginTop: "7px",
    width: "8px",
    height: "8px",
    backgroundColor: "#00FF19",
    borderRadius: "100%",
  };

  const namee = {
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "20px",
    lineHeight: "27px",
  };

  const con = {
    marginLeft: "100px",
    marginTop: "-75px",
  };

  const con2 = {
    fontSize: "12px",
    width: "240px",
    overflow: "hidden",
    whiteSpace: "normal",
    wordBreak: "break-word",
    marginTop: "-10px",
    height: "40px",
  };

  const parts = {
    width: "80%",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: "60px",
    color: "white",
    fontSize: "11px",
    fontWeight: 800,
    textAlign: "center",
  };

  const whole = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.profile);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.profile);
    else setTm(theme.darkTheme.profile);
  }, [themeMode]);

  // 현재 자신이 팀장인지의 여부에 따라, 지원하기 및 탈퇴하기 버튼을 보여줄 지 정함.
  const [isTeamLeader, setIsTeamLeader] = useState(false);

  const [isTeamMember, setIsTeamMember] = useState(false);
  const userIndex = userLogin.user_index;
  useEffect(() => {
    if (teamDetail) {
      teamDetail.teamMembers.map((member) => {
        if (member.user_index === userIndex) {
          setIsTeamMember(true);
          if (member.is_teamleader) setIsTeamLeader(true);
        }
      });
    }
  }, [teamDetail]);

  return (
    <section className={styles.contain}>
      <ApplyModal
        open={applyModalOpen}
        close={closeApplyModal}
        openApplyModal={openApplyModal}
        handleApplyBtn={handleApplyBtn}
      ></ApplyModal>
      <div className={styles.navItems}>
        <div className={styles.logoContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/logo.png`}
            className={styles.nav}
            alt="Logo"
            style={{
              height: "36px",
              width: "52px",
            }}
            onClick={() => (window.location.href = "/")}
          />
        </div>
        <div className={styles.textContainer}>
          <a className={styles.navLink}>프로필</a>

          <a className={styles.navLink}>지원</a>

          {userLogin ? (
            <button className={styles.loginButton} onClick={logout}>
              <span>로그아웃</span>
            </button>
          ) : (
            <button className={styles.loginButton}>
              <span>로그인</span>
            </button>
          )}
        </div>
      </div>
      <div className={style.wrap}>
        <div className={styles.backgroundImage}></div>
        {/* <img
          src={`${process.env.PUBLIC_URL}/public_assets/profile.PNG`}
          className={styles.profileImage}
          alt="profile"
        /> */}
        {/* <button
          className={styles.officeBtn}
          onClick={() => {
            const returnVal =
              window.confirm("오피스 공간으로 이동하시겠습니까?");
            if (returnVal === true) {
              officeMove();
            }
          }}
        >
          Office 공간 들어가기
        </button> */}

        <button
          className={style.profileManageBtn}
          onClick={() => {
            navigate("/createmyprofile");
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          프로필 수정
        </button>
        <div className={styles.profileTop}>
          <div className={styles.nameContainer}>
            {teamDetail &&
              (teamDetail.teamInfo.skills[0].skill_name === null ? (
                <p className={styles.skill}> 팀 스킬이 없어요 </p>
              ) : (
                teamDetail.teamInfo.skills.map((skill, index) => {
                  return (
                    <p key={index} className={styles.skill}>
                      {" "}
                      {skill.skill_name}{" "}
                    </p>
                  );
                })
              ))}

            {/* 팀 이름 */}
            <p className={styles.name}>
              {teamDetail && teamDetail.teamInfo.team_name}
            </p>
            {/* 팀 소개 */}
            <div className={styles.introTexts}>
              {teamDetail && teamDetail.teamInfo.team_introduction === null ? (
                <p className={styles.limit}>팀 소개를 입력해보아요!</p>
              ) : (
                <p className={styles.limit}>
                  {teamDetail && teamDetail.teamInfo.team_introduction
                    ? teamDetail.teamInfo.team_introduction
                    : "팀 소개가 없습니다!"}
                </p>
              )}
            </div>
          </div>

          {!isTeamLeader && (
            <div className="flex justify-center gap-8">
              {!isTeamMember ? (
                <button
                  className={styles.applyBtn}
                  onClick={() => {
                    setApplyModalOpen(true);
                  }}
                >
                  지원하기
                </button>
              ) : (
                <button
                  className={styles.leaveBtn}
                  onClick={() => {
                    const returnVal = window.confirm(
                      "해당 프로젝트에서 탈퇴하시겠습니까?"
                    );
                    if (returnVal === true) {
                      handleLeaveBtn();
                    }
                  }}
                >
                  탈퇴하기
                </button>
              )}
            </div>
          )}
        </div>

        <div className={styles.grayLine}></div>

        <div className={styles.teamInfoBox}>
          {/* <div className={styles.teamSkillImgWrap}> */}
          <p className={styles.menuText} style={{ color: tm.mainTextColor }}>
            {" "}
            사용 스킬{" "}
          </p>
          {teamDetail &&
            (teamDetail.teamInfo.skills[0].skill_name === null ? (
              <p style={{ color: tm.mainTextColor }}> 팀 스킬이 없습니다 </p>
            ) : (
              teamDetail.teamInfo.skills.map((skill, index) => {
                return (
                  <p key={index} className={styles.skill}>
                    {" "}
                    {skill.skill_name}{" "}
                  </p>
                );
              })
            ))}
          {/* </div> */}
          <p className={styles.menuText} style={{ color: tm.mainTextColor }}>
            {" "}
            관련태그{" "}
          </p>
          <div style={{ color: tm.mainTextColor }}> 태그가 없습니다 </div>
          <p className={styles.menuText} style={{ color: tm.mainTextColor }}>
            {" "}
            팀{" "}
          </p>
          <div style={{ color: tm.mainTextColor }}> 팀 별명이 없습니다 </div>
        </div>

        <div className={styles.grayLine}></div>

        <p className={styles.txt} style={{ color: tm.mainTextColor }}>
          {" "}
          프로젝트의 팀원이예요{" "}
        </p>

        <div className={styles.memSearch}>
          <div className={styles.wrapp}>
            {teamMembers &&
              teamMembers.map((member, idx) => (
                <span key={idx} style={no}>
                  <div style={pIntro}>
                    <div style={pImage}>
                      <img
                        src={`${process.env.PUBLIC_URL}/public_assets/pro.png`}
                        alt={member.user_name}
                      />
                    </div>
                    <div style={con}>
                      <div style={hahaha}>
                        <div style={dot}></div>
                        <div style={namee}>{member.user_name}</div>
                      </div>
                      <br />
                      <div style={whole}>
                        <div style={con2}>
                          {member.user_introduction
                            ? member.user_introduction
                            : "자기소개가 없습니다!"}
                        </div>
                        <div style={parts}>
                          #
                          {member.user_job
                            ? member.user_job
                            : "할당된 역할이 없습니다!"}
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
