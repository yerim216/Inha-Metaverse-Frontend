import React, { useContext, useEffect, useRef, useState } from "react";
import Story from "./Story";
import styles from "../styles/Stories.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import CommentSection from "./CommentSection";
import { getStories } from "../APIs/story";
import { getUserInfo } from "../APIs/userinfo";

export default function Stories() {
  const [storyDatabases, setStoryDatabases] = useState();
  // console.log(storyDatabases);

  const [moreBtnActivated, setMoreBtnActivated] = useState(false);
  const [selectedStoryDb, setSelectedStoryDb] = useState();
  const [comment, setComment] = useState();

  // 자세히보기 버튼을 누르면 일어나는 함수
  function handleMoreBtnClick(selectedStoryDb) {
    setMoreBtnActivated(true);
    setSelectedStoryDb(selectedStoryDb);
  }

  const forHidden = useRef();

  useEffect(() => {
    getStories().then((res) => {
      setStoryDatabases(res.data);
    });
  }, []);

  useEffect(() => {
    if (moreBtnActivated === true) {
      setTimeout(() => {
        forHidden.current.style.opacity = 1;
      }, 700);
    }
  }, [moreBtnActivated]);

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  const [userImgIdx, setuserImgIdx] = useState();

  useEffect(() => {
    if (!selectedStoryDb) return;
    getUserInfo(selectedStoryDb.user_index).then((res) => {
      setuserImgIdx(res.data[0].user_img_index);
    });
  }, [selectedStoryDb]);

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
    <div
      style={{
        display: "flex",
        marginTop: "40px",
        color: tm.mainTextColor,
      }}
    >
      <div
        className={`${styles.storiesContainer_ScrollHider} ${
          moreBtnActivated && styles.halfStoriesContainer_ScrollHider
        }`}
      >
        <section className={`${styles.storiesContainer}`}>
          {storyDatabases &&
            storyDatabases.map((storyDb, idx) => (
              <Story
                storyDb={storyDb}
                handleMoreBtnClick={handleMoreBtnClick}
                moreBtnActivated={moreBtnActivated}
                key={idx}
              />
            ))}
        </section>
      </div>
      <section
        className={`${styles.rightContainer} ${
          moreBtnActivated && styles.rightContainerVisible
        }`}
      >
        <div
          className={`${styles.bigStory}`}
          style={{
            backgroundColor: tm.storyBg,
          }}
        >
          <div className="w-full h-full px-10 py-8">
            <div
              className="w-full h-full flex flex-col justify-between transition-all opacity-0 duration-500"
              ref={forHidden}
            >
              <div>
                <div className={styles.header}>
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
                      }}
                    >
                      {selectedStoryDb && selectedStoryDb.user_name}
                    </h1>
                    <span
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {selectedStoryDb &&
                      selectedStoryDb.field_category &&
                      selectedStoryDb.field_title
                        ? selectedStoryDb.field_category +
                          "/" +
                          selectedStoryDb.field_title
                        : "직무 없음"}
                    </span>
                  </div>
                  <div className={styles.rightHeader}>
                    {selectedStoryDb &&
                      getDateDifference(selectedStoryDb.created_at) + " 전"}
                  </div>
                </div>
                <div className={styles.title}>
                  {selectedStoryDb && selectedStoryDb.story_title}
                </div>
                <p className={`${styles.content}`}>
                  {selectedStoryDb && selectedStoryDb.story_content}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CommentSection
          storyIdx={selectedStoryDb && selectedStoryDb.story_index}
        />
      </section>
    </div>
  );
}
