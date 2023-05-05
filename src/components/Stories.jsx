import React, { useEffect, useRef, useState } from "react";
import Story from "./Story";
import styles from "../styles/Stories.module.css";

export default function Stories() {
  const [storyDatabases, setStoryDatabases] = useState();
  const [moreBtnActivated, setMoreBtnActivated] = useState(false);
  const [selectedStoryDb, setSelectedStoryDb] = useState();
  const [comment, setComment] = useState();
  function handleMoreBtnClick(selectedStoryDb) {
    setMoreBtnActivated(true);
    setSelectedStoryDb(selectedStoryDb);
  }

  const forHidden = useRef();
  // forHidden을 처음에는 숨겼다가, 0.7초가 지나면 바로 보여 주기.

  useEffect(() => {
    setStoryDatabases([
      {
        profileName: "Cherry",
        part: "영업 / 마케팅",
        title: "사이드 프로젝트 찾습니다! 1",
        content:
          "안녕하세요~ 어제 가입했는데 제 본캐는 대학생입니다. 영업과 마케팅이 주특기입니다. 다양한 백그라운드를 가진분들과 재밌는 사이드 프로젝트를 하고 싶습니다 :) 잘 부탁드려요!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dicta repudiandae doloremque quo, voluptate est non harum minus veritatis officia cumque fuga voluptas placeat voluptatum ipsum animi nobis, alias sint!",
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

  return (
    <div style={{ display: "flex", marginTop: "40px" }}>
      <div
        className={`${styles.storiesContainer_ScrollHider} ${
          moreBtnActivated && styles.halfStoriesContainer_ScrollHider
        }`}
      >
        <section className={`${styles.storiesContainer}`}>
          {storyDatabases &&
            storyDatabases.map((storyDb) => (
              <Story
                storyDb={storyDb}
                handleMoreBtnClick={handleMoreBtnClick}
                moreBtnActivated={moreBtnActivated}
              />
            ))}
        </section>
      </div>
      <section
        className={`${styles.rightContainer} ${
          moreBtnActivated && styles.rightContainerVisible
        }`}
      >
        <div className={`${styles.bigStory}`}>
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
                        color: "white",
                      }}
                    >
                      {selectedStoryDb && selectedStoryDb.profileName}
                    </h1>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "rgb(112, 144, 176)",
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
                <p className={`text-white`}>
                  {selectedStoryDb && selectedStoryDb.content}
                </p>
              </div>
              <div className={styles.commentTopBorder}>
                <div className={styles.comment}>
                  <textarea
                    type="text"
                    value={comment}
                    placeholder="댓글을 입력해주세요."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    maxLength={200}
                    className={`w-full h-28 overflow-hidden resize-none ${styles.input}`}
                  />
                  <div className="flex justify-between relative bottom-3">
                    <span>{comment ? comment.length : "0"}/200</span>
                    <div className={styles.symbolContainer}>
                      <img src="/public_assets/symbol.png" alt="symbol" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
