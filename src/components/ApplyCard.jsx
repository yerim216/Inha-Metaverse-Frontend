import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import ApplyModal from "./ApplyModal";
import { addMember } from "../APIs/team";

export default function ApplyCard({ applyInfo }) {
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
        isInApplyCard={true}
        applyInfo={applyInfo}
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
          {applyInfo && applyInfo.user_info.skills ? (
            applyInfo.user_info.skills.map((skill, idx) => {
              // 추후 스킬 관련 처리 필요. 현재는 임시 이미지
              return (
                <img
                  src={`/public_assets/skills/skill_img_${idx + 1}.svg`}
                  alt="skill_img_1"
                  className="w-6 h-6"
                />
              );
            })
          ) : (
            <div
              className="text-sm font-medium"
              style={{
                color: tm.textColor,
              }}
            >
              기술 스택 없음
            </div>
          )}
        </div>
        <img
          src={`/public_assets/profileImg/profileImg_${applyInfo.user_info.user_img_index}.png`}
          alt="profile"
          className="rounded-full w-16 h-16"
        />
        <h3
          className="text-[16px] font-medium mt-5"
          style={{
            color: tm.textColor,
          }}
        >
          {applyInfo.user_info.user_name}
        </h3>
        <span
          className="text-[12px] font-normal mt-2"
          style={{
            color: tm.textColor,
          }}
        >
          {applyInfo.user_info.apply_job[0].apply_job_title}
        </span>
      </div>
    </>
  );
}
