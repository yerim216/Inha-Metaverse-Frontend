import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "../styles/modules/Notification.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Notification() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.notification);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.notification);
    else setTm(theme.darkTheme.notification);
  }, [themeMode]);

  return (
    <>
      <Nav />
      <section className={styles.paddingSection}>
        <div className="border-b-2 border-[#D3D3D3] pb-5">
          <h3 className="text-[22px] font-extrabold text-[#6D6D6D]">
            알림내역
          </h3>
        </div>
        {/* 알림 내용 */}
        <section>
          <h3 className="font-medium text-base text-center text-[#7C7C7C]">
            알림 내용이 없습니다.
          </h3>
        </section>
      </section>
      <Footer isFixedToBottom={true} />
    </>
  );
}
