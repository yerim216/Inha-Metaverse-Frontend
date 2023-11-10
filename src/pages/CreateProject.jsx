import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/modules/CreateProject.module.css";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../APIs/userinfo";
import { addJob, addMember, createTeam, getJobs } from "../APIs/team";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import Nav from "../components/Nav";
import FieldBtn from "../components/FieldBtn";

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
  const [fields, setFields] = useState([
    "패션",
    "리사이클링",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
    "패션",
  ]);

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

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
    blockScroll();
  };
  const closeSignInModal = () => {
    setSignInModalOpen(false);
    freeScroll();
  };

  // 회원가입창 팝업 관리 state
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    blockScroll();
  };
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
    freeScroll();
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

  return (
    <>
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
              className="w-5/6 pb-8"
              style={{
                borderColor: tm.border,
              }}
            >
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
          className="flex items-center gap-6 border-b pb-20"
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
            <div className="w-5/6">
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
          className="flex items-center gap-6 border-b pb-20"
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
            <div className="w-full px-4">
              {/* 여기에 분야들 보여주기, 현재는 없어서 */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-6 mt-8">
                {fields &&
                  fields.map((field) => (
                    <FieldBtn
                      fieldName={field}
                      btnBg={tm.fieldBtnBg}
                      textColor={tm.textColor}
                    />
                  ))}
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
          <div className="w-full px-4">
            <input
              style={{
                color: tm.textColor,
                backgroundColor: tm.inputBg,
              }}
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

        <div className="w-full">
          <div
            className={`${styles.middleFont} w-1/6`}
            style={{
              color: tm.textColor,
            }}
          >
            프로젝트 설명
          </div>
          <div
            className="w-full px-4 border-b pb-16"
            style={{
              borderColor: tm.border,
            }}
          >
            <textarea
              className="rounded-md font-medium w-full resize-none px-12 py-10 outline-none h-[920px] mt-8"
              style={{
                backgroundColor: tm.inputBg,
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

        <div className="flex w-full">
          <div
            className={`${styles.middleFont} w-1/5`}
            style={{
              color: tm.textColor,
            }}
          >
            모집
          </div>
          <div className="w-4/5 flex flex-col gap-8">
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
          </div>
        </div>
        <div className="flex w-full justify-end gap-8 mt-36">
          <button
            className={styles.changeBtn}
            style={{
              backgroundColor: tm.createBtn,
              color: tm.btnText,
            }}
            onClick={async (e) => {
              e.preventDefault();
              console.log(checkRecruitmentNumSame());
              if (!checkRecruitmentNumSame()) {
                alert(
                  "모집 인원과 실제 직무 상의 인원이 일치하지 않습니다. 다시 확인해주세요!"
                );
                return;
              }
              const returnVal = window.confirm("해당 팀을 개설하시겠습니까?");
              if (returnVal === true) {
                const userIndex = JSON.parse(
                  localStorage.getItem("recoil-persist")
                ).userState.user_index;
                const teamName = await createTeam(userIndex, inputs);
                if (handleAddJob(teamName) && handleAddCustomJob(teamName)) {
                  alert("팀이 성공적으로 생성되었습니다!");
                  navigate("/");
                } else alert("예상치 못한 오류가 발생했습니다!");
              }
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
