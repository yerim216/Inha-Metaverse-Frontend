import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function PositionCard({ member }) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  // console.log(member);

  return (
    <div
      className="h-40 w-40 rounded-[10px] shrink-0 flex flex-col items-center"
      style={{
        backgroundColor: tm.positionCardBg,
      }}
    >
      <img
        src={`/public_assets/profileImg/profileImg_${member.user_img_index}.png`}
        alt={`profileImg_${member.user_img_index}`}
        className="w-16 h-16 rounded-full mt-4"
      />
      <div
        className="text-sm mt-3 font-normal"
        style={{
          color: tm.textColor,
        }}
      >
        {member.user_name}
      </div>
      <div
        className="text-xs mt-2 font-normal opacity-50"
        style={{
          color: tm.textColor,
        }}
      >
        {member.field_title}
      </div>
    </div>
  );
}
