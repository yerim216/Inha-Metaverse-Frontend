import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../../contexts/ThemeProvider";
import { theme } from "../../theme/theme";

export default function RecruitingInfoModal({ jobInfo }) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  return (
    <div
      className="absolute left-6 rounded-[10px] z-50 top-0 w-60 py-4 px-5 flex flex-col gap-1"
      style={{
        backgroundColor: tm.bannerBg,
        color: tm.mainTextColor,
      }}
    >
      {!jobInfo[0].job_name
        ? "설정된 직무 분야가 없습니다!"
        : jobInfo.map((job) => {
            return (
              <div className="flex w-full justify-between">
                <div>{job.job_name}</div>
                <div>{job.recruitment_number + "명"}</div>
              </div>
            );
          })}
    </div>
  );
}
