import React from "react";
import styles from "../styles/Story.module.css";

export default function Story({
  storyDb: { profileName, part, title, content, date },
  handleMoreBtnClick,
}) {
  return (
    <div className="mb-10 pr-10">
      <div
        className="w-full h-80 px-14 py-8"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0px 12px 20px rgba(112, 144, 176, 0.2)",
          borderRadius: "20px",
        }}
      >
        <div className={styles.header}>
          <div className={styles.leftHeader}>
            <img src="/public_assets/profileImg.png" alt="profile" />
            <h1
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              {profileName}
            </h1>
            <span
              style={{
                fontSize: "10px",
                color: "rgb(112, 144, 176)",
              }}
            >
              {part}
            </span>
          </div>
          <div className={styles.rightHeader}>{date}</div>
        </div>
        <div className={styles.title}>{title}</div>
        <p className={`text-white line-clamp-4 ${styles.content}`}>{content}</p>
        <button
          className={styles.more}
          onClick={() => {
            handleMoreBtnClick({ profileName, part, title, content, date });
          }}
        >
          자세히보기
          <img
            src="/public_assets/moreArrow.png"
            alt="moreArrow"
            className="w-3 h-3"
          />
        </button>
      </div>
    </div>
  );
}
