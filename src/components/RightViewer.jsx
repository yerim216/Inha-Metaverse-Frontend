import React from "react";
import RightViewerContent_Main from "./RightViewerContent_Main";
import RightViewerContent_StickerNote from "./RightViewerContent_StickerNote";

export default function RightViewer({
  activated,
  handleInputChange,
  handleUploadBtn,
  input,
}) {
  return (
    <div className="xl:w-80 2xl:w-96 h-full absolute top-0 right-0 pt-[60px] z-20">
      <section
        className="w-full h-full rounded-tl-3xl rounded-bl-3xl bg-[#1C1D1E] overflow-hidden"
        style={{
          boxShadow: "0px 10px 20px 0px rgba(255, 255, 255, 0.20)",
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
