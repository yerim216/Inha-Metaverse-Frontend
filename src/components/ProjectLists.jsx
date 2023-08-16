import React, { useEffect, useState } from "react";
import ProjectBox from "./ProjectBox";
import styles from "../styles/ProjectLists.module.css";
import axios from "axios";
import { getTeams } from "../APIs/team";

export default function ProjectLists({ recruitmentBtnActive }) {
  const getRandomElements = (arr, count) => {
    const result = [];
    const indices = new Set();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      indices.add(randomIndex);
    }
    indices.forEach((index) => {
      result.push(arr[index]);
    });
    return result;
  };

  const [projectList, setProjectList] = useState([]);
  const [recruitingProjects, setRecruitingProjects] = useState([]);
  const [notRecruitingProjects, setNotRecruitingProjects] = useState([]);

  // 아래의 요소들은 created_at, recruitment_number, team_description, team_index, team_introduction, team_leader,
  // team_name, team_recruting, team_views, updated_at로 구성됨.

  const [randomRecruitingProjects, setRandomRecruitingProjects] = useState([]);
  const [randomNotRecruitingProjects, setRandomNotRecruitingProjects] =
    useState([]);

  useEffect(() => {
    getTeams().then((res) => {
      console.log(res.data);
      setProjectList(res.data);
    });
  }, []);

  useEffect(() => {
    const recruiting = [];
    const notRecruiting = [];

    projectList.forEach((project) => {
      if (project.team_recruting === true) {
        recruiting.push(project);
      } else {
        notRecruiting.push(project);
      }
    });

    setRecruitingProjects(recruiting);
    setNotRecruitingProjects(notRecruiting);

    if (recruiting.length !== 0) {
      if (recruiting.length >= 9)
        setRandomRecruitingProjects(getRandomElements(recruiting, 9));
      else
        setRandomRecruitingProjects(
          getRandomElements(recruiting, recruiting.length)
        );
    }

    if (notRecruiting.length !== 0) {
      if (notRecruiting.length >= 9)
        setRandomNotRecruitingProjects(getRandomElements(notRecruiting, 9));
      else
        setRandomNotRecruitingProjects(
          getRandomElements(notRecruiting, notRecruiting.length)
        );
    }
  }, [projectList]);

  // 아래의 요소들은 created_at, recruitment_number, team_description, team_index, team_introduction, team_leader,
  // team_name, team_recruting, team_views, updated_at로 구성됨.
  return (
    <div className={styles.ProjectBox}>
      {recruitmentBtnActive ? (
        randomRecruitingProjects.length === 0 ? (
          <div className="text-white font-bold text-2xl">
            조건에 맞는 프로젝트가 없습니다!
          </div>
        ) : (
          randomRecruitingProjects.map((item) => (
            <ProjectBox
              projectName={item.team_name}
              isRecruiting={true}
              key={item.team_index}
              recruitmentNumber={item.recruitment_number}
              views={item.team_views}
              introduction={item.team_introduction}
              teamIndex={item.team_index}
              numOfMembers={item.recruitment_number}
              skills={item.skills}
            />
          ))
        )
      ) : randomNotRecruitingProjects.length === 0 ? (
        <div className="text-white font-bold text-2xl">
          조건에 맞는 프로젝트가 없습니다!
        </div>
      ) : (
        randomNotRecruitingProjects.map((item) => (
          <ProjectBox
            projectName={item.team_name}
            isRecruiting={false}
            key={item.team_index}
            recruitmentNumber={item.recruitment_number}
            views={item.team_views}
            introduction={item.team_introduction}
            teamIndex={item.team_index}
            numOfMembers={item.recruitment_number}
            skills={item.skills}
          />
        ))
      )}
    </div>
  );
}
