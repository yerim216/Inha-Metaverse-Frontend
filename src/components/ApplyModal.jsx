import React, { useState } from "react";
import "../styles/modal.css";
import styles from "../styles/modules/ApplyModal.module.css";

export default function ApplyModal(props) {
  const { open, close, openApplyModal, handleApplyBtn } = props;

  const [content, setContent] = useState();

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="w-1/2 h-2/3 bg-white rounded-3xl relative flex flex-col items-center justify-center gap-4">
          <button
            className="absolute right-4 top-2 text-3xl hover:scale-110"
            onClick={close}
          >
            &times;
          </button>
          <h1 className={styles.h1}>지원서를 작성해 주세요!</h1>
          <textarea className="bg-gray-100 rounded-2xl shadow-2xl w-2/3 h-2/3 resize-none outline-none p-3"></textarea>
          <button
            className={styles.submitBtn}
            onClick={() => {
              handleApplyBtn();
              close();
              // alert("성공적으로 제출되었습니다!");
            }}
          >
            제출하기
          </button>
        </section>
      ) : null}
    </div>
  );
}
