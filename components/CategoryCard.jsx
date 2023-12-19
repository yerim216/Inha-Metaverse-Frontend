import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import styles from "../styles/modules/CreateProject.module.css";
import "../styles/signInModal.css";

export default function CategoryCard({
  selectedJobInput,
  deleteSelectedJobInput,
}) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.createProject);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.createProject);
    else setTm(theme.darkTheme.createProject);
  }, [themeMode]);

  return (
    <div
      className={`w-full h-72 rounded-[20px] p-8 flex font-bold ${
        themeMode === "light" && styles.shadow
      } ${themeMode !== "light" && "border border-gray-500"}`}
      style={{
        backgroundColor: tm.categoryCard,
      }}
    >
      <div className="w-1/2 h-full flex flex-col justify-between pb-8">
        <div
          style={{
            padding: "7px 21px",
            color: tm.accentBtnText,
            backgroundColor: tm.accentColor,
          }}
          className="text-xl w-fit rounded-[30px]"
        >
          {selectedJobInput.category}
        </div>
        <h2
          className="text-[30px]"
          style={{
            color: tm.textColor,
          }}
        >
          {selectedJobInput.title}
        </h2>
        <div
          className="text-[18px]"
          style={{
            color: tm.recruitingNum,
          }}
        >
          {selectedJobInput.recruitmentNum}명 모집중
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col items-end justify-between ">
        <img
          src="/public_assets/icons/moreBtn.svg"
          alt="moreBtn"
          className="cursor-pointer hover:scale-105"
        />
        <div className="flex gap-4">
          {/* 일단 임시 삭제 조치 */}
          {/* <div
            style={{
              padding: "7px 21px",
              color: tm.btnText,
              backgroundColor: tm.modifyBtn,
            }}
            className="text-xl w-fit rounded-[30px] cursor-pointer hover:scale-105"
          >
            수정
          </div> */}
          <div
            style={{
              padding: "7px 21px",
              color: tm.btnText,
              backgroundColor: tm.modifyBtn,
            }}
            className="text-xl w-fit rounded-[30px] cursor-pointer hover:scale-105"
            onClick={() => {
              const confirm = window.confirm("정말 삭제하시겠습니까?");
              if (confirm) {
                deleteSelectedJobInput(selectedJobInput.title);
              }
            }}
          >
            삭제
          </div>
        </div>
      </div>
    </div>
  );
}
