import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/ProjectBox.module.css";
import { useNavigate } from "react-router";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function ProjectBox({
  projectName,
  isRecruiting,
  recruitmentNumber,
  views,
  introduction,
  teamIndex,
  numOfMembers,
  skills,
}) {
  const navigate = useNavigate();

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  return (
    <div
      style={{
        color: tm.mainTextColor,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0px 12px 20px rgba(112, 144, 176, 0.2)",
        padding: "45px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        fontWeight: 700,
        height: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className={styles.pjb}
      onClick={() => {
        navigate("/profile", { state: { teamIndex: teamIndex } });
        window.scrollTo({ top: 0, behavior: "auto" });
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          height: "10%",
        }}
      >
        {skills ? (
          skills.map((skill) => {
            <div
              style={{
                padding: "4px 10px",
                backgroundColor: tm.accentColor,
                fontSize: "12px",
                borderRadius: "10px",
                color: tm.buttonText,
              }}
            >
              {skill}
            </div>;
          })
        ) : (
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: tm.accentColor,
              fontSize: "12px",
              borderRadius: "10px",
              color: tm.buttonText,
            }}
          >
            현재 설정된 모집중인 기술이 없습니다!
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: "20px",
          marginTop: "15px",
          height: "20%",
        }}
      >
        <h1>{projectName}</h1>
      </div>

      {/* 여기 스킬 리스트 이미지 */}

      <div
        className="my-2 font-medium"
        style={{
          color: tm.hazyTextColor,
          height: "30%",
        }}
      >
        {introduction}
      </div>
      <div className={styles.info}>
        <div className="flex items-center gap-3">
          {isRecruiting ? (
            <>
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: tm.accentColor,
                }}
              ></div>
              <span>
                모집중 ( {numOfMembers}/{recruitmentNumber} )
              </span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>
                모집중X ( {numOfMembers}/{recruitmentNumber} )
              </span>
            </>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: tm.hazyTextColor,
            }}
          >
            <img
              src="/public_assets/icons/show.svg"
              alt="아이콘"
              className="w-[17px] mr-2"
            />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
