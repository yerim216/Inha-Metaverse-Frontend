import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import styles from "../styles/modules/StickerNote.module.css";
import Sticker from "./Sticker";
import {
  createStickerMemo,
  deleteSticker,
  getStickers,
  modifySticker,
} from "../APIs/stickerNote";
import RightViewer from "./RightViewer";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

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

  // zIndex를 통해 스티커 노트들의 우선순위 결정.
  const [zIndexList, setZIndexList] = useState();
  const addZIndex = (idx) => {
    const maxZIndex = Math.max(...zIndexList);
    if (maxZIndex !== zIndexList[idx]) {
      let newArr = zIndexList;
      const toAdd = maxZIndex - zIndexList[idx];
      newArr[idx] += toAdd + 1;
      setZIndexList([...newArr]);
    }
  };

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
    if (clonedStickerNoteInfos.length === 0) return;

    const handleSaveShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        // 운영체제 플랫폼 확인
        const isMac = navigator.platform.toUpperCase().includes("MAC");

        // 맥 플랫폼의 경우 Command 키 감지, 윈도우 플랫폼의 경우 Ctrl 키 감지
        if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
          handleModifyStickerMemo();
        }
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [clonedStickerNoteInfos]);

  useEffect(() => {
    let newArr = stickerNoteInfos;
    setClonedStickerNoteInfos(newArr);
    if (stickerNoteInfos.length !== 0) {
      const arr = [];
      for (let i = 0; i < stickerNoteInfos.length; i++) {
        arr.push(i);
      }
      setZIndexList(arr);
    }
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
    modifySticker(clonedStickerNoteInfos)
      .then((res) => {
        alert("변경사항이 성공적으로 저장되었습니다!");
        getDataBase();
      })
      .catch((err) => {
        console.error(err);
      });
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
      : 120;
    const y = clonedStickerNoteInfos[clonedStickerNoteInfos.length - 1]
      ? clonedStickerNoteInfos[clonedStickerNoteInfos.length - 1].note_y + 50
      : 220;
    createStickerMemo({
      teamIndex: teamIndex,
      content: input.content,
      writerIndex: userIndex,
      x: x,
      y: y,
      size_x: 300,
      size_y: 300,
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

  const deleteStickerNote = (note_index) => {
    const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteSticker(note_index)
        .then((res) => {
          alert("성공적으로 삭제되었습니다!");
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  const handleInputChange = (e) => {
    setInput({ ...input, content: e.target.value });
  };
  const handleUploadBtn = (e) => {
    e.preventDefault();
    if (input.content.trim() === "") {
      alert("내용을 작성해 주세요!");
      return;
    }
    addStickerNote();
  };

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.projectManager);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.projectManager);
    else setTm(theme.darkTheme.projectManager);
  }, [themeMode]);

  return (
    <div className="w-full h-full p-4 xl:pr-80 2xl:pr-96">
      <RightViewer
        activated={"stickerNote"}
        handleInputChange={handleInputChange}
        handleUploadBtn={handleUploadBtn}
        input={input}
      />
      <section
        className={`${styles.bg} area`}
        style={{
          backgroundColor: tm.stickerNoteArea,
        }}
      >
        <form className="ml-[3%] mt-[3%] flex flex-col w-[400px] gap-3 items-end"></form>
        {stickerNoteInfos &&
          clonedStickerNoteInfos.map((stickerNoteInfo, idx) => {
            // setClonedStickerNoteInfos를 통해 정보 변경 역시 가능해야 함.
            // idx를 이용해, 특정 Sticker에서 값의 변동이 일어났다면 clonedStickerNoteInfos 변경.
            // 클릭 시, zIndex를 증가시키는 함수 호출.
            // 로직 : 눌렀을 때, 본인과 나머지 요소들의 zIndex를 비교하여 자신이 제일 크다면 증가 X, 아니라면 증가.
            return (
              <Sticker
                key={idx}
                stickerNoteInfo={{ ...stickerNoteInfo, idx }}
                handleClonedStickerNoteInfosChange={
                  handleClonedStickerNoteInfosChange
                }
                zIndexIncrement={clonedStickerNoteInfos.length}
                addZIndex={addZIndex}
                zIndexList={zIndexList}
                deleteStickerNote={deleteStickerNote}
              />
            );
          })}
      </section>
    </div>
  );
}
