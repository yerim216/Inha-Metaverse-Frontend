import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/modules/PositionManage.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import ApplyCard from "./ApplyCard";
import PositionCard from "./PositionCard";
import { useParams } from "react-router";
import { getTeamInfoByIndex } from "../APIs/team";

export default function PositionManage() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  // teamMember를 가져오면, 현재 분야에 따라 분류하여(개발 / 기획 / 디자인) 분류 후 화면에 표시.
  const [teamMembers, setTeamMembers] = useState();
  const params = useParams();
  const teamIndex = params.teamIndex;
  useEffect(() => {
    if (teamIndex) {
      getTeamInfoByIndex(teamIndex).then((res) => {
        setTeamMembers(res.data.teamMembers);
      });
    }
  }, []);

  // 개발 / 기획 / 디자인
  const [developmentMem, setDevelopmentMem] = useState([]);
  const [planMem, setPlanMem] = useState([]);
  const [designMem, setDesignMem] = useState([]);
  useEffect(() => {
    if (!teamMembers) return;

    let dev = [];
    let plan = [];
    let design = [];

    teamMembers.map((member) => {
      const category = member.field_category;

      if (category === "개발") {
        dev.push(member);
      } else if (category === "기획") {
        plan.push(member);
      } else if (category === "디자인") {
        design.push(member);
      } else {
        console.log(
          "지정되지 않은 직무 분야가 감지되었습니다! 하단에 해당 멤버의 정보 출력."
        );
        console.log(member);
      }
    });

    setDevelopmentMem(dev);
    setPlanMem(plan);
    setDesignMem(design);
  }, [teamMembers]);

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
            {developmentMem.length !== 0 ? (
              developmentMem.map((member) => <PositionCard member={member} />)
            ) : (
              <div
                className="font-semibold"
                style={{
                  color: tm.textColor,
                }}
              >
                해당 직무의 팀원이 존재하지 않습니다!
              </div>
            )}
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
            {planMem.length !== 0 ? (
              planMem.map((member) => <PositionCard member={member} />)
            ) : (
              <div
                className="font-semibold"
                style={{
                  color: tm.textColor,
                }}
              >
                해당 직무의 팀원이 존재하지 않습니다!
              </div>
            )}
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
            {designMem.length !== 0 ? (
              designMem.map((member) => <PositionCard member={member} />)
            ) : (
              <div
                className="font-semibold"
                style={{
                  color: tm.textColor,
                }}
              >
                해당 직무의 팀원이 존재하지 않습니다!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
