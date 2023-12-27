import React, { useContext, useEffect, useState } from "react";
import { getSchedule } from "../APIs/schedule";
import { getTeamIndex } from "../APIs/userinfo";
import { useNavigate } from "react-router";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function NoticeBoard({ teamIndex }) {
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState();

  const getDatabase = () => {
    getSchedule(teamIndex).then((res) => {
      setSchedule(res.data);
    });
  };

  useEffect(() => {
    getDatabase(teamIndex);
  }, []);

  const pad = (value, length) => {
    // 문자열로 변환
    value = value.toString();

    // 원하는 길이에 도달할 때까지 앞에 0을 추가
    while (value.length < length) {
      value = "0" + value;
    }

    return value;
  };

  const getDateInKor = (dateString) => {
    // Date 객체로 변환
    const date = new Date(dateString);

    // 월과 일 추출
    const year = date.getFullYear() % 100;
    const month = pad(date.getMonth() + 1, 2);
    const day = pad(date.getDate(), 2);

    // 월과 일을 문자열로 변환
    const monthString = month.toString();
    const dayString = day.toString();

    // "년", "월", "일"을 추가하여 최종 문자열 생성
    return year + "." + monthString + "." + dayString;
  };

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

  return (
    <section className="mt-8 mb-[-120px]">
      <div className="w-full flex justify-between items-center">
        <span
          className="text-[18px]"
          style={{
            color: tm.mainTextColor,
          }}
        >
          게시판
        </span>
        <button
          className="text-[12px] hover:scale-105"
          style={{
            color: tm.hazyTextColor,
          }}
          onClick={() => {
            navigate(`/projectmanagertools/${teamIndex}/board`);
          }}
        >
          자세히보기 &gt;
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {/* 아래 div가 게시판 글 하나 */}
        {schedule &&
          schedule.map((item) => {
            return (
              <div
                className="w-full h-12 rounded-xl flex justify-between items-center px-6 cursor-pointer"
                style={{
                  backgroundColor: tm.teamMemberProfileCard,
                }}
                onClick={() => {
                  navigate(`/projectmanagertools/${teamIndex}/board`);
                }}
              >
                <span
                  className="text-[12px]"
                  style={{
                    color: tm.mainTextColor,
                  }}
                >
                  {item.schedule_content || "설정된 content가 비어 있음"}
                </span>
                <div
                  className="text-[12px] flex gap-2"
                  style={{
                    color: tm.hazyTextColor,
                  }}
                >
                  <span>{getDateInKor(item.created_at)}</span>
                  <img src="/public_assets/icons/ellipsis.svg" alt="" />
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
