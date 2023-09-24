import React from "react";

export default function RightViewerContent_StickerNote({
  handleInputChange,
  handleUploadBtn,
  input,
}) {
  return (
    <section className="w-full h-full gap-3 flex flex-col p-8 items-end justify-between">
      <textarea
        className="w-full resize-none outline-none h-full bg-[#323232] border border-[#7C7C7C] p-3 text-white relative"
        placeholder="노트 작성..."
        style={{
          background: "#323232",
        }}
        value={input.content}
        onChange={(e) => {
          handleInputChange(e);
        }}
      ></textarea>
      <button
        className="w-20 h-10 rounded-md bg-[#7090B0] px-2 hover:brightness-110 text-white"
        onClick={(e) => {
          handleUploadBtn(e);
        }}
      >
        노트 등록
      </button>
    </section>
  );
}
