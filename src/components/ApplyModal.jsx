import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/modal.css';
import styles from '../styles/modules/ApplyModal.module.css';

import { ThemeModeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme/theme';
import { addMember } from '../APIs/team';

export default function ApplyModal(props) {
   const {
      open,
      close,
      openApplyModal,
      handleApplyBtn,
      inputText,
      setInputText,
      teamRecruit,
      category,
      job,
      isInApplyCard,
      applyInfo,
   } = props;

   const [content, setContent] = useState();

   const { themeMode, toggleTheme } = useContext(ThemeModeContext);
   const [tm, setTm] = useState(theme.lightTheme.profile);
   // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
   useEffect(() => {
      if (themeMode === 'light') setTm(theme.lightTheme.profile);
      else setTm(theme.darkTheme.profile);
   }, [themeMode]);

   const handleInputChange = (event) => {
      if (event.target.value.length <= 500) setInputText(event.target.value);
   };

   const modalRef = useRef();

   useEffect(() => {
      // 이벤트 핸들러 함수
      const handler = (e) => {
         if (modalRef.current && !modalRef.current.contains(e.target)) {
            close();
            {
               !isInApplyCard && setInputText('');
            }
         }
      };

      // 이벤트 핸들러 등록
      document.addEventListener('mousedown', handler);

      return () => {
         // 이벤트 핸들러 해제
         document.removeEventListener('mousedown', handler);
      };
   });

   return (
      <div className={open ? 'openModal modal' : 'modal'}>
         {open ? (
            <section
               className="w-[600px] h-5/6 rounded-3xl relative flex flex-col items-center justify-center gap-4"
               ref={modalRef}
               style={{
                  backgroundColor: tm.background,
               }}
            >
               <div className={`${styles.top} font-semibold`}>
                  {isInApplyCard ? '프로젝트 지원서' : '프로젝트 지원'}
               </div>

               <div className={styles.main}>
                  <div className={styles.part}>
                     <div className={styles.field} style={{ color: 'white' }}>
                        {isInApplyCard ? applyInfo.user_info.apply_job[0].apply_job_category : category}
                     </div>
                     <img
                        src={`${process.env.PUBLIC_URL}/public_assets/icons/rightArrow_${themeMode}.svg`}
                        className={styles.nav}
                        alt="vector"
                        style={{
                           maxWidth: '100px',
                           height: 'auto',
                        }}
                     />
                     <div
                        className={styles.job}
                        style={{
                           color: tm.mainTextColor,
                           borderColor: tm.mainTextColor,
                        }}
                     >
                        {isInApplyCard ? applyInfo.user_info.apply_job[0].apply_job_title : job}
                     </div>
                  </div>
                  <div className={styles.applyWrap}>
                     <h1
                        className={styles.h1}
                        style={{
                           color: tm.mainTextColor,
                        }}
                     >
                        지원동기
                     </h1>
                     {isInApplyCard ? (
                        <div
                           className="rounded-2xl shadow-2xl h-3/4 resize-none outline-none p-3"
                           style={{
                              backgroundColor: tm.textArea,
                              color: tm.mainTextColor,
                           }}
                        >
                           {applyInfo && applyInfo.team_info.apply_comment}
                        </div>
                     ) : (
                        <textarea
                           value={inputText}
                           onChange={handleInputChange}
                           placeholder="지원 동기를 입력하세요"
                           className="rounded-2xl shadow-2xl h-3/4 resize-none outline-none p-3"
                           style={{
                              backgroundColor: tm.textArea,
                              color: tm.mainTextColor,
                           }}
                           maxLength={500}
                        ></textarea>
                     )}
                     {!isInApplyCard && inputText.length > 499 && (
                        <div className={styles.alertMsg}>500자를 넘길 수 없습니다</div>
                     )}
                  </div>
                  <div className={styles.btnWrap}>
                     {isInApplyCard ? (
                        <button
                           className={styles.submitBtn}
                           onClick={() => {
                              // 임시 데이터, team_info에 왜 user_name이 존재하지?
                              addMember(
                                 //  applyInfo.team_info.user_name,
                                 '팀팀이',
                                 applyInfo.user_info.user_name
                              )
                                 .then((res) => {
                                    alert('축하합니다! 새로운 팀원이 생겼습니다!');
                                    close();
                                 })
                                 .catch((err) => {
                                    alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요!');
                                    console.error(err);
                                 });
                           }}
                        >
                           함께하기
                        </button>
                     ) : (
                        <button
                           className={styles.submitBtn}
                           onClick={() => {
                              handleApplyBtn();
                              close();
                           }}
                        >
                           프로젝트 지원하기
                        </button>
                     )}
                     <button
                        className={styles.closeBtn}
                        onClick={() => {
                           close();
                           {
                              !isInApplyCard && setInputText('');
                           }
                        }}
                     >
                        취소
                     </button>
                  </div>
               </div>
            </section>
         ) : null}
      </div>
   );
}
