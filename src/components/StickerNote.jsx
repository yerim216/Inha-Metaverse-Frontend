import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import styles from "../styles/modules/StickerNote.module.css";
import Sticker from "./Sticker";
import { createStickerMemo, getStickers } from "../APIs/stickerNote";

export default function StickerNote() {
  const { teamIndex } = useOutletContext();

  useEffect(() => {
    document.documentElement.classList.add("overflowHidden");
    return () => {
      document.documentElement.classList.remove("overflowHidden");
    };
  }, []);

  const [input, setInput] = useState({
    content: "",
  });
  const [userIndex, setUserIndex] = useState();
  // userIndex 불러오기
  useEffect(() => {
    let userIndex;

    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    userIndex = JSON.parse(localStorage.getItem("recoil-persist")).userState
      .user_index;

    setUserIndex(userIndex);
  }, []);

  const [stickerNoteInfos, setStickerNoteInfos] = useState([]);
  // 클라이언트 내에서 사이즈, 컨텐츠 등 state를 변경할 수 있기 때문에, 복제본을 만들어 두었음. 해당 복제본은 이후 수정 버튼이 눌릴 때 전송될 데이터.
  const [clonedStickerNoteInfos, setClonedStickerNoteInfos] = useState([]);

  useEffect(() => {
    let newArr = stickerNoteInfos;
    newArr.reverse();
    setClonedStickerNoteInfos(newArr);
  }, [stickerNoteInfos]);
  const handleClonedStickerNoteInfosChange = (
    idxToChange,
    dataNameToChange,
    dataToChange
  ) => {
    let newData = clonedStickerNoteInfos;
    newData[idxToChange][dataNameToChange] = dataToChange;

    setClonedStickerNoteInfos(newData);
  };

  const handleModifyStickerMemo = () => {
    console.log(clonedStickerNoteInfos);
  };

  // 스티커노트 db와 동기화하는 함수
  const getDataBase = () => {
    getStickers(teamIndex).then((res) => {
      setStickerNoteInfos(res.data);
    });
  };

  // 스티커노트 추가 함수
  const addStickerNote = () => {
    const x = clonedStickerNoteInfos[clonedStickerNoteInfos.length - 1]
      ? clonedStickerNoteInfos[clonedStickerNoteInfos.length - 1].note_x + 50
      : 600;
    const y = clonedStickerNoteInfos[clonedStickerNoteInfos.length - 1]
      ? clonedStickerNoteInfos[clonedStickerNoteInfos.length - 1].note_y + 50
      : 100;
    createStickerMemo({
      teamIndex: teamIndex,
      content: input.content,
      writerIndex: userIndex,
      x: x,
      y: y,
      size: 300,
      color: "#FDFFAD",
    })
      .then((res) => {
        setInput({ ...input, content: "" });
        getDataBase();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDataBase();
  }, []);

  return (
    <section className={styles.bg}>
      <form className="ml-[3%] mt-[3%] flex flex-col w-1/3 gap-3 items-end">
        <textarea
          className="w-full resize-none outline-none h-32 border p-3"
          placeholder="노트 작성..."
          style={{
            background: "#323232",
          }}
          value={input.content}
          onChange={(e) => {
            setInput({ ...input, content: e.target.value });
          }}
        ></textarea>
        <div className="flex gap-2">
          <button
            className="w-20 h-10 rounded-md bg-[#7090B0] px-2 hover:brightness-110"
            onClick={(e) => {
              e.preventDefault();
              handleModifyStickerMemo();
            }}
          >
            저장하기
          </button>
          <button
            className="w-20 h-10 rounded-md bg-[#7090B0] px-2 hover:brightness-110"
            onClick={(e) => {
              e.preventDefault();
              if (input.content.trim() === "") {
                alert("내용을 작성해 주세요!");
                return;
              }
              addStickerNote();
            }}
          >
            노트 등록
          </button>
        </div>
      </form>
      {stickerNoteInfos &&
        clonedStickerNoteInfos.map((stickerNoteInfo, idx) => {
          // setClonedStickerNoteInfos를 통해 정보 변경 역시 가능해야 함.
          // idx를 이용해, 특정 Sticker에서 값의 변동이 일어났다면 clonedStickerNoteInfos 변경.
          return (
            <Sticker
              key={idx}
              stickerNoteInfo={{ ...stickerNoteInfo, idx }}
              handleClonedStickerNoteInfosChange={
                handleClonedStickerNoteInfosChange
              }
              zIndexIncrement={clonedStickerNoteInfos.length}
            />
          );
        })}
    </section>
  );
}
