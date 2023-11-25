import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Story.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import { getUserInfo } from "../APIs/userinfo";

export default function Story({
  storyDb: {
    user_name,
    part,
    story_title,
    story_content,
    created_at,
    story_thumb,
    story_view,
    user_index,
    story_index,
    field_category,
    field_title,
    reply_count,
  },
  handleMoreBtnClick,
}) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);
  const [userImgIdx, setuserImgIdx] = useState();

  useEffect(() => {
    getUserInfo(user_index).then((res) => {
      setuserImgIdx(res.data[0].user_img_index);
    });
  }, []);

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

  return (
    <div className="mb-10 mr-10">
      <div
        className="w-full h-80 px-14 py-8 relative"
        style={{
          backgroundColor: tm.storyBg,
          boxShadow: "0px 12px 20px rgba(112, 144, 176, 0.2)",
          borderRadius: "20px",
        }}
      >
        <div
          className={styles.header}
          style={{
            borderColor: tm.borderColor,
          }}
        >
          <div className={styles.leftHeader}>
            <img
              src={`/public_assets/profileImg/profileImg_${userImgIdx}.png`}
              alt="profile"
              className="w-14 rounded-full"
            />
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 500,
                color: tm.mainTextColor,
              }}
            >
              {user_name}
            </h1>
            <span
              className="-ml-2"
              style={{
                fontSize: "10px",
                color: tm.mainTextColor,
              }}
            >
              {field_category && field_title
                ? field_category + "/" + field_title
                : "직무 없음"}
            </span>
          </div>
          <div
            className={styles.rightHeader}
            style={{
              color: tm.mainTextColor,
            }}
          >
            {getDateDifference(created_at) + " 전"}
          </div>
        </div>
        <div
          className={styles.story_title}
          style={{
            color: tm.mainTextColor,
          }}
        >
          {story_title}
        </div>
        <p
          className={`line-clamp-4 ${styles.story_content}`}
          style={{
            color: tm.mainTextColor,
          }}
        >
          {story_content}
        </p>
        <div className="flex w-full justify-end absolute right-14 bottom-6">
          <button
            className={`${styles.more}`}
            onClick={() => {
              handleMoreBtnClick({
                user_name,
                part,
                story_title,
                story_content,
                created_at,
                story_thumb,
                user_index,
                story_index,
                field_category,
                field_title,
                story_view,
                reply_count,
              });
            }}
          >
            자세히보기
            <img
              src="/public_assets/icons/moreArrow_dark.svg"
              alt="moreArrow"
            />
          </button>
        </div>
        <div className="flex absolute left-14 bottom-6">
          <button className="flex items-center font-medium text-[#7C7C7C] gap-1 hover:scale-105">
            <img
              src={`public_assets/icons/goodBtn_${themeMode}.svg`}
              alt="goodBtn"
            />
            <span>{story_thumb}</span>
          </button>
          <button
            className="ml-3 flex items-center font-medium text-[#7C7C7C] gap-1 hover:scale-105"
            onClick={() => {
              handleMoreBtnClick({
                user_name,
                part,
                story_title,
                story_content,
                created_at,
                story_thumb,
                user_index,
                story_index,
                field_category,
                field_title,
                story_view,
                reply_count,
              });
            }}
          >
            <img
              src={`public_assets/icons/commentBtn_${themeMode}.svg`}
              alt="commentBtn"
            />
            {/* 추후에 코멘트 개수로 */}
            <span>{reply_count}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
