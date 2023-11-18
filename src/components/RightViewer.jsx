import React, { useContext, useEffect, useState } from "react";
import RightViewerContent_Main from "./RightViewerContent_Main";
import RightViewerContent_StickerNote from "./RightViewerContent_StickerNote";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function RightViewer({
  activated,
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

  // 라이트모드이면서 메인화면일 경우 색상이 다름, 때문에 현재 메인화면인지에 대한 여부를 url을 이용하여 판단.
  // 현재는 메인화면 말고도, 임시로 board, myCalendar에도 동일한 해당 섹션을 표기하므로 임시로 추가 예외 처리.
  const isMain =
    window.location.href.includes("main") ||
    window.location.href.includes("board") ||
    window.location.href.includes("myCalendar");

  return (
    <div className="xl:w-80 2xl:w-96 h-full absolute top-0 right-0 pt-[60px] z-20">
      <section
        className="w-full h-full rounded-tl-3xl rounded-bl-3xl overflow-hidden"
        style={{
          boxShadow:
            themeMode === "light"
              ? "0px 7px 29px 0px rgba(100, 100, 111, 0.20)"
              : "0px 10px 20px 0px rgba(255, 255, 255, 0.20)",
          // 라이트모드이면서 메인화면일 경우 색상이 다름, 이 경우 예외 처리
          backgroundColor:
            themeMode === "light" && isMain ? "#FFF" : tm.rightSection,
        }}
      >
        {/* activated에 따라 보여줄 컨텐츠 변경 */}
        {activated === "main" && <RightViewerContent_Main />}
        {activated === "board" && <RightViewerContent_Main />}
        {/* {activated === "calendar" && <RightViewerContent_Main />} */}
        {activated === "stickerNote" && (
          <RightViewerContent_StickerNote
            handleInputChange={handleInputChange}
            handleUploadBtn={handleUploadBtn}
            input={input}
          />
        )}
      </section>
    </div>
  );
}
