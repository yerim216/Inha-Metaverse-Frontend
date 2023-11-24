import React, { useContext, useEffect, useRef, useState } from "react";
import Story from "./Story";
import styles from "../styles/Stories.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import CommentSection from "./CommentSection";

export default function Stories() {
  const [storyDatabases, setStoryDatabases] = useState();
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
    setStoryDatabases([
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 1",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다.  voluptas placeat voluptatum ipsum animi nobis, alias sint!",
        date: "23.01.16 14:28",
      },
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 2",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dicta repudiandae doloremque quo, voluptate est non harum minus veritatis officia cumque fuga voluptas placeat voluptatum ipsum animi nobis, alias sint!",
        date: "23.01.16 14:28",
      },
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 3",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dicta repudiandae doloremque quo, voluptate est non harum minus veritatis officia cumque fuga voluptas placeat voluptatum ipsum animi nobis, alias sint!",
        date: "23.01.16 14:28",
      },
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 4",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dicta repudiandae doloremque quo, voluptate est non harum minus veritatis officia cumque fuga voluptas placeat voluptatum ipsum animi nobis, alias sint!",
        date: "23.01.16 14:28",
      },
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 5",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dicta repudiandae doloremque quo, voluptate est non harum minus veritatis officia cumque fuga voluptas placeat voluptatum ipsum animi nobis, alias sint!",
        date: "23.01.16 14:28",
      },
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 6",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dicta repudiandae doloremque quo, voluptate est non harum minus veritatis officia cumque fuga voluptas placeat voluptatum ipsum animi nobis, alias sint!",
        date: "23.01.16 14:28",
      },
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 6",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!",
        date: "23.01.16 14:28",
      },
    ]);
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
                    <img src="/public_assets/profileImg.png" alt="profile" />
                    <h1
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      {selectedStoryDb && selectedStoryDb.profileName}
                    </h1>
                    <span
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {selectedStoryDb && selectedStoryDb.part}
                    </span>
                  </div>
                  <div className={styles.rightHeader}>
                    {selectedStoryDb && selectedStoryDb.date}
                  </div>
                </div>
                <div className={styles.title}>
                  {selectedStoryDb && selectedStoryDb.title}
                </div>
                <p className={`${styles.content}`}>
                  {selectedStoryDb && selectedStoryDb.content}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CommentSection />
      </section>
    </div>
  );
}
