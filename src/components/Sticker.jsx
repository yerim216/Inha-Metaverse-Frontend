import React, { useEffect, useState } from "react";
import { useDrag } from "react-use-gesture";

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
    note_color,
    note_x,
    note_y,
    created_at,
    last_update,
    idx,
    size_x,
    size_y,
  },
  handleClonedStickerNoteInfosChange,
  addZIndex,
  zIndexList,
}) {
  const [stickyNoteRef, setStickyNoteRef] = useState();
  const [textareaRef, setTextareaRef] = useState();
  const [nextColorViewerRef, setNextColorViewerRef] = useState();

  const [relativeMouse, setRelativeMouse] = useState({ x: 0, y: 0 });

  // useDrag 사용
  const bindStickerPos = useDrag((params) => {
    const x = params.offset[0] + relativeMouse.x;
    const y = params.offset[1] + relativeMouse.y;
    setStickerPos({
      x: x,
      y: y,
    });
    handleClonedStickerNoteInfosChange(idx, "note_x", x);
    handleClonedStickerNoteInfosChange(idx, "note_y", y);
  });
  const [stickerPos, setStickerPos] = useState({
    x: 0,
    y: 0,
  });

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

    if (note_x && note_y) {
      stickyNoteRef.style.left = note_x + "px";
      stickyNoteRef.style.top = note_y + "px";
      setRelativeMouse({ x: note_x, y: note_y });
    }
    if (size_x) {
      stickyNoteRef.style.width = size_x + "px";
    }
    if (size_y) {
      stickyNoteRef.style.height = size_y + "px";
    }
    if (note_color) {
      stickyNoteRef.style.backgroundColor = note_color;
    }
    getNextColorIdx();
  }, [stickyNoteRef, textareaRef]);

  return (
    <div
      className={`w-64 h-64 bg-[#FDFFAD] text-black rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-3xl absolute top-1/4 left-1/4 overflow-hidden resize pb-12 border border-black ${
        "stickyNote_" + note_index
      }`}
      style={{
        left: stickerPos.x,
        top: stickerPos.y,
        zIndex: zIndexList[idx],
      }}
      onMouseDown={() => {
        addZIndex(idx);
      }}
    >
      <header
        className="w-full h-6 bg-[rgba(0,0,0,0.25)] cursor-move"
        {...bindStickerPos()}
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
        <div>{user_name}</div>
        <div>{new Date(created_at).toLocaleString()}</div>
      </div>
    </div>
  );
}
