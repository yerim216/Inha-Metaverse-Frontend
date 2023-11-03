import React, { useState, useEffect } from 'react';
import styles2 from '../styles/GenMyprofile.module.css';
import styles from '../styles/modules/CreateProject.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import OnLogModal from '../components/OnLogModal';
import Dot from '../components/Dot';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import { useNavigate } from 'react-router-dom';
import {
   getUserInfo,
   putUserCareer,
   putUserIntroduction,
   addInterested,
   getUserInterested,
   putUserImg,
   deleteUserInterest,
   putUserSkill,
   getSkills,
   deleteUserSkill,
} from '../APIs/userinfo';
import Nav from '../components/Nav';
import ImageSelector from '../components/ImgSelectModal';

export default function CreateProject() {
   // 최종 선택된 데이터(1)
   // 초기 상태에 존재하는 기존 데이터(2)
   // 1과 2 비교. 무엇이 추가되는지, 무엇이 삭제되는지 판단 후 API 호출
   // => 추가되는 index 배열 판단하는 함수, 삭제되는 index 배열 판단하는 함수가 존재하면 좋을 듯.

   const requestURL = `${window.baseURL}`;

   const [loading, setLoading] = useState(true);

   const [isOpen, setIsOpen] = useState(false);
   const [userData, setUsers] = useState([]);
   const [userLogin, setUserLogin] = useRecoilState(userState);
   const userIdx = userLogin.user_index;

   const [selectedValue, setSelectedValue] = useState([]); //경력 선택 값
   const [text, setText] = useState(); //자기소개
   const [job, setJob] = useState([]); //직무 선택 값 불러오기
   const [skill, setSkill] = useState([]); //전체 스킬 불러오기
   const [userSkill, setUserSkill] = useState([]); //스킬 선택 값 불러오기
   const [userProfileIdx, setUserProfileIdx] = useState([]);

   let [array, setArray] = useState([]);

   const [selectedOption1, setSelectedOption1] = useState(0);
   const [selectedOption2, setSelectedOption2] = useState(0);
   const [selectedOption3, setSelectedOption3] = useState(0);

   const [plans, setPlans] = useState([{ index: 0, field_title: '기획' }]);
   const [designs, setDesigns] = useState([{ index: 0, field_title: '디자인' }]);
   const [options, setOptions] = useState([{ index: 0, field_title: '개발' }]);

   useEffect(() => {
      getUserInfo(userIdx)
         .then(function (res) {
            const myArray = Object.values(res.data);
            setUsers(res.data[0]);
            setUserProfileIdx(myArray[0].user_img_index);
            setUserSkill(res.data[0].skills);
            setSelectedValue(myArray[3]);
            setText(res.data[0].user_introduction);
            console.log(res.data[0].user_introduction);
            const interestArray = res.data[0].fields; // 관심분야만 따로 배열로 빼두기
            setJob(interestArray);
            setLoading(false);
         })
         .catch(function (error) {
            console.log(error);
         });
   }, []);

   const rerendering = () => {
      getUserInfo(userIdx)
         .then(function (res) {
            const myArray = Object.values(res.data);
            setUsers(myArray[0]);
            setUserProfileIdx(myArray[0].user_img_index);
            putUserImg(userIdx, userProfileIdx);
            const interestArray = res.data[0].fields; // 관심분야만 따로 배열로 빼두기
            setJob(interestArray);
            setLoading(false);
            setSelectedValue(myArray[3]);
            setText(res.data[0].user_introduction);
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   const removeSkills = (skillToRemove) => {
      const updatedSkills = userSkill.filter((skill) => skill.skill_index !== skillToRemove.skill_index);
      setUserSkill(updatedSkills);
   };

   const handleOption1Change = (event) => {
      setSelectedOption1(event.target.value);
      console.log(event.target.value);
      const selectedIndex = event.target.value; // 선택한 옵션의 index 값
      // setSelectedIndex1(selectedIndex);
      let num = parseInt(selectedIndex); // 정수로 변환
      // postData(num);
      let len = job.length;
      if (len < 6) {
         dbJob(num);

         getUserInfo(userIdx)
            .then(function (res) {
               setJob(res.data[0].fields);
               setLoading(false);
               console.log('렌더링 렌더링');
            })
            .catch(function (error) {
               console.log(error);
            });
      } else {
         alert('관심 분야는 최대 6개까지 선택 가능합니다!');
      }
   };

   const handleOption2Change = (event) => {
      setSelectedOption2(event.target.value);
      const selectedIndex = event.target.value; // 선택한 옵션의 index 값
      let num = parseInt(selectedIndex); // 정수로 변환
      let len = job.length;

      if (len < 6) {
         dbJob(num);

         getUserInfo(userIdx)
            .then(function (res) {
               setJob(res.data[0].fields);
               setLoading(false);
               console.log('렌더링 렌더링');
            })
            .catch(function (error) {
               console.log(error);
            });
      } else {
         alert('관심 분야는 최대 6개까지 선택 가능합니다!');
      }
   };

   const handleOption3Change = (event) => {
      setSelectedOption3(event.target.value);
      const selectedIndex = event.target.value; // 선택한 옵션의 index 값
      let num = parseInt(selectedIndex); // 정수로 변환
      let len = job.length;

      if (len < 6) {
         dbJob(num);

         getUserInfo(userIdx)
            .then(function (res) {
               setJob(res.data[0].fields);
               setLoading(false);
               console.log('렌더링 렌더링');
            })
            .catch(function (error) {
               console.log(error);
            });
      } else {
         alert('관심 분야는 최대 6개까지 선택 가능합니다!');
      }
   };

   const ex = (event) => {
      setText(event.target.value);
      dbIntro(text);
   };

   useEffect(() => {
      getUserInterested()
         .then((response) => {
            // 요청이 성공한 경우
            const data = response.data;
            console.log(data);
            const filterData = data
               .filter((obj) => obj.field_category === '기획')
               .map(({ field_index, field_title }) => ({
                  field_index,
                  field_title,
               }));
            const filterData1 = data
               .filter((obj) => obj.field_category === '개발')
               .map(({ field_index, field_title }) => ({
                  field_index,
                  field_title,
               }));
            const filterData2 = data
               .filter((obj) => obj.field_category === '디자인')
               .map(({ field_index, field_title }) => ({
                  field_index,
                  field_title,
               }));

            // const planToArray = JSON.stringify(filterData);
            const updatedPlans = [...plans, ...filterData];
            setPlans(updatedPlans);

            const updatedDesigns = [...designs, ...filterData2];
            setDesigns(updatedDesigns);

            const updatedOptions = [...options, ...filterData1];
            setOptions(updatedOptions);
         })
         .catch((error) => {
            // 요청이 실패한 경우
            console.error(error);
         });
   }, []);

   const handleSelectChange = (event) => {
      setSelectedValue(event.target.value); // 선택한 값을 상태 변수에 저장
      const career = event.target.value;
   };

   // const getInterests = async() => { //전체 관심분야, 직무 받아오기
   const handleDelete = (index) => {
      let num = parseInt(index); // 정수로 변환

      deleteUserInterest(userIdx, num); //직무 삭제하기
   };

   const skillDelete = (index) => {
      let num = parseInt(index); // 정수로 변환

      deleteUserSkill(userIdx, num); //직무 삭제하기
   };

   //저장 버튼 클릭 시 변경 사항 db에 반영
   const profileSave = () => {
      dbIntro(text);
      dbCareer(selectedValue);
      window.location.href = '/myprofile';
   };

   //관심분야 db 저장
   const dbJob = (jobIndex) => {
      addInterested(userIdx, jobIndex)
         .then(function () {
            console.log('직무 저장 성공');
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   //경력 db 저장
   const dbCareer = (career) => {
      putUserCareer(userIdx, career)
         .then(function () {
            console.log('경력 저장 성공');
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   //자기소개 db 저장
   const dbIntro = (intro) => {
      putUserIntroduction(userIdx, intro)
         .then(function () {
            console.log('자기소개 저장 성공');
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   const handleImageChange = (userIdx, userProfileIdx) => {
      putUserImg(userIdx, userProfileIdx)
         .then(function () {
            console.log('유저 프로필 이미지 저장 성공');
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   useEffect(() => {
      handleImageChange(userIdx, userProfileIdx);
      setUserProfileIdx(userProfileIdx);
      getSkill();

      console.log('userProfileIdx가 변경되었습니다:', userProfileIdx);
   }, [userProfileIdx]); // userProfileIdx가 변경될 때만 useEffect 내부 코드 실행

   const getSkill = () => {
      getSkills()
         .then(function (res) {
            setSkill(res.data);
            console.log(skill);
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   const rerenderingSkills = (skillName, skillIndex) => {
      const toInt = parseInt(skillIndex);
      const newSkill = { skill_name: skillName, skill_index: toInt };

      setUserSkill([...userSkill, newSkill]);
      // putUserSkill(userIdx, toInt)
      //   .then(function () {
      //     console.log("스킬 저장 성공");
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
   };
   const load = {
      color: 'white',
   };
   const skillImg = {
      width: 'fitContent',
      height: '40px',
   };

   const skillImgMini = {
      width: 'fitContent',
      height: '30px',
   };
   const jobBox = {
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
   };

   const option = {
      width: '300px',
      fontSize: '18px',
      borderRadius: '20px',
      padding: '10px',
      fontFamily: "'Avenir'",
      fontStyle: 'normal',
      fontWeight: '400',
   };
   const option2 = {
      width: '600px',
      height: '200px',
      fontSize: '18px',
      borderRadius: '20px',
      padding: '10px',
      fontFamily: "'Avenir'",
      fontStyle: 'normal',
      fontWeight: '400',
   };

   const option3 = {
      display: 'flex',
      width: '150px',
      flexDirection: 'row',
      gap: '20px',
   };

   const option4 = {
      display: 'flex',
      height: '30px',
      flexDirection: 'row',
      gap: '20px',
   };
   const jobselect = {
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
   };

   const profileImgCss = {
      width: '300px',
      height: '300px',
      borderRadius: '50px',
      objectFit: 'cover', // 이미지를 너비와 높이에 맞게 크롭하여 채우기
   };

   console.log(userSkill);

   return (
      <>
         <Nav />
         <img src="/public_assets/VP.png" alt="darkModeBg" className={styles.VP} />
         <section className={styles.paddingSection}>
            <h1 className={styles.title}>{userData.user_name} 님 안녕하세요!</h1>

            <div className={styles.profileImg}>
               <span className={styles2.wrapper}>
                  <img style={profileImgCss} src={`/public_assets/profileImg/profileImg_${userProfileIdx}.png`} />
                  <span onClick={rerendering}>
                     <ImageSelector userProfileIdx={userProfileIdx} />
                  </span>
               </span>
            </div>

            <div className={styles2.name}>
               <div className={styles2.careearSelectWrapper}>
                  <span className={styles2.middleFont}>경력</span>
                  <div className={styles2.n}></div>
                  <select style={option} value={selectedValue} onChange={handleSelectChange}>
                     <option value="">선택하세요</option>
                     {/* 1부터 10까지의 선택지 생성 */}
                     {Array.from({ length: 10 }, (_, index) => (
                        <option style={option} key={index} value={index + 1}>
                           {index + 1}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <div className={styles2.basic}>
               <span className={styles2.middleFont}>자기소개</span>
               <div className={styles2.n}></div>

               <textarea style={option2} value={text} onChange={(event) => ex(event)} />
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
                              <span>{item.field_title}</span>
                              <button onClick={() => handleDelete(item.field_index)}>x</button>
                           </div>
                        ))}
                  </div>
               )}
               <div className={styles2.n}></div>
               <div style={option4}>
                  <select style={option3} value={selectedOption1} onChange={handleOption1Change}>
                     {plans.map((option, index) => (
                        <option key={index} value={option.field_index}>
                           {option.field_title}
                        </option>
                     ))}
                  </select>
                  <br />
                  <select style={option3} value={selectedOption2} onChange={handleOption2Change}>
                     {designs.map((option, index) => (
                        <option key={index} value={option.field_index}>
                           {option.field_title}
                        </option>
                     ))}
                  </select>
                  <br />
                  <select style={option3} value={selectedOption3} onChange={handleOption3Change}>
                     {options.map((option, index) => (
                        <option key={index} value={option.field_index}>
                           {option.field_title}
                        </option>
                     ))}
                  </select>
                  <br />
               </div>
               <br />
               <br />
               <br />
               <br />
               <div className={styles2.basic}>
                  <span className={styles2.middleFont}>사용하는 언어 & 다루는 툴</span>
                  <div className={styles2.n}></div>
                  {loading ? (
                     <div style={jobselect}>
                        <p style={load}>Loading...</p>
                     </div>
                  ) : (
                     <div style={jobselect}>
                        {userSkill &&
                           userSkill.map((item, index) => (
                              <div key={index} style={jobBox}>
                                 <span
                                    key={index}
                                    className={styles2.skillwrap}
                                    onClick={() => removeSkills(item.skill_index)}
                                 >
                                    {item.skill_name}
                                    <img
                                       key={index}
                                       src={`/public_assets/skills/skill_img_${item.skill_index}.svg`}
                                       alt={`Image ${skill.skill_index}`}
                                       style={skillImgMini}
                                    />
                                    <p>x</p>
                                 </span>
                              </div>
                           ))}
                     </div>
                  )}
                  <span>
                     <div className={styles2.skills}>
                        <div className={styles2.skillBox}>
                           {skill.map((skill, index) => (
                              <span
                                 key={index}
                                 className={styles2.skillwrap}
                                 onClick={() => rerenderingSkills(skill.skill_name, skill.skill_index)}
                              >
                                 {skill.skill_name}
                                 <img
                                    key={index}
                                    src={`/public_assets/skills/skill_img_${skill.skill_index}.svg`}
                                    alt={`Image ${skill.skill_index}`}
                                    style={skillImg}
                                 />
                              </span>
                           ))}
                        </div>
                     </div>
                  </span>
               </div>
            </div>
            <div className="flex w-full justify-center gap-8">
               <button onClick={profileSave} className={styles.changeBtn} style={{ backgroundColor: 'white' }}>
                  수정반영
               </button>
            </div>
         </section>
      </>
   );
}
