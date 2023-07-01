import React from "react";
import styles from "../styles/ProjectBox.module.css";

export default function ProjectBox({
  projectName,
  isRecruiting,
  recruitmentNumber,
  views,
  introduction,
}) {
  console.log(recruitmentNumber);
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0px 12px 20px rgba(112, 144, 176, 0.2)",
        padding: "50px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
      className={styles.pjb}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
        }}
      >
        <div
          style={{
            padding: "4px 10px",
            backgroundColor: "rgba(112, 144, 176, 1)",
            fontSize: "12px",
            borderRadius: "10px",
          }}
        >
          GAME
        </div>
        <div
          style={{
            padding: "4px 10px",
            backgroundColor: "rgba(112, 144, 176, 1)",
            fontSize: "12px",
            borderRadius: "10px",
          }}
        >
          UX/UI
        </div>
      </div>
      <h1
        style={{
          fontSize: "2rem",
          marginTop: "10px",
          fontWeight: "500",
        }}
      >
        {projectName}
      </h1>
      <div className="my-2">{introduction}</div>
      {/* <div className={styles.iconBox}>
        <img src="1.png" alt="아이콘" />
        <img src="2.png" alt="아이콘" />
        <img src="3.png" alt="아이콘" />
        <img src="4.png" alt="아이콘" />
        <img src="5.png" alt="아이콘" />
      </div> */}
      <div className={styles.info}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          ></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="6.png" alt="아이콘" />
            <span>{views}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isRecruiting ? (
            <>
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: "lightgreen",
                }}
              ></div>
              <span>recruiting ( 0/{recruitmentNumber} )</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>not recruiting ( 0/{recruitmentNumber} )</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
