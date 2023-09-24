import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getTeamInfoByIndex } from "../APIs/team";
import ProfileList from "./ProfileList";

export default function RightViewerContent_Main() {
  const { teamIndex } = useOutletContext();

  const [teamInfo, setTeamInfo] = useState();
  const [userIndex, setUserIndex] = useState();

  const [myProfile, setMyProfile] = useState([]);
  const [memberProfiles, setMemberProfiles] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    setUserIndex(
      JSON.parse(localStorage.getItem("recoil-persist")).userState.user_index
    );

    getTeamInfoByIndex(teamIndex).then((res) => setTeamInfo(res.data));
  }, []);

  const checkMemberAlreadyExists = (userIndex) => {
    for (let i = 0; i < memberProfiles.length; i++) {
      if (memberProfiles[i].user_index === userIndex) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!teamInfo || !userIndex) return;

    teamInfo.teamMembers.map((teamMember) => {
      if (teamMember.user_index === userIndex) {
        setMyProfile(teamMember);
      } else {
        if (!checkMemberAlreadyExists(teamMember.user_index))
          setMemberProfiles((prev) => [...prev, teamMember]);
      }
    });
  }, [teamInfo, userIndex]);

  return (
    <div className="w-full h-full flex flex-col items-center px-[15%]">
      <div className="w-full h-[120px] pt-6 border-b border-[#7C7C7C] flex items-center gap-14">
        <img
          src="/public_assets/icons/profile.svg"
          alt="profile"
          className="cursor-pointer transition-all hover:scale-110"
        />
        <img
          src="/public_assets/icons/chat.svg"
          alt="chat"
          className="cursor-pointer transition-all hover:scale-110"
          onClick={() => {
            alert("아직 준비중인 기능입니다!");
          }}
        />
      </div>
      <div className="w-full text-white font-extrabold text-lg mt-6">
        <h3>내프로필</h3>
        {myProfile && <ProfileList profile={myProfile} />}
      </div>
      <div className="w-full text-white font-extrabold text-lg mt-12">
        <h3 className="flex items-center">
          팀원 - 접속 중
          <span className="text-[#7c7c7c] font-light ml-2">
            ({memberProfiles && memberProfiles.length})
          </span>
        </h3>
        {memberProfiles &&
          memberProfiles.map((memberProfile) => (
            <ProfileList profile={memberProfile} />
          ))}
      </div>
      <div className="w-full text-white font-extrabold text-lg mt-12">
        <h3 className="flex items-center">
          팀원 - 오프라인
          <span className="text-[#7c7c7c] font-light ml-2">(0)</span>
        </h3>
      </div>
    </div>
  );
}
