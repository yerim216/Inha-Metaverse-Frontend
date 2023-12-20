import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/modules/CreateProject.module.css";
import { useNavigate } from "react-router-dom";
import { getSkills, getUserInfo, getUserInterested } from "../APIs/userinfo";
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
import Footer from "../components/Footer";

export default function CreateProject() {
  const [inputs, setInputs] = useState({
    projectName: "",
    teamName: "",
    introduction: "",
    description: "",
  });

  // "역할" 탭에 존재하는 데이터를 받기 위한 state.
  const [role, setRole] = useState("");

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
      if (inputs.description.length >= 2000) {
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

  // 모집 분야 리스트 : 프로젝트 분야와는 다름. 혼동 주의
  const [jobs, setJobs] = useState();
  useEffect(() => {
    getJobs().then((res) => {
      setJobs(res.data);
    });
  }, []);

  // jobCategory와 selectedJobCategory.
  // selectedJobCategory는 기획/개발/디자인 이렇게 세 개가 존재할 수 있으며, 이것들이 변경될 때마다 useEffect를 이용해 하위 job(ex: 기획 -> 프로덕트 기획, 개발 기획)을 동적으로 보여 줌.
  // 선택된 하위 job은 jobsToShow에 할당됨.
  const [jobCategory, setJobCategory] = useState(["기획", "개발", "디자인"]);
  const [selectedJobCategory, setSelectedJobCategory] = useState("기획");
  const [jobsToShow, setJobsToShow] = useState([]);

  // 현재 모집 섹션 내에 있는 '분야'에 대한 정보. 우측 하단의 '추가하기' 버튼을 누르면 이 정보가 그대로 전달된다.
  const [jobInput, setJobInput] = useState({
    category: "",
    title: "",
    recruitmentNum: 1,
  });

  // 현재 선택된 분야에 대한 정보. 카드 형태로 하단에 보여지게 된다.
  const [selectedJobInputs, setSelectedJobInputs] = useState([]);
  const handleAddSelectedJobInput = () => {
    // 만약 기존에 selected된 값(title)이 존재할 경우, 예외 처리
    const isDuplicated = selectedJobInputs.some(function (selectedJobInput) {
      return selectedJobInput.title === jobInput.title;
    });
    if (isDuplicated) {
      alert("중복된 분야는 추가할 수 없습니다!");
      return;
    }

    let newArr = [...selectedJobInputs];
    newArr.push(jobInput);
    setSelectedJobInputs(newArr);

    if (recruitmentRef.current) {
      recruitmentRef.current.value = 1;
    }
  };
  const deleteSelectedJobInput = (jobTitle) => {
    let newArr = [...selectedJobInputs];
    newArr = newArr.filter((selectedJobInput) => {
      return selectedJobInput.title !== jobTitle;
    });
    setSelectedJobInputs(newArr);
  };

  // job Category가 변경될 때, 0번째 하위 job이 아닌 기존 순서로 하위 job값이 변경되는 오류 발생. 추가적인 조치 취해주었음.
  const jobSelectRef = useRef();
  const recruitmentRef = useRef();

  useEffect(() => {
    if (!jobsToShow) return;
    if (!selectedCategory) return;

    if (jobSelectRef.current) {
      jobSelectRef.current.value = 0;
      handleJobInputTitle();
    }
  }, [jobsToShow, selectedJobCategory]);

  // jobInputTitle을 변경하는 함수
  const handleJobInputTitle = () => {
    if (
      jobSelectRef.current &&
      jobSelectRef.current.options.selectedIndex >= 0
    ) {
      let newJobInput = { ...jobInput };
      newJobInput.title =
        jobSelectRef.current.options[
          jobSelectRef.current.selectedIndex
        ].getAttribute("jobtitle");

      setRole(
        jobSelectRef.current.options[
          jobSelectRef.current.selectedIndex
        ].getAttribute("description")
      );
      setJobInput(newJobInput);
    }
  };

  const handleJobInputRecruitmentNum = (num) => {
    let newJobInput = { ...jobInput };
    newJobInput.recruitmentNum = num;

    setJobInput(newJobInput);
  };

  useEffect(() => {
    let newJobInput = { ...jobInput };
    newJobInput.category = selectedJobCategory;
    setJobInput(newJobInput);
  }, [selectedJobCategory]);

  // 상위 카테고리(기획 / 개발 / 디자인)이 변할 경우, 동적으로 하위 job을 변경해주어야 한다.
  useEffect(() => {
    if (!jobs) return;

    let newJobsToShow = [];
    jobs.map((job) => {
      if (job.job_category === selectedJobCategory) newJobsToShow.push(job);
    });

    setJobsToShow(newJobsToShow);
  }, [jobs, selectedJobCategory]);

  // 기술 스택 리스트
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    getSkills().then((res) => setSkills(res.data));
  }, []);
  // 스킬 검색창
  const [skillSearch, setSkillSearch] = useState("");
  // 검색 결과에 따른 필터링된 스킬 리스트
  const [filteredSkills, setFilteredSkills] = useState([]);
  useEffect(() => {
    if (skills.length === 0) return;

    setFilteredSkills(skills);
  }, [skills]);
  // 입력한 skillSearch값에 따른 필터링을 구현하기 위한 메소드
  const getContains = (skillName) => {
    if (skillSearch === "") return true;
    if (skillSearch.length > skillName.length) return false;

    let step;
    for (step = 0; step < skillSearch.length; step++) {
      if (skillName[step].toUpperCase() !== skillSearch[step].toUpperCase())
        return false;
    }
    return true;
  };
  useEffect(() => {
    let filtered = [];
    if (skills) {
      skills.map((skill) => {
        const res = getContains(skill.skill_name);
        if (res) filtered.push(skill);
      });
    }
    setFilteredSkills(filtered);
  }, [skillSearch]);

  // 선택된 기술 스택 리스트
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleAddSelectedSkill = (skill) => {
    if (selectedSkills.length >= 5) {
      setErrorMessages((cur) => {
        return { ...cur, skill: "최대 6개까지 선택 가능합니다." };
      });
    }

    if (selectedSkills.length >= 6) return;

    var isAlreadyExist = selectedSkills.some((sk) => {
      return sk.skill_index === skill.skill_index;
    });
    if (isAlreadyExist) return;

    let newArr = [...selectedSkills];
    newArr.push(skill);
    setSelectedSkills(newArr);
  };

  const handleDeleteSelectedSkill = (skillIndex) => {
    let newArr = [...selectedSkills];
    newArr = newArr.filter((skill) => skill.skill_index !== skillIndex);
    setSelectedSkills(newArr);
  };

  // 에러메세지들 관련 state
  const [errorMessages, setErrorMessages] = useState({
    projectName: "",
    teamName: "",
    category: "",
    introduction: "",
    description: "",
    skill: "",
  });

  const navigate = useNavigate();

  const getUserName = async () => {
    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return Promise.resolve();
    }

    const userIndex = JSON.parse(localStorage.getItem("recoil-persist"))
      .userState.user_index;
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

  const handleSubmit = () => {
    // inputs에는 projectName, teamName, introduction, description 존재.

    let inputData = {
      leader: userIndex,
      name: inputs.teamName,
      project: inputs.projectName,
      categories: selectedCategory,
      introduction: inputs.introduction,
      description: inputs.description,
      jobs: selectedJobInputs,
      skills: selectedSkills,
    };

    createTeam({ inputData })
      .then((res) => {
        // console.log(res.data);
        alert("성공적으로 처리되었습니다!");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleClickSave = () => {};

  const textareaRef = useRef();
  const handleResize = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

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
            className={`w-[600px] h-[400px] rounded-[50px] px-[130px] py-20 flex flex-col justify-between items-center
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
                  handleSubmit();
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
              className="rounded-md font-medium w-full resize-none px-12 py-10 outline-none max-h-[920px] mt-8"
              ref={textareaRef}
              style={{
                backgroundColor: tm.inputBg,
                color: tm.textColor,
              }}
              value={inputs.description}
              onChange={(e) => {
                handleResize();
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
              className={`h-[600px] rounded-[20px] border-2 flex relative ${styles.shadow}`}
              style={{
                borderColor: themeMode === "dark" ? "#7C7C7C" : "#FFF",
              }}
            >
              {/* 분야, 스킬 표기 박스 */}
              <div className="w-[55%] h-5/6 flex flex-col justify-between">
                <div
                  className={styles.recruitmentBox_leftArea}
                  style={{
                    color: tm.textColor,
                  }}
                >
                  <h3
                    className={styles.recruitmentBox_title}
                    style={{
                      color: tm.textColor,
                    }}
                  >
                    분야
                  </h3>
                  <div
                    className={`${styles.recruitmentBox_inputBox} flex justify-between items-center relative pl-6`}
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  >
                    <select
                      className="w-[100%] h-full bg-transparent outline-none appearance-none"
                      onChange={(e) => {
                        setSelectedJobCategory(e.target.value);
                      }}
                    >
                      {jobCategory.map((jobcategory) => (
                        <option>{jobcategory}</option>
                      ))}
                    </select>
                    <img
                      src={`public_assets/icons/downArrow_${themeMode}.svg`}
                      alt="downArrow"
                      className="w-5 h-5 absolute right-6"
                    />
                  </div>
                  <div
                    className={`${styles.recruitmentBox_inputBox} flex gap-6`}
                  >
                    <div
                      className="w-3/5 rounded-[10px] flex justify-between items-center pl-6 relative"
                      style={{
                        backgroundColor: tm.inputBg,
                      }}
                    >
                      <select
                        className="w-[100%] h-full bg-transparent outline-none appearance-none"
                        onChange={() => {
                          handleJobInputTitle();
                        }}
                        ref={jobSelectRef}
                      >
                        {jobsToShow &&
                          jobsToShow.map((jobtoShow, idx) => (
                            <option
                              value={idx}
                              jobtitle={jobtoShow.job_title}
                              description={jobtoShow.description}
                            >
                              {jobtoShow.job_title}
                            </option>
                          ))}
                      </select>
                      <img
                        src={`public_assets/icons/downArrow_${themeMode}.svg`}
                        alt="downArrow"
                        className="w-5 h-5 absolute right-6"
                      />
                    </div>
                    <div
                      className="w-2/5 rounded-[10px] flex justify-between items-center relative pl-6"
                      style={{
                        backgroundColor: tm.inputBg,
                      }}
                    >
                      <select
                        ref={recruitmentRef}
                        className="w-[100%] h-full bg-transparent outline-none appearance-none"
                        onChange={(e) => {
                          handleJobInputRecruitmentNum(
                            parseInt(e.target.value)
                          );
                        }}
                      >
                        <option value={1}>1명</option>
                        <option value={2}>2명</option>
                        <option value={3}>3명</option>
                        <option value={4}>4명</option>
                        <option value={5}>5명</option>
                        <option value={6}>6명</option>
                        <option value={7}>7명</option>
                        <option value={8}>8명</option>
                        <option value={9}>9명</option>
                      </select>
                      <img
                        src={`public_assets/icons/downArrow_${themeMode}.svg`}
                        alt="downArrow"
                        className="w-5 h-5 absolute right-6"
                      />
                    </div>
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
                  <input
                    className={`${styles.recruitmentBox_inputBox} px-6 font-medium`}
                    style={{
                      backgroundColor: tm.inputBg,
                      color: tm.textColor,
                    }}
                    value={skillSearch}
                    onChange={(e) => {
                      setSkillSearch(e.target.value);
                    }}
                  ></input>
                  <div
                    className={`${styles.recruitmentBox_inputBox} overflow-x-auto overflow-y-hidden flex items-center gap-2 px-2`}
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  >
                    {filteredSkills &&
                      filteredSkills.map((skill) => {
                        return (
                          <button
                            className="rounded-[10px] h-[80%] px-4 font-semibold"
                            style={{
                              color: tm.textColor,
                              backgroundColor: tm.bg,
                            }}
                            onClick={() => {
                              handleAddSelectedSkill(skill);
                            }}
                          >
                            {skill.skill_name}
                          </button>
                        );
                      })}
                  </div>
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
                    역할
                  </h3>
                  <div
                    style={{
                      backgroundColor: tm.inputBg,
                      color: tm.textColor,
                    }}
                    className="w-full h-5/6 mt-5 rounded-[10px] py-4 px-6 text-lg font-medium"
                  >
                    {role}
                  </div>
                </div>
                <div className={`w-full h-1/2 px-14 pt-20`}>
                  <div
                    className="wfull h-[145px] rounded-[10px]"
                    style={{
                      backgroundColor: tm.inputBg,
                    }}
                  >
                    <div className="grid grid-cols-3 grid-rows-2 place-items-center w-full h-full">
                      {selectedSkills &&
                        selectedSkills.map((skill) => (
                          <button
                            className="flex items-center gap-4"
                            onClick={() => {
                              handleDeleteSelectedSkill(skill.skill_index);
                              setErrorMessages((cur) => {
                                return { ...cur, skill: "" };
                              });
                            }}
                          >
                            <img
                              src={`/public_assets/skills/skill_img_${skill.skill_index}.svg`}
                              alt={`skill_img_${skill.skill_index}`}
                              className="w-12 h-12"
                            />
                            <span
                              className="font-bold"
                              style={{
                                color: tm.textColor,
                              }}
                            >
                              x
                            </span>
                          </button>
                        ))}
                    </div>
                    <ErrorMsg errMsg={errorMessages.skill} />
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
                onClick={() => {
                  handleAddSelectedJobInput();
                }}
              >
                추가하기
              </button>
            </div>
            {/* 선택한 분야 표기 박스 */}
            <div className="w-full mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
              {selectedJobInputs &&
                selectedJobInputs.map((selectedJobInput) => (
                  <CategoryCard
                    selectedJobInput={selectedJobInput}
                    deleteSelectedJobInput={deleteSelectedJobInput}
                  />
                ))}
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
              if (
                inputs.teamName.trim() === "" ||
                inputs.projectName.trim() === "" ||
                inputs.introduction.trim() === "" ||
                inputs.description.trim() === ""
              ) {
                alert(
                  "입력되지 않은 정보가 존재합니다(프로젝트 분야, 모집 제외). 다시 확인해주세요!"
                );
                return;
              }

              openJudgeModal();
              e.preventDefault();
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
      <Footer />
    </>
  );
}
