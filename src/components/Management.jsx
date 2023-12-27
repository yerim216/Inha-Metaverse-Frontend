import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import styles from "../styles/modules/Management.module.css";
import "../styles/hideScrollBar.css";
import ModifyProject from "./ModifyProject";
import ApplyManage from "./ApplyManage";
import PositionManage from "./PositionManage";

export default function Management() {
  const { teamIndex } = useOutletContext();
  const { state } = useLocation();

  const navigate = useNavigate();
  if (!state) {
    navigate("/");
  }

  useEffect(() => {
    document.documentElement.classList.add("overflowHidden");
    return () => {
      document.documentElement.classList.remove("overflowHidden");
    };
  }, []);

  const [userIndex, setUserIndex] = useState();

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  const [activated, setActivated] = useState("project");
  const changeActivated = (manageName) => {
    setActivated(manageName);
  };

  return (
    <section className="w-full hiddenScrollBar p-10 mb-[-120px]">
      {/* 현재 선택된 파트 */}
      <div
        className={`flex font-bold text-[18px] w-[360px] mb-12  ${styles.lightFont}`}
        style={{
          color: tm.textColor,
        }}
      >
        <button
          onClick={() => {
            changeActivated("project");
          }}
          className={`flex-1 border-b-2 ${
            activated === "project" && styles.boldFont
          }`}
          style={{
            borderColor: activated === "project" ? tm.accentColor : tm.border,
          }}
        >
          프로젝트 관리
        </button>
        <button
          onClick={() => {
            changeActivated("apply");
          }}
          className={`flex-1 border-b-2 ${
            activated === "apply" && styles.boldFont
          }`}
          style={{
            borderColor: activated === "apply" ? tm.accentColor : tm.border,
          }}
        >
          지원 관리
        </button>
        <button
          onClick={() => {
            changeActivated("position");
          }}
          className={`flex-1 border-b-2 ${
            activated === "position" && styles.boldFont
          }`}
          style={{
            borderColor: activated === "position" ? tm.accentColor : tm.border,
          }}
        >
          포지션
        </button>
      </div>

      {/* 1. 프로젝트가 활성화됐을 경우 */}
      {activated === "project" && <ModifyProject />}

      {/* 2. 지원 관리가 활성화됐을 경우 */}
      {activated === "apply" && <ApplyManage />}

      {/* 3. 포지션 관리가 활성화됐을 경우 */}
      {activated === "position" && <PositionManage />}
    </section>
  );
}
