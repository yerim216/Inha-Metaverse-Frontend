import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/modules/Download.module.css";
import { getDownload } from "../APIs/download";

export default function Download() {
  return (
    <>
      <Nav />
      <div className={styles.banner}>
        <img
          src="/public_assets/darkmodeBg.png"
          className="w-full h-full object-cover"
        />
        <button
          className={styles.downloadBtn}
          onClick={() => {
            const accept = window.confirm("다운로드하시겠습니까?");
            if (accept) {
              // 다운로드
              getDownload()
                .then((res) => window.location.assign(res.data.downloadUrl))
                .catch((err) => console.error(err));
            }
          }}
        >
          다운로드
        </button>
      </div>
      <div className="text-white text-center font-black flex flex-col gap-2 text-xl mt-6">
        <p className="mb-1 font-black">설치 방법</p>
        <p className="font-medium">1. 버튼을 눌러 압축파일을 다운받는다</p>
        <p className="font-medium">2. 다운받은 zip파일을 압축풀기한다</p>
        <p className="font-medium">3. 압축을 푼 폴더를 연다</p>
        <p className="font-medium">4. 확장자가 exe인 파일을 실행한다</p>
      </div>
    </>
  );
}
