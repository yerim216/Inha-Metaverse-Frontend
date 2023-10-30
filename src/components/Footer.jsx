import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Footer() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  return (
    <footer
      className={`${styles.footer}`}
      style={{
        color: tm.footerTextColor,
        backgroundColor: tm.footerBg,
      }}
    >
      <div className={`${styles.footerContents} maxWidth`}>
        <div className={styles.rights}>
          <img
            src={`/public_assets/icons/archifree${
              themeMode === "light" ? "_light" : ""
            }.svg`}
            alt="archifree"
          />
          ©2022 Archifree, Inc. All Rights Reserved
        </div>
        <div
          className={styles.contact}
          style={{
            borderColor: tm.borderColor,
          }}
        >
          <img
            src={`/public_assets/icons/mail${
              themeMode === "light" ? "_light" : ""
            }.svg`}
            alt="mail"
          />
          <img
            src={`/public_assets/icons/phone${
              themeMode === "light" ? "_light" : ""
            }.svg`}
            alt="phone"
          />
          <img
            src={`/public_assets/icons/facebook${
              themeMode === "light" ? "_light" : ""
            }.svg`}
            alt="facebook"
          />
        </div>
        <div>
          <p className={styles.companyName}>스타트업 아키프리</p>
          <p className={styles.companyAddress}>
            인천광역시 미추홀구 경인남길 102번길 14
          </p>
        </div>
      </div>
    </footer>
  );
}
