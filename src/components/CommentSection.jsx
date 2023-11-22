import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import styles from "../styles/modules/CommentSection.module.css";

export default function CommentSection() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  // 최신 / 추천 필터. 0 => 최신순, 1 => 추천순
  const [filter, setFilter] = useState(0);

  // 작성할 댓글 내용
  const [commentInput, setCommentInput] = useState("");

  return (
    <section
      className="w-11/12 h-1/2 pt-4 flex flex-col px-6 pb-4"
      style={{
        backgroundColor: tm.storyCommentSection,
      }}
    >
      {/* 최신 / 추천 선택 버튼 */}
      <div className="flex gap-4 cursor-pointer">
        <button
          className="flex gap-3 items-center"
          onClick={() => {
            setFilter(0);
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: filter === 0 ? tm.accentColor : "#E1ECF6",
            }}
          ></div>
          <span>최신순</span>
        </button>
        <button
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => {
            setFilter(1);
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: filter === 1 ? tm.accentColor : "#E1ECF6",
            }}
          ></div>
          <span>추천순</span>
        </button>
      </div>
      {/* 댓글 입력란 */}
      <div
        className="w-full h-[90px] mt-4 rounded-xl border flex justify-around items-center"
        style={{
          backgroundColor: tm.storyCommentTextAreaBg,
          borderColor: "#B0B0B0",
        }}
      >
        <textarea
          className="resize-none outline-none w-4/5 h-4/5 bg-transparent"
          placeholder="댓글을 입력해주세요."
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
        ></textarea>
        <button className="cursor-pointer transition-all hover:scale-105">
          <img src="/public_assets/icons/accentBtn.svg" alt="accentBtn" />
        </button>
      </div>
      {/* 댓글 란 */}
      <section
        className={`flex-grow overflow-auto mt-4 ${styles.commentsArea}`}
      >
        {/* 댓글 */}
      </section>
    </section>
  );
}
