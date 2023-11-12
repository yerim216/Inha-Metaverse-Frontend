import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/modules/CreateProject.module.css";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../APIs/userinfo";
import {
  addJob,
  addMember,
  createTeam,
  getJobs,
  getProjectCategory,
} from "../APIs/team";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import Nav from "../components/Nav";
import ErrorMsg from "../components/ErrorMsg";
import CategoryBtn from "../components/CategoryBtn";
import CategoryCard from "../components/CategoryCard";

export default function CreateProject() {
  // 팀 이름, 팀 소개, 프로젝트 설명, 모집 인원
  // 팀 구성원 추가
  // 팀 기술스택 추가
  // const [user, setUser] = useRecoilState(userState);
  // const [isOpen, setIsOpen] = useState(false);

  // 프로젝트명, 팀명, 프로젝트 한줄 소개, 프로젝트 설명 란.
  // 프로젝트 분야, 모집 관련 정보는 별도의 state로 관리함.
  const [inputs, setInputs] = useState({
    projectName: "",
    teamName: "",
    introduction: "",
    description: "",
  });
  const handleErrorMsg = (inputName) => {
    if (inputName === "projectName") {
      if (inputs.projectName.length >= 20) {
        setErrorMessages((cur) => {
          return {
            ...cur,
            projectName: "20자를 넘길 수 없습니다.",
          };
        });
      } else {
        setErrorMessages((cur) => {
          return {
            ...cur,
            projectName: "",
          };
        });
      }
    } else if (inputName === "teamName") {
      if (inputs.teamName.length >= 20) {
        setErrorMessages((cur) => {
          return {
            ...cur,
            teamName: "20자를 넘길 수 없습니다.",
          };
        });
      } else {
        setErrorMessages((cur) => {
          return {
            ...cur,
            teamName: "",
          };
        });
      }
    } else if (inputName === "introduction") {
      if (inputs.introduction.length >= 50) {
        setErrorMessages((cur) => {
          return {
            ...cur,
            introduction: "50자를 넘길 수 없습니다.",
          };
        });
      } else {
        setErrorMessages((cur) => {
          return {
            ...cur,
            introduction: "",
          };
        });
      }
    } else if (inputName === "description") {
      if (inputs.description.length >= 50) {
        setErrorMessages((cur) => {
          return {
            ...cur,
            description: "2000자를 넘길 수 없습니다.",
          };
        });
      } else {
        setErrorMessages((cur) => {
          return {
            ...cur,
            description: "",
          };
        });
      }
    }
  };
  useEffect(() => {
    handleErrorMsg("projectName");
    handleErrorMsg("teamName");
    handleErrorMsg("introduction");
    handleErrorMsg("description");
  }, [inputs]);

  // 프로젝트 분야
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getProjectCategory().then((res) => setCategory(res.data));
  }, []);
  // 선택된 프로젝트 분야
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
    if (selectedCategory.length >= 3) {
      setErrorMessages((cur) => {
        return {
          ...cur,
          category: "최대 3개까지 선택 가능합니다.",
        };
      });
      return;
    } else
      setErrorMessages((cur) => {
        return {
          ...cur,
          category: "",
        };
      });
  }, [selectedCategory]);

  // 모집 분야 : 프로젝트 분야와는 다름. 혼동 주의
  const [category2, setCategory2] = useState([]);

  // db에서 모집 분야 받아 옴.
  useEffect(() => {
    setCategory2([
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
      "ㅎㅇ",
    ]);
  }, []);

  const [selectedCategory2, setSelectedCategory2] = useState([
    { t1: "기획", t2: "서비스 기획", t3: 1 },
    { t1: "기획", t2: "서비스 기획", t3: 1 },
    { t1: "기획", t2: "서비스 기획", t3: 1 },
  ]);

  // 에러메세지들 관련 state
  const [errorMessages, setErrorMessages] = useState({
    projectName: "",
    teamName: "",
    category: "",
    introduction: "",
    description: "",
  });

  // const [inputs, setInputs] = useState({
  //   name: "",
  //   introduction: "",
  //   description: "",
  //   recruitment: 1,
  // });
  const navigate = useNavigate();

  // const onClickButton = () => {
  //   setIsOpen(true);
  // };

  const getUserName = async () => {
    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return Promise.resolve();
    }

    const userIndex = JSON.parse(localStorage.getItem("recoil-persist"))
      .userState.user_index;
    console.log(userIndex);

    const userInfo = (await getUserInfo(userIndex)).data[0].user_name;
    return userInfo;
  };

  const addTeamMember = async (teamName) => {
    const userName = await getUserName();
    addMember(teamName, userName)
      .then(() => {})
      .catch((error) => {
        console.error("Error add team member:", error);
      });
  };

  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
    document.body.style.backgroundColor = "white";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";

    // 다크모드와 화이트모드 다르게 설정 필요
    document.body.style.backgroundColor = "#111111";
  };

  const handleButtonClick = () => {
    window.location.href = "/myprofile";
  };

  const [jobs, setJobs] = useState();
  useEffect(() => {
    getJobs().then((res) => {
      setJobs(res.data);
    });
  }, []);

  // skill값 하나하나에 대응되는 input값에 접근해야 하기 때문에, ref를 이용해 동적으로 해당 input값들 관리.
  const inputRefs = useRef({});
  useEffect(() => {
    if (!jobs) return;

    jobs.forEach((job) => {
      if (!inputRefs.current[job.field_title]) {
        inputRefs.current[job.field_title] = React.createRef();
      }
    });
    setInputRefsReady(true);
  }, [jobs]);
  const [inputRefsReady, setInputRefsReady] = useState(false);

  const handleAddJob = (teamName) => {
    // jobName + inputRefs.current[jobName].current.value를 통해 각각 값 접근 가능.
    jobs.map((job) => {
      const jobName = job.field_title;
      if (inputRefs.current[jobName].current.value >= 1) {
        addJob(teamName, jobName, inputRefs.current[jobName].current.value)
          .then(() => {})
          .catch((err) => {
            return false;
          });
      }
    });
    return true;
  };

  const [customPositionInputNum, setCustomPositionInputNum] = useState(0);
  const handleCustomPositionInputNumInc = () => {
    setCustomJobs((cur) => [...cur, { customJobName: "", recruitmentNum: 1 }]);
    setCustomPositionInputNum((cur) => cur + 1);
  };
  // 커스텀 직무를 관리하는 곳.
  // customPositionInputNum이 1 증가할 때마다, 아래의 customJobs 배열에 객체 하나가 추가된다.
  // 객체는 customJobName, recruitmentNum으로 구성됨.
  const [customJobs, setCustomJobs] = useState([]);

  const handleAddCustomJob = (teamName) => {
    customJobs.map((info) => {
      const jobName = info.customJobName;
      const recruitmentNum = info.recruitmentNum;

      if (jobName.trim() !== "" && recruitmentNum >= 1) {
        addJob(teamName, jobName, recruitmentNum)
          .then(() => {})
          .catch((err) => {
            return false;
          });
      }
    });
    return true;
  };

  // 모집 인원과, 밑에 작성한 실제 직무 상에서의 모집 인원과 일치하는지의 여부를 판단하는 함수
  const checkRecruitmentNumSame = () => {
    const recruitmentNum = inputs.recruitment;
    let rec = 0;

    jobs.map((job) => {
      const jobName = job.field_title;
      rec += Number(inputRefs.current[jobName].current.value);
    });

    customJobs.map((info) => {
      rec += Number(info.recruitmentNum);
    });

    if (Number(recruitmentNum) === Number(rec)) return true;
    return false;
  };

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.createProject);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.createProject);
    else setTm(theme.darkTheme.createProject);
  }, [themeMode]);

  // 심사신청 모달 창
  const [judgeModalOpen, setJudgeModalOpen] = useState(false);
  const openJudgeModal = () => {
    setJudgeModalOpen(true);
    blockScroll();
  };
  const closeJudgeModal = () => {
    setJudgeModalOpen(false);
    freeScroll();
  };

  const modalRef = useRef();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeJudgeModal();
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      {judgeModalOpen && (
        <div
          className={`${
            judgeModalOpen ? "openModal modal" : "modal"
          } flex justify-center items-center`}
        >
          <div
            ref={modalRef}
            className={`w-[600px] h-2/5 rounded-[50px] px-[130px] py-20 flex flex-col justify-between items-center
            ${themeMode === "light" && styles.shadow}
            ${themeMode !== "light" && "border border-gray-500"}
          `}
            style={{
              backgroundColor: tm.bg,
            }}
          >
            <h2
              className="font-bold text-[32px]"
              style={{
                color: tm.textColor,
              }}
            >
              심사를 신청하시겠습니까?
            </h2>
            <pre
              className="text-center font-normal text-[16px] -mt-6"
              style={{
                color: tm.hazyText,
              }}
            >
              {
                "심사는 2-3일 내로 처리되며,\n승인되면 프로젝트가 올라갑니다.\n베타 서비스 중에는, 바로 프로젝트 제작이 완료됩니다."
              }
            </pre>
            <div className="flex w-full justify-between">
              <button
                className="w-[130px] h-[70px] rounded-[40px] text-xl font-bold hover:scale-[103%]"
                style={{
                  color: tm.accentBtnText,
                  backgroundColor: tm.accentColor,
                }}
                onClick={() => {
                  // 여기서 신청 처리
                }}
              >
                네
              </button>
              <button
                className="w-[130px] h-[70px] rounded-[40px] text-xl font-bold hover:scale-[103%]"
                style={{
                  color: tm.accentBtnText,
                  backgroundColor: tm.cancelBtn,
                }}
                onClick={() => {
                  closeJudgeModal();
                }}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
      <Nav />
      <section
        className={styles.paddingSection}
        style={{
          backgroundColor: tm.bg,
        }}
      >
        <div className="flex items-center gap-6">
          <div className="flex w-full">
            <div
              className={`${styles.middleFont} w-1/6`}
              style={{
                color: tm.textColor,
              }}
            >
              프로젝트명
            </div>
            <div
              className="w-5/6 pb-8 relative"
              style={{
                borderColor: tm.border,
              }}
            >
              <ErrorMsg errMsg={errorMessages.projectName} />
              <input
                style={{
                  color: tm.textColor,
                  backgroundColor: tm.inputBg,
                }}
                type="text"
                className="rounded-md font-medium p-2 w-full"
                value={inputs.projectName}
                placeholder="내용을 입력해주세요."
                maxLength={20}
                onChange={(e) => {
                  setInputs((cur) => {
                    return { ...cur, projectName: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-6 border-b pb-12"
          style={{
            borderColor: tm.border,
          }}
        >
          <div className="flex w-full">
            <div
              className={`${styles.middleFont} w-1/6`}
              style={{
                color: tm.textColor,
              }}
            >
              팀명
            </div>
            <div className="w-5/6 relative pb-8">
              <ErrorMsg errMsg={errorMessages.teamName} />
              <input
                style={{
                  color: tm.textColor,
                  backgroundColor: tm.inputBg,
                }}
                type="text"
                className="rounded-md font-medium p-2 w-full"
                value={inputs.teamName}
                placeholder="내용을 입력해주세요."
                maxLength={20}
                onChange={(e) => {
                  setInputs((cur) => {
                    return { ...cur, teamName: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-6 border-b pb-12"
          style={{
            borderColor: tm.border,
          }}
        >
          <div className="w-full">
            <div
              className={`${styles.middleFont} w-1/6`}
              style={{
                color: tm.textColor,
              }}
            >
              프로젝트 분야
            </div>
            <div className="w-full px-4 relative pb-8">
              <ErrorMsg errMsg={errorMessages.category} />
              {/* 여기에 분야들 보여주기, 현재는 없어서 */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-6 mt-8">
                {category &&
                  category.map((category) => {
                    return (
                      <CategoryBtn
                        categoryName={category.category_name}
                        categoryIndex={category.category_index}
                        selected={selectedCategory.some(
                          (obj) =>
                            obj.category_index === category.category_index
                        )}
                        handleAddCategory={() => {
                          if (selectedCategory.length >= 3) return;

                          setSelectedCategory((cur) => {
                            return [...cur, category];
                          });
                        }}
                        handleDeleteCategory={(index) => {
                          setSelectedCategory((cur) => {
                            return cur.filter(
                              (category) => category.category_index !== index
                            );
                          });
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div
            className={`${styles.middleFont}`}
            style={{
              color: tm.textColor,
            }}
          >
            프로젝트 한줄 소개
          </div>
          <div className="w-full px-4 relative pb-8">
            <ErrorMsg errMsg={errorMessages.introduction} />
            <input
              style={{
                color: tm.textColor,
                backgroundColor: tm.inputBg,
              }}
              placeholder="내용을 입력해주세요."
              maxLength={50}
              type="text"
              className="rounded-md font-medium p-2 w-full px-12 py-10 mt-8"
              value={inputs.introduction}
              onChange={(e) => {
                setInputs((cur) => {
                  return { ...cur, introduction: e.target.value };
                });
              }}
            />
          </div>
        </div>

        <div
          className="w-full border-b pb-8"
          style={{
            borderColor: tm.border,
          }}
        >
          <div
            className={`${styles.middleFont} w-1/6`}
            style={{
              color: tm.textColor,
            }}
          >
            프로젝트 설명
          </div>
          <div className="w-full px-4 pb-8 relative">
            <ErrorMsg errMsg={errorMessages.description} />
            <textarea
              placeholder="내용을 입력해주세요."
              maxLength={2000}
              className="rounded-md font-medium w-full resize-none px-12 py-10 outline-none h-[920px] mt-8"
              style={{
                backgroundColor: tm.inputBg,
                color: tm.textColor,
              }}
              value={inputs.description}
              onChange={(e) => {
                setInputs((cur) => {
                  return { ...cur, description: e.target.value };
                });
              }}
            ></textarea>
          </div>
        </div>

        <div className="w-full">
          <div
            className={`${styles.middleFont} w-1/5`}
            style={{
              color: tm.textColor,
            }}
          >
            모집
          </div>
          <div className="w-full px-4 pt-8">
            {/* 분야 / 스킬 / 역할 박스 */}
            <div
              className={`h-[600px] rounded-[20px] flex relative ${styles.shadow}`}
            >
              {/* 분야, 스킬 표기 박스 */}
              <div className="w-[55%] h-5/6 flex flex-col justify-between">
                <div className={styles.recruitmentBox_leftArea}>
                  <h3
                    className={styles.recruitmentBox_title}
                    style={{
                      color: tm.textColor,
                    }}
                  >
                    분야
                  </h3>
                  <div
                    className={styles.recruitmentBox_inputBox}
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  ></div>
                  <div
                    className={`${styles.recruitmentBox_inputBox} flex gap-6`}
                  >
                    <div
                      className="w-3/5 bg-red-50 rounded-[10px]"
                      style={{
                        backgroundColor: tm.inputBg,
                      }}
                    ></div>
                    <div
                      className="w-2/5 bg-red-50 rounded-[10px]"
                      style={{
                        backgroundColor: tm.inputBg,
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.recruitmentBox_leftArea}>
                  <h3
                    className={styles.recruitmentBox_title}
                    style={{
                      color: tm.textColor,
                    }}
                  >
                    스킬
                  </h3>
                  <div
                    className={styles.recruitmentBox_inputBox}
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  ></div>
                  <div
                    className={styles.recruitmentBox_inputBox}
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  ></div>
                </div>
              </div>
              {/* 역할 박스 */}
              <div className="w-[45%] h-5/6 flex flex-col justify-between relative">
                <div className={styles.recruitmentBox_rightArea}>
                  <h3
                    className={styles.recruitmentBox_title}
                    style={{
                      color: tm.textColor,
                    }}
                  >
                    분야
                  </h3>
                  <div
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                    className="w-full h-5/6 mt-5 rounded-[10px]"
                  ></div>
                </div>
                <div className={`w-full h-1/2 px-14 pt-20`}>
                  <div
                    className="wfull h-[145px] rounded-[10px]"
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  >
                    <ErrorMsg errMsg={errorMessages.projectName} />
                  </div>
                </div>
              </div>
              {/* 추가하기 버튼 */}
              <button
                className="absolute right-12 bottom-8 font-bold text-xl w-[150px] h-12 rounded-3xl hover:scale-[103%]"
                style={{
                  color: tm.btnText,
                  backgroundColor: tm.createBtn,
                }}
              >
                추가하기
              </button>
            </div>
            {/* 선택한 분야 표기 박스 */}
            <div className="w-full mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
              {selectedCategory2 &&
                selectedCategory2.map((category2) => (
                  <CategoryCard category2={category2} />
                ))}
            </div>
          </div>
          {/* <div className="w-4/5 flex flex-col gap-8">
            <div className="w-1/12 flex items-center gap-3">
              <input
                style={{
                  color: tm.textColor,
                  backgroundColor: tm.inputBg,
                }}
                type="number"
                className="rounded-md font-medium p-2 w-full"
                value={inputs.recruitment}
                onChange={(e) => {
                  setInputs((cur) => {
                    return {
                      ...cur,
                      recruitment: e.target.value < 0 ? 0 : e.target.value,
                    };
                  });
                }}
              />
              <span
                className="text-[22px]"
                style={{
                  color: tm.textColor,
                }}
              >
                명
              </span>
            </div>
            <div
              className={styles.skillsContainer}
              style={{
                borderColor: tm.textColor,
              }}
            >
              {inputRefsReady &&
                jobs.map((job) => {
                  return (
                    <div className="flex justify-between items-center mb-6 gap-3">
                      <div
                        className="text-white w-2/3"
                        style={{
                          color: tm.textColor,
                        }}
                      >
                        {job.field_title}
                      </div>
                      <div className="flex gap-2 items-center w-1/3">
                        <input
                          style={{
                            color: tm.textColor,
                            backgroundColor: tm.inputBg,
                          }}
                          type="number"
                          className={`w-2/3 p-1 rounded-md font-medium`}
                          defaultValue={0}
                          onChange={(e) => {
                            if (e.target.value < 0) e.target.value = 0;
                          }}
                          ref={inputRefs.current[job.field_title]}
                        />
                        <span
                          style={{
                            color: tm.textColor,
                          }}
                        >
                          명
                        </span>
                      </div>
                    </div>
                  );
                })}
              {Array(customPositionInputNum)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-6 gap-3"
                  >
                    <input
                      style={{
                        color: tm.textColor,
                        backgroundColor: tm.inputBg,
                      }}
                      type="text"
                      placeholder="모집 직무 직접 입력"
                      className="rounded-md font-medium p-1 w-2/3"
                      onChange={(e) => {
                        const newArr = [...customJobs];
                        newArr[index].customJobName = e.target.value;
                        setCustomJobs(newArr);
                      }}
                    />
                    <div className="flex gap-2 items-center w-1/3">
                      <input
                        style={{
                          color: tm.textColor,
                          backgroundColor: tm.inputBg,
                        }}
                        type="number"
                        className="w-2/3 p-1 rounded-md font-medium"
                        value={customJobs[index].recruitmentNum}
                        onChange={(e) => {
                          if (e.target.value < 0) return;

                          const newArr = [...customJobs];
                          newArr[index].recruitmentNum = e.target.value;
                          setCustomJobs(newArr);
                        }}
                      />
                      <span
                        style={{
                          color: tm.textColor,
                        }}
                      >
                        명
                      </span>
                    </div>
                  </div>
                ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCustomPositionInputNumInc();
                }}
                style={{
                  color: tm.textColor,
                }}
              >
                + 직접 입력
              </button>
            </div>
          </div> */}
        </div>
        <div className="flex w-full justify-end gap-8 mt-36">
          <button
            className={styles.changeBtn}
            style={{
              backgroundColor: tm.createBtn,
              color: tm.btnText,
            }}
            onClick={async (e) => {
              openJudgeModal();
              e.preventDefault();
              if (!checkRecruitmentNumSame()) {
                alert(
                  "모집 인원과 실제 직무 상의 인원이 일치하지 않습니다. 다시 확인해주세요!"
                );
                return;
              }
              // const returnVal = window.confirm("해당 팀을 개설하시겠습니까?");
              // if (returnVal === true) {
              //   const userIndex = JSON.parse(
              //     localStorage.getItem("recoil-persist")
              //   ).userState.user_index;
              //   const teamName = await createTeam(userIndex, inputs);
              //   if (handleAddJob(teamName) && handleAddCustomJob(teamName)) {
              //     alert("팀이 성공적으로 생성되었습니다!");
              //     navigate("/");
              //   } else alert("예상치 못한 오류가 발생했습니다!");
              // }
            }}
          >
            프로젝트 제작하기
          </button>
          <button
            className={styles.cancelBtn}
            style={{
              backgroundColor: tm.cancelBtn,
              color: tm.btnText,
            }}
            onClick={(e) => {
              e.preventDefault();
              const returnVal = window.confirm(
                "작업을 취소하고 되돌아가시겠습니까?"
              );
              if (returnVal === true) {
                window.history.back();
              }
            }}
          >
            취소
          </button>
        </div>
      </section>
    </>
  );
}
