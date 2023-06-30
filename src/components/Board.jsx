import React, { useEffect, useState } from "react";
import styles from "../styles/modules/Board.module.css";
import PlusTodoBtn from "../components/PlusTodoBtn";
import TD from "../components/TD";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import Manager from "./Member";
import Member from "./Member";

export default function Board() {
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
  const [userEmail, setUserEmail] = useState();
  const [teamIndex, setTeamIndex] = useState();

  const [memberList, setMemberList] = useState();
  // addTodo에서 manager를 할당해야 하는데, 그때의 선택된 리스트.
  const [selectedManager, setSelectedManager] = useState([]);

  const [todos, setTodos] = useState();

  axios.defaults.baseURL = "http://app.vpspace.net/";

  // 팀 인덱스를 가져오는 변수 : 로컬스토리지에 저장된 이메일을 이용해서 가져 옴.
  const getTeamIndex = () => {
    return new Promise((resolve, reject) => {
      if (
        JSON.parse(localStorage.getItem("recoil-persist")).userState === null
      ) {
        reject("User state is null");
        return;
      }

      const userEmail = JSON.parse(localStorage.getItem("recoil-persist"))
        .userState.email;
      axios
        .post("/team/emailtoteam", { email: userEmail })
        .then((res) => {
          const teamIndex = res.data[0].team_index;
          resolve(teamIndex);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getDatabase = () => {
    // 팀 인덱스 가져오는 코드
    getTeamIndex().then((teamIndex) => {
      // 투두 리스트를 가져오는 메소드 : 배열의 원소는 managers, todo_team, todo_title, todo_content, writer, todo_date로 구성됨.
      axios
        .post("/todo/todolist", {
          index: teamIndex,
        })
        .then((res) => {
          setTodos(res.data);
        });

      // 담당자(매니저) 리스트를 가져오는 메소드 : 결국 팀 멤버들을 가져오면 됨. 배열 속 name으로 구성됨.
      axios
        .post("/team/member/teamidx", {
          index: teamIndex,
        })
        .then((res) => {
          setMemberList(res.data);
        });
    });
  };

  const addManager = (memberName) => {
    setSelectedManager((cur) => {
      return [...cur, memberName];
    });
  };
  const deleteManager = (memberName) => {
    setSelectedManager((cur) => cur.filter((data) => data !== memberName));
  };
  const addTodoAtDB = (filterName) => {
    getTeamIndex().then((teamIndex) => {
      if (filterName === "notStart") {
        console.log(teamIndex);
        console.log(addTodo_notStart.title);
        console.log(addTodo_notStart.todo);
        console.log(addTodo_notStart.time);
        axios
          .post("/todo/put", {
            //
            team: teamIndex,
            title: addTodo_notStart.title,
            content: addTodo_notStart.todo,
            writer: 10,
            date: addTodo_notStart.time,
          })
          .then(() => {
            console.log("getdatabase");
            getDatabase();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (filterName === "inProgress") {
      } else if (filterName === "done") {
      }
    });
  };

  useEffect(() => {
    getDatabase();
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

  const checkPlaceholderVisible = (filterName) => {
    const placeholder = document.querySelector(`.${filterName}Placeholder`);
    if (filterName === "notStart") {
      if (addTodo_notStart.todo === "") placeholder.style.display = "inline";
      else placeholder.style.display = "none";
    } else if (filterName === "inProgress") {
      if (addTodo_inProgress.todo === "") placeholder.style.display = "inline";
      else placeholder.style.display = "none";
    } else if (filterName === "done") {
      if (addTodo_done.todo === "") placeholder.style.display = "inline";
      else placeholder.style.display = "none";
    }
  };

  useEffect(() => {
    checkPlaceholderVisible("notStart");
    // 나머지 두개도 필요
  }, [addTodo_notStart.todo, addTodo_inProgress.todo, addTodo_done.todo]);

  return (
    <div className={styles.bg}>
      <section className={styles.toDoSectionContainer}>
        <section className={`${styles.notStart} ${styles.toDoSection}`}>
          <div className={styles.notStartBadge}>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span className="text-white">시작 안함</span>
          </div>
          <div className={`${styles.addTodo} notStart relative`}>
            <input
              className={styles.addTodoTitle}
              type="text"
              placeholder="제목을 입력해주세요!"
              value={addTodo_notStart.title}
              onChange={(e) => {
                setAddTodo_notStart({
                  ...addTodo_notStart,
                  title: e.target.value,
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
              <span>담당자 선택</span>
              <div
                className={`flex gap-2 grow w-80 overflow-auto ${styles.managerSelector}`}
              >
                {memberList &&
                  memberList.map((member) => {
                    return (
                      <Member
                        memberName={member.name}
                        // selectedManager state에 해당 이름이 존재한다면 activated가 true, 아니라면 false
                        activated={selectedManager.includes(member.name)}
                        addManager={() => {
                          addManager(member.name);
                        }}
                        deleteManager={() => {
                          deleteManager(member.name);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <span className="mr-auto text-sm notStart_time">
              0월 00일 00 : 00
            </span>
            <AiOutlinePlusCircle
              className="text-xl absolute right-3 bottom-3 cursor-pointer transition-all hover:scale-125"
              onClick={() => {
                resetAddTodo("notStart");
                hideAddTodo("notStart");
                addTodoAtDB("notStart");
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
            <span className="text-white">진행중</span>
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
            <span className="text-white">완료됨</span>
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
