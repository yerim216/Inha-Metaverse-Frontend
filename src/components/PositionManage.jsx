import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/modules/PositionManage.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import ApplyCard from "./ApplyCard";
import PositionCard from "./PositionCard";

export default function PositionManage() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  return (
    <section className={styles.paddingSection}>
      {/* 개발, 기획, 디자인, 기타로 구성 : 기타는 현재 존재하지 않아서, 일단 제외 처리함. */}
      <div className={styles.jobSection}>
        <h3
          className={styles.jobTitle}
          style={{
            color: tm.textColor,
          }}
        >
          개발
        </h3>
        <div className="flex w-full h-52 mt-5 justify-between">
          <div
            className={`${styles.scrollArea}`}
            style={{
              backgroundColor: tm.positionCardContainer,
            }}
          >
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
          </div>
          <div
            className={`w-44 h-48 ${styles.dottedBorder} flex justify-center items-center`}
            style={{
              borderColor: tm.border,
              color: tm.hazyTextColor,
            }}
          >
            추가해주세요!
          </div>
        </div>
      </div>
      <div className={styles.jobSection}>
        <h3
          className={styles.jobTitle}
          style={{
            color: tm.textColor,
          }}
        >
          기획
        </h3>
        <div className="flex w-full h-52 mt-5 justify-between">
          <div
            className={`${styles.scrollArea}`}
            style={{
              backgroundColor: tm.positionCardContainer,
            }}
          >
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
          </div>
          <div
            className={`w-44 h-48 ${styles.dottedBorder} flex justify-center items-center`}
            style={{
              borderColor: tm.border,
              color: tm.hazyTextColor,
            }}
          >
            추가해주세요!
          </div>
        </div>
      </div>
      <div className={styles.jobSection}>
        <h3
          className={styles.jobTitle}
          style={{
            color: tm.textColor,
          }}
        >
          디자이너
        </h3>
        <div className="flex w-full h-52 mt-5 justify-between">
          <div
            className={`${styles.scrollArea}`}
            style={{
              backgroundColor: tm.positionCardContainer,
            }}
          >
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
            <PositionCard />
          </div>
          <div
            className={`w-44 h-48 ${styles.dottedBorder} flex justify-center items-center`}
            style={{
              borderColor: tm.border,
              color: tm.hazyTextColor,
            }}
          >
            추가해주세요!
          </div>
        </div>
      </div>
    </section>
  );
}
