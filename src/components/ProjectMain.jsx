import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getTeamInfoByIndex } from "../APIs/team";
import "../styles/hideScrollBar.css";
import RightViewer from "./RightViewer";
import { theme } from "../theme/theme";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import NoticeBoard from "./NoticeBoard";

export default function ProjectMain() {
  const { teamIndex } = useOutletContext();

  useEffect(() => {
    document.documentElement.classList.add("overflowHidden");
    return () => {
      document.documentElement.classList.remove("overflowHidden");
    };
  }, []);

  const [userIndex, setUserIndex] = useState();
  const [teamInfo, setTeamInfo] = useState();

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

  useEffect(() => {
    let userIndex;

    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    userIndex = JSON.parse(localStorage.getItem("recoil-persist")).userState
      .user_index;

    setUserIndex(userIndex);

    getTeamInfoByIndex(teamIndex).then((res) => setTeamInfo(res.data));
  }, []);

  const getDateInKor = (dateString) => {
    // Date 객체로 변환
    const date = new Date(dateString);

    // 월과 일 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 월과 일을 문자열로 변환
    const monthString = month.toString();
    const dayString = day.toString();

    // "년", "월", "일"을 추가하여 최종 문자열 생성
    return year + "년 " + monthString + "월 " + dayString + "일";
  };

  const getDateDifference = (dateString) => {
    // 주어진 날짜를 Date 객체로 변환
    const givenDate = new Date(dateString);

    // 현재 날짜를 가져오기
    const currentDate = new Date();

    // 날짜 차이 계산 (밀리초 단위)
    const timeDifference = currentDate - givenDate;

    // 밀리초를 일로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
    const daysDifference = timeDifference / (24 * 60 * 60 * 1000);

    return Math.floor(daysDifference) + 1 + "일";
  };

  const getJobByIdx = (index) => {
    if (!index) return "배정되지 않음";

    if (index === 1) {
      return "개발기획";
    } else if (index === 2) {
      return "서비스기획";
    } else if (index === 3) {
      return "프로덕트기획";
    } else if (index === 4) {
      return "영업기획";
    } else if (index === 5) {
      return "UI디자인";
    } else if (index === 6) {
      return "UX디자인";
    } else if (index === 7) {
      return "프로덕트 디자인";
    } else if (index === 8) {
      return "편집 디자인";
    } else if (index === 9) {
      return "REACT";
    } else if (index === 10) {
      return "SWIFT";
    } else if (index === 11) {
      return "KOTLIN";
    } else if (index === 12) {
      return "JAVA";
    } else if (index === 13) {
      return "NODE.JS";
    } else if (index === 14) {
      return "SPRING BOOT";
    } else if (index === 15) {
      return "AI";
    }
  };

  return (
    <section className="w-full h-full p-4 overflow-auto hiddenScrollBar xl:pr-80 2xl:pr-96">
      {/* 우측에 팀원 프로필 보여주는 곳 */}
      <RightViewer activated={"main"} />
      <section>
        <h5 className="text-white text-[18px]">프로젝트가 진행되고 있어요!</h5>
        <div className="w-full h-[72px] bg-[#272727] mt-4 rounded-full">
          {/* <div className="w-1/2 h-full bg-black rounded-full flex justify-between items-center px-6"> */}
          <div
            className="w-1/2 h-full  rounded-full flex justify-between items-center px-6"
            style={{
              backgroundColor: tm.progress,
            }}
          >
            {/* 인원들 이미지 작성하는 곳 */}
            <div className="flex">
              {teamInfo &&
                teamInfo.teamMembers.map((member, idx) => (
                  <img
                    key={member.user_index}
                    src={`/public_assets/profileImg/profileImg_${member.user_img_index}.png`}
                    className="w-12 h-12 object-cover rounded-full relative"
                    style={{
                      right: idx * 20 + "px",
                    }}
                  />
                ))}
            </div>
            <div className="flex flex-col items-end">
              <span className="text-white font-extrabold text-[12px]">
                프로젝트가 시작된 지 총
                {teamInfo &&
                  " " + getDateDifference(teamInfo.teamInfo.created_at)}
              </span>
              <span className="text-[#7C7C7C] text-[12px]">
                {teamInfo && getDateInKor(teamInfo.teamInfo.created_at)} 부터
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h5 className="text-white text-[18px]">팀원 프로필</h5>
        <div className="w-full h-40 mt-4 overflow-x-auto flex gap-6">
          {teamInfo &&
            teamInfo.teamMembers.map((member) => {
              return (
                <div className="w-40 h-40 bg-[#323232] rounded-xl flex flex-col justify-center items-center gap-4">
                  <img
                    key={member.user_index}
                    src={`/public_assets/profileImg/profileImg_${member.user_img_index}.png`}
                    className="w-16 h-16 object-cover rounded-full relative"
                  />
                  <div className="flex flex-col items-center gap-[2px]">
                    <span className="text-white text-[14px]">
                      {member.user_name}
                    </span>
                    <span className="text-[#7C7C7C] text-[12px]">
                      {/* {member.user_job || "배정되지 않음"} */}
                      {getJobByIdx(member.user_job)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <NoticeBoard teamIndex={teamIndex} />
    </section>
  );
}
