import React, { useContext, useEffect, useState } from "react";
import ProjectBox from "./ProjectBox";
import styles from "../styles/ProjectLists.module.css";
import {
  getPageCount,
  getPageCountWithFilter,
  getTeams,
  getTeamsInPagination,
  getTeamsWithFilter,
} from "../APIs/team";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function ProjectLists({
  recruitmentBtnActive,
  filterMode,
  selectedIndices,
}) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  // pageNation을 위한, 총 페이지 개수 알려주는 state.
  const [pageCount, setPageCount] = useState(0);

  // pageNation 상에서, 현재 페이지가 몇인가에 대해 알려주는 state. useEffect를 이용해, 이 state가 변경될 때마다 프로젝트 리스트 페이지네이션 API를 호출해 준다.
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 프로젝트 리스트, 최대 12개.
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (filterMode === false) {
      getPageCount().then((res) => {
        setPageCount(res.data.lastpage);
      });
      setCurrentPage(1);
    } else {
      console.log("필터링 ON");
      getPageCountWithFilter(selectedIndices).then((res) => {
        setPageCount(res.data.lastpage);
      });
      setCurrentPage(1);
    }
  }, [filterMode, selectedIndices]);

  // 필터모드에 따라 페이지네이션 구현
  useEffect(() => {
    if (filterMode === true) {
      setProjectList([]);
      getTeamsWithFilter(currentPage, selectedIndices).then((res) => {
        setProjectList(res.data);
      });
    } else {
      getTeamsInPagination(currentPage).then((res) => {
        setProjectList(res.data);
      });
    }
  }, [currentPage, filterMode, selectedIndices]);

  // 임시 데이터 : 현재는 모집중이지 않은 프로젝트 리스트는 별도로 없어, 초기값만 제공해 주었음.
  const [randomNotRecruitingProjects, setRandomNotRecruitingProjects] =
    useState([]);

  return (
    <div className="w-full">
      <div className={styles.ProjectBox}>
        {recruitmentBtnActive ? (
          projectList.length === 0 ? (
            <div className="text-white font-bold text-2xl">
              조건에 맞는 프로젝트가 없습니다!
            </div>
          ) : (
            projectList.map((item) => (
              <ProjectBox
                projectName={item.team_name}
                isRecruiting={true}
                key={item.team_index}
                views={item.team_views}
                introduction={item.team_introduction}
                teamIndex={item.team_index}
                numOfMembers={item.team_member_count}
                skills={item.team_skills}
                categories={item.team_category}
                jobs={item.team_jobs}
              />
            ))
          )
        ) : randomNotRecruitingProjects.length === 0 ? (
          <div
            className="font-bold text-2xl"
            style={{
              color: tm.mainTextColor,
            }}
          >
            조건에 맞는 프로젝트가 없습니다!
          </div>
        ) : (
          randomNotRecruitingProjects.map((item) => (
            <ProjectBox
              projectName={item.team_name}
              isRecruiting={false}
              key={item.team_index}
              views={item.team_views}
              introduction={item.team_introduction}
              teamIndex={item.team_index}
              numOfMembers={item.team_member_count}
              skills={item.skills}
              categories={item.team_category}
              jobs={item.team_jobs}
            />
          ))
        )}
      </div>
      <div className="flex w-full mt-16 justify-center">
        <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
          <Pagination count={pageCount} onChange={handlePageChange} />
        </ThemeProvider>
      </div>
    </div>
  );
}
