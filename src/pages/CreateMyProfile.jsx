import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/CreateMyProfile.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import ErrorMsg from "../components/ErrorMsg";

import {
  getUserInfo,
  putUserCareer,
  putUserIntroduction,
  addInterested,
  getUserInterested,
  putUserImg,
  deleteUserInterest,
  putUserSkill,
  getSkills,
  deleteUserSkill,
  getUserCareer,
  putUserJob,
} from "../APIs/userinfo";

import Nav from "../components/Nav";
import ImageSelector from "../components/ImgSelectModal";

import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import { ca } from "date-fns/locale";
import Footer from "../components/Footer";

export default function CreateMyProfile() {
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIdx = userLogin.user_index;
  const [userData, setUsers] = useState([]);
  const [userProfileIdx, setUserProfileIdx] = useState(-1);
  const [openImgSelect, setOpenImgSelect] = useState(0);

  const [selectedSkill, setSelectedSkill] = useState([]);
  const [skills, setSkills] = useState([]); //전체 스킬 불러오기

  const [selectedJob, setSelectedJob] = useState("1");
  const [intro, setIntro] = useState("");
  //사용자가 선택한 카테고리
  const [selectedField, setSelectedField] = useState("기획");

  //전체 카테고리 목록
  const [field, setField] = useState([]); //전체 스킬 불러오기
  const [keys, setKey] = useState([]);
  const [planField, setPlanField] = useState(["기획"]); //전체 스킬 불러오기
  const [designField, setDesignField] = useState(["디자인"]); //전체 스킬 불러오기
  const [developField, setDevelopField] = useState(["개발"]); //전체 스킬 불러오기
  const [ectField, setEctField] = useState(["기타"]); //전체 스킬 불러오기

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.createProject);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [years, setYears] = useState([]);

  const [detailCareer, setDetailCareer] = useState([]);
  const [job, setJob] = useState("");
  const [syear, setSyear] = useState(new Date().getFullYear());
  const [smonth, setSmonth] = useState(new Date().getMonth() + 1);
  const [eyear, setEyear] = useState(new Date().getFullYear());
  const [emonth, setEmonth] = useState(new Date().getMonth() + 1);

  // 에러메세지들 관련 state
  const [errorMessages, setErrorMessages] = useState({
    userName: "이름은 변경할 수 없습니다.",
    jobName: "",
    category: "",
    introduction: "",
    description: "",
    skill: "",
  });

  const [userName, setUserName] = useState("");

  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.createProject);
    else setTm(theme.darkTheme.createProject);
  }, [themeMode]);

  const fetchData = () => {
    getUserInfo(userIdx).then(function (res) {
      setUsers(res.data[0]);
      setUserName(res.data[0].user_name);
      setIntro(res.data[0].user_introduction);
      setUserProfileIdx(res.data[0].user_img_index);
      setSelectedJob(res.data[0].user_job);
    });

    getUserCareer(userIdx).then(function (res) {
      const dateDifference = calculateDateDifference(
        res.data[0].start_year,
        res.data[0].start_month,
        res.data[0].end_year,
        res.data[0].end_month
      );

      setDetailCareer((detailCareer) => [
        [
          {
            job: res.data[0].career_content,
            syear: res.data[0].start_year,
            smonth: res.data[0].start_month,
            eyear: res.data[0].end_year,
            emonth: res.data[0].end_month,
            dateDifference: dateDifference,
          },
        ],
      ]);
    });
  };

  useEffect(() => {
    console.log(typeof job);
  }, [job]);
  const getField = () => {
    getUserInterested()
      .then(function (response) {
        console.log(response.data);

        const categories = response.data.map(({ field_category }) => ({
          field_category,
        }));
        // 중복 제외한 값으로 Set을 생성하고 다시 배열로 변환
        const uniqueCategories = [
          ...new Set(categories.map((category) => category.field_category)),
        ];

        // 중복을 제외한 값들을 객체 형태로 변환하여 state에 저장
        const uniqueCategoriesObjects = uniqueCategories.map((category) => ({
          field_category: category,
        }));

        const plannig = response.data
          .filter((obj) => obj.field_category === "기획")
          .map(({ field_index, field_title, field_description }) => ({
            field_index,
            field_title,
            field_description,
          }));
        console.log(plannig);
        // setPlanField([...planField, ...plannig]);
        if (field.length < 4)
          setField((field) => [...field, { 기획: plannig }]);

        const designs = response.data
          .filter((obj) => obj.field_category === "디자인")
          .map(({ field_index, field_title, field_description }) => ({
            field_index,
            field_title,
            field_description,
          }));
        // setDesignField([...designField, ...designs]);
        if (field.length < 4)
          setField((field) => [...field, { 디자인: designs }]);

        const develops = response.data
          .filter((obj) => obj.field_category === "개발")
          .map(({ field_index, field_title, field_description }) => ({
            field_index,
            field_title,
            field_description,
          }));
        // setDevelopField([...developField, ...develops]);
        if (field.length < 4)
          setField((field) => [...field, { 개발: develops }]);

        const etcs = response.data
          .filter((obj) => obj.field_category === "기타")
          .map(({ field_index, field_title, field_description }) => ({
            field_index,
            field_title,
            field_description,
          }));
        // setEctField(etcs);
        if (field.length < 4) setField((field) => [...field, { 기타: etcs }]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSkill = () => {
    getSkills()
      .then(function (res) {
        setSkills(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(planField);
  }, [planField]);

  useEffect(() => {
    console.log(field);
    //   const keys = field.map((item) => Object.keys(item));
    const key = field.reduce((accumulator, item) => {
      const itemKeys = Object.keys(item);
      return accumulator.concat(itemKeys);
    }, []);

    setKey(key);
    console.log(keys);
  }, [field]);

  useEffect(() => {
    fetchData();
    getField();
    getSkill();
  }, []);

  const handleSelectField = (event) => {
    setSelectedField(event.target.value);
  };

  const handleSelectJob = (event) => {
    setSelectedJob(event.target.value);
    console.log(event.target.value);
  };

  const handleSetCareer = (event) => {
    setJob(event.target.value);
    console.log(event.target.value);
    if (job !== "") {
      setErrorMessages((cur) => {
        return { ...cur, jobName: "" };
      });
    }
  };

  useEffect(() => {
    // 드롭다운에 표시할 연도의 범위를 계산
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;

    // 연도 배열 생성
    const yearArray = [];
    for (let year = startYear; year <= endYear; year++) {
      yearArray.push(year);
    }

    // 연도 배열을 상태에 설정
    setYears(yearArray);
  }, []);

  // 현재 월을 초기값으로 하는 state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // 월 변경 시 호출되는 이벤트 핸들러
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleCareerChange = () => {
    if (job === "") {
      setErrorMessages((cur) => {
        return { ...cur, jobName: "직장명을 입력하세요." };
      });
      return;
    }
    const dateDifference = calculateDateDifference(
      syear,
      smonth,
      eyear,
      emonth
    );

    setDetailCareer((detailCareer) => [
      ...detailCareer,
      [
        {
          job: job,
          syear: syear,
          smonth: smonth,
          eyear: eyear,
          emonth: emonth,
          dateDifference: dateDifference,
        },
      ],
    ]);
    setJob("");
    setSyear(new Date().getFullYear());
    setSmonth(new Date().getMonth() + 1);
    setEyear(new Date().getFullYear());
    setEmonth(new Date().getMonth() + 1);
  };

  const handleCareerDelete = (index) => {
    const arr = detailCareer.filter((_, idx) => {
      return index !== idx;
    });

    setDetailCareer(arr);
  };

  function calculateDateDifference(syear, smonth, eyear, emonth) {
    const startDate = new Date(syear, smonth - 1); // 월은 0부터 시작하므로 smonth에서 1을 빼줍니다.
    const endDate = new Date(eyear, emonth - 1);

    console.log(syear);
    // 날짜 차이 계산
    const timeDifference = endDate - startDate;

    // 차이를 기간으로 변환
    const monthsDifference = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24 * 30)
    ); // 평균 월 길이를 기준으로 계산
    const yearsDifference = Math.floor(monthsDifference / 12);

    return {
      years: yearsDifference,
      months: (monthsDifference % 12) + 1,
    };
  }

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
  const handleNameChange = () => {
    setErrorMessages((cur) => {
      return { ...cur, userName: "이름은 변경할 수 없습니다." };
    });
  };

  const handleClickSave = () => {
    putUserJob(userIdx, selectedJob)
      .then(function (res) {
        console.log("직무 저장 성공");
      })
      .catch(function (res) {
        console.log(res);
      });
    putUserIntroduction(userIdx, intro)
      .then(function (res) {
        console.log("자기소개 저장 성공");
      })
      .catch(function (res) {
        console.log(res);
      });
    putUserCareer(userIdx, job, syear, smonth, eyear, emonth)
      .then(function (res) {
        console.log("경력 저장 성공");
      })
      .catch(function (res) {
        console.log("경력 저장 실패" + res);
      });
    putUserSkill(userIdx, selectedSkills)
      .then(function (res) {
        console.log("스킬 저장 성공");
      })
      .catch(function (res) {
        console.log("스킬 저장 실패" + res);
      });
  };
  return (
    <>
      <div className={styles.wrap}>
        <Nav />
        <div className={styles.imgWrap}>
          <img
            className={styles.profileImgCss}
            src={`/public_assets/profileImg/profileImg_${userProfileIdx}.png`}
          />
          <span
            onClick={() => {
              setOpenImgSelect(1);
            }}
          >
            <ImageSelector
              userProfileIdx={userProfileIdx}
              setUserProfileIdx={setUserProfileIdx}
            />
          </span>
        </div>
        <div className={styles.topWrap}>
          <div className={styles.nameWrap}>
            <p className={styles.name} style={{ color: tm.textColor }}>
              닉네임
            </p>
            <input
              className={styles.inputBox}
              style={{
                background: tm.inputBg,
                color: tm.textColor,
                width: "80%",
              }}
              value={userName}
              onClick={() => handleNameChange()}
              placeholder="내용을 입력해주세요."
            ></input>
            <ErrorMsg errMsg={errorMessages.userName} />
          </div>
          <div className={styles.nameWrap}>
            <p className={styles.name} style={{ color: tm.textColor }}>
              분야
            </p>
            <select
              className={styles.inputBox}
              style={{
                background: tm.inputBg,
                color: tm.textColor,
                width: "45%",
              }}
              value={selectedField}
              onChange={handleSelectField}
            >
              {field.map((item, index) => {
                // 각 인덱스의 key 값을 가져옴
                const keys = Object.keys(item);

                return keys.map((key) => (
                  <option
                    key={index}
                    value={key}
                    style={{ color: tm.textColor }}
                  >
                    {key}
                  </option>
                ));
              })}
            </select>

            <select
              className={styles.inputBox}
              style={{
                background: tm.inputBg,
                color: tm.textColor,
                width: "35%",
              }}
              value={selectedJob}
              onChange={handleSelectJob}
            >
              {field.map((item, index) => {
                const keys = Object.keys(item); // item의 키들을 배열로 가져옴

                // selected와 일치하는 키를 찾음
                const selectedKey = keys.find((key) => key === selectedField);

                if (selectedKey) {
                  const selectedArray = item[selectedKey]; // 선택된 키의 값인 배열을 가져옴

                  return (
                    <>
                      {/* 선택된 배열을 순회하여 field_title을 화면에 보여줌 */}
                      {selectedArray.map((selectedItem, selectedIndex) => (
                        <option
                          key={selectedIndex}
                          value={selectedItem.field_index}
                        >
                          {selectedItem.field_title}
                          {/* 필요에 따라 다른 필드 정보를 여기에 추가 */}
                        </option>
                      ))}
                    </>
                  );
                }

                return null; // 선택된 키가 없는 경우 아무것도 렌더링하지 않음
              })}
            </select>
          </div>
        </div>

        <div className={styles.devideLine}></div>

        <div className={styles.introduction}>
          <p className={styles.name} style={{ color: tm.textColor }}>
            나를 소개해주세요
          </p>
          <input
            className={styles.inputBox}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            style={{
              background: tm.inputBg,
              color: tm.textColor,
              width: "88%",
              height: "500px",
              marginLeft: "2%",
            }}
            placeholder="내용을 입력해주세요."
          ></input>
        </div>

        <div className={styles.devideLine}></div>

        <div className={styles.careerWrap}>
          <p className={styles.name} style={{ color: tm.textColor }}>
            경력
          </p>
          <div className={styles.career}>
            <div className={styles.careerIn}>
              <p style={{ color: tm.textColor }}>직장명</p>
              <input
                className={styles.inputBox}
                style={{
                  background: tm.inputBg,
                  color: tm.textColor,
                  width: "90%",
                }}
                value={job}
                onChange={(event) => handleSetCareer(event)}
                placeholder="직장명을 입력해주세요."
              ></input>
              <ErrorMsg
                style={{ bottom: "-20px" }}
                errMsg={errorMessages.jobName}
              />
            </div>
            <div className={styles.careerIn}>
              <p style={{ color: tm.textColor }}>기간</p>
              <div className={styles.dateSelect}>
                <select
                  className={styles.inputBox}
                  value={syear}
                  onChange={(e) => setSyear(parseInt(e.target.value))}
                  style={{
                    width: "23%",
                    background: tm.inputBg,
                    color: tm.textColor,
                  }}
                >
                  {/* 연도 배열을 옵션으로 매핑하여 드롭다운에 표시 */}
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.inputBox}
                  id="monthDropdown"
                  value={smonth}
                  onChange={(e) => setSmonth(parseInt(e.target.value))}
                  style={{
                    width: "23%",
                    background: tm.inputBg,
                    color: tm.textColor,
                  }}
                >
                  {/* 1부터 12까지의 월을 옵션으로 보여줌 */}
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (month) => (
                      <option key={month} value={month}>
                        {month}월
                      </option>
                    )
                  )}
                </select>

                <select
                  className={styles.inputBox}
                  value={eyear}
                  onChange={(e) => setEyear(parseInt(e.target.value))}
                  style={{
                    width: "23%",
                    background: tm.inputBg,
                    color: tm.textColor,
                  }}
                >
                  {/* 연도 배열을 옵션으로 매핑하여 드롭다운에 표시 */}
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.inputBox}
                  id="monthDropdown"
                  value={emonth}
                  onChange={(e) => setEmonth(parseInt(e.target.value))}
                  style={{
                    width: "23%",
                    background: tm.inputBg,
                    color: tm.textColor,
                  }}
                >
                  {/* 1부터 12까지의 월을 옵션으로 보여줌 */}
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (month) => (
                      <option key={month} value={month}>
                        {month}월
                      </option>
                    )
                  )}
                </select>
                <img
                  className={styles.plusBtn}
                  onClick={() => handleCareerChange()}
                  src={`/public_assets/plusBtn.svg`}
                />
              </div>
            </div>
          </div>

          <div className={styles.resultWrap}>
            {detailCareer &&
              detailCareer.map((career, index) => {
                return (
                  <div className={styles.resultInner}>
                    <div
                      className={styles.result}
                      style={{ background: tm.inputBg, color: tm.textColor }}
                    >
                      <div
                        className={styles.jobName}
                        style={{ color: tm.textColor }}
                      >
                        {career[0].job}
                      </div>
                      <div className={styles.dateTxt}>
                        <div className={styles.txtWrap}>
                          <div
                            className={styles.jobDate}
                            style={{ color: tm.hazyText }}
                          >
                            {" "}
                            {career[0].syear}.
                          </div>
                          <div
                            className={styles.jobDate}
                            style={{ color: tm.hazyText }}
                          >
                            {" "}
                            {career[0].smonth} ~
                          </div>
                          <div
                            className={styles.jobDate}
                            style={{ color: tm.hazyText, marginLeft: "5px" }}
                          >
                            {" "}
                            {career[0].eyear}.
                          </div>
                          <div
                            className={styles.jobDate}
                            style={{ color: tm.hazyText }}
                          >
                            {" "}
                            {career[0].emonth}
                          </div>
                        </div>

                        <div
                          className={styles.dateDiffer}
                          style={{ background: tm.modifyBtn }}
                        >
                          {career[0].dateDifference.years !== 0 ? (
                            <div
                              className={styles.dateDifTxt}
                              style={{ color: tm.textColor }}
                            >
                              {career[0].dateDifference.years}년
                            </div>
                          ) : null}

                          <div
                            className={styles.dateDifTxt}
                            style={{ color: tm.textColor }}
                          >
                            {" "}
                            {career[0].dateDifference.months}개월
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      onClick={() => handleCareerDelete(index)}
                      className={styles.minusBtn}
                      src={`/public_assets/minusBtn.svg`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className={styles.devideLine}></div>

        <div
          className={styles.skillWrap}
          style={{
            position: "relative",
            paddingBottom: "40px",
          }}
        >
          <p className={styles.name} style={{ color: tm.textColor }}>
            스킬
          </p>
          <input
            className={styles.inputBox}
            style={{
              background: tm.inputBg,
              color: tm.textColor,
              width: "90%",
              height: "78px",
            }}
            value={skillSearch}
            onChange={(e) => {
              setSkillSearch(e.target.value);
            }}
            placeholder="스킬명을 입력해주세요."
          ></input>
          <div
            className={styles.skillImgSrch}
            style={{
              background: tm.inputBg,
              color: tm.textColor,
              width: "90%",
              height: "78px",
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
          <div
            className={styles.skillImgSrch}
            style={{
              background: tm.inputBg,
              color: tm.textColor,
              width: "90%",
              height: "78px",
            }}
          >
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
        <div className={styles.btnWrap}>
          <div onClick={() => handleClickSave()} className={styles.saveBtn}>
            저장하기
          </div>
          <div className={styles.deleteBtn}>취소</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
