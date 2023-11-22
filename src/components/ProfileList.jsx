import React, { useEffect, useState } from "react";

export default function ProfileList({ lightTheme, profile }) {
  const [jobName, setJobName] = useState("직무 없음");
  useEffect(() => {
    if (profile.user_job) {
      if (profile.user_job === 1) {
        setJobName("개발기획");
      } else if (profile.user_job === 2) {
        setJobName("서비스기획");
      } else if (profile.user_job === 3) {
        setJobName("프로덕트기획");
      } else if (profile.user_job === 4) {
        setJobName("영업기획");
      } else if (profile.user_job === 5) {
        setJobName("UI디자인");
      } else if (profile.user_job === 6) {
        setJobName("UX디자인");
      } else if (profile.user_job === 7) {
        setJobName("프로덕트 디자인");
      } else if (profile.user_job === 8) {
        setJobName("편집 디자인");
      } else if (profile.user_job === 9) {
        setJobName("REACT");
      } else if (profile.user_job === 10) {
        setJobName("SWIFT");
      } else if (profile.user_job === 11) {
        setJobName("KOTLIN");
      } else if (profile.user_job === 12) {
        setJobName("JAVA");
      } else if (profile.user_job === 13) {
        setJobName("NODE.JS");
      } else if (profile.user_job === 14) {
        setJobName("SPRING BOOT");
      } else if (profile.user_job === 15) {
        setJobName("AI");
      }
    }
  }, []);
  return (
    <div className="flex mt-6 gap-6 relative">
      {/* 접속 중인 상태 나타내주는 dot : 현재는 주석 처리 */}
      {/* <div className="w-3 h-3 absolute bg-[#03CF5D] rounded-full z-10"></div> */}
      <img
        key={profile.user_index}
        src={`/public_assets/profileImg/profileImg_${profile.user_img_index}.png`}
        className="w-12 h-12 object-cover rounded-full relative"
      />
      <div className="flex flex-col gap-1">
        <div className="text-sm">{profile.user_name}</div>
        <div
          className="border rounded basis-auto text-[8px] flex-grow-0 flex items-center justify-center font-medium"
          style={{
            color: lightTheme ? "#000" : "#FFFFFF",
          }}
        >
          {jobName}
        </div>
      </div>
    </div>
  );
}
