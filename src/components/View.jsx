import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/View.module.css";
import { ThemeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function View() {
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  const [tm, setTm] = useState(theme.lightTheme.home);

  useEffect(() => {
    if (themeMode === "light") {
      setTm(theme.lightTheme.home);
      setSource("eyeopen_light.svg");
    } else {
      setTm(theme.darkTheme.home);
      setSource("eyeopen_dark.svg");
    }
  }, [themeMode]);

  const [source, setSource] = useState();

  return (
    <span className={styles.views}>
      <img
        src={`${process.env.PUBLIC_URL}/public_assets/icons/${source}`}
        className={styles.images}
        alt="Views"
      />
      <span
        className={styles.viewsData}
        style={{
          color: tm.mainTextColor,
        }}
      >
        1234
      </span>
    </span>
  );
}
