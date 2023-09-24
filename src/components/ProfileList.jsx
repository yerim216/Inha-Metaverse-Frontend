import React from "react";

export default function ProfileList({ profile }) {
  return (
    <div className="flex mt-6 gap-6 relative">
      {/* 접속 중인 상태 나타내주는 dot */}
      <div className="w-3 h-3 absolute bg-[#03CF5D] rounded-full z-10"></div>
      <img
        key={profile.user_index}
        src={`/public_assets/profileImg/profileImg_${profile.user_img_index}.png`}
        className="w-12 h-12 object-cover rounded-full relative"
      />
      <div className="flex flex-col gap-1">
        <div className="text-sm">{profile.user_name}</div>
        <div className="border rounded basis-auto text-[8px] flex-grow-0 flex items-center justify-center text-[#FFFFFF] font-medium">
          {profile.user_job || "직무 없음"}
        </div>
      </div>
    </div>
  );
}
