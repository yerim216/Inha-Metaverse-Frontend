import React, { useEffect, useState } from "react";

// 순서대로 노랭, 초록, 보라돌이, 핑크
const colors = ["#FDFFAD", "#D1FFAD", "#B8ADFF", "#FDADFF"];

export default function Sticker({
  stickerNoteInfo: {
    note_index,
    team_index,
    team_name,
    note_content,
    note_writer,
    user_name,
    note_size,
    note_color,
    note_x,
    note_y,
    created_at,
    last_update,
    idx,
  },
  // 차례로 idx, 변경할 데이터 이름, 변경될 데이터 순으로 인자 넘겨주면 됨.
  // 위치, 사이즈, 색상, 콘텐츠 변경 시에 해당함수 호출해주면 됨.
  // 사이즈만 남았다!
  handleClonedStickerNoteInfosChange,
  zIndexIncrement,
}) {
  // "note_index": 10,
  // "team_index": 3,
  // "team_name": "거북이키우기",
  // "note_content": "테스트데이터",
  // "note_writer": 1,
  // "user_name": "test1",
  // "note_size": null,
  // "note_color": "#FDFFAD",
  // "note_x": null,
  // "note_y": null,
  // "created_at": "2023-08-26T10:38:38.000Z",
  // "last_update": null

  const [stickyNoteRef, setStickyNoteRef] = useState();
  const [textareaRef, setTextareaRef] = useState();
  const [nextColorViewerRef, setNextColorViewerRef] = useState();

  const [allowMove, setAllowMove] = useState(false);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  const [input, setInput] = useState(note_content);
  const [showTextarea, setShowTextarea] = useState(false);

  const [nextColorIdx, setNextColorIdx] = useState(0);
  const rgbToHex = () => {
    const matches = stickyNoteRef.style.backgroundColor.match(/\d+/g);
    const r = parseInt(matches[0]);
    const g = parseInt(matches[1]);
    const b = parseInt(matches[2]);
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
  };
  const getNextColorIdx = () => {
    const idx = colors.findIndex((colorCode) => colorCode === rgbToHex());

    if (idx + 1 === colors.length) setNextColorIdx(0);
    else {
      setNextColorIdx(idx + 1);
    }
  };
  const handleColorChange = () => {
    stickyNoteRef.style.backgroundColor = colors[nextColorIdx];
    handleClonedStickerNoteInfosChange(idx, "note_color", colors[nextColorIdx]);

    if (nextColorIdx + 1 === colors.length) setNextColorIdx(0);
    else setNextColorIdx(nextColorIdx + 1);
  };

  useEffect(() => {
    if (nextColorViewerRef) {
      nextColorViewerRef.style.backgroundColor = colors[nextColorIdx];
    }
  }, [nextColorIdx]);

  const handleMouseDown = (e) => {
    setAllowMove(true);
    stickyNoteRef.style.zIndex += zIndexIncrement;
    const dimensions = stickyNoteRef.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  };
  const handleMouseUp = () => {
    setAllowMove(false);
  };
  const handleMouseMove = (e) => {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.style.left = x + "px";
      stickyNoteRef.style.top = y + "px";
      handleClonedStickerNoteInfosChange(idx, "note_x", x);
      handleClonedStickerNoteInfosChange(idx, "note_y", y);
    }
  };

  useEffect(() => {
    setStickyNoteRef(document.querySelector(".stickyNote_" + note_index));
    setTextareaRef(document.querySelector(".textarea_" + note_index));
    setNextColorViewerRef(
      document.querySelector(".nextColorViewer_" + note_index)
    );
  }, []);

  useEffect(() => {
    if (!stickyNoteRef) return;
    if (!textareaRef) return;

    if (note_x) stickyNoteRef.style.left = note_x + "px";
    if (note_y) stickyNoteRef.style.top = note_y + "px";
    if (note_size) {
      stickyNoteRef.style.width = note_size + "px";
      stickyNoteRef.style.height = note_size + "px";
    }
    if (note_color) {
      stickyNoteRef.style.backgroundColor = note_color;
    }
    getNextColorIdx();
    stickyNoteRef.style.zIndex = idx;
  }, [stickyNoteRef, textareaRef]);

  return (
    <div
      className={`w-64 h-64 bg-[#FDFFAD] text-black rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-3xl absolute top-1/4 left-1/4 overflow-hidden resize pb-12 border border-black ${
        "stickyNote_" + note_index
      }`}
    >
      <header
        className="w-full h-6 bg-[rgba(0,0,0,0.25)] cursor-move"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div
          onClick={() => {
            handleColorChange();
          }}
          className={`w-4 h-4 rounded-full absolute left-1 top-1 bg-[#FDFFAD] cursor-pointer ${
            "nextColorViewer_" + note_index
          }`}
        ></div>
      </header>
      <div
        className={`p-2 w-full ${showTextarea ? "hidden" : "block"}`}
        onDoubleClick={() => {
          setShowTextarea(true);
          textareaRef &&
            setTimeout(() => {
              textareaRef.focus();
              textareaRef.selectionStart = textareaRef.value.length; // 커서 위치를 끝으로 이동
            }, 100);
        }}
      >
        {note_content}
      </div>
      <textarea
        type="text"
        className={`p-2 bg-transparent outline-none w-full h-5/6 resize-none ${
          "textarea_" + note_index
        } ${showTextarea ? "block" : "hidden"}`}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleClonedStickerNoteInfosChange(
            idx,
            "note_content",
            e.target.value
          );
        }}
      />
      <div className="absolute bottom-0 font-bold text-xs p-2">
        <div>{note_writer}(작성자 인덱스 - 수정필요)</div>
        <div>{new Date(created_at).toLocaleString()}</div>
      </div>
    </div>
  );
}
