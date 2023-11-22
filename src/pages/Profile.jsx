import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import style from '../styles/Myprofile.module.css';

import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { applyToTeam, deleteMember, getTeamInfoByIndex, viewUp } from '../APIs/team';
import { getUserInfo } from '../APIs/userinfo';
import ApplyModal from '../components/ApplyModal';
import Nav from '../components/Nav';

import { ThemeModeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme/theme';

import Markdown from '../lib/Markdown/Markdown';

export default function Profile() {
   const exDescription = `# SmartRecipe 프로젝트\n\n"SmartRecipe" 프로젝트는 현대인들의 바쁜 일상에서 더 편리하고 창의적인 요리 경험을 제공하는 웹 어플리케이션입니다.\n\n## 주요 기능\n\n- **맞춤형 레시피 추천:**\n  - 사용자의 식습관과 취향을 고려하여 최적의 레시피를 제안합니다.\n\n- **식재료 관리:**\n  - 냉장고에 있는 식재료를 등록하고 유통기한을 추적합니다.\n\n- **식사 계획 및 쇼핑 목록:**\n  - 주간 또는 월간 식사 계획을 세우고 필요한 식재료를 자동으로 쇼핑 목록에 추가합니다.\n\n- **커뮤니티 기능:**\n  - 다른 사용자들과 레시피를 공유하고 의견을 나눌 수 있는 커뮤니티를 제공합니다.\n\n## 기술 스택\n\n- Frontend: React.js\n- Backend: Node.js, Express.js\n- 데이터베이스: MongoDB\n- 인증 및 보안: JWT, HTTPS\n\n## 프로젝트 목표\n\n"SmartRecipe"의 목표는 사용자들이 더 효율적으로 식사를 계획하고 요리하는 데 도움을 주어, 건강한 식습관을 유지하고 요리에 대한 부담을 줄이는 것입니다. 이 어플리케이션은 사용자들에게 더 많은 즐거움과 창의성을 요리에 더할 수 있도록 지원합니다.`;
   const recruit = {
      기획: [
         { 종류: '서비스 기획', 모집인원: '1' },
         { 종류: '마케팅 기획', 모집인원: '1' },
         { 종류: '디자인 기획', 모집인원: '1' },
      ],
      개발: [
         { 종류: 'AI 개발', 모집인원: '1' },
         { 종류: '백엔드 개발', 모집인원: '2' },
      ],
   };
   // 지원 모달
   const [applyModalOpen, setApplyModalOpen] = useState(false);
   const openApplyModal = () => {
      setApplyModalOpen(true);
   };
   const closeApplyModal = () => {
      setApplyModalOpen(false);
   };

   useEffect(() => {
      document.documentElement.classList.add('profileOnly');
      return () => {
         document.documentElement.classList.remove('profileOnly');
      };
   }, []);
   const getUserInfos = async () => {
      try {
         const response = await getUserInfo(userLogin.user_index);
         return response.data[0].user_name;
      } catch (error) {
         console.error(error);
         throw error;
      }
   };

   const handleApplyBtn = async () => {
      const userName = await getUserInfos();
      applyToTeam(userLogin.user_index, teamIndex, inputText, '임시 직무')
         .then(() => {
            alert('성공적으로 처리되었습니다!');
            window.location.reload();
         })
         .catch((error) => {
            alert('이미 해당 프로젝트에 속해 있습니다!');
         });
   };

   const handleLeaveBtn = async () => {
      const userName = await getUserInfos();
      deleteMember(teamDetail.teamInfo.team_name, userName)
         .then(() => {
            alert('성공적으로 처리되었습니다!');
            window.location.reload();
         })
         .catch((error) => {
            alert('해당 프로젝트의 팀원이 아닙니다!');
         });
   };
   const [userLogin, setUserLogin] = useRecoilState(userState);
   const navigate = useNavigate();
   const [user, setUser] = useRecoilState(userState);

   // 팀 정보 관련 변수. 팀 인덱스로 불러 옴.
   const [teamDetail, setTeamDetail] = useState();

   // 팀 멤버 정보 변수. 팀 인덱스로 불러 옴.
   const [teamMembers, setTeamMembers] = useState();
   const [teamSkill, setTeamSkill] = useState();
   const [teamRecruit, setTeamRecruit] = useState([]);
   const [inputText, setInputText] = useState('');

   //전달받은 팀 인덱스값 취득 : teamIndex 변수에 저장
   const location = useLocation();
   const teamIndex = location.state.teamIndex;

   useEffect(() => {
      getTeamInfoByIndex(teamIndex)
         .then((res) => {
            setTeamDetail(res.data);
            setTeamSkill(res.data.teamInfo.skills);
            setTeamRecruit(res.data.teamInfo.jobs);
            console.log(res.data.teamInfo.skills);
            return res.data;
         })
         .then((data) => {
            setTeamMembers(data.teamMembers);
            console.log(data.teamMembers);
         })
         .then(() => {
            viewUp(teamIndex);
         })
         .catch((err) => {
            console.error(err);
         });
   }, []);

   const logout = () => {
      // window.localStorage.clear();
      window.localStorage.removeItem('recoil-persist');

      setUserLogin(null);
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'auto' });
   };
   const pImage = {
      paddingTop: '23px',
      boxSizing: 'border-box',
      width: '110px',
      height: '110px',
      borderRadius: '100px',
      marginLeft: '-50px',
   };

   const no = {
      paddingBottom: '0',
      marginBottom: '0',
   };

   const hahaha = {
      display: 'flex',
      flexDirection: 'row',
      gap: '9px',
      marginLeft: '-20px',
   };

   const dot = {
      marginTop: '7px',
      width: '8px',
      height: '8px',
      backgroundColor: '#00FF19',
      borderRadius: '100%',
   };

   const namee = {
      fontFamily: "'Avenir'",
      fontStyle: 'normal',
      fontWeight: '800',
      fontSize: '20px',
      lineHeight: '27px',
   };

   const con = {
      marginLeft: '100px',
      marginTop: '-75px',
   };

   const con2 = {
      fontSize: '12px',
      width: '240px',
      overflow: 'hidden',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      marginTop: '-10px',
      height: '40px',
   };

   const parts = {
      width: 'fit-content',
      padding: '0 3% 0 3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0c6eed',
      borderRadius: '60px',
      color: 'white',
      fontSize: '12px',
      fontWeight: 700,
      marginLeft: '3%',
      lineHeight: '0',
   };

   const whole = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
   };

   const { themeMode, toggleTheme } = useContext(ThemeModeContext);
   const [tm, setTm] = useState(theme.lightTheme.profile);
   // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
   useEffect(() => {
      if (themeMode === 'light') setTm(theme.lightTheme.profile);
      else setTm(theme.darkTheme.profile);
   }, [themeMode]);

   // 현재 자신이 팀장인지의 여부에 따라, 지원하기 및 탈퇴하기 버튼을 보여줄 지 정함.
   const [isTeamLeader, setIsTeamLeader] = useState(false);

   const [isTeamMember, setIsTeamMember] = useState(false);
   const userIndex = userLogin.user_index;
   useEffect(() => {
      if (teamDetail) {
         teamDetail.teamMembers.map((member) => {
            if (member.user_index === userIndex) {
               setIsTeamMember(true);
               if (member.is_teamleader) setIsTeamLeader(true);
            }
         });
      }
   }, [teamDetail]);

   const getJobByIdx = (index) => {
      if (!index) return '할당된 역할이 없습니다!';

      if (index === 1) {
         return '개발기획';
      } else if (index === 2) {
         return '서비스기획';
      } else if (index === 3) {
         return '프로덕트기획';
      } else if (index === 4) {
         return '영업기획';
      } else if (index === 5) {
         return 'UI디자인';
      } else if (index === 6) {
         return 'UX디자인';
      } else if (index === 7) {
         return '프로덕트 디자인';
      } else if (index === 8) {
         return '편집 디자인';
      } else if (index === 9) {
         return 'REACT';
      } else if (index === 10) {
         return 'SWIFT';
      } else if (index === 11) {
         return 'KOTLIN';
      } else if (index === 12) {
         return 'JAVA';
      } else if (index === 13) {
         return 'NODE.JS';
      } else if (index === 14) {
         return 'SPRING BOOT';
      } else if (index === 15) {
         return 'AI';
      }
   };

   return (
      <section className={styles.contain}>
         <Nav />

         <ApplyModal
            open={applyModalOpen}
            close={closeApplyModal}
            openApplyModal={openApplyModal}
            handleApplyBtn={handleApplyBtn}
            setInputText={setInputText}
            inputText={inputText}
            teamRecruit={''} //선택한 직무의 종류와 직무명 받아오기
         ></ApplyModal>
         <div className={style.wrap}>
            <button
               className={style.profileManageBtn}
               onClick={() => {
                  navigate('/createmyprofile');
                  window.scrollTo({ top: 0, behavior: 'auto' });
               }}
            >
               프로필 수정
            </button>
            <div className={styles.profileTop}>
               <div className={styles.nameContainer}>
                  <div className={styles.skillContainer}>
                     {teamDetail &&
                        (teamDetail.teamInfo.skills === null ? (
                           <p className={styles.skill} style={{ color: tm.subTextColorDarker }}>
                              {' '}
                              팀 스킬이 없어요{' '}
                           </p>
                        ) : (
                           teamDetail.teamInfo.skills.map((skill, index) => {
                              return (
                                 <p key={index} className={styles.skill} style={{ color: tm.subTextColorDarker }}>
                                    {skill}
                                 </p>
                              );
                           })
                        ))}
                  </div>

                  {/* 팀 이름 */}
                  <p className={styles.name} style={{ color: tm.mainTextColor }}>
                     {teamDetail && teamDetail.teamInfo.team_name}
                  </p>
                  {/* 팀 소개 */}
                  <div className={styles.introTexts}>
                     {teamDetail && teamDetail.teamInfo.team_introduction === null ? (
                        <p className={styles.limit}>팀 소개를 입력해보아요!</p>
                     ) : (
                        <p className={styles.limit}>
                           {teamDetail && teamDetail.teamInfo.team_introduction
                              ? teamDetail.teamInfo.team_introduction
                              : '팀 소개가 없습니다!'}
                        </p>
                     )}
                  </div>
               </div>

               {!isTeamLeader && (
                  <div className="flex justify-center gap-8">
                     {!isTeamMember ? (
                        <button
                           className={styles.applyBtn}
                           onClick={() => {
                              setApplyModalOpen(true);
                           }}
                        >
                           지원하기
                        </button>
                     ) : (
                        <button
                           className={styles.leaveBtn}
                           onClick={() => {
                              const returnVal = window.confirm('해당 프로젝트에서 탈퇴하시겠습니까?');
                              if (returnVal === true) {
                                 handleLeaveBtn();
                              }
                           }}
                        >
                           탈퇴하기
                        </button>
                     )}
                  </div>
               )}
            </div>

            <div className={styles.grayLine}></div>

            <div className={styles.teamInfoBox}>
               {/* <div className={styles.teamSkillImgWrap}> */}
               <p className={styles.menuText} style={{ color: tm.mainTextColor }}>
                  사용 스킬
               </p>
               <div className={styles.skillImgContainer}>
                  {teamDetail &&
                     (teamDetail.teamInfo.skills === null ? (
                        <p style={{ color: tm.subTextColor }}> 팀 스킬이 없습니다 </p>
                     ) : (
                        teamDetail.teamInfo.skills.map((skill, index) => {
                           return (
                              <img
                                 key={index}
                                 src={`${process.env.PUBLIC_URL}/public_assets/skills/skill_img_${index + 1}.svg`}
                                 alt="more"
                                 style={{ width: '25px', height: '25px' }}
                              />
                           );
                        })
                     ))}
               </div>

               {/* </div> */}

               <p className={styles.menuText} style={{ color: tm.mainTextColor }}>
                  팀
               </p>
               <div style={{ color: tm.mainTextColor }}> 팀 별명이 없습니다 </div>
            </div>

            <div className={styles.grayLine}></div>
            <p className={styles.txt} style={{ color: tm.mainTextColor }}>
               프로젝트 설명
            </p>
            <div
               className={styles.descriptionBox}
               style={{
                  color: tm.mainTextColor,
                  background: tm.txtBoxBackground,
                  boxShadow: tm.boxShadow,
                  border: tm.border,
               }}
            >
               <Markdown children={exDescription} />
            </div>
            <br></br>
            <br></br>
            <br></br>

            <p className={styles.txt} style={{ color: tm.mainTextColor }}>
               모집 분야
            </p>
            <div className={styles.recruitWrap}>
               {recruit.기획.map((recruitMem, index) => {
                  return (
                     <div
                        className={styles.recruitBox}
                        style={{
                           color: tm.mainTextColor,
                           border: tm.border,
                           boxShadow: tm.boxShadow,
                           background: tm.txtBoxBackground,
                        }}
                     >
                        <div className={styles.boxTopLayer}>
                           <div className={styles.fieldName} style={{ color: 'white' }}>
                              기획
                           </div>
                           <img
                              src={`${process.env.PUBLIC_URL}/public_assets/moreArrow.svg`}
                              alt="more"
                              style={{ width: '25px', height: '25px' }}
                           />
                        </div>
                        <p className={styles.recruitName} style={{ color: tm.mainTextColor }}>
                           {recruitMem.종류}{' '}
                        </p>
                        <div>
                           <p className={styles.recruitMemNum} style={{ color: tm.subTextColor }}>
                              {recruitMem.모집인원}명 모집중
                           </p>
                           <div
                              className={styles.applyBtnTeam}
                              onClick={() => {
                                 setApplyModalOpen(true);
                              }}
                              style={{ color: tm.color, background: tm.btnBackground }}
                           >
                              지원하기{' '}
                           </div>
                        </div>
                     </div>
                  );
               })}
               {recruit.개발.map((recruitMem, index) => {
                  return (
                     <div
                        className={styles.recruitBox}
                        style={{
                           color: tm.mainTextColor,
                           boxShadow: tm.boxShadow,
                           border: tm.border,
                           background: tm.txtBoxBackground,
                        }}
                     >
                        <div className={styles.boxTopLayer}>
                           <div className={styles.fieldName} style={{ color: 'white' }}>
                              개발
                           </div>
                           <img
                              src={`${process.env.PUBLIC_URL}/public_assets/moreArrow.svg`}
                              alt="more"
                              style={{ width: '25px', height: '25px' }}
                           />
                        </div>
                        <p className={styles.recruitName} style={{ color: tm.mainTextColor }}>
                           {recruitMem.종류}{' '}
                        </p>
                        <div>
                           <p className={styles.recruitMemNum} style={{ color: tm.subTextColor }}>
                              {recruitMem.모집인원}명 모집중
                           </p>
                           <div
                              className={styles.applyBtnTeam}
                              style={{ color: tm.color, background: tm.btnBackground }}
                           >
                              지원하기
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>

            <br></br>
            <br></br>
            <br></br>
            <p className={styles.txt} style={{ color: tm.mainTextColor }}>
               프로젝트의 팀원이예요
            </p>

            <div className={styles.memSearch}>
               <div className={styles.wrapp}>
                  {teamMembers &&
                     teamMembers.map((member, idx) => (
                        <span key={idx} style={no}>
                           <div
                              className={styles.memBox}
                              style={{
                                 color: tm.mainTextColor,
                                 background: tm.txtBoxBackground,
                                 border: tm.border,
                                 boxShadow: tm.boxShadow,
                              }}
                           >
                              <div style={pImage}>
                                 <img
                                    src={`${process.env.PUBLIC_URL}/public_assets/profileImg/profileImg_${member.user_img_index}.png`}
                                    alt={member.user_name}
                                    style={{ borderRadius: '100px' }}
                                 />
                              </div>
                              <div style={con}>
                                 <div style={hahaha}>
                                    <div style={dot}></div>
                                    <div style={namee}>{member.user_name}</div>
                                    <div style={parts}>
                                       {/* {member.user_job
                            ? member.user_job
                            : "할당된 역할이 없습니다!"} */}
                                       {getJobByIdx(member.user_job)}
                                    </div>
                                 </div>
                                 <br />
                                 <div style={whole}>
                                    <div style={con2}>
                                       {member.user_introduction ? member.user_introduction : '자기소개가 없습니다!'}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </span>
                     ))}
               </div>
            </div>
         </div>
         <Footer />
      </section>
   );
}
