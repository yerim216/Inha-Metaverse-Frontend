import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "../styles/modules/Notification.module.css";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import { getNotifications } from "../APIs/notification";

export default function Notification() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.notification);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.notification);
    else setTm(theme.darkTheme.notification);
  }, [themeMode]);

  const [userIndex, setUserIndex] = useState();
  useEffect(() => {
    let userIndex;

    if (JSON.parse(localStorage.getItem("recoil-persist")).userState === null) {
      return;
    }

    userIndex = JSON.parse(localStorage.getItem("recoil-persist")).userState
      .user_index;

    setUserIndex(userIndex);
  }, []);

  const [notifications, setNotifications] = useState();
  console.log(notifications);

  useEffect(() => {
    if (!userIndex) return;

    getNotifications(userIndex).then((res) => {
      console.log(res.data);
      setNotifications(res.data.notifications);
    });
  }, [userIndex]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // 원하는 형식으로 날짜를 추출
    const year = date.getFullYear().toString().slice(2); // 년도의 마지막 두 자리만 추출
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 표시
    const day = date.getDate().toString().padStart(2, "0"); // 일, 두 자리로 표시

    // 결과를 합쳐서 반환
    return `${year}.${month}.${day}`;
  }

  return (
    <>
      <Nav />
      <section className={styles.paddingSection}>
        <div className="border-b-2 border-[#D3D3D3] pb-5">
          <h3 className="text-[22px] font-extrabold text-[#6D6D6D]">
            알림내역
          </h3>
        </div>
        <section>
          {/* 알림 내용 */}
          {notifications ? (
            notifications.map((notification) => {
              let category;
              switch (notification.notification_category) {
                case 1:
                  category = "[소셜]";
                  break;
                case 2:
                  category = "[지원]";
                  break;
                case 3:
                  category = "[지원(리더)]";
                  break;
                case 4:
                  category = "[지원 승인]";
                  break;
                case 5:
                  category = "[쪽지]";
                  break;
                default:
                  break;
              }

              let message;
              switch (notification.notification_category) {
                case 1:
                  message = "소셜 관련 알림";
                  break;
                case 2:
                  message = `${notification.team_name} 프로젝트에 지원하셨습니다.`;
                  break;
                case 3:
                  message = `${notification.user_name} 님이 ${notification.team_name} 프로젝트에 지원했습니다.`;
                  break;
                case 4:
                  message = `${notification.team_name} 프로젝트에 초대되셨습니다.`;
                  break;
                case 5:
                  message = "쪽지 관련 알림";
                  break;
                default:
                  break;
              }

              return (
                <div
                  className="w-full h-[75px] mb-5 rounded-[10px] flex flex-col py-4 px-7"
                  style={{
                    backgroundColor: tm.notificationBg,
                    color: tm.mainText,
                  }}
                >
                  <div className="flex text-[12px]">
                    <h3 className="font-bold w-16">{category}</h3>
                    <span className="font-medium text-[#7C7C7C]">
                      {formatDate(notification.send_at)}
                    </span>
                  </div>
                  <div className="text-[14px] font-bold mt-1">{message}</div>
                </div>
              );
            })
          ) : (
            <h3 className="font-medium text-base text-center text-[#7C7C7C]">
              알림 내용이 없습니다.
            </h3>
          )}
        </section>
      </section>
      <Footer isFixedToBottom={notifications && notifications.length <= 3} />
    </>
  );
}
