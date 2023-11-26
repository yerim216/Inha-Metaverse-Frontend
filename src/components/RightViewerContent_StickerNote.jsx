import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function RightViewerContent_StickerNote({
  handleInputChange,
  handleUploadBtn,
  input,
}) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

  return (
    <section className="w-full h-full gap-3 flex flex-col p-8 items-end justify-between">
      <textarea
        className="w-full resize-none outline-none h-full border border-[#7C7C7C] p-3 relative rounded-xl"
        placeholder="노트 작성..."
        style={{
          background: tm.stickerNoteAddArea,
          color: tm.mainTextColor,
        }}
        value={input.content}
        onChange={(e) => {
          handleInputChange(e);
        }}
      ></textarea>
      <button
        className="w-20 h-10 rounded-md px-2 hover:brightness-110"
        onClick={(e) => {
          handleUploadBtn(e);
        }}
        style={{
          backgroundColor: tm.accentColor,
          color: tm.accentBtnText,
        }}
      >
        노트 등록
      </button>
    </section>
  );
}
