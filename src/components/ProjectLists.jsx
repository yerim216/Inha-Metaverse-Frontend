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

  // 아래의 요소들은 index, name, introduction, description, recruitment_number, recruiting, created_at, updated_at, views로 구성됨.
  const [randomRecruitingProjects, setRandomRecruitingProjects] = useState([]);
  const [randomNotRecruitingProjects, setRandomNotRecruitingProjects] =
    useState([]);

  useEffect(() => {
    getTeams().then((res) => {
      console.log(res.data);
      // setProjectList(res.data);
    });
  }, []);

  useEffect(() => {
    const recruiting = [];
    const notRecruiting = [];

    projectList.forEach((project) => {
      if (project.recruiting === true) {
        recruiting.push(project);
      } else {
        notRecruiting.push(project);
      }
    });

    setRecruitingProjects(recruiting);
    setNotRecruitingProjects(notRecruiting);

    if (recruiting.length !== 0) {
      setRandomRecruitingProjects(getRandomElements(recruiting, 9));
    }

    if (notRecruiting.length !== 0) {
      setRandomNotRecruitingProjects(getRandomElements(notRecruiting, 9));
    }
  }, [projectList]);

  // 아래의 요소들은 index, name, introduction, description, recruitment_number, recruiting, created_at, updated_at, views로 구성됨.
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
              projectName={item.name}
              isRecruiting={true}
              key={item.id}
              recruitmentNumber={item.recruitment_number}
              views={item.views}
              introduction={item.introduction}
              teamIndex={item.index}
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
            projectName={item.name}
            isRecruiting={false}
            key={item.id}
            recruitmentNumber={item.recruitment_number}
            views={item.views}
            introduction={item.introduction}
          />
        ))
      )}
    </div>
  );
}
