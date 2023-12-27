import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/modules/ProjectManagerTools.module.css";
import { getTeamInfoByIndex, getTeams } from "../APIs/team";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import { getTeamIndex } from "../APIs/userinfo";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { red } from "@mui/material/colors";

export default function ProjectManagerTools() {
  // 버튼 따라 현재 활성화된 프로젝트 관리 툴 실행 : 현재는 투두(board), 캘린더 존재
  const [activated, setActivated] = useState("board");
  const navigate = useNavigate();

  const params = useParams();
  const teamIndex = params.teamIndex;

  const [projectName, setProjectName] = useState("");

  const [teamInfos, setTeamInfos] = useState();

  // 현재 유저가 팀 리더인지 아닌지를 구별하는 state.
  const [isTeamLeader, setIsTeamLeader] = useState(false);

  // 현재 표기해주는 팀의 기술 스택.
  const [skills, setSkills] = useState();
  const handleTeamLeader = (teamMembers) => {
    teamMembers.map((member) => {
      if (member.is_teamleader === true && userIndex === member.user_index) {
        setIsTeamLeader(true);
      }
    });
  };

  useEffect(() => {
    if (teamIndex) {
      getTeamInfoByIndex(teamIndex).then((res) => {
        handleTeamLeader(res.data.teamMembers);
        setProjectName(res.data.teamInfo.team_name);
        setSkills(res.data.teamInfo.team_skills);
      });
    }
    getTeams().then((res) => {
      setTeamInfos(res.data);
    });
  }, []);

  //
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIndex = userLogin.user_index;

  // 팀들의 인덱스를 담는 배열.
  const [team, setTeam] = useState([]);

  // 현재 해당 유저가 진행하는 프로젝트 정보를 담은 배열.
  const [array, setArray] = useState([]);

  const getTeamIndices = async () => {
    try {
      const res = await getTeamIndex(userIndex);
      setTeam(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamIndices();
  }, []);

  const fetchData = async () => {
    for (let i = 0; i < team.length; i++) {
      // 팀인덱스 가져오는건 잘 됨
      try {
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
    if (team.length !== 0) {
      fetchData();
    }
  }, [team]);

  // 위의 array 배열에 중복 문제가 발생해, 중복 문제를 제거한 배열.
  const [filteredArray, setFilteredArray] = useState([]);

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

  //

  useEffect(() => {
    getTeamIndex(userIndex).then((res) => {});
  }, []);

  const [view, setView] = useState(false);

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

  const location = useLocation();
  // 현재 URL에 'management'이 포함되어 있는지 확인
  const isIncludeInUrl =
    location.pathname.includes("main") ||
    location.pathname.includes("board") ||
    location.pathname.includes("stickerNote");

  return (
    <>
      <div
        style={{
          paddingTop: "180px",
          paddingLeft: "80px",
          paddingRight: "20px",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: tm.background,
          // backgroundColor: "red",
        }}
      >
        <Outlet context={{ teamIndex }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "60px",
          paddingLeft: "100px",
          paddingRight: "40px",
          height: "120px",
          width: "100%",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* 드롭다운으로 프로젝트 선택 가능하게 변경하는 부분. margin-right 값을 통해 우측 여백(팀원 상태표시 탭 여백만큼) 설정. */}
        {/* 추가로 아직 캘린더 및 매니지먼트 페이지에는 우측 여백 필요 X. 이에 url 이용 예외처리 해 주었음. */}
        <div
          className={`w-[100%] h-full border-b-[0.5px] border-[#7c7c7c] ${
            isIncludeInUrl && "xl:mr-80 2xl:mr-96"
          }`}
        >
          <div
            className="text-xl font-extrabold flex flex-col justify-center h-full gap-3"
            style={{
              color: tm.mainTextColor,
            }}
          >
            <div className="flex gap-2 hover:cursor-pointer items-center">
              <h3
                className="ml-1"
                onClick={() => {
                  setView(!view);
                }}
              >
                {projectName}
              </h3>
              <div className="relative whitespace-nowrap">
                <img
                  src="/public_assets/icons/bottomArrow.svg"
                  alt="bottomArrow"
                  className={`${view && "rotate-180"}`}
                />
                {view && (
                  <div
                    className="list-none absolute z-10 left-4 top-0 flex flex-col items-center p-3 rounded-lg gap-2 overflow-y-auto max-h-[600px]"
                    style={{
                      backgroundColor: tm.dropDownProjectListBg,
                      color: tm.mainTextColor,
                    }}
                  >
                    {filteredArray &&
                      filteredArray.map((team) => {
                        return (
                          <li
                            className="hover:scale-105 border-b w-full flex justify-center py-1"
                            style={{
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              navigate(
                                `/projectmanagertools/${team.teamInfo.team_index}`,
                                {
                                  state: {
                                    teamIndex: team.teamInfo.team_index,
                                  },
                                }
                              );
                              window.scrollTo({ top: 0, behavior: "auto" });
                              window.location.reload();
                            }}
                          >
                            {team.teamInfo.team_name}
                          </li>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            <div
              className="px-3 py-1 rounded-xl flex gap-2 items-center w-fit"
              style={{
                backgroundColor: tm.skillsListBg,
              }}
            >
              {/* <img src="/public_assets/skillsList.png" alt="skillsList" /> */}
              {skills && skills[0].skill_index ? (
                skills.map((skillInfo) => {
                  return (
                    <img
                      src={`/public_assets/skills/skill_img_${themeMode}_${skillInfo.skill_index}.svg`}
                      alt={`/public_assets/skills/skill_img_${themeMode}_${skillInfo.skill_index}`}
                      className="w-6"
                    />
                  );
                })
              ) : (
                <span className="text-base">기술 스택 없음</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#2D2D2D",
          position: "absolute",
          left: "0px",
          height: "100%",
          width: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0px",
          zIndex: "1",
          borderRight: "1px solid #373737",
        }}
      >
        <div>
          {activated === "board" && (
            <img src="/public_assets/icons/board_rounded.svg" alt="board" />
          )}
          {activated === "calendar" && (
            <img
              src="/public_assets/icons/calendar_rounded.svg"
              alt="calendar"
            />
          )}
          {activated === "stickerNote" && (
            <img
              src="/public_assets/icons/calendar_rounded.svg"
              alt="stickerNote"
            />
          )}
          {activated === "main" && (
            <img src="/public_assets/icons/calendar_rounded.svg" alt="main" />
          )}
        </div>
        <div className="flex flex-col gap-14 items-center">
          <button
            className="transition-all hover:scale-125"
            onClick={() => {
              setActivated("main");
              navigate("main");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            <img
              src="/public_assets/icons/main.svg"
              alt="board"
              className="w-6"
            />
          </button>
          <button
            className="transition-all hover:scale-125"
            onClick={() => {
              setActivated("board");
              navigate("board");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            <img
              src="/public_assets/icons/board.svg"
              alt="board"
              className="w-5"
            />
          </button>
          <button
            className="transition-all hover:scale-125"
            onClick={() => {
              setActivated("calendar");
              navigate("Mycalendar");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            <img
              src="/public_assets/icons/calendar.svg"
              alt="calender"
              className="w-7"
            />
          </button>
          <button
            className="transition-all hover:scale-125"
            onClick={() => {
              setActivated("stickerNote");
              navigate("stickerNote");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            <img
              src="/public_assets/icons/pencil.svg"
              alt="calender"
              className="w-5"
            />
          </button>
          {isTeamLeader && (
            <button
              className="transition-all hover:scale-125"
              onClick={() => {
                setActivated("management");
                navigate("management", { state: isTeamLeader });
                window.scrollTo({ top: 0, behavior: "auto" });
              }}
            >
              <img
                src="/public_assets/icons/management.svg"
                alt="management"
                className="w-5"
              />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <img src="/public_assets/icons/gear.svg" alt="gear" />
          <img src="/public_assets/icons/question.svg" alt="question" />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#2D2D2D",
          position: "absolute",
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #373737",
          paddingLeft: "60px",
          zIndex: 30,
        }}
      >
        <h5 className={styles.title}>
          {activated === "board" && "board"}
          {activated === "calendar" && "calendar"}
          {activated === "stickerNote" && "stickerNote"}
          {activated === "main" && "main"}
          {activated === "management" && "management"}
        </h5>
        <button
          className="text-white absolute right-8 cursor-pointer z-10 underline text-sm hover:scale-105"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </>
  );
}
