import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Story.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Story({
  storyDb: { profileName, part, title, content, date },
  handleMoreBtnClick,
}) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  return (
    <div className="mb-10 mr-10">
      <div
        className="w-full h-80 px-14 py-8"
        style={{
          backgroundColor: tm.storyBg,
          // border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0px 12px 20px rgba(112, 144, 176, 0.2)",
          borderRadius: "20px",
        }}
      >
        <div
          className={styles.header}
          style={{
            borderColor: tm.borderColor,
          }}
        >
          <div className={styles.leftHeader}>
            <img src="/public_assets/profileImg.png" alt="profile" />
            <h1
              style={{
                fontSize: "30px",
                color: tm.mainTextColor,
              }}
            >
              {profileName}
            </h1>
            <span
              style={{
                fontSize: "10px",
                color: tm.mainTextColor,
              }}
            >
              {part}
            </span>
          </div>
          <div
            className={styles.rightHeader}
            style={{
              color: tm.mainTextColor,
            }}
          >
            {date}
          </div>
        </div>
        <div
          className={styles.title}
          style={{
            color: tm.mainTextColor,
          }}
        >
          {title}
        </div>
        <p
          className={`line-clamp-4 ${styles.content}`}
          style={{
            color: tm.mainTextColor,
          }}
        >
          {content}
        </p>
        <button
          className={styles.more}
          onClick={() => {
            handleMoreBtnClick({ profileName, part, title, content, date });
          }}
        >
          자세히보기
          <img
            src="/public_assets/moreArrow.png"
            alt="moreArrow"
            className="w-3 h-3"
          />
        </button>
      </div>
    </div>
  );
}
