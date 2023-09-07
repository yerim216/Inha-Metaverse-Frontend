import React from "react";
import styles from "../styles/modules/TeamCard.module.css";
import { useNavigate } from "react-router";

export default function TeamCard({ team }) {
  // {
  //     "teamMembers": [
  //         {
  //             "user_index": 6,
  //             "user_name": "갈파거북이",
  //             "user_img_index": 1,
  //             "user_introduction": "{\"{\\\"field_title\\\":\\\"REACT\\\",\\\"field_index\\\":9}\"}",
  //             "user_job": null,
  //             "is_teamleader": true
  //         },
  //         {
  //             "user_index": 7,
  //             "user_name": "햄스터",
  //             "user_img_index": 5,
  //             "user_introduction": "가나다라마바사아자차카타파하",
  //             "user_job": 9,
  //             "is_teamleader": false
  //         },
  //         {
  //             "user_index": 9,
  //             "user_name": "갈파거북2",
  //             "user_img_index": 4,
  //             "user_introduction": null,
  //             "user_job": 13,
  //             "is_teamleader": false
  //         }
  //     ],
  //     "teamInfo": {
  //         "team_index": 3,
  //         "team_name": "거북이키우기",
  //         "team_introduction": "귀여운 거북이를 키워 보아요",
  //         "team_description": "거북이가 속이 거북하면 거북이거북",
  //         "team_views": 79,
  //         "team_recruting": true,
  //         "recruitment_number": "10",
  //         "skills": [
  //             null
  //         ]
  //     },
  //     "numOfPeople": {
  //         "team_cnt": "3"
  //     }
  // }
  console.log(team);

  const navigate = useNavigate();

  return (
    <button
      className="w-96 h-96 bg-[#323232] rounded-xl p-10 flex flex-col"
      onClick={() => {
        navigate(`/projectmanagertools/${team.teamInfo.team_index}`, {
          state: { teamIndex: team.teamInfo.team_index },
        });
        window.scrollTo({ top: 0, behavior: "auto" });
      }}
    >
      <div className="border-b border-[#7C7C7C] w-full h-[70%] flex flex-col items-start gap-6">
        {team.teamInfo.skills[0] !== null ? (
          <div className={styles.teamSkills}>{team.numOfPeople.team_cnt}</div>
        ) : (
          <div className={styles.teamSkills}>팀 내 기술 스택 X</div>
        )}
        <div className="text-white font-extrabold text-xl">
          {team.teamInfo.team_name}
        </div>
        <div className="text-[#ECECEC] text-xs">
          {team.teamInfo.team_introduction}
        </div>
      </div>
      <div
        className={`w-full h-[30%] flex text-white text-base font-semibold ${
          parseInt(team.numOfPeople.team_cnt) <= 2
            ? "flex-col justify-end gap-2"
            : "pt-6"
        }`}
      >
        {parseInt(team.numOfPeople.team_cnt) <= 2
          ? team.teamMembers.map((user, idx) => {
              return (
                <div key={idx} className="w-full flex items-center gap-4">
                  <img
                    src={`/public_assets/profileImg/profileImg_${user.user_img_index}.png`}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <span>{user.user_name}</span>
                </div>
              );
            })
          : team.teamMembers.map((user, idx) => {
              if (idx >= 4) return;
              if (
                idx + 1 === parseInt(team.numOfPeople.team_cnt) ||
                idx + 1 === 4
              ) {
                return (
                  <div
                    key={idx}
                    className={`flex items-center relative`}
                    style={{
                      right: idx * 25 + "px",
                    }}
                  >
                    <div
                      className={`absolute -right-2 bottom-2 w-8 h-4 rounded-lg bg-[#EA2845] text-[8px] flex items-center justify-center ${
                        parseInt(team.numOfPeople.team_cnt) - 4 <= 0 && "hidden"
                      }`}
                    >
                      +{parseInt(team.numOfPeople.team_cnt) - 4}
                    </div>
                    <img
                      src={`/public_assets/profileImg/profileImg_${user.user_img_index}.png`}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className={`flex items-center relative`}
                  style={{
                    right: idx * 25 + "px",
                  }}
                >
                  <img
                    src={`/public_assets/profileImg/profileImg_${user.user_img_index}.png`}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
              );
            })}
      </div>
    </button>
  );
}
