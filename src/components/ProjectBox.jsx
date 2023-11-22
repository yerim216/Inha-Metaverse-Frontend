import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/ProjectBox.module.css";
import { useNavigate } from "react-router";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function ProjectBox({
  projectName,
  isRecruiting,
  views,
  introduction,
  teamIndex,
  numOfMembers,
  skills,
  categories,
  jobs,
}) {
  const navigate = useNavigate();

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  const [recruitmentNumber, setRecruitmentNumber] = useState(0);
  useEffect(() => {
    /* 설정된 jobs(모집 분야)가 존재하지 않을 경우, jobs[0]의 recruitment_number값과 job_name값이 null값임. 이에 따라 예외 처리해 주었음. */
    if (jobs[0].job_name) {
      let num = 0;
      jobs.map((job) => {
        num += job.recruitment_number;
      });
      setRecruitmentNumber(num);
    }
  }, [jobs]);

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
        {/* 설정된 카테고리 분야가 존재하지 않을 경우, categories[0]의 category_index값과 category_name값이 null값임. 이에 따라 예외 처리해 주었음. */}
        {categories[0].category_index ? (
          categories.map((category) => {
            return (
              <div
                style={{
                  padding: "4px 10px",
                  backgroundColor: tm.accentColor,
                  fontSize: "12px",
                  borderRadius: "10px",
                  color: tm.buttonText,
                }}
              >
                {category.category_name}
              </div>
            );
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
            현재 설정된 프로젝트 카테고리가 없습니다!
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: "20px",
          marginTop: "15px",
          position: "relative",
          height: "20%",
        }}
      >
        <h1>{projectName}</h1>
        {/* 스킬 리스트 이미지 */}
        {/* 스킬이 존재하지 않을 경우, skill[0]의 skill_index값과 skill_name값이 null값임. 이에 따라 예외 처리해 주었음. */}
        <div
          className={`absolute top-8 ${
            skills && skills[0].skill_index && "-left-1"
          }`}
        >
          {skills[0].skill_index ? (
            <section className="flex">
              {skills.map((skill) => {
                return (
                  <img
                    src={`/public_assets/skills/skill_img_${themeMode}_${skill.skill_index}.svg`}
                    alt={`skill_img_${themeMode}_5`}
                    className="w-7"
                  />
                );
              })}
            </section>
          ) : (
            <div className="font-medium text-sm">
              설정된 기술 스택이 없습니다!
            </div>
          )}
        </div>
      </div>

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
