import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../../contexts/ThemeProvider";
import { theme } from "../../theme/theme";

export default function TitleWithDescription({ title, description }) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  return (
    <p className="flex flex-col items-center gap-2 font-bold mt-28">
      <h3
        className="text-[45px]"
        style={{
          color: tm.mainTextColor,
        }}
      >
        {title}
      </h3>
      <span
        className="text-[22px]"
        style={{
          color: tm.hazyTextColor,
        }}
      >
        {description}
      </span>
    </p>
  );
}
