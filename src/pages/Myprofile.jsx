import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Myprofile.module.css";
import Gdot from "../components/Gdot";
import StarRating from "../components/StarRating";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import project from "../db/project.json";
import user from "../db/user.json";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiRightArrowCircle } from "react-icons/bi";
import Footer from "../components/Footer";
import { getTeamIndex, getUserInfo } from "../APIs/userinfo";
import { getTeamInfoByIndex } from "../APIs/team";
import { BiDownArrow } from 'react-icons/bi';

export default function Profile() {
  useEffect(() => {
    document.documentElement.classList.add("profileOnly");
    return () => {
      document.documentElement.classList.remove("profileOnly");
    };
  }, []);

  const inter = ["html", "vscode", "react","spring","spring"];
  const [userData, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const [teamLength, setTeamLength] = useState(0);
  const [responseArray, setResponseArray] = useState([]);
  const navigate = useNavigate();
  const userIndex = userLogin.user_index;

  const [skill,setSkill] = useState([]); //스킬 선택 값 불러오기

  let [pagenation, setPagenation] = useState([]);

  // 팀 인덱스들을 담은 배열. 안에 객체 형태로 {team_index : 팀 인덱스 번호}가 존재한다.
  const [team, setTeam] = useState([]);

  // 현재 해당 유저가 진행하는 프로젝트 정보를 담은 배열.
  let [array, setArray] = useState([]);

  // 위의 array 배열에 중복 문제가 발생해, 중복 문제를 제거한 배열.
  const [filteredArray, setFilteredArray] = useState([]);

  const [field, setField] = useState([]); //관심분야 선택 값 불러오기
  const [skills,setSkills] = useState([]); //스킬 선택 값 불러오기

  const requestURL = `${window.baseURL}`;

  const logout = () => {
    window.localStorage.clear();
    setUserLogin(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    // axios
    //   .post("https://www.app.vpspace.net/userinfo", {
    //     //유저 정보 불러오기
    //     email: userLoginString,
    //   })
    getUserInfo(userIndex)
      .then(function (res) {
        const myArray = res.data[0];
        console.log(res.data);
        setUsers(myArray);
        setField(myArray.fields);
        setSkill(res.data[0].skills);
        console.log(skills);
      })
      .catch(function (error) {
        console.log("데이터가 없어서 그래요!!" + error);
      });
  }, []);

  // 팀 인덱스들 배열로 가져오는 함수.
  const getTeamIndices = async () => {
    try {
      const res = await getTeamIndex(userIndex);
      setTeam(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    for (let i = 0; i < team.length; i++) {
      // 팀인덱스 가져오는건 잘 됨
      try {
        // const requestBody = {
        //   index: team[i].team_index,
        // };
        // const response = await axios.post(
        //   requestURL + "team/details",
        //   requestBody
        // );
        const response = await getTeamInfoByIndex(team[i].team_index);
        setArray((cur) => {
          return [...cur, response.data];
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getTeamIndices();
  }, []);
  useEffect(() => {
    if (team.length !== 0) {
      fetchData();
    }
  }, [team]);

  // 중복문제 제거 배열 설정.
  useEffect(() => {
    setFilteredArray(
      array.filter((team, idx) => {
        return (
          idx ===
          array.findIndex(
            (obj) => obj.teamInfo.team_index === team.teamInfo.team_index
          )
        );
      })
    );
  }, [array]);

  useEffect(() => {
    console.log(filteredArray);
  }, [filteredArray]);


  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const part = {
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "25px",
    /* identical to box height */
    margin: "1%",
    display: "flex",
    letterSpacing: "0.04em",
    marginBottom: "20px",
    textAlign: "center",
    marginLeft: "40px",
    flexWrap: "nowrap",
  };
  const partforskill = {
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "25px",
    /* identical to box height */
    marginTop: "30px",
    marginLeft: "43px",

    position: "absolute",
    display: "flex",
    letterSpacing: "0.04em",
    marginBottom: "20px",
    textAlign: "center",
    flexWrap: "nowrap",
  };
  const inpart = {
    position: "relative",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "25px",
    /* identical to box height */
    margin: "1%",
    display: "flex",
    letterSpacing: "0.04em",
    marginBottom: "40px",
    marginTop: " 24px",
    textAlign: "center",
    marginLeft: "40px",
    flexWrap: "nowrap",
  };

  const downArrow = {
    float: "right",
    marginTop: "-10px",
    marginRight:"40px",
  };

  const recruitList = {
    display: "inline-block",
    marginRight: "103px",
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "15px",
    lineHeight: "19px",
    alignItems: "center",
    letterSpacing: "0.04em",

    color: "#000000",
  };

  const recruitContainer = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5px",
    paddingTop: "13px",
  };
  const recruitContainer2 = {
    flexWrap: "wrap",
    whiteSpace: "normal",
    marginLeft: "8.6vw",
    display: "flex",
    gap: "35px",
    paddingTop: "13px",
    height: "98px",
    marginTop: "7px",
  };

  const recruitWrap={
    width: "400px",
  }
 
  const projects = {
    position: "relative",
    paddingRight: "10px",
    marginTop: "7px",
    marginLeft: "90px",
    width: "600px",
    maxWidth: "600px",
    width: "100%",
    height: "160px",
    background: "#FFFFFF",
    boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
  };
  const progressP = {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "inlineBlock",
    flexDirection: "row",
    gap: "9px",
    // marginLeft: "-50px",
    alignItems: "center",
    justifyContent: "center",
  };

  const namee2 = {
    marginTop: "50px",
    marginLeft: "30px",
    position: "relative",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "44px",
    display: "flex",
    alignItems: "center",
    color: "#000000",
  };

  const tools2 = {
    // position: "relative",
    // marginLeft:"30px",
    // marginTop: "14px",
    width: "80%",
    marginLeft: "30px",
    display: "-webkit-box",
    WebkitLineClamp: 2, // 최대 2줄로 제한
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const con3 = {
    width: "593px",
  };
  const parts2 = {
    marginRight: "5px",
    width: "fit-content",
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

  const part2Wrap = {
    position: "absolute",
    display: "inlineBlock",
    marginLeft: "30px",
    marginTop: "20px",
  };
  const whole2 = {
    position: "absolute",
    right: "0",
    display: "inline-block",
    marginTop: "20px",
  };

  const lit = {};

  const wrappp = {
    width: "100%",
    display: "inline-block",
    position: "relative",
    overflow: "hidden",
  };

  const wrappp2 = {
    display: "inline-block",
    marginTop: "-200px",
    paddingBottom: "30px",
  };

  const con4 = {
    float: "right",
    paddingRight: "20px",
    display: "inline-block",

    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    marginBottom: "5px",
  };

  const dot3 = {
    display: "inline-block",
    marginTop: "5px",
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
    marginLeft: "370px",
    zIndex: "2",
    marginTop: "-30px",
  };
  const data = {
    display: "absolute",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    paddingTop: "7px",
  };
  const indata = {
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "22px",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: "3.5px",
    paddingLeft: "17px",
    paddingRight: "17px",
    borderRadius: "50px",
    backgroundColor: "black",
    color: "white",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0 10px",
  };
  const contain = {
    width: '200px', /* 최대 가로 너비 */
    padding: '10px',
    marginTop: '-5px',
    position: "absolute",
    marginLeft: "160px",
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
  };

  const toolss = {
    marginTop: "19.17px",
    width: "180px",
    display: "flex",
    flexDirection: "row",
    gap: "31px",
  };
  const csss = {
    height: "46px",
    marginTop: "-5px",
  };
  const htmll = {
    marginLeft: "3px",
    height: "40px",
  };
  const vs = {
    height: "32px",
    marginTop: "3px",
  };
  const extool = {
    height: "40px",
  };

  const star = {
    display: "inline-block",
    marginTop: "-88px",
    marginLeft: "10px",
  };

  // const history = useHistory();

  // const handleEmptyProjectClick = () => {
  //   // history.push('/home#specificSection');
  //   window.href('/')
  // };
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.navItems}>
          <div className={styles.logoContainer}>
            <Link to="/">
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
            </Link>
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
          style={{}}
        />
        <button
          className={styles.profileManageBtn}
          onClick={() => {
            navigate("/createmyprofile");
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          프로필 관리
        </button>
        <div className={styles.nameContainer}>
          <Gdot />
          <p className={styles.name}>{userData.user_name}</p>
        </div>
        <div className={styles.texts}>
          {/* <p>{userData.titles}</p> */}
          {userData.user_introduction === null ? (
            <p className={styles.limit}>자기소개를 입력해보아요!</p>
          ) : (
            <p className={styles.limit}>{userData.user_introduction}</p>
          )}
        </div>

        <div className={styles.recruit}>
          {user.info.map((item) => (
            <span key={item.id}>
              <div className={recruitContainer}>
                <div style={part}>
                  <p className={styles.part}>직무</p>
                  {/* <span style={data}>{user.data}</span> */}
                  <span style={data}>Developer / Planner / Designer</span>
                </div>

                <div style={part}>
                  <p className={styles.careerpart}>경력</p>
                  <span style={data}>{userData.user_career}년차</span>
                </div>
                <div style={part}>
                  <p className={styles.mannerpart}>매너점수</p>
                  <span style={data}>{item.manners}</span>
                  <span style={star}>
                    <StarRating />
                  </span>
                </div>
                <div style={inpart}>
                  <p className={styles.interestpart}>관심분야</p>
                  <span style={contain}>
                    {field ? (
                      field.map((item, idx) => {
                        return (
                          <span style={indata} key={idx}>
                            {item}
                          </span>
                        );
                      })
                    ) : (
                      <pre className="text-start">
                        {
                          "관심분야가 없습니다.\n내 프로필 관리에서 추가해 주세요!"
                        }
                      </pre>
                    )}
                  </span>
                </div>
                <div style={partforskill}>
                  <p className={styles.skillpart}>스킬</p>
                  <div style={recruitWrap}>
                  <div style={recruitContainer2}>
                    {skills.map((skill, index) => {
                      //inter -> 실제 skill 배열로 바꾸면 됨
                      return (
                        <img
                          key={index}
                          src={`${process.env.PUBLIC_URL}/public_assets/${skill}.png`}
                          width="40px"
                          height="40px"
                          style={extool}
                          alt={`${skill} skill`}
                        />
                      );
                    })}
                    <div style={toolss}></div>
                  </div>
                  </div>
                  
                </div>
              </div>
            </span>
          ))}
        </div>

        <div className={styles.memSearch}>
          <p className={styles.txt}>
            🔍<span className={styles.userName}>{userData.name} </span> 님이
            진행하시는 프로젝트
          </p>

          <div className={styles.wrapp}>
            {filteredArray.length === 0 ? (
              <div style={projects}>
                <a href="/">
                  <div className={styles.emptyProject}>
                    진행중인 프로젝트가 없어요. 프로젝트를 시작해 보아요!
                  </div>
                </a>
              </div>
            ) : (
              filteredArray.map((obj, index) => (
                <div style={projects} key={index} className="relative">
                  <div style={con3}>
                    <div style={wrappp}>
                      <div style={progressP}>
                        <div style={part2Wrap}>
                          {/*  아래가 파란색 있는 거임 */}
                          {obj.teamInfo.skills[0] !== null ? (
                            <div style={parts2}>{obj.numOfPeople.team_cnt}</div>
                          ) : (
                            <div style={parts2}>팀 내 기술 스택 X</div>
                          )}
                        </div>
                        <div style={whole2}>
                          <div style={dot3}></div>
                          <div style={con4} className={styles.recruiting}>
                            {obj.teamInfo.team_recruting ? (
                              <p style={lit}>
                                recruiting {obj.numOfPeople.team_cnt} /
                                {obj.teamInfo.recruitment_number}
                              </p>
                            ) : (
                              <p style={lit}>not recruiting</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div style={namee2}>{obj.teamInfo.team_name}</div>
                      <div style={tools2}>{obj.teamInfo.team_introduction}</div>
                    </div>
                  </div>
                  <div
                    className="absolute right-5 bottom-5 text-3xl cursor-pointer transition-all hover:scale-125"
                    onClick={() => {
                      // 코드 수정하고 저장할때마다 팀 프로필 4개씩 다시 불러오는 버그 있음
                      navigate("/profile", { state: { teamIndex: obj.index } });
                      window.scrollTo({ top: 0, behavior: "auto" });
                    }}
                  >
                    <BiRightArrowCircle />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
