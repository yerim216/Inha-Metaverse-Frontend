import React, { useContext } from "react";
import styles from "../styles/modules/ToggleSwitch.module.css";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function ToggleSwitch() {
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.toggleBtn} ${
        themeMode === "light" && styles.active
      }`}
      onClick={() => {
        toggleTheme();
      }}
    >
      <div
        className={`${styles.toggleDot} ${
          themeMode === "light" && styles.active
        }`}
      ></div>
    </div>
  );
}
