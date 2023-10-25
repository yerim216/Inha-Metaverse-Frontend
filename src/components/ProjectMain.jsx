import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getTeamInfoByIndex } from "../APIs/team";
import "../styles/hideScrollBar.css";
import RightViewer from "./RightViewer";
import { theme } from "../theme/theme";
import { ThemeModeContext } from "../contexts/ThemeProvider";
// import { ThemeModeContext } from "../contexts/ThemeProvider";

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
                총 10일 9시간 30분
              </span>
              <span className="text-[#7C7C7C] text-[12px]">23.01.01 부터</span>
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
                      {member.user_job || "배정되지 않음"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <section className="mt-8">
        <div className="w-full flex justify-between items-center">
          <span className="text-white text-[18px]">게시판</span>
          <span className="text-[#B3B3B3] text-[12px]">자세히보기 &gt;</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {/* 아래 div가 게시판 글 하나 */}
          <div className="w-full h-12 bg-[#272727] rounded-xl flex justify-between items-center px-6">
            <span className="text-white text-[12px]">
              어쩌구저쩌구 휴가공지 어쩌구저쩌구
            </span>
            <div className="text-[#B3B3B3] text-[12px] flex gap-2">
              <span>23.01.01</span>
              <img src="/public_assets/icons/ellipsis.svg" alt="" />
            </div>
          </div>
          <div className="w-full h-12 bg-[#272727] rounded-xl flex justify-between items-center px-6">
            <span className="text-white text-[12px]">
              어쩌구저쩌구 휴가공지 어쩌구저쩌구
            </span>
            <div className="text-[#B3B3B3] text-[12px] flex gap-2">
              <span>23.01.01</span>
              <img src="/public_assets/icons/ellipsis.svg" alt="" />
            </div>
          </div>
          <div className="w-full h-12 bg-[#272727] rounded-xl flex justify-between items-center px-6">
            <span className="text-white text-[12px]">
              어쩌구저쩌구 휴가공지 어쩌구저쩌구
            </span>
            <div className="text-[#B3B3B3] text-[12px] flex gap-2">
              <span>23.01.01</span>
              <img src="/public_assets/icons/ellipsis.svg" alt="" />
            </div>
          </div>
          <div className="w-full h-12 bg-[#272727] rounded-xl flex justify-between items-center px-6">
            <span className="text-white text-[12px]">
              어쩌구저쩌구 휴가공지 어쩌구저쩌구
            </span>
            <div className="text-[#B3B3B3] text-[12px] flex gap-2">
              <span>23.01.01</span>
              <img src="/public_assets/icons/ellipsis.svg" alt="" />
            </div>
          </div>
          <div className="w-full h-12 bg-[#272727] rounded-xl flex justify-between items-center px-6">
            <span className="text-white text-[12px]">
              어쩌구저쩌구 휴가공지 어쩌구저쩌구
            </span>
            <div className="text-[#B3B3B3] text-[12px] flex gap-2">
              <span>23.01.01</span>
              <img src="/public_assets/icons/ellipsis.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
