import React, { useState, useEffect } from "react";
import styles2 from "../styles/GenMyprofile.module.css";
import styles from "../styles/modules/CreateProject.module.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import OnLogModal from "../components/OnLogModal";
import Dot from "../components/Dot";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  putUserCareer,
  putUserIntroduction,
  putUserInterest,
  getUserInterested,
  putUserImg,
} from "../APIs/userinfo";
import Nav from "../components/Nav";

export default function CreateProject() {
  const requestURL = `${window.baseURL}`;

  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [addinter, setAddInter] = useState([]);
  const [interestIndex, setInterestIndex] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIdx = userLogin.user_index;

  const [selectedValue, setSelectedValue] = useState(); //경력 선택 값
  const [text, setText] = useState(); //자기소개
  const [job, setJob] = useState([]); //직무 선택 값 불러오기
  const [skill, setSkill] = useState([]); //스킬 선택 값 불러오기

  let [array, setArray] = useState([]);

  const [selectedOption1, setSelectedOption1] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState(0);
  const [selectedOption3, setSelectedOption3] = useState(0);

  const [selectedIndex1, setSelectedIndex1] = useState(""); // 선택한 옵션의 index 값을 저장할 상태 변수
  const [selectedIndex2, setSelectedIndex2] = useState(""); // 선택한 옵션의 index 값을 저장할 상태 변수
  const [selectedIndex3, setSelectedIndex3] = useState(""); // 선택한 옵션의 index 값을 저장할 상태 변수

  const [plans, setPlans] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [options, setOptions] = useState([]);

  const selectedValue1 = plans[selectedOption1];
  const selectedValue2 = designs[selectedOption2];
  const selectedValue3 = options[selectedOption3];

  useEffect(() => {
    getUserInfo(userIdx)
      .then(function (res) {
        const myArray = Object.values(res.data);
        setUsers(myArray[0]);
        setJob(myArray[0].fields); // 관심분야 따로 job 배열에 담기
        setSkill(myArray[0].skills);
        console.log(job);

        setLoading(false);

        console.log(job);

        setSelectedValue(myArray[3]);
        setText(myArray[2]);
        // const interestArray = userData.map((item) => item.fields); // 관심분야만 따로 배열로 빼두기
        const interestArray = userData.fields;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);
    console.log(event.target.value);
    const selectedIndex = event.target.value; // 선택한 옵션의 index 값
    setSelectedIndex1(selectedIndex);
    let num = parseInt(selectedIndex); // 정수로 변환
    // postData(num);
    let len = job.length;
    console.log(job.length);
    if (len < 6) {
      dbJob(num);

      getUserInfo(userIdx)
        .then(function (res) {
          const myArray = Object.values(res.data);
          setJob(myArray[0].fields); // 관심분야 따로 job 배열에 담기
          setLoading(false);
          console.log(job);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("관심 분야는 최대 6개까지 선택 가능합니다!");
    }
  };

  const handleOption2Change = (event) => {
    setSelectedOption2(event.target.value);

    const selectedIndex = event.target.value; // 선택한 옵션의 index 값

    let num = parseInt(selectedIndex); // 정수로 변환

    setSelectedIndex2(selectedIndex);
    // postData(num);

    if (job.length < 6) {
      dbJob(num);
      setJob(userData.fields); // 관심분야 따로 job 배열에 담기
    } else {
      alert("관심 분야는 최대 6개까지 선택 가능합니다!");
    }
  };

  const handleOption3Change = (event) => {
    setSelectedOption3(event.target.value);

    const selectedIndex = event.target.value; // 선택한 옵션의 index 값
    setSelectedIndex3(selectedIndex);

    let num = parseInt(selectedIndex); // 정수로 변환
    // postData(num);

    if (job.length < 6) {
      dbJob(num);
      setJob(userData.fields); // 관심분야 따로 job 배열에 담기
    } else {
      alert("관심 분야는 최대 6개까지 선택 가능합니다!");
    }
    // dbJob();
    //직무 이름에 해당하는 직무 id 가져오기 , 직무 db 저장하는 함수 호출하면서 직무 id넘겨주기
  };

  const navigate = useNavigate();

  const onClickButton = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // 선택한 값을 상태 변수에 저장
    const career = event.target.value;
    dbCareer(career);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    const txt = event.target.value;
    dbIntro(txt);
  };

  useEffect(() => {
    getUserInterested()
      .then((response) => {
        // 요청이 성공한 경우
        const data = response.data;
        console.log(data);
        const filterData = data
          .filter((obj) => obj.field_category === "기획")
          .map(({ field_index, field_title }) => ({
            field_index,
            field_title,
          }));
        const filterData1 = data
          .filter((obj) => obj.field_category === "개발")
          .map(({ field_index, field_title }) => ({
            field_index,
            field_title,
          }));
        const filterData2 = data
          .filter((obj) => obj.field_category === "디자인")
          .map(({ field_index, field_title }) => ({
            field_index,
            field_title,
          }));

        const planfirst = [{ index: 0, field_title: "기획" }];
        const updatedPlans = [...planfirst, ...filterData];
        const aa = JSON.stringify(updatedPlans);
        console.log(aa);
        setPlans(updatedPlans);

        const designfirst = [{ index: 0, field_title: "디자인" }];
        const updatedDesigns = [...designfirst, ...filterData2];
        setDesigns(updatedDesigns);

        const optionfirst = [{ index: 0, field_title: "개발" }];
        const updatedOptions = [...optionfirst, ...filterData1];
        setOptions(updatedOptions);
      })
      .catch((error) => {
        // 요청이 실패한 경우
        console.error(error);
      });
  }, []);

  // const getInterests = async() => { //전체 관심분야, 직무 받아오기
  const handleDelete = (index) => {
    //직무 삭제하기
    const updatedItems = [...job];
    updatedItems.splice(index, 1);
    setJob(updatedItems);
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

  const userIndex = userData[0];

  const profileSave = () => {
    window.location.href = "/";
  };

  for (let i = 0; i < interests.length; i++) {
    if (interests[i].title === selectedValue1) {
      let interIndex = interests[i].index;
    }
  }

  //직무 db 저장
  const dbJob = (jobIndex) => {
    putUserInterest(userIdx, jobIndex)
      .then(function () {
        console.log("직무 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //경력 저장
  const dbCareer = (career) => {
    putUserCareer(userIdx, career)
      .then(function () {
        console.log("경력 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //자기소개 저장
  const dbIntro = (intro) => {
    putUserIntroduction(userIdx, intro)
      .then(function () {
        console.log("자기소개 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleImageChange = (userIdx, userImg) => {
    putUserImg(userIdx, userImg)
      .then(function () {
        console.log("유저 프로필 이미지 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const load = {
    color: "white",
  };

  const jobBox = {
    display: "flex",
    flexDirection: "row",
    gap: "3px",
  };

  const option = {
    width: "300px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };
  const option2 = {
    width: "600px",
    height: "200px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };

  const option3 = {
    display: "flex",
    width: "150px",
    flexDirection: "row",
    gap: "20px",
  };

  const option4 = {
    display: "flex",
    height: "30px",
    flexDirection: "row",
    gap: "20px",
  };
  const jobselect = {
    color: "white",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  };
  const txts = {
    color: "white",
  };

  return (
    <>
      <Nav />
      <img src="/public_assets/VP.png" alt="darkModeBg" className={styles.VP} />
      <section className={styles.paddingSection}>
        <h1 className={styles.title}>{userData.user_name} 님 안녕하세요!</h1>

        <div className={styles.profileImg}>
          <span className={styles2.wrapper}>
            <img src="/public_assets/proex.png" />
            <p className={styles2.imgtxt} onClick={handleImageChange}>
              이미지 교체하기
            </p>
          </span>
        </div>

        <div className={styles2.name}>
          <div className={styles2.careearSelectWrapper}>
            <span className={styles2.middleFont}>경력</span>
            <div className={styles2.n}></div>
            <select
              style={option}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">선택하세요</option>
              {/* 1부터 10까지의 선택지 생성 */}
              {Array.from({ length: 10 }, (_, index) => (
                <option style={option} key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* <p>선택한 값: {selectedValue.result}</p> */}
          </div>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>자기소개</span>
          <div className={styles2.n}></div>
          <textarea style={option2} value={text} onChange={handleTextChange} />
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>관심 분야</span>
          {loading ? (
            <div style={jobselect}>
              <p style={load}>Loading...</p>
            </div>
          ) : (
            <div style={jobselect}>
              {job &&
                job.map((item, index) => (
                  <div key={index} style={jobBox}>
                    <span>{item}</span>
                    <button onClick={() => handleDelete(index)}>X</button>
                  </div>
                ))}
            </div>
          )}
          <div className={styles2.n}></div>
          <div style={option4}>
            <select
              style={option3}
              value={selectedOption1}
              onChange={handleOption1Change}
            >
              {plans.map((option, index) => (
                <option key={index} value={option.field_index}>
                  {option.field_title}
                </option>
              ))}
            </select>
            <br />
            <select
              style={option3}
              value={selectedOption2}
              onChange={handleOption2Change}
            >
              {designs.map((option, index) => (
                <option key={index} value={option.field_index}>
                  {option.field_title}
                </option>
              ))}
            </select>
            <br />
            <select
              style={option3}
              value={selectedOption3}
              onChange={handleOption3Change}
            >
              {options.map((option, index) => (
                <option key={index} value={option.field_index}>
                  {option.field_title}
                </option>
              ))}
            </select>
            <br />
          </div>
        </div>
        <div className="flex w-full justify-center gap-8">
          <button onClick={profileSave} className={styles.changeBtn}>
            수정반영
          </button>
        </div>
      </section>
    </>
  );
}
