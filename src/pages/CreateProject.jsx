import React, { useEffect, useState } from "react";
import styles from "../styles/modules/CreateProject.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { useNavigate } from "react-router-dom";
import { getSkills, getUserInfo } from "../APIs/userinfo";
import { addMember, createTeam } from "../APIs/team";
import Nav from "../components/Nav";

export default function CreateProject() {
  // 팀 이름, 팀 소개, 프로젝트 설명, 모집 인원
  // 팀 구성원 추가
  // 팀 기술스택 추가
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    introduction: "",
    description: "",
    recruitment: null,
  });
  const navigate = useNavigate();
  const [customPositionInput, setCustomPositionInput] = useState(0);

  const onClickButton = () => {
    setIsOpen(true);
  };

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

  const [skills, setSkills] = useState();
  useEffect(() => {
    getSkills().then((res) => {
      setSkills(res.data);
    });
  }, []);

  return (
    <>
      <Nav />
      <img src="/public_assets/VP.png" alt="darkModeBg" className={styles.VP} />
      <form className={styles.paddingSection}>
        <h1 className={styles.title}>프로젝트 만들기</h1>
        <div className="flex items-center gap-6 pb-4 border-b">
          <div className={styles.middleFont}>팀 이름</div>
          <input
            type="text"
            className="rounded-md p-2"
            required
            value={inputs.name}
            onChange={(e) => {
              setInputs((cur) => {
                return { ...cur, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex items-center gap-6 pb-4 border-b">
          <div className={styles.middleFont}>팀 소개</div>
          <input
            type="text"
            className="rounded-md p-2 w-96"
            required
            value={inputs.introduction}
            onChange={(e) => {
              setInputs((cur) => {
                return { ...cur, introduction: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-6 pb-4 border-b">
          <div className={styles.middleFont}>프로젝트 설명</div>
          <textarea
            className="rounded-md w-96 resize-none p-2 outline-none h-44"
            required
            value={inputs.description}
            onChange={(e) => {
              setInputs((cur) => {
                return { ...cur, description: e.target.value };
              });
            }}
          ></textarea>
        </div>
        <div className="flex items-center gap-6 pb-4 border-b">
          <div className={styles.middleFont}>모집 인원</div>
          <input
            type="number"
            className="rounded-md p-2"
            required
            value={inputs.recruitment}
            onChange={(e) => {
              setInputs((cur) => {
                return { ...cur, recruitment: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-6 pb-4 border-b">
          <div className={styles.middleFont}>모집 기술 분야(아직 작동 X)</div>
          {skills &&
            skills.map((skill) => {
              return (
                <div className="flex gap-2 items-center">
                  <div className="text-white">{skill.skill_name}</div>
                  <input
                    type="number"
                    className="w-10 p-1 rounded-md"
                    value={0}
                    onChange={(e) => {}}
                  />
                  <span className="text-white">명</span>
                </div>
              );
            })}
          {Array(customPositionInput)
            .fill()
            .map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="모집 희망 직무 직접 입력"
                  className="rounded-md p-1"
                />
                <input
                  type="number"
                  className="w-10 p-1 rounded-md"
                  value={1}
                  onChange={(e) => {}}
                />
                <span className="text-white">명</span>
              </div>
            ))}
          <button
            className="text-white"
            onClick={(e) => {
              e.preventDefault();
              setCustomPositionInput((cur) => cur + 1);
            }}
          >
            + 기타
          </button>
        </div>
        <div className="flex w-full justify-center gap-8 mb-20">
          <button
            className={styles.changeBtn}
            onClick={async (e) => {
              e.preventDefault();
              const returnVal = window.confirm("해당 팀을 개설하시겠습니까?");
              if (returnVal === true) {
                const userIndex = JSON.parse(
                  localStorage.getItem("recoil-persist")
                ).userState.user_index;
                const teamName = await createTeam(userIndex, inputs);
                if (teamName) {
                  addTeamMember(teamName).then(() => {
                    alert("팀이 성공적으로 생성되었습니다!");
                    navigate("/");
                  });
                }
              }
            }}
          >
            팀 개설
          </button>
        </div>
      </form>
    </>
  );
}
