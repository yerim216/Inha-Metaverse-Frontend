import React, { useEffect, useState } from "react";
import { Outlet, Route, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/modules/ProjectManagerTools.module.css";

export default function ProjectManagerTools() {
  // 버튼 따라 현재 활성화된 프로젝트 관리 툴 실행 : 현재는 투두(board), 캘린더 존재
  const [activated, setActivated] = useState("board");
  const navigate = useNavigate();

  const [teamIndex, setTeamIndex] = useState();
  useEffect(() => {
    setTeamIndex(location.state.teamIndex);
  }, []);

  const location = useLocation();
  return (
    <>
      <div
        style={{
          paddingTop: "60px",
          paddingLeft: "60px",
          width: "100%",
          height: "100%",
        }}
      >
        {console.log("projectmanagertools" + teamIndex)}
        <Outlet context={{ teamIndex }} />
      </div>
      <div
        style={{
          backgroundColor: "#2D2D2D",
          position: "absolute",
          left: "0px",
          height: "100%",
          width: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0px",
          zIndex: "1",
          borderRight: "1px solid #373737",
        }}
      >
        <div>
          {activated === "board" && (
            <img src="/public_assets/icons/board_rounded.svg" alt="board" />
          )}
          {activated === "calendar" && (
            <img
              src="/public_assets/icons/calendar_rounded.svg"
              alt="calendar"
            />
          )}
        </div>
        <div className="flex flex-col gap-14 items-center">
          <button
            className="transition-all hover:scale-125"
            onClick={() => {
              setActivated("board");
              navigate("board");
            }}
          >
            <img
              src="/public_assets/icons/board.svg"
              alt="board"
              className="w-5"
            />
          </button>
          <button
            className="transition-all hover:scale-125"
            onClick={() => {
              setActivated("calendar");
              navigate("calendar2");
            }}
          >
            <img
              src="/public_assets/icons/calendar.svg"
              alt="calender"
              className="w-7"
            />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <img src="/public_assets/icons/gear.svg" alt="gear" />
          <img src="/public_assets/icons/question.svg" alt="question" />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#2D2D2D",
          position: "absolute",
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #373737",
          paddingLeft: "60px",
        }}
      >
        <h5 className={styles.title}>
          {activated === "board" && "board"}
          {activated === "calendar" && "calendar"}
        </h5>
        <button
          className="text-white absolute right-8 cursor-pointer z-10"
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </button>
      </div>
    </>
  );
}
