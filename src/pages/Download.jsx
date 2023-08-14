import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/modules/Download.module.css";

export default function Download() {
  return (
    <>
      <Nav />
      <div className={styles.banner}>
        <p>왜 다운로드가 필요하냐면요.. 뭐시기 뭐시기에 대한 배너</p>
        <button
          className={styles.downloadBtn}
          onClick={() => {
            const accept = window.confirm("다운로드하시겠습니까?");

            if (accept) {
              // 다운로드
            }
          }}
        >
          다운로드
        </button>
      </div>
      <p className="text-white">설치 방법</p>
    </>
  );
}
