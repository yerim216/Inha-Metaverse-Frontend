import React, { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "../styles/modules/PostIt.module.css";

export default function PostIt() {
  const { teamIndex } = useOutletContext();
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  return (
    <section className={styles.bg}>
      <form className="ml-[3%] mt-[3%] flex flex-col w-1/3 gap-3 items-end">
        <input
          type="text"
          placeholder="제목"
          className="bg-transparent border p-3 w-full"
          value={input.title}
          onChange={(e) => {
            setInput({ ...input, title: e.target.value });
          }}
        />
        <textarea
          className="w-full resize-none outline-none h-32 border p-3"
          placeholder="노트작성..."
          style={{
            background: "#323232",
          }}
          required
          value={input.content}
          onChange={(e) => {
            setInput({ ...input, content: e.target.value });
          }}
        ></textarea>
        <button
          className="w-20 h-10 rounded-md bg-[#7090B0] px-2 hover:brightness-110"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          노트등록
        </button>
      </form>
    </section>
  );
}
