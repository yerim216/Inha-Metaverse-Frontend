import React, { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import Gdot from "../components/Gdot";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import project from "../db/project.json";
import profile from "../db/project.json";
import member from "../db/member.json";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

export default function Profile() {
  const { index } = useParams(); // URL 파라미터 값 가져오기

  useEffect(() => {
    document.documentElement.classList.add("profileOnly");
    return () => {
      document.documentElement.classList.remove("profileOnly");
    };
  }, []);
  const getUserInfo = async () => {
    try {
      const response = await axios.post(
        "https://www.app.vpspace.net/userinfo",
        {
          email: userLogin.email,
        }
      );
      return response.data.name;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleApplyBtn = async () => {
    console.log(teamInfo.name);
    const userName = await getUserInfo();
    axios
      .post("https://www.app.vpspace.net/team/member", {
        team_name: teamInfo.name,
        user_name: userName,
      })
      .then(() => {
        alert("성공적으로 처리되었습니다!");
        window.location.reload();
      })
      .catch((error) => {
        alert("이미 해당 프로젝트에 속해 있습니다!");
      });
  };

  const handleLeaveBtn = async () => {
    const userName = await getUserInfo();
    axios
      .post("https://www.app.vpspace.net/team/member/delete", {
        team_name: teamInfo.name,
        user_name: userName,
      })
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
  const [teamInfo, setTeamInfo] = useState();

  // 팀 멤버 정보 변수. 팀 인덱스로 불러 옴.
  const [teamMembers, setTeamMembers] = useState();

  //전달받은 팀 인덱스값 취득 : teamIndex 변수에 저장
  const location = useLocation();
  const teamIndex = location.state.teamIndex;

  useEffect(() => {
    axios
      .post("https://www.app.vpspace.net/team/list", {
        index: teamIndex,
        // index:1,
      })
      .then((res) => {
        setTeamInfo(res.data[0]);
      })
      .then(() => {
        axios
          .post("https://www.app.vpspace.net/team/member/teamidx", {
            index: teamIndex,
            // index:1,
          })
          .then((res) => {
            setTeamMembers(res.data);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logout = () => {
    window.localStorage.clear();
    setUserLogin(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const renderProfileContent = () => {
    // index에 따른 프로필 데이터 로직 구현
    // ...

    return <div>프로필 페이지 컨텐츠</div>;
  };

  const officeMove = () => {
    if (user) {
      const url = `https://www.app.vpspace.net/?email=${encodeURIComponent(
        user.email
      )}&&room=office${encodeURIComponent(teamIndex)}`;

      window.location.href = url;
    }
  };

  const recruitingNum = {
    display: "inline-block",
    borderRadius: "100px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "25px",
    color: "white",
    lineHeight: "43px",
    paddingLeft: "20px",
  };

  const recruitingNum2 = {
    display: "inline-block",
    borderRadius: "100px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "25px",
    color: "white",
    lineHeight: "43px",
  };

  const cate = {
    display: "inline-block",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "15px",
    lineHeight: "19px",
    alignItems: "center",
    letterSpacing: "0.04em",
    flexGrow: "2.2",
    color: "#ffffff",
  };
  const state = {
    display: "flex",
    width: "165px",
    height: "69px",
    borderRadius: "36.5px",
    background: "#F4F6F8",
    fontSize: "25px",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "43px",
    letterSpacing: "0.15px",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  };
  const recruitList = {
    display: "inline-block",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "25px",
    lineHeight: "43px",
    alignItems: "center",
    letterSpacing: "0.15px",
    flexGrow: "2",
    color: "#ffffff",
  };

  const recruitContainer = {
    display: "grid",
    gridTemplateColumns: "1.8fr 2fr 0.7fr 0.7fr 1.8fr",
    width: "100%",
    margin: "auto",
    paddingBottom: "13px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };
  const recruitContainer2 = {
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    paddingTop: "13px",
    justifyContent: "center",
    alignItems: "center",
    gap: "30.29px",
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
    marginRight: "5px",
    width: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "19px",
    backgroundColor: "black",
    borderRadius: "60px",
    color: "white",
    fontSize: "11px",
    textAlign: "center",
    paddingTop: "2px",
  };

  const lab = {
    display: "flex",
    gap: "5px",
    width: "180px",
    alignItems: "center",
  };

  const whole = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const more = {
    marginTop: "5px",
    marginLeft: "5px",
  };
  const projectInro = {
    paddingTop: "23px",
    boxSizing: "border-box",
    width: "110px",
    height: "110px",
    borderRadius: "100px",
    marginLeft: "-50px",
  };
  const projects = {
    marginTop: "70px",
    marginLeft: "90px",
    width: "593px",
    height: "160px",
    background: "#FFFFFF",
    boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
  };
  const progressP = {
    display: "flex",
    flexDirection: "row",
    gap: "9px",
    marginLeft: "-50px",
  };

  const namee2 = {
    marginTop: "5px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "44px",
    display: "flex",
    alignItems: "center",
    color: "#000000",
    marginLeft: "-50px",
  };

  const tools2 = {
    marginTop: "14px",
    marginLeft: "-50px",
  };
  const con3 = {
    marginLeft: "100px",
    marginTop: "-75px",
  };
  const parts2 = {
    marginRight: "5px",
    width: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "19px",
    backgroundColor: "#7090B0",
    borderRadius: "60px",
    color: "white",
    fontSize: "11px",
    textAlign: "center",
    paddingTop: "2px",
  };
  const whole2 = {
    display: "inline-block",
    marginLeft: "270px",
    zIndex: "1",
    paddingBottom: "30px",
  };

  const wrappp = {
    display: "inline-block",
    marginTop: "30px",
  };

  const wrappp2 = {
    display: "inline-block",
    marginTop: "-200px",
    paddingBottom: "30px",
  };

  const con4 = {
    display: "inline-block",

    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    marginBottom: "100px",
  };

  const dot3 = {
    display: "inline-block",

    marginRight: "16px",
    backgroundColor: "#E1ECF6",
    borderRadius: "100px",
    width: "13.34px",
    height: "13.34px",
    display: "inline-block",
  };

  const eyes = {
    display: "inline-block",
    marginRight: "5px",
    width: "13.75px",
    height: "9.38px",
  };

  const viewss = {
    display: "inline-block",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    marginLeft: "395px",
    zIndex: "2",
    marginTop: "-30px",
  };
  return (
    <seciton>
      <div className={styles.wrap}>
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
        <div className={styles.backgroundImage}></div>
        <img
          src={`${process.env.PUBLIC_URL}/public_assets/profile.PNG`}
          className={styles.profileImage}
          alt="profile"
        />
        <button
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
        </button>
        <button
          className={styles.projectManageBtn}
          onClick={() => {
            navigate(`/projectmanagertools/${teamIndex}`, {
              state: { teamIndex: teamIndex },
            });
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          프로젝트 관리
        </button>

        <div className={styles.nameContainer}>
          <Gdot />
          <p className={styles.name}>{teamInfo && teamInfo.name}</p>
        </div>
        <div className={styles.texts}>
          <p>{teamInfo && teamInfo.introduction}</p>
          <p className={styles.limit}>{teamInfo && teamInfo.description}</p>
        </div>

        {/* <p className={styles.txt}> Skills</p>

      <div className ={styles.recruit2}>      
          <div style={recruitContainer2}>
            <img
              src={`${process.env.PUBLIC_URL}/public_assets/tool.png`}
              className={styles.tool}
              alt="Views"
            />
            
            <img
              src={`${process.env.PUBLIC_URL}/public_assets/lan.png`}
              className={styles.lan}
              alt="Views"
            />
          </div>
      </div> */}
        <div className="flex justify-center w-full -mt-10 gap-8">
          <button
            className={styles.applyBtn}
            onClick={() => {
              const returnVal =
                window.confirm("해당 프로젝트에 지원하시겠습니까?");
              if (returnVal === true) {
                handleApplyBtn();
              }
            }}
          >
            지원하기
          </button>
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
        </div>
        <p className={styles.txt}> Team Member</p>

        <div className={styles.memSearch}>
          <div className={styles.wrapp}>
            {teamMembers &&
              teamMembers.map((member) => (
                <span key={member.id} style={no}>
                  <div style={pIntro}>
                    <div style={pImage}>
                      <img
                        src={`${process.env.PUBLIC_URL}/public_assets/pro.png`}
                        alt={member.name}
                      />
                    </div>
                    <div style={con}>
                      <div style={hahaha}>
                        <div style={dot}></div>
                        <div style={namee}>{member.name}</div>
                      </div>
                      <br />
                      <div style={whole}>
                        <div style={con2}>{member.intro}</div>
                        <div style={lab}>
                          <div style={parts}>#{member.part1}</div>
                          <div style={parts}>#{member.part2}</div>
                          <div style={more}>
                            <img
                              src={`${process.env.PUBLIC_URL}/public_assets/more.png`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              ))}
          </div>
        </div>

        {/* <p className={styles.txt}> Recruiting </p> */}

        {/* <div className={styles.memSearch2}>
        <div className={styles.memNav}>

          <div className={styles.item1}>대분류</div>
          <div className={styles.item2}>소분류</div>
          <div className={styles.item3}>모집인원</div>
          <div className={styles.item4}>총원</div>
          <div className={styles.item5}>상태</div>
        </div>

        <div className ={styles.recruit}>
        {profile.recruiting.map(item => (
            
              <span key={item.id}>
                <div style={recruitContainer}>
                  <div style={cate}>
                    {item.cate}
                  </div>
                  <div style={recruitList}>
                    {item.part}
                  </div>
                  <div style={recruitingNum2}>
                    {item.capacity}
                  </div>
                  <div style={recruitingNum}>
                    {item.gathering}
                  </div>
                  <Link to ='/'style={state}>
                    지원하기
                  </Link>
                </div>
              </span>
          ))}
        </div>
      </div> */}
      </div>

      <Footer />
    </seciton>
  );
}
