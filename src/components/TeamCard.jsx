import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/modules/TeamCard.module.css";
import { useNavigate } from "react-router";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import { userState } from "../recoil";
import { useRecoilState } from "recoil";

export default function TeamCard({ team }) {
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIndex = userLogin.user_index;

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
    handleTeamLeader(team.teamMembers);
  }, []);

  const navigate = useNavigate();

  const [arrowBoxOpen, setArrowBoxOpen] = useState(false);

  const arrowBoxRef = useRef();
  const teamCardRef = useRef();
  const handleMouseDown = (e) => {
    setArrowBoxOpen((arrowBoxOpen) => !arrowBoxOpen);

    if (!arrowBoxOpen === false) {
      return;
    }
    const elementRect = teamCardRef.current.getBoundingClientRect();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 요소의 왼쪽 아래로부터 X,Y좌표 계산.
    const distanceX = mouseX - elementRect.left;
    const distanceY = elementRect.bottom - mouseY;

    arrowBoxRef.current.style.left = distanceX + "px";
    arrowBoxRef.current.style.bottom = distanceY + "px";
  };

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

  return (
    <div
      className="relative w-96 h-96"
      onMouseLeave={() => {
        setArrowBoxOpen(false);
      }}
    >
      <div
        className={`${
          styles.arrow_box
        } flex flex-col justify-center items-center gap-2 ${
          arrowBoxOpen && styles.arrow_box_open
        }`}
        ref={arrowBoxRef}
        style={{
          backgroundColor: tm.projectRoutingBox,
          color: tm.mainTextColor,
        }}
        //   background: black;
        // color: #fff;
      >
        <button
          className="w-full h-1/2"
          onClick={() => {
            if (!arrowBoxOpen) return;

            navigate("/profile", {
              state: { teamIndex: team.teamInfo.team_index },
            });
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          프로젝트 보기
        </button>
        <button
          className="w-full h-1/2"
          onClick={() => {
            if (!arrowBoxOpen) return;

            navigate(`/projectmanagertools/${team.teamInfo.team_index}`, {
              state: { teamIndex: team.teamInfo.team_index },
            });
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          프로젝트 관리
        </button>
      </div>
      <button
        className={`w-96 h-96 bg-[#323232] rounded-xl p-10 flex flex-col relative ${styles.teamCard} ${styles.shadow}`}
        style={{
          backgroundColor: tm.projectCardBg,
        }}
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        ref={teamCardRef}
      >
        {isTeamLeader && (
          <img
            src={`/public_assets/icons/management${
              themeMode === "light" ? "_light" : ""
            }.svg `}
            alt="management"
            className={`absolute right-8 top-8 w-6 h-6 ${styles.absoluteChildren}`}
          />
        )}
        <div className="border-b border-[#7C7C7C] w-full h-[70%] flex flex-col items-start gap-6">
          {team.teamInfo.team_skills &&
          team.teamInfo.team_skills[0].skill_index !== null ? (
            <div
              className="px-3 py-1 rounded-xl flex gap-2 items-center w-fit relative -top-3"
              style={{
                backgroundColor: tm.skillsListBg,
              }}
            >
              {team.teamInfo.team_skills.map((skill) => {
                return (
                  <img
                    src={`/public_assets/skills/skill_img_${themeMode}_${skill.skill_index}.svg`}
                    alt={`/public_assets/skills/skill_img_${themeMode}_${skill.skill_index}`}
                    className="w-6"
                  />
                );
              })}
            </div>
          ) : (
            <div
              className="px-3 py-1 rounded-xl flex gap-2 items-center w-fit relative -top-3 font-extrabold"
              style={{
                backgroundColor: tm.skillsListBg,
                color: tm.mainTextColor,
              }}
            >
              팀 내 기술 스택 X
            </div>
          )}
          <div
            className="font-extrabold text-xl -mt-3"
            style={{
              color: tm.mainTextColor,
            }}
          >
            {team.teamInfo.team_name}
          </div>
          <div
            className="text-xs"
            style={{
              color: tm.hazyTextColor,
            }}
          >
            {team.teamInfo.team_introduction}
          </div>
        </div>
        <div
          className={`w-full h-[30%] flex text-base font-semibold ${
            parseInt(team.numOfPeople.team_cnt) <= 2
              ? "flex-col justify-end gap-2"
              : "pt-6"
          }`}
          style={{
            color: tm.accentBtnText,
          }}
        >
          {parseInt(team.numOfPeople.team_cnt) <= 2
            ? team.teamMembers.map((user, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full flex items-center gap-4"
                    style={{
                      color: tm.mainTextColor,
                    }}
                  >
                    <img
                      src={`/public_assets/profileImg/profileImg_${user.user_img_index}.png`}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <span>{user.user_name}</span>
                  </div>
                );
              })
            : team.teamMembers.map((user, idx) => {
                if (idx >= 4) return;
                if (
                  idx + 1 === parseInt(team.numOfPeople.team_cnt) ||
                  idx + 1 === 4
                ) {
                  return (
                    <div
                      key={idx}
                      className={`flex items-center relative`}
                      style={{
                        right: idx * 25 + "px",
                      }}
                    >
                      <div
                        className={`absolute -right-2 bottom-2 w-8 h-4 rounded-lg text-[8px] flex items-center justify-center ${
                          parseInt(team.numOfPeople.team_cnt) - 4 <= 0 &&
                          "hidden"
                        }`}
                        style={{
                          backgroundColor: tm.accentColor,
                        }}
                      >
                        +{parseInt(team.numOfPeople.team_cnt) - 4}
                      </div>
                      <img
                        src={`/public_assets/profileImg/profileImg_${user.user_img_index}.png`}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </div>
                  );
                }
                return (
                  <div
                    key={idx}
                    className={`flex items-center relative`}
                    style={{
                      right: idx * 25 + "px",
                    }}
                  >
                    <img
                      src={`/public_assets/profileImg/profileImg_${user.user_img_index}.png`}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </div>
                );
              })}
        </div>
      </button>
    </div>
  );
}
