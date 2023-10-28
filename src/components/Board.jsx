import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/modules/Board.module.css";
import PlusTodoBtn from "../components/PlusTodoBtn";
import TD from "../components/TD";
import axios from "axios";
import Member from "./Member";
import { useOutletContext } from "react-router-dom";
import { getTeamInfoByIndex } from "../APIs/team";
import { addScheduleByToDo, getSchedule } from "../APIs/schedule";
import RightViewer from "./RightViewer";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Board() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);

  const [tm, setTm] = useState(theme.lightTheme.board);

  useEffect(() => {
    if (themeMode === "light") {
      setTm(theme.lightTheme.board);
    } else {
      setTm(theme.darkTheme.board);
    }
  }, [themeMode]);

  const [addTodo, setAddTodo] = useState({
    time: "",
    title: "",
    todo: "",
    fullScreen: false,
  });

  // teamIndex는 state에서 관리되므로, 불러와진 경우에만 여러 API 실행 가능.
  const { teamIndex } = useOutletContext();

  const [memberList, setMemberList] = useState();
  // addTodo에서 manager를 할당해야 ,idx하는데, 그때의 선택된 리스트.
  const [selectedManager, setSelectedManager] = useState([]);

  const [todos, setTodos] = useState();

  const [userIndex, setUserIndex] = useState();
  useEffect(() => {
    let userIndex;

    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    userIndex = JSON.parse(localStorage.getItem("recoil-persist")).userState
      .user_index;

    setUserIndex(userIndex);
  }, []);

  // 팀 인덱스를 가져오는 변수 : 로컬스토리지에 저장된 이메일을 이용해서 가져 옴.
  const getTeamIndex = () => {
    return new Promise((resolve) => {
      resolve(teamIndex);
    });
  };

  const deleteSchedule = (scheduleIndex) => {
    axios
      .post("/schedule/delete", { index: scheduleIndex })
      .then(() => {
        getDatabase();
      })
      .catch((err) => console.log(err));
  };

  const getDatabase = () => {
    // 팀 인덱스 가져오는 코드
    getTeamIndex().then((teamIndex) => {
      getSchedule(teamIndex).then((res) => {
        setTodos(res.data);
      });
      // 담당자(매니저) 리스트를 가져오는 메소드 : 결국 팀 멤버들을 가져오면 됨. 배열 속 name으로 구성됨.
      getTeamInfoByIndex(teamIndex).then((res) => {
        setMemberList(res.data.teamMembers);
      });
    });
  };

  // 기존 투두의 상태 변경하는 코드
  const changeScheduleStatus = (scheduleIndex, statusNum) => {
    axios
      .post("/schedule/progress", {
        index: scheduleIndex,
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

  // delete
  const deleteManager = (memberName) => {
    setSelectedManager((cur) => {
      return cur.filter((data) => data.memberName !== memberName);
    });
  };

  // add
  const addTodoAtDB = async () => {
    console.log({
      team: parseInt(teamIndex),
      title: addTodo.title,
      content: addTodo.todo,
      status: status,
      start_date: null,
      end_date: null,
      writer: userIndex,
      created_at: addTodo.time,
      color: null,
    });

    addScheduleByToDo({
      team: teamIndex,
      title: addTodo.title,
      content: addTodo.todo,
      status: status,
      start_date: null,
      end_date: null,
      writer: userIndex,
      created_at: addTodo.time,
      color: null,
    })
      .then((res) => {
        const scheduleIndex = res.data[0].schedule_index;
        selectedManager.map((manager) => {
          axios
            .post("/schedule/put/manager", {
              schedule: scheduleIndex,
              manager: manager.memberIdx,
            })
            .then(() => {
              setIsModalOpen(false);
              getDatabase();
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (teamIndex) {
      getDatabase();
    }
  }, [teamIndex]);

  // 모달창을 통해서 값 추가 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달창이 열릴 때, 현재 시간을 설정 후 표기
  useEffect(() => {
    if (isModalOpen) {
      setTime();
    }
  }, [isModalOpen]);

  const setTime = () => {
    let time;
    time = document.querySelector(".time");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    time.innerHTML = formattedDate;
    setAddTodo({
      ...addTodo,
      time: formattedDate,
    });
  };

  const resetAddTodo = () => {
    setAddTodo({ time: "", title: "", todo: "" });
  };

  const addTodoModalRef = useRef();
  const curStatusRef = useRef();
  const timeRef = useRef();
  const [status, setStatus] = useState(0);

  return (
    <div className={`${styles.bg} xl:pr-80 2xl:pr-96`}>
      {/* 모달창 설정하는 파트 시작 */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            // addTodoModalRef 바깥쪽 영역 클릭 시 사라지게끔 설정
            if (
              addTodoModalRef.current &&
              !addTodoModalRef.current.contains(e.target)
            )
              setIsModalOpen(false);
          }}
          className="w-[100vw] h-[100vh] absolute left-0 top-0 z-50 flex justify-center items-center"
          style={{
            backgroundColor: tm.whenModalBg,
          }}
        >
          <section
            ref={addTodoModalRef}
            className={styles.addTodoModal}
            style={{
              backgroundColor: tm.modalBg,
            }}
          >
            <input
              className={styles.addTodoTitle}
              style={{
                color: tm.inputTextColor,
              }}
              type="text"
              placeholder="New Event"
              // value 및 onChange의 notStart,inProgress,done은 터치한 버튼에 따라서. => 인데 굳이?
              value={addTodo.title}
              onChange={(e) => {
                setAddTodo({
                  ...addTodo,
                  title: e.target.value,
                });
              }}
            />

            {/* 현재 날짜 */}
            <div className="flex items-center gap-[2vw] w-full">
              <span className="font-medium">Current Date</span>
              <span className="mr-auto time">0월 00일 00 : 00</span>
            </div>

            {/* 매니저 선택 */}
            <div className="mr-auto flex items-center gap-1">
              <span className="mr-[2vw] font-medium">Mangers</span>
              <div
                className={`flex gap-2 grow w-80 overflow-auto ${styles.managerSelector}`}
              >
                {memberList &&
                  memberList.map((member, index) => {
                    return (
                      <Member
                        key={index}
                        memberName={member.user_name}
                        activated={selectedManager.some((item) => {
                          return item.memberName === member.user_name;
                        })}
                        addManager={() => {
                          addManager(member.user_name, member.user_index);
                        }}
                        deleteManager={() => {
                          deleteManager(member.user_name);
                        }}
                      />
                    );
                  })}
              </div>
            </div>

            {/* 상태 선택 */}
            <div className="flex font-medium w-full">
              <span className="mr-[2vw]">Status</span>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-[10px]">
                  <div
                    className={`w-[22px] h-[22px] bg-gray-600 rounded-full transition-all hover:scale-[120%] cursor-pointer ${
                      status === 0 && "scale-[120%] brightness-125"
                    }`}
                    onClick={() => {
                      setStatus(0);
                    }}
                  ></div>
                  <span>시작 안함</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div
                    className={`w-[22px] h-[22px] bg-blue-500 rounded-full transition-all hover:scale-[120%] cursor-pointer ${
                      status === 1 && "scale-[120%] brightness-125"
                    }`}
                    onClick={() => {
                      setStatus(1);
                    }}
                  ></div>
                  <span>진행중</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div
                    className={`w-[22px] h-[22px] bg-green-600 rounded-full transition-all hover:scale-[120%] cursor-pointer ${
                      status === 2 && "scale-[120%] brightness-125"
                    }`}
                    onClick={() => {
                      setStatus(2);
                    }}
                  ></div>
                  <span>완료됨</span>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-full h-[0.5px] bg-white opacity-70"></div>

            {/* Add Note */}
            <div className={styles.textarea_container}>
              <textarea
                className={styles.textarea}
                value={addTodo.todo}
                onChange={(e) => {
                  setAddTodo({
                    ...addTodo,
                    todo: e.target.value,
                  });
                }}
                placeholder="Add Note"
              ></textarea>
            </div>

            {/* +버튼 */}
            <div>
              <button
                className="cursor-pointer hover:scale-110 text-white"
                onClick={() => {
                  if (
                    addTodo.title.trim() === "" ||
                    addTodo.todo.trim() === ""
                  ) {
                    alert("제목과 내용을 작성해 주세요!");
                    return;
                  }

                  if (selectedManager.length === 0) {
                    alert("담당자를 1명 이상 선택해 주세요!");
                    return;
                  }
                  resetAddTodo();
                  addTodoAtDB();
                }}
              >
                Save
              </button>
            </div>
          </section>
        </div>
      )}
      {/* 모달창 설정하는 파트 끝 */}

      <RightViewer activated={"board"} />
      <section className={styles.toDoSectionContainer}>
        <div className={styles.fullTodoSection} id="toDoSection_notStart">
          <section
            className={`${styles.notStart} ${styles.toDoSection}`}
            id="toDoSection_notStart_scroll"
          >
            <div className={styles.notStartBadge}>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <span className="text-white">시작 안함</span>
            </div>

            <div className={styles.todosContainer}>
              {todos &&
                todos.map((item, idx) => {
                  if (item.schedule_status === 0) {
                    return (
                      <TD
                        todoData={item}
                        changeScheduleStatus={changeScheduleStatus}
                        deleteSchedule={deleteSchedule}
                        key={idx}
                      />
                    );
                  }
                  return null;
                })}
              <PlusTodoBtn
                setIsModalOpen={setIsModalOpen}
                setStatus={setStatus}
                filterName={"notStart"}
              />
            </div>
          </section>
        </div>

        <div className={styles.fullTodoSection} id="toDoSection_inProgress">
          <section
            className={`${styles.inProgress} ${styles.toDoSection}`}
            id="toDoSection_inProgress_scroll"
          >
            <div className={styles.inProgressBadge}>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-white">진행중</span>
            </div>

            <div className={styles.todosContainer}>
              {todos &&
                todos.map((item, idx) => {
                  if (item.schedule_status === 1) {
                    return (
                      <TD
                        key={idx}
                        todoData={item}
                        deleteSchedule={deleteSchedule}
                        changeScheduleStatus={changeScheduleStatus}
                      />
                    );
                  }
                  return null;
                })}
              <PlusTodoBtn
                setIsModalOpen={setIsModalOpen}
                setStatus={setStatus}
                filterName={"inProgress"}
              />
            </div>
          </section>
        </div>

        <div className={styles.fullTodoSection} id="toDoSection_done">
          <section
            className={`${styles.done} ${styles.toDoSection}`}
            id="toDoSection_done_scroll"
          >
            <div className={styles.doneBadge}>
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-white">완료됨</span>
            </div>

            <div className={styles.todosContainer}>
              {todos &&
                todos.map((item, idx) => {
                  if (item.schedule_status === 2) {
                    return (
                      <TD
                        key={idx}
                        todoData={item}
                        deleteSchedule={deleteSchedule}
                        changeScheduleStatus={changeScheduleStatus}
                      />
                    );
                  }
                  return null;
                })}
              <PlusTodoBtn
                setIsModalOpen={setIsModalOpen}
                setStatus={setStatus}
                filterName={"done"}
              />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
