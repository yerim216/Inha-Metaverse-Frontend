import React, { useEffect, useState } from "react";
import styles from "../styles/modules/Board.module.css";
import PlusTodoBtn from "../components/PlusTodoBtn";
import TD from "../components/TD";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import Member from "./Member";
import { useOutletContext } from "react-router-dom";

export default function Board() {
  // ㅆ.. 담당자선택 공유됨
  const [addTodo_notStart, setAddTodo_notStart] = useState({
    time: "",
    title: "",
    todo: "",
    fullScreen: false,
  });
  const [addTodo_inProgress, setAddTodo_inProgress] = useState({
    time: "",
    title: "",
    todo: "",
    fullScreen: false,
  });
  const [addTodo_done, setAddTodo_done] = useState({
    time: "",
    title: "",
    todo: "",
    fullScreen: false,
  });
  const [userEmail, setUserEmail] = useState();

  // teamIndex는 state에서 관리되므로, 불러와진 경우에만 여러 API 실행 가능.
  const { teamIndex } = useOutletContext();

  const [memberList, setMemberList] = useState();
  // addTodo에서 manager를 할당해야 하는데, 그때의 선택된 리스트.
  const [selectedManager, setSelectedManager] = useState([]);

  const [todos, setTodos] = useState();

  axios.defaults.baseURL = "https://www.app.vpspace.net/";

  // 팀 인덱스를 가져오는 변수 : 로컬스토리지에 저장된 이메일을 이용해서 가져 옴.
  const getTeamIndex = () => {
    return new Promise((resolve) => {
      resolve(teamIndex);
    });
  };

  const deleteTodo = (todoIndex) => {
    axios
      .post("/todo/delete", { index: todoIndex })
      .then(() => {
        getDatabase();
      })
      .catch((err) => console.log(err));
  };

  const getUserIndex = async () => {
    let userIndex;

    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    const userEmail = JSON.parse(localStorage.getItem("recoil-persist"))
      .userState.email;

    await axios
      .post("/userinfo", {
        email: userEmail,
      })
      .then((res) => {
        console.log(res.data);
        userIndex = res.data.index;
      });

    return userIndex; // userIndex 리턴
  };

  const getDatabase = () => {
    // 팀 인덱스 가져오는 코드
    getTeamIndex().then((teamIndex) => {
      // 투두 리스트를 가져오는 메소드 : 배열의 원소는 managers, todo_team, todo_title, todo_content, writer, todo_date, todo_index로 구성됨.
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

  // 기존 투두의 상태 변경하는 코드
  const changeTodoStatus = (todoIndex, statusNum) => {
    axios
      .post("/todo/progress", {
        index: todoIndex,
        status: statusNum,
      })
      .then(() => {
        getDatabase();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addManager = (memberName, memberIdx) => {
    setSelectedManager((cur) => {
      return [...cur, { memberName, memberIdx }];
    });
  };
  const deleteManager = (memberName) => {
    setSelectedManager((cur) =>
      cur.filter((data) => data.memberName !== memberName)
    );
  };
  const addTodoAtDB = async (filterName) => {
    const userIndex = await getUserIndex();
    getTeamIndex().then((teamIndex) => {
      if (filterName === "notStart") {
        console.log(teamIndex);
        console.log(addTodo_notStart.title);
        console.log(addTodo_notStart.todo);
        console.log(userIndex);
        console.log(addTodo_notStart.time);
        axios
          .post("/todo/put", {
            team: teamIndex,
            title: addTodo_notStart.title,
            content: addTodo_notStart.todo,
            writer: userIndex,
            date: addTodo_notStart.time,
            status: 0,
          })
          .then((res) => {
            const todoIndex = res.data[0].todo_index;
            selectedManager.map((manager) => {
              console.log(manager);
              axios
                .post("/todo/manager", {
                  todo_index: todoIndex,
                  todo_manager: manager.memberIdx,
                })
                .then(() => {
                  getDatabase();
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (filterName === "inProgress") {
        axios
          .post("/todo/put", {
            team: teamIndex,
            title: addTodo_inProgress.title,
            content: addTodo_inProgress.todo,
            writer: userIndex,
            date: addTodo_inProgress.time,
            status: 1,
          })
          .then((res) => {
            const todoIndex = res.data[0].todo_index;
            selectedManager.map((manager) => {
              axios
                .post("/todo/manager", {
                  todo_index: todoIndex,
                  todo_manager: manager.memberIdx,
                })
                .then(() => {
                  console.log("getdatabase");
                  getDatabase();
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (filterName === "done") {
        axios
          .post("/todo/put", {
            team: teamIndex,
            title: addTodo_done.title,
            content: addTodo_done.todo,
            writer: userIndex,
            date: addTodo_done.time,
            status: 2,
          })
          .then((res) => {
            const todoIndex = res.data[0].todo_index;
            selectedManager.map((manager) => {
              axios
                .post("/todo/manager", {
                  todo_index: todoIndex,
                  todo_manager: manager.memberIdx,
                })
                .then(() => {
                  getDatabase();
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    if (teamIndex) getDatabase();
  }, [teamIndex]);

  const hideAddTodo = (filterName) => {
    const toHide = document.querySelector(`.${filterName}`);
    toHide.style.display = "none";
  };
  const showAddTodo = (filterName) => {
    const toShow = document.querySelector(`.${filterName}`);
    let time;

    if (filterName === "notStart") {
      time = document.querySelector(".notStart_time");
    } else if (filterName === "inProgress") {
      time = document.querySelector(".inProgress_time");
    } else if (filterName === "done") {
      time = document.querySelector(".done_time");
    }

    toShow.style.display = "flex";
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    time.innerHTML = formattedDate;

    if (filterName === "notStart")
      setAddTodo_notStart({
        ...addTodo_notStart,
        time: formattedDate,
      });
    else if (filterName === "inProgress")
      setAddTodo_inProgress({
        ...addTodo_inProgress,
        time: formattedDate,
      });
    else if (filterName === "done")
      setAddTodo_done({
        ...addTodo_done,
        time: formattedDate,
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
  }, [addTodo_notStart.todo]);
  useEffect(() => {
    checkPlaceholderVisible("inProgress");
  }, [addTodo_inProgress.todo]);
  useEffect(() => {
    checkPlaceholderVisible("done");
  }, [addTodo_done.todo]);

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
            />
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
                        key={member.index}
                        memberName={member.name}
                        activated={selectedManager.some(
                          (item) => item.memberName === member.name
                        )}
                        addManager={() => {
                          addManager(member.name, member.index);
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
              className="text-2xl absolute right-3 bottom-3 cursor-pointer transition-all hover:scale-125 text-white"
              onClick={() => {
                if (
                  addTodo_notStart.title.trim() === "" ||
                  addTodo_notStart.todo.trim() === ""
                )
                  return;

                if (selectedManager.length === 0) {
                  alert("담당자를 1명 이상 선택해 주세요!");
                  return;
                }
                resetAddTodo("notStart");
                hideAddTodo("notStart");
                addTodoAtDB("notStart");
              }}
            />
          </div>
          <div className={styles.todosContainer}>
            {todos &&
              todos.map((item, idx) => {
                if (item.todo_status === 0) {
                  return (
                    <TD
                      todoData={item}
                      changeTodoStatus={changeTodoStatus}
                      deleteTodo={deleteTodo}
                      key={idx}
                    />
                  );
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
          <div className={`${styles.addTodo} inProgress relative`}>
            <input
              className={styles.addTodoTitle}
              type="text"
              placeholder="제목을 입력해주세요!"
              value={addTodo_inProgress.title}
              onChange={(e) => {
                setAddTodo_inProgress({
                  ...addTodo_inProgress,
                  title: e.target.value,
                });
              }}
            />

            <div className={styles.textarea_container}>
              <textarea
                className={styles.textarea}
                value={addTodo_inProgress.todo}
                onChange={(e) => {
                  setAddTodo_inProgress({
                    ...addTodo_inProgress,
                    todo: e.target.value,
                  });
                }}
              ></textarea>
              <span
                className={`${styles.textarea_placeholder} inProgressPlaceholder`}
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
                        key={member.index}
                        memberName={member.name}
                        activated={selectedManager.some(
                          (item) => item.memberName === member.name
                        )}
                        addManager={() => {
                          addManager(member.name, member.index);
                        }}
                        deleteManager={() => {
                          deleteManager(member.name);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <span className="mr-auto text-sm inProgress_time">
              0월 00일 00 : 00
            </span>
            <AiOutlinePlusCircle
              className="text-2xl absolute right-3 bottom-3 cursor-pointer transition-all hover:scale-125 text-white"
              onClick={() => {
                if (
                  addTodo_inProgress.title.trim() === "" ||
                  addTodo_inProgress.todo.trim() === ""
                )
                  return;

                if (selectedManager.length === 0) {
                  alert("담당자를 1명 이상 선택해 주세요!");
                  return;
                }
                resetAddTodo("inProgress");
                hideAddTodo("inProgress");
                addTodoAtDB("inProgress");
              }}
            />
          </div>
          <div className={styles.todosContainer}>
            {todos &&
              todos.map((item, idx) => {
                if (item.todo_status === 1) {
                  return (
                    <TD
                      key={idx}
                      todoData={item}
                      deleteTodo={deleteTodo}
                      changeTodoStatus={changeTodoStatus}
                    />
                  );
                }
                return null;
              })}
            <PlusTodoBtn showAddTodo={showAddTodo} filterName={"inProgress"} />
          </div>
        </section>
        <section className={`${styles.done} ${styles.toDoSection}`}>
          <div className={styles.doneBadge}>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-white">완료됨</span>
          </div>
          <div className={`${styles.addTodo} done relative`}>
            <input
              className={styles.addTodoTitle}
              type="text"
              placeholder="제목을 입력해주세요!"
              value={addTodo_done.title}
              onChange={(e) => {
                setAddTodo_done({
                  ...addTodo_done,
                  title: e.target.value,
                });
              }}
            />

            <div className={styles.textarea_container}>
              <textarea
                className={styles.textarea}
                value={addTodo_done.todo}
                onChange={(e) => {
                  setAddTodo_done({
                    ...addTodo_done,
                    todo: e.target.value,
                  });
                }}
              ></textarea>
              <span
                className={`${styles.textarea_placeholder} donePlaceholder`}
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
                        key={member.index}
                        memberName={member.name}
                        activated={selectedManager.some(
                          (item) => item.memberName === member.name
                        )}
                        addManager={() => {
                          addManager(member.name, member.index);
                        }}
                        deleteManager={() => {
                          deleteManager(member.name);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <span className="mr-auto text-sm done_time">0월 00일 00 : 00</span>
            <AiOutlinePlusCircle
              className="text-2xl absolute right-3 bottom-3 cursor-pointer transition-all hover:scale-125 text-white"
              onClick={() => {
                if (
                  addTodo_done.title.trim() === "" ||
                  addTodo_done.todo.trim() === ""
                )
                  return;

                if (selectedManager.length === 0) {
                  alert("담당자를 1명 이상 선택해 주세요!");
                  return;
                }

                resetAddTodo("done");
                hideAddTodo("done");
                addTodoAtDB("done");
              }}
            />
          </div>
          <div className={styles.todosContainer}>
            {todos &&
              todos.map((item, idx) => {
                if (item.todo_status === 2) {
                  return (
                    <TD
                      key={idx}
                      todoData={item}
                      deleteTodo={deleteTodo}
                      changeTodoStatus={changeTodoStatus}
                    />
                  );
                }
                return null;
              })}
            <PlusTodoBtn showAddTodo={showAddTodo} filterName={"done"} />
          </div>
        </section>
      </section>
    </div>
  );
}
