import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getTeamIndex, getUserInfo } from "../APIs/userinfo";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { getTeamInfoByIndex } from "../APIs/team";
import TeamCard from "../components/TeamCard";

export default function ProjectListsPage() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIndex = userLogin.user_index;

  // 팀들의 인덱스를 담는 배열.
  const [team, setTeam] = useState([]);

  // 현재 해당 유저가 진행하는 프로젝트 정보를 담은 배열.
  const [array, setArray] = useState([]);

  const getTeamIndices = async () => {
    try {
      const res = await getTeamIndex(userIndex);
      setTeam(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamIndices();
  }, []);

  const fetchData = async () => {
    for (let i = 0; i < team.length; i++) {
      // 팀인덱스 가져오는건 잘 됨
      try {
        const response = await getTeamInfoByIndex(team[i].team_index);
        setArray((cur) => {
          return [...cur, response.data];
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (team.length !== 0) {
      fetchData();
    }
  }, [team]);

  // 위의 array 배열에 중복 문제가 발생해, 중복 문제를 제거한 배열.
  const [filteredArray, setFilteredArray] = useState([]);

  // 중복문제 제거 배열 설정.
  useEffect(() => {
    setFilteredArray(
      array.filter((team, idx) => {
        return (
          idx ===
          array.findIndex(
            (obj) => obj.teamInfo.team_index === team.teamInfo.team_index
          )
        );
      })
    );
  }, [array]);

  return (
    <>
      <div
        style={{
          paddingTop: "60px",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="w-full h-full p-12 relative grid gap-4 justify-start grid-cols-1 min-[900px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1700px]:grid-cols-4 min-[2100px]:grid-cols-5">
          {filteredArray &&
            filteredArray.map((team) => {
              return <TeamCard key={team.teamInfo.team_index} team={team} />;
            })}
          <button
            className="w-40 h-14 bg-transparent rounded-[35px] text-white border border-[#6D6D6D] absolute right-8 bottom-8 flex gap-2 items-center justify-center font-extrabold transition-all hover:scale-105"
            onClick={() => {
              navigate("/createproject");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            <span>프로젝트 제작</span>
            <img src="/public_assets/icons/greyPlusBtn.svg" alt="plus" />
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#2D2D2D",
          position: "absolute",
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #373737",
          paddingLeft: "60px",
        }}
      >
        <h5 className="text-white">나의 프로젝트</h5>
        <button
          className="text-white absolute right-8 cursor-pointer z-10 underline text-sm hover:scale-105"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </>
  );
}
