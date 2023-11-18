import React, { useContext, useEffect, useState } from 'react';
import '../styles/modal.css';
import styles from '../styles/modules/ApplyModal.module.css';

import { ThemeModeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme/theme';

export default function ApplyModal(props) {
   const { open, close, openApplyModal, handleApplyBtn, inputText, setInputText, teamRecruit } = props;

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

   return (
      <div className={open ? 'openModal modal' : 'modal'}>
         {open ? (
            <section className="w-1/3 h-5/6 bg-white rounded-3xl relative flex flex-col items-center justify-center gap-4">
               <div className={styles.top}> 프로젝트 지원 </div>

               <div className={styles.main}>
                  <div className={styles.part}>
                     <div className={styles.field} style={{ color: tm.mainTextColor }}>
                        {' '}
                        분야{' '}
                     </div>
                     <img
                        src={`${process.env.PUBLIC_URL}/public_assets/Vector_more.svg`}
                        className={styles.nav}
                        alt="vector"
                        style={{
                           maxWidth: '100px',
                           height: 'auto',
                        }}
                     />
                     <div className={styles.job}>세부 직업</div>
                  </div>
                  <div className={styles.applyWrap}>
                     <h1 className={styles.h1}>지원동기</h1>
                     <textarea
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="지원 동기를 입력하세요"
                        className="bg-gray-100 rounded-2xl shadow-2xl h-3/4 resize-none outline-none p-3"
                     ></textarea>
                     {inputText.length > 499 && <div className={styles.alertMsg}>500자를 넘길 수 없습니다</div>}
                  </div>
                  <div className={styles.btnWrap}>
                     <button
                        className={styles.submitBtn}
                        onClick={() => {
                           handleApplyBtn();
                           close();
                           // alert("성공적으로 제출되었습니다!");
                        }}
                     >
                        프로젝트 지원하기
                     </button>
                     <button className={styles.closeBtn} onClick={close}>
                        취소
                     </button>
                  </div>
               </div>
            </section>
         ) : null}
      </div>
   );
}
