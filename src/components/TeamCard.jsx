import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/modules/TeamCard.module.css";
import { useNavigate } from "react-router";
import { ThemeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function TeamCard({ team }) {
  // {
  //     "teamMembers": [
  //         {
  //             "user_index": 6,
  //             "user_name": "갈파거북이",
  //             "user_img_index": 1,
  //             "user_introduction": "{\"{\\\"field_title\\\":\\\"REACT\\\",\\\"field_index\\\":9}\"}",
  //             "user_job": null,
  //             "is_teamleader": true
  //         },
  //         {
  //             "user_index": 7,
  //             "user_name": "햄스터",
  //             "user_img_index": 5,
  //             "user_introduction": "가나다라마바사아자차카타파하",
  //             "user_job": 9,
  //             "is_teamleader": false
  //         },
  //         {
  //             "user_index": 9,
  //             "user_name": "갈파거북2",
  //             "user_img_index": 4,
  //             "user_introduction": null,
  //             "user_job": 13,
  //             "is_teamleader": false
  //         }
  //     ],
  //     "teamInfo": {
  //         "team_index": 3,
  //         "team_name": "거북이키우기",
  //         "team_introduction": "귀여운 거북이를 키워 보아요",
  //         "team_description": "거북이가 속이 거북하면 거북이거북",
  //         "team_views": 79,
  //         "team_recruting": true,
  //         "recruitment_number": "10",
  //         "skills": [
  //             null
  //         ]
  //     },
  //     "numOfPeople": {
  //         "team_cnt": "3"
  //     }
  // }
  //   console.log(team);

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

  const { themeMode, toggleTheme } = useContext(ThemeContext);
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
        }}
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
        className={`w-96 h-96 bg-[#323232] rounded-xl p-10 flex flex-col relative ${styles.teamCard}`}
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        ref={teamCardRef}
      >
        <div className="border-b border-[#7C7C7C] w-full h-[70%] flex flex-col items-start gap-6">
          {team.teamInfo.skills[0] !== null ? (
            <div className={styles.teamSkills}>{team.numOfPeople.team_cnt}</div>
          ) : (
            <div className={styles.teamSkills}>팀 내 기술 스택 X</div>
          )}
          <div className="text-white font-extrabold text-xl">
            {team.teamInfo.team_name}
          </div>
          <div className="text-[#ECECEC] text-xs">
            {team.teamInfo.team_introduction}
          </div>
        </div>
        <div
          className={`w-full h-[30%] flex text-white text-base font-semibold ${
            parseInt(team.numOfPeople.team_cnt) <= 2
              ? "flex-col justify-end gap-2"
              : "pt-6"
          }`}
        >
          {parseInt(team.numOfPeople.team_cnt) <= 2
            ? team.teamMembers.map((user, idx) => {
                return (
                  <div key={idx} className="w-full flex items-center gap-4">
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
                        className={`absolute -right-2 bottom-2 w-8 h-4 rounded-lg bg-[#EA2845] text-[8px] flex items-center justify-center ${
                          parseInt(team.numOfPeople.team_cnt) - 4 <= 0 &&
                          "hidden"
                        }`}
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
