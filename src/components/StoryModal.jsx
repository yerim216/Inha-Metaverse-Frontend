import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../styles/modules/StoryModal.module.css';
import '../styles/modal.css';
import { ThemeModeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme/theme';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import { getUserInfo } from '../APIs/userinfo';
import { writeStory } from '../APIs/story';

export default function StoryModal({ opened, closeModal }) {
   const [userLogin, setUserLogin] = useRecoilState(userState);
   const userIndex = userLogin && userLogin.user_index;
   const [userInfo, setUserInfo] = useState();

   const { themeMode, toggleTheme } = useContext(ThemeModeContext);
   const [tm, setTm] = useState(theme.lightTheme.home);
   // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
   useEffect(() => {
      if (themeMode === 'light') setTm(theme.lightTheme.home);
      else setTm(theme.darkTheme.home);
   }, [themeMode]);

   useEffect(() => {
      if (userIndex) {
         // JSON으로 받아오는 데이터가 배열 형태여서, 0번째 인덱스에 접근하여 값 설정.
         getUserInfo(userIndex).then((res) => {
            setUserInfo(res.data[0]);
         });
      }
   }, [userIndex]);

   const modalRef = useRef();

   const [inputs, setInputs] = useState({
      title: '',
      content: '',
   });

   useEffect(() => {
      // 이벤트 핸들러 함수
      const handler = (e) => {
         if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
         }
      };

      // 이벤트 핸들러 등록
      document.addEventListener('mousedown', handler);

      return () => {
         // 이벤트 핸들러 해제
         document.removeEventListener('mousedown', handler);
      };
   });

   const textareaRef = useRef();
   const handleResize = () => {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
   };

   return (
      <div
         className={opened ? 'openModal modal' : 'modal'}
         style={{
            backgroundColor: opened && tm.whenModalBg,
         }}
      >
         {opened && (
            <section
               className="w-[600px] rounded-[20px] px-[70px] py-[30px] flex flex-col items-center"
               style={{
                  backgroundColor: tm.storyCommentSection,
               }}
               ref={modalRef}
            >
               <div
                  className="w-full h-[70px] pb-2 border-b flex items-center"
                  style={{
                     borderColor: tm.borderColor,
                  }}
               >
                  <img
                     src={`public_assets/profileImg/profileImg_${userInfo && userInfo.user_img_index}.png`}
                     alt="profileImg"
                     className="w-14 h-14 rounded-full"
                  />
                  <span
                     className="text-[24px] font-semibold ml-4"
                     style={{
                        color: tm.mainTextColor,
                     }}
                  >
                     {userInfo && userInfo.user_name}
                  </span>
                  <span
                     className="text-[10px] ml-4"
                     style={{
                        color: tm.storyHazyText,
                     }}
                  >
                     {console.log(userInfo)}
                     {(userInfo && userInfo.user_career) || '설정된 직무 없음'}
                  </span>
               </div>
               <input
                  type="text"
                  placeholder="제목을 입력해주세요(최대 30자까지 가능합니다.)"
                  className={`w-full bg-transparent ${styles.placeholder} font-bold text-[20px] py-5`}
                  style={{
                     color: tm.mainTextColor,
                  }}
                  value={inputs.title}
                  onChange={(e) => {
                     let newInput = { ...inputs };
                     newInput.title = e.target.value;
                     setInputs(newInput);
                  }}
                  maxLength={30}
               />
               <textarea
                  className="w-full min-h-[150px] max-h-[300px] overflow-auto resize-none bg-transparent outline-none"
                  placeholder="본문을 입력해주세요(최대 500자까지 가능합니다.)"
                  style={{
                     color: tm.mainTextColor,
                  }}
                  value={inputs.content}
                  onChange={(e) => {
                     handleResize();
                     let newInput = { ...inputs };
                     newInput.content = e.target.value;
                     setInputs(newInput);
                  }}
                  maxLength={500}
                  ref={textareaRef}
               ></textarea>
               <button
                  onClick={() => {
                     if (inputs.title.trim() === '' || inputs.content.trim() === '') {
                        alert('제목과 내용을 모두 작성해 주세요!');
                        return;
                     }
                     writeStory({ ...inputs, user: userIndex })
                        .then((res) => {
                           console.log(res.data);
                           alert('성공적으로 스토리 작성이 완료되었습니다!');
                           window.location.reload();
                        })
                        .catch((err) => console.error(err));
                  }}
                  className="hover:scale-105"
               >
                  <img src="public_assets/icons/blue_create_button.svg" alt="blueCreateBtn" />
               </button>
            </section>
         )}
      </div>
   );
}
