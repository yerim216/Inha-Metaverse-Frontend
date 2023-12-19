import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import styles from "../styles/modules/CommentSection.module.css";
import {
  getStoryCommentsInRecent,
  getStoryCommentsInThumb,
  writeComment,
} from "../APIs/story";

export default function CommentSection({ storyIdx }) {
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
  const resetCommentInput = () => {
    setCommentInput("");
  };

  const [comments, setComments] = useState();
  const getComments = () => {
    if (filter === 0)
      getStoryCommentsInRecent(storyIdx)
        .then((res) => {
          // 코멘트가 없으면 빈 배열이 아닌 빈 객체를 준다..? 일단은 우리 쪽에서 예외처리 해 주었음.
          if (Object.keys(res.data).length === 0) setComments([]);
          else setComments(res.data);
        })
        .catch((err) => console.error(err));
    else
      getStoryCommentsInThumb(storyIdx)
        .then((res) => {
          // 코멘트가 없으면 빈 배열이 아닌 빈 객체를 준다..? 일단은 우리 쪽에서 예외처리 해 주었음.
          if (Object.keys(res.data).length === 0) setComments([]);
          else setComments(res.data);
        })
        .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (!storyIdx) return;

    getComments();
  }, [storyIdx, filter]);

  useEffect(() => {
    if (!storyIdx) return;

    resetCommentInput();
  }, [storyIdx]);

  const getDateDifference = (dateString) => {
    // 주어진 날짜를 Date 객체로 변환
    const givenDate = new Date(dateString);

    // 현재 날짜를 가져오기
    const currentDate = new Date();

    // 날짜 차이 계산 (밀리초 단위)
    const timeDifference = currentDate - givenDate;

    // 밀리초를 시간으로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
    const minutesDifference = timeDifference / (60 * 1000);

    if (Math.floor(minutesDifference) + 1 < 60)
      return Math.floor(minutesDifference) + 1 + "분";

    if (Math.floor(minutesDifference) + 1 < 24 * 60)
      return Math.floor(minutesDifference / 60) + 1 + "시간";

    return Math.floor(minutesDifference / (24 * 60)) + 1 + "일";
  };

  const [userIndex, setUserIndex] = useState();
  useEffect(() => {
    let userIndex;

    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    userIndex = JSON.parse(localStorage.getItem("recoil-persist")).userState
      .user_index;

    setUserIndex(userIndex);
  }, []);

  const handleWriteComment = () => {
    writeComment({ storyIdx, userIdx: userIndex, content: commentInput })
      .then((res) => {
        // 다시 데이터 불러오고, 입력값 초기화하기
        resetCommentInput();
        getComments();
      })
      .catch((err) => console.error(err));
  };

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
        className="w-full min-h-[90px] mt-4 rounded-xl border flex justify-around items-center box-content mb-4"
        style={{
          backgroundColor: tm.storyCommentTextAreaBg,
          borderColor: "#B0B0B0",
        }}
      >
        <textarea
          className="resize-none outline-none w-4/5 h-4/5 bg-transparent"
          placeholder="댓글을 입력해주세요(최대 150자)."
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
          maxLength={150}
        ></textarea>
        <button
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => {
            if (!userIndex) {
              alert("댓글을 작성하시려면 먼저 로그인 해 주세요!");
              return;
            }
            if (commentInput.trim() === "") {
              alert("댓글을 작성해 주세요!");
              return;
            }

            handleWriteComment();
          }}
        >
          <img src="/public_assets/icons/accentBtn.svg" alt="accentBtn" />
        </button>
      </div>
      {/* 댓글 란 */}
      <section className={`flex-grow overflow-auto ${styles.commentsArea}`}>
        {/* 댓글 */}
        {comments &&
          comments.map((comment, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-[150px] pb-4 px-5 border-b border-[#B4B4B4] relative mb-4"
              >
                <div className="w-full flex items-center gap-4">
                  <img
                    src={`public_assets/profileImg/profileImg_${comment.user_img_index}.png`}
                    alt={`Skill Image ${comment.user_index}`}
                    className="w-12 h-12 rounded-full"
                  />
                  <h1
                    style={{
                      fontSize: "26px",
                      fontWeight: 500,
                      color: tm.mainTextColor,
                    }}
                  >
                    {comment && comment.user_name}
                  </h1>
                  <span
                    className="-ml-2"
                    style={{
                      fontSize: "10px",
                      color: tm.mainTextColor,
                    }}
                  >
                    {comment && comment.field_category && comment.field_title
                      ? comment.field_category + "/" + comment.field_title
                      : "직무 없음"}
                  </span>
                  <span
                    className="absolute text-xs right-4 top-5"
                    style={{
                      color: tm.mainTextColor,
                    }}
                  >
                    {comment && getDateDifference(comment.created_at) + " 전"}
                  </span>
                </div>
                {/* 코멘트 창 */}
                <div
                  className="w-full h-[60px] mt-1 flex items-center"
                  style={{
                    lineHeight: "130%",
                  }}
                >
                  {comment && comment.story_content}
                </div>
                <button className="absolute bottom-2 left-5 flex items-center font-medium text-[#7C7C7C] gap-[6px] hover:scale-105">
                  <img
                    src={`public_assets/icons/goodBtn_${themeMode}.svg`}
                    alt="goodBtn"
                  />
                  <span className="relative top-[1px]">
                    {comment && comment.reply_thumb}
                  </span>
                </button>
                <button
                  className="absolute bottom-2 right-5 underline text-sm hover:scale-105"
                  style={{
                    color: tm.hazyTextColor,
                  }}
                  onClick={() => {
                    alert(
                      "대댓글 기능은 현재 준비중입니다. 조금만 기다려 주세요!"
                    );
                  }}
                >
                  댓글 남기기
                </button>
              </div>
            );
          })}
      </section>
    </section>
  );
}
