import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/modules/ProjectManagerTools.module.css";
import { getTeamInfoByIndex, getTeams } from "../APIs/team";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import { getTeamIndex } from "../APIs/userinfo";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

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
      });
    }
    getTeams().then((res) => {
      setTeamInfos(res.data);
    });
  }, []);

  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIndex = userLogin.user_index;

  useEffect(() => {
    getTeamIndex(userIndex).then((res) => {
      console.log(res.data);
    });
  }, []);

  const [view, setView] = useState(false);

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

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
        <div className="w-[100%] h-full bg-[#1C1D1E] border-b-[0.5px] border-[#7c7c7c] xl:mr-80 2xl:mr-96">
          <div className=" text-white text-xl font-extrabold flex flex-col justify-center h-full gap-3">
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
                  <div className="list-none absolute z-10 left-4 top-0 bg-[#272727] flex flex-col items-center p-3 rounded-lg gap-2">
                    {teamInfos &&
                      teamInfos.map((teamInfo) => {
                        return (
                          <li
                            className="hover:scale-105"
                            onClick={() => {
                              navigate(
                                `/projectmanagertools/${teamInfo.team_index}`,
                                {
                                  state: { teamIndex: teamInfo.team_index },
                                }
                              );
                              window.scrollTo({ top: 0, behavior: "auto" });
                              window.location.reload();
                            }}
                          >
                            {teamInfo.team_name}
                          </li>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            {/* 추후 스킬들 리스트 API 호출로 변경 */}
            <div className="w-44 px-4 py-2 rounded-2xl bg-black">
              <img src="/public_assets/skillsList.png" alt="skillsList" />
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
                src="/public_assets/icons/pencil.svg"
                alt="calender"
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
