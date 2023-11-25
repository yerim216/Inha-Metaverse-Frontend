import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import ApplyModal from "./ApplyModal";

export default function ApplyCard({ userInfo }) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";
  };

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const openApplyModal = () => {
    setApplyModalOpen(true);
    blockScroll();
  };
  const closeApplyModal = () => {
    setApplyModalOpen(false);
    freeScroll();
  };

  return (
    <>
      <ApplyModal
        open={applyModalOpen}
        close={closeApplyModal}
        openApplyModal={openApplyModal}
        // handleApplyBtn={handleApplyBtn}
        // setInputText={setInputText}
        // inputText={inputText}
        // teamRecruit={""} //선택한 직무의 종류와 직무명 받아오기
        // category={category}
        // job={job}
      ></ApplyModal>
      <div
        className="w-[250px] h-[190px] rounded-xl flex flex-col p-4 relative"
        style={{
          backgroundColor: tm.cardBg,
        }}
      >
        <button
          className="w-16 h-8 rounded-[100px] absolute right-4 top-4 hover:scale-105 font-bold"
          onClick={() => {
            setApplyModalOpen(true);
          }}
          style={{
            backgroundColor: tm.accentColor,
            color: "white",
          }}
        >
          보기
        </button>
        {/* 스킬 리스트 */}
        <div className="flex gap-2 absolute bottom-4 right-4">
          <img
            src="/public_assets/skills/skill_img_1.svg"
            alt="skill_img_1"
            className="w-6 h-6"
          />
          <img
            src="/public_assets/skills/skill_img_2.svg"
            alt="skill_img_2"
            className="w-6 h-6"
          />
          <img
            src="/public_assets/skills/skill_img_3.svg"
            alt="skill_img_3"
            className="w-6 h-6"
          />
        </div>
        <img
          src="/public_assets/profileImg/profileImg_1.png"
          alt="profileImg_1"
          className="rounded-full w-16 h-16"
        />
        <h3
          className="text-[16px] font-medium mt-5"
          style={{
            color: tm.textColor,
          }}
        >
          유저닉네임
        </h3>
        <span
          className="text-[12px] font-normal mt-2"
          style={{
            color: tm.textColor,
          }}
        >
          개발
        </span>
      </div>
    </>
  );
}
