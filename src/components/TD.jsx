import React, { useEffect, useRef } from "react";
import styles from "../styles/modules/TD.module.css";
import { BsFillTrashFill } from "react-icons/bs";

export default function Todo({
  // 투두 리스트를 가져오는 메소드 : 배열의 원소는 managers, todo_team, todo_title, todo_content, writer, todo_date, todo_status로 구성됨.

  todoData: {
    todo_title,
    todo_date,
    managers,
    todo_status,
    todo_content,
    writer,
    updated_at,
    todo_index,
  },
  changeTodoStatus,
  deleteTodo,
}) {
  const innerContent = useRef();
  const container = useRef();
  const title = useRef();
  const formattedDate = new Date(todo_date).toLocaleString();
  return (
    <div
      className={`${styles.TD} cursor-pointer transition-all`}
      ref={container}
      onClick={(e) => {
        if (e.target === container.current || e.target === title.current) {
          innerContent.current.classList.toggle("hidden");
        }
      }}
    >
      <div className="mr-auto text-lg" ref={title}>
        {todo_title}
      </div>
      <div
        className="border-2 w-full p-2 rounded-md flex flex-col gap-2 hidden cursor-auto"
        ref={innerContent}
      >
        <pre className="mr-auto text-base">{todo_content}</pre>
        <div className="mr-auto flex items-center gap-1">
          <img src="/public_assets/pro.png" alt="profile" className="w-7 h-7" />
          {writer}/작성자
        </div>
        <div className="flex items-center justify-between">
          <div className={styles.changeButton}>
            <span className="mr-1">상태 변경</span>
            <div
              className="w-3 h-3 bg-gray-600 rounded-full transition-all hover:scale-125 cursor-pointer"
              onClick={() => {
                const returnVal = window.confirm(
                  "해당 리스트를 '시작 안함' 상태로 전환하시겠어요?"
                );
                if (returnVal === true) {
                  changeTodoStatus(todo_index, 0);
                }
              }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full transition-all hover:scale-125 cursor-pointer"
              onClick={() => {
                const returnVal = window.confirm(
                  "해당 리스트를 '진행중' 상태로 전환하시겠어요?"
                );
                if (returnVal === true) {
                  changeTodoStatus(todo_index, 1);
                }
              }}
            ></div>
            <div
              className="w-3 h-3 bg-green-600 rounded-full transition-all hover:scale-125 cursor-pointer"
              onClick={() => {
                const returnVal = window.confirm(
                  "해당 리스트를 '완료됨' 상태로 전환하시겠어요?"
                );
                if (returnVal === true) {
                  changeTodoStatus(todo_index, 2);
                }
              }}
            ></div>
          </div>
          <BsFillTrashFill
            className="transition-all hover:scale-125 cursor-pointer"
            onClick={() => {
              const returnVal = window.confirm("해당 리스트를 삭제하시겠어요?");
              if (returnVal === true) {
                deleteTodo(todo_index);
              }
            }}
          />
        </div>
      </div>
      <div className="mr-auto flex items-center gap-1">
        <div className="flex gap-2">
          {managers.map((manager) => {
            return (
              <div className="flex items-center gap-1">
                <img
                  src="/public_assets/pro.png"
                  alt="profile"
                  className="w-7 h-7"
                />
                <span>{manager}</span>
              </div>
            );
          })}
        </div>
      </div>
      <span className="mr-auto text-xs">{formattedDate}</span>
    </div>
  );
}
