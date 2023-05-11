import React, { useState } from "react";
import ProjectBox from "./ProjectBox";
import styles from "../styles/ProjectLists.module.css";

export default function ProjectLists({ recruitmentBtnActive }) {
  // 아래의 두 요소들의 데이터는 추후 db에서 받아올 예정.
  const [recruitingProjects, setRecruitingProjects] = useState([
    "Pong Ping Track1",
    "Pong Ping Track2",
    "Pong Ping Track3",
    "Pong Ping Track4",
    "Pong Ping Track5",
    "Pong Ping Track6",
    "Pong Ping Track7",
    "Pong Ping Track8",
    "Pong Ping Track9",
  ]);
  const [notRecruitingProjects, setNotRecruitingProjects] = useState([
    "Ping Pong Track1",
    "Ping Pong Track2",
    "Ping Pong Track3", 
    "Ping Pong Track4",
    "Ping Pong Track5",
    "Ping Pong Track6",
    "Ping Pong Track7",
    "Ping Pong Track8",
    "Ping Pong Track9",
  ]);
  return (
    <div className={styles.ProjectBox}>
      {recruitmentBtnActive
        ? recruitingProjects.map((item) => {
            return <ProjectBox projectName={item} isRecruiting={true} />;
          })
        : notRecruitingProjects.map((item) => {
            return <ProjectBox projectName={item} isRecruiting={false} />;
          })}
    </div>
  );
}
