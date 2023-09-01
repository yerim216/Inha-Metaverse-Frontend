import React, { useRef } from "react";
import styles from "../styles/modules/TD.module.css";
import { BsFillTrashFill } from "react-icons/bs";

export default function Todo({
  // 투두 리스트를 가져오는 메소드 : 배열의 원소는 manager_names, todo_team, todo_title, todo_content, writer, todo_date, todo_status로 구성됨.

  // -> created_at, end_date, last_update, manger_names(배열 속 string)
  // schedule_content, schedule_index, schedule_status, schedule_title, start_date, writer_name 로 변경.

  todoData: {
    schedule_title,
    created_at,
    manager_names,
    schedule_status,
    schedule_content,
    writer_name,
    schedule_index,
  },
  changeScheduleStatus,
  deleteSchedule,
}) {
  console.log(created_at);

  const innerContent = useRef();
  const container = useRef();
  const title = useRef();
  const formattedDate = new Date(created_at).toLocaleString();

  // 드래그가 끝났을 때, 상태를 변경해야 한다면 드래그된 요소를 제자리에 보내지 말아야 함. 이를 위해 state를 통해 위치 관리.

  // 드래그가 끝났을 때, 마우스가 어디에 있는지에 따라 status를 변경 가능하게 함.
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const toDoSection_notStart = document.querySelector(
      "#toDoSection_notStart"
    );
    const toDoSection_inProgress = document.querySelector(
      "#toDoSection_inProgress"
    );
    const toDoSection_done = document.querySelector("#toDoSection_done");

    toDoSection_notStart.style.backgroundColor = "black";
    toDoSection_inProgress.style.backgroundColor = "black";
    toDoSection_done.style.backgroundColor = "black";
    if (
      mouseX >= toDoSection_notStart.getBoundingClientRect().left &&
      mouseX <= toDoSection_notStart.getBoundingClientRect().right &&
      mouseY >= toDoSection_notStart.getBoundingClientRect().top &&
      mouseY <= toDoSection_notStart.getBoundingClientRect().bottom
    ) {
      // notStart 요소에 옮겨짐
      if (schedule_status !== 0) {
        changeScheduleStatus(schedule_index, 0);
      }
    }
    if (
      mouseX >= toDoSection_inProgress.getBoundingClientRect().left &&
      mouseX <= toDoSection_inProgress.getBoundingClientRect().right &&
      mouseY >= toDoSection_inProgress.getBoundingClientRect().top &&
      mouseY <= toDoSection_inProgress.getBoundingClientRect().bottom
    ) {
      // inProgress 요소에 옮겨짐
      if (schedule_status !== 1) {
        changeScheduleStatus(schedule_index, 1);
      }
    }
    if (
      mouseX >= toDoSection_done.getBoundingClientRect().left &&
      mouseX <= toDoSection_done.getBoundingClientRect().right &&
      mouseY >= toDoSection_done.getBoundingClientRect().top &&
      mouseY <= toDoSection_done.getBoundingClientRect().bottom
    ) {
      // done 요소에 옮겨짐
      if (schedule_status !== 2) {
        changeScheduleStatus(schedule_index, 2);
      }
    }
  };

  const handleDrag = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const toDoSection_notStart = document.querySelector(
      "#toDoSection_notStart"
    );
    const toDoSection_inProgress = document.querySelector(
      "#toDoSection_inProgress"
    );
    const toDoSection_done = document.querySelector("#toDoSection_done");

    if (
      mouseX >= toDoSection_notStart.getBoundingClientRect().left &&
      mouseX <= toDoSection_notStart.getBoundingClientRect().right &&
      mouseY >= toDoSection_notStart.getBoundingClientRect().top &&
      mouseY <= toDoSection_notStart.getBoundingClientRect().bottom
    ) {
      toDoSection_notStart.style.backgroundColor = "rgb(21, 20, 20)";
      toDoSection_inProgress.style.backgroundColor = "black";
      toDoSection_done.style.backgroundColor = "black";
    } else if (
      mouseX >= toDoSection_inProgress.getBoundingClientRect().left &&
      mouseX <= toDoSection_inProgress.getBoundingClientRect().right &&
      mouseY >= toDoSection_inProgress.getBoundingClientRect().top &&
      mouseY <= toDoSection_inProgress.getBoundingClientRect().bottom
    ) {
      toDoSection_notStart.style.backgroundColor = "black";
      toDoSection_inProgress.style.backgroundColor = "rgb(21, 20, 20)";
      toDoSection_done.style.backgroundColor = "black";
    } else if (
      mouseX >= toDoSection_done.getBoundingClientRect().left &&
      mouseX <= toDoSection_done.getBoundingClientRect().right &&
      mouseY >= toDoSection_done.getBoundingClientRect().top &&
      mouseY <= toDoSection_done.getBoundingClientRect().bottom
    ) {
      toDoSection_notStart.style.backgroundColor = "black";
      toDoSection_inProgress.style.backgroundColor = "black";
      toDoSection_done.style.backgroundColor = "rgb(21, 20, 20)";
    }
  };

  return (
    <div
      draggable={true}
      onDragEnd={handleDragEnd}
      onDragStart={(e) => {
        e.target.style.opacity = "0.3";
      }}
      onDrag={handleDrag}
    >
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
          {schedule_title}
        </div>
        <div
          className="border-2 w-full p-2 rounded-md flex flex-col gap-2 hidden cursor-auto"
          ref={innerContent}
        >
          <pre className="mr-auto text-base w-full whitespace-pre-wrap">
            {schedule_content}
          </pre>
          <div className="mr-auto flex items-center gap-1">
            <img
              src="/public_assets/pro.png"
              alt="profile"
              className="w-7 h-7"
            />
            {writer_name}/작성자
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
                    changeScheduleStatus(schedule_index, 0);
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
                    changeScheduleStatus(schedule_index, 1);
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
                    changeScheduleStatus(schedule_index, 2);
                  }
                }}
              ></div>
            </div>
            <BsFillTrashFill
              className="transition-all hover:scale-125 cursor-pointer"
              onClick={() => {
                const returnVal =
                  window.confirm("해당 리스트를 삭제하시겠어요?");
                if (returnVal === true) {
                  deleteSchedule(schedule_index);
                }
              }}
            />
          </div>
        </div>
        <div className="mr-auto flex items-center gap-1">
          <div className="flex gap-2">
            {manager_names &&
              manager_names.map((manager, idx) => {
                return (
                  <div className="flex items-center gap-1" key={idx}>
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
    </div>
  );
}
