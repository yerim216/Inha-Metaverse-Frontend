import React, { useEffect, useState } from "react";
import styles from "../styles/modules/ToDo.module.css";
import PlusTodoBtn from "../components/PlusTodoBtn";
import TD from "../components/TD";
import { AiOutlinePlusCircle } from "react-icons/ai";
import todos from "../db/todos.json";
import axios from "axios";

export default function ToDo() {
  const [todo_notStart, setTodo_notStart] = useState([]);
  const [addTodo_notStart, setAddTodo_notStart] = useState({
    time: "",
    title: "",
    todo: "",
    fullScreen: false,
  });
  const [todo_inProgress, setTodo_inProgress] = useState([]);
  const [addTodo_inProgress, setAddTodo_inProgress] = useState("");
  const [todo_done, setTodo_done] = useState([]);
  const [addTodo_done, setAddTodo_done] = useState("");

  //
  const [todos, setTodos] = useState();
  useEffect(() => {
    console.log(todos);
    axios.get("/db/todos.json").then((res) => {
      console.log(res.data.todos);
      setTodos(res.data.todos);
    });
  }, []);

  const hideAddTodo = (filterName) => {
    const toHide = document.querySelector(`.${filterName}`);
    toHide.style.display = "none";
  };
  const showAddTodo = (filterName) => {
    const toShow = document.querySelector(`.${filterName}`);
    const time = document.querySelector(".notStart_time");
    toShow.style.display = "flex";
    let curTime = new Date();
    time.innerHTML = curTime.toLocaleString();

    if (filterName === "notStart")
      setAddTodo_notStart({
        ...addTodo_notStart,
        time: curTime.toLocaleString(),
      });
    else if (filterName === "inProgress")
      setAddTodo_inProgress({
        ...addTodo_inProgress,
        time: curTime.toLocaleString(),
      });
    else if (filterName === "done")
      setAddTodo_done({
        ...addTodo_done,
        time: curTime.toLocaleString(),
      });
  };

  const resetAddTodo = (filter) => {
    if (filter === "notStart")
      setAddTodo_notStart({ time: "", title: "", todo: "" });
    else if (filter === "inProgress")
      setAddTodo_inProgress({ time: "", title: "", todo: "" });
    else if (filter === "done")
      setAddTodo_done({ time: "", title: "", todo: "" });
  };

  // const checkPlaceholderVisible = (filterName) => {
  //   const placeholder = document.querySelector(`.${filterName}Placeholder`);
  //   if (filterName === "notStart") {
  //     if (addTodo_notStart.todo === "") placeholder.style.display = "inline";
  //     else placeholder.style.display = "none";
  //   } else if (filterName === "inProgress") {
  //     if (addTodo_inProgress.todo === "") placeholder.style.display = "inline";
  //     else placeholder.style.display = "none";
  //   } else if (filterName === "done") {
  //     if (addTodo_done.todo === "") placeholder.style.display = "inline";
  //     else placeholder.style.display = "none";
  //   }
  // };

  // useEffect(() => {
  //   checkPlaceholderVisible("notStart");
  //   // 나머지 두개도 필요
  // }, [addTodo_notStart.todo, addTodo_inProgress.todo, addTodo_done.todo]);

  return (
    <div className={styles.bg}>
      <header className="font-bold text-2xl ml-2 mt-2">
        <span>TODO</span>
      </header>
      <section className={styles.toDoSectionContainer}>
        <section className={`${styles.notStart} ${styles.toDoSection}`}>
          <div className={styles.notStartBadge}>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span>시작 안함</span>
          </div>
          <div className={`${styles.addTodo} notStart relative`}>
            <input
              type="text"
              placeholder="제목을 입력해주세요!"
              value={addTodo_notStart.title}
              onChange={(e) => {
                setAddTodo_notStart({
                  ...addTodo_notStart,
                  title: e.target.value,
                });
              }}
            />
            {/* <input
              type=""
              placeholder="무엇을 해야 하나요?"
              value={addTodo_notStart.todo}
              onChange={(e) => {
                setAddTodo_notStart({
                  ...addTodo_notStart,
                  todo: e.target.value,
                });
              }}
              //   onKeyUp={(e) => {
              //     if (e.key === "Enter") {
              //       setTodo_notStart((cur) => {
              //         resetAddTodo("notStart");
              //         hideAddTodo("notStart");
              //         return [addTodo_notStart, ...cur];
              //       });
              //     }
              //   }}
            /> */}
            <div className={styles.textarea_container}>
              <textarea
                className={styles.textarea}
                value={addTodo_notStart.todo}
                onChange={(e) => {
                  setAddTodo_notStart({
                    ...addTodo_notStart,
                    todo: e.target.value,
                  });
                }}
              ></textarea>
              <span
                className={`${styles.textarea_placeholder} notStartPlaceholder`}
              >
                무엇을 해야 하나요?
              </span>
            </div>
            <div className="mr-auto flex items-center gap-1">
              <img
                src="/public_assets/pro.png"
                alt="profile"
                className="w-7 h-7"
              />
              권태훈
            </div>
            <span className="mr-auto text-sm notStart_time">
              0월 00일 00 : 00
            </span>
            <AiOutlinePlusCircle
              className="text-xl absolute right-3 bottom-3 cursor-pointer transition-all hover:scale-125"
              onClick={() => {
                setTodo_notStart((cur) => {
                  resetAddTodo("notStart");
                  hideAddTodo("notStart");
                  return [addTodo_notStart, ...cur];
                });
              }}
            />
          </div>
          <div className={styles.todosContainer}>
            {/* {todo_notStart.map((item) => {
              return (
                <TD
                  title={item.title}
                  time={item.time}
                  todo={item.todo}
                  uid={`id_${v4().replace(/-/g, "")}`}
                />
              );
            })} */}
            {/* 여기에 추가 */}
            {todos &&
              todos.map((item) => {
                if (item.todo_status === 0) {
                  return <TD todoData={item} />;
                }
                return null;
              })}
            <PlusTodoBtn showAddTodo={showAddTodo} filterName={"notStart"} />
          </div>
        </section>
        <section className={`${styles.inProgress} ${styles.toDoSection}`}>
          <div className={styles.inProgressBadge}>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>진행중</span>
          </div>
          <div className={styles.todosContainer}>
            {todos &&
              todos.map((item) => {
                if (item.todo_status === 1) {
                  return <TD todoData={item} />;
                }
                return null;
              })}
            <PlusTodoBtn />
          </div>
        </section>
        <section className={`${styles.done} ${styles.toDoSection}`}>
          <div className={styles.doneBadge}>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>완료됨</span>
          </div>
          <div className={styles.todosContainer}>
            {todos &&
              todos.map((item) => {
                if (item.todo_status === 2) {
                  return <TD todoData={item} />;
                }
                return null;
              })}
            <PlusTodoBtn />
          </div>
        </section>
      </section>
    </div>
  );
}
