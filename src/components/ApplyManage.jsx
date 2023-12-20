import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/modules/ApplyManage.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import ApplyCard from "./ApplyCard";
import { useParams } from "react-router";
import { getApplied } from "../APIs/team";
import ApplyModal from "./ApplyModal";

export default function ApplyManage() {
  const params = useParams();
  const teamIndex = params.teamIndex;

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  // 개발, 기획, 디자인 지원 상세 창을 보여줄지에 대한 여부를 담은 배열. 각각 0,1,2번째 인덱스에 할당됨.
  const [jobsOpen, setJobsOpen] = useState([false, false, false]);
  const toggleJobOpen = (jobIdx) => {
    let newArr = [...jobsOpen];
    newArr[jobIdx] = !newArr[jobIdx];
    setJobsOpen(newArr);
  };

  const [applies, setApplies] = useState();
  useEffect(() => {
    getApplied(teamIndex).then((res) => setApplies(res.data));
  }, []);

  const [applies_dev, setApplies_dev] = useState([]);
  const [applies_plan, setApplies_plan] = useState([]);
  const [applies_design, setApplies_design] = useState([]);
  const [applies_guitar, setApplies_guitar] = useState([]);

  useEffect(() => {
    if (!applies) return;

    let newDev = [];
    let newPlan = [];
    let newDesign = [];
    let newGuitar = [];

    applies.map((apply) => {
      // apply_job이 여러 개일 수도 있나? 확인 필요

      const applyJobCategory = apply.user_info.apply_job[0].apply_job_category;
      if (applyJobCategory === "개발") {
        newDev.push(apply);
      } else if (applyJobCategory === "기획") {
        newPlan.push(apply);
      } else if (applyJobCategory === "디자인") {
        newDesign.push(apply);
      } else {
        newGuitar.push(apply);
      }
    });

    setApplies_dev(newDev);
    setApplies_plan(newPlan);
    setApplies_design(newDesign);
    setApplies_guitar(newGuitar);
  }, [applies]);

  return (
    <section className={styles.paddingSection}>
      {/* 개발, 기획, 디자인, 기타로 구성 : 기타는 현재 존재하지 않아서, 일단 제외 처리함. */}
      <div
        className={styles.jobSection}
        style={{
          borderColor: tm.border,
        }}
      >
        <button
          className="flex items-center gap-2"
          onClick={() => {
            toggleJobOpen(0);
          }}
        >
          <h3
            className={styles.jobTitle}
            style={{
              color: tm.textColor,
            }}
          >
            개발
          </h3>
          <img
            src="/public_assets/icons/vector_down.svg"
            alt="vector_down"
            className={`w-3 h-3 relative bottom-[2px] transition-all ${
              !jobsOpen[0] && "rotate-180"
            }`}
          />
        </button>
        {jobsOpen[0] && (
          <div className={styles.applyCardContainer}>
            {applies_dev.length !== 0 ? (
              applies_dev.map((apply, idx) => {
                return <ApplyCard applyInfo={apply} key={idx} />;
              })
            ) : (
              <div
                className="font-bold text-lg"
                style={{
                  color: tm.textColor,
                }}
              >
                해당 분야의 지원자가 없습니다!
              </div>
            )}
            {/* <ApplyCard />
            <ApplyCard />
            <ApplyCard /> */}
          </div>
        )}
      </div>
      <div
        className={styles.jobSection}
        style={{
          borderColor: tm.border,
        }}
      >
        <button
          className="flex items-center gap-2"
          onClick={() => {
            toggleJobOpen(1);
          }}
        >
          <h3
            className={styles.jobTitle}
            style={{
              color: tm.textColor,
            }}
          >
            기획
          </h3>
          <img
            src="/public_assets/icons/vector_down.svg"
            alt="vector_down"
            className={`w-3 h-3 relative bottom-[2px] transition-all ${
              !jobsOpen[1] && "rotate-180"
            }`}
          />
        </button>
        {jobsOpen[1] && (
          <div className={styles.applyCardContainer}>
            {applies_plan.length !== 0 ? (
              applies_plan.map((apply, idx) => {
                return <ApplyCard applyInfo={apply} key={idx} />;
              })
            ) : (
              <div
                className="font-bold text-lg"
                style={{
                  color: tm.textColor,
                }}
              >
                해당 분야의 지원자가 없습니다!
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={styles.jobSection}
        style={{
          borderColor: tm.border,
        }}
      >
        <button
          className="flex items-center gap-2"
          onClick={() => {
            toggleJobOpen(2);
          }}
        >
          <h3
            className={styles.jobTitle}
            style={{
              color: tm.textColor,
            }}
          >
            디자인
          </h3>
          <img
            src="/public_assets/icons/vector_down.svg"
            alt="vector_down"
            className={`w-3 h-3 relative bottom-[2px] transition-all ${
              !jobsOpen[2] && "rotate-180"
            }`}
          />
        </button>
        {jobsOpen[2] && (
          <div className={styles.applyCardContainer}>
            {applies_design.length !== 0 ? (
              applies_design.map((apply, idx) => {
                return <ApplyCard applyInfo={apply} key={idx} />;
              })
            ) : (
              <div
                className="font-bold text-lg"
                style={{
                  color: tm.textColor,
                }}
              >
                해당 분야의 지원자가 없습니다!
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
