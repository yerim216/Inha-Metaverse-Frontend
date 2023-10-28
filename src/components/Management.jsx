import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import styles from "../styles/modules/Management.module.css";
import "../styles/hideScrollBar.css";

export default function Management() {
  const { teamIndex } = useOutletContext();
  const { state } = useLocation();

  const navigate = useNavigate();
  if (!state) {
    navigate("/");
  }

  useEffect(() => {
    document.documentElement.classList.add("overflowHidden");
    return () => {
      document.documentElement.classList.remove("overflowHidden");
    };
  }, []);

  const [userIndex, setUserIndex] = useState();

  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.management);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.management);
    else setTm(theme.darkTheme.management);
  }, [themeMode]);

  const [activated, setActivated] = useState("project");
  const changeActivated = (manageName) => {
    setActivated(manageName);
  };

  return (
    <section className="w-full h-full hiddenScrollBar p-10 overflow-auto">
      {/* 현재 선택된 파트 */}
      <div
        className={`flex font-bold text-[18px] w-[360px] mb-12  ${styles.lightFont}`}
        style={{
          color: tm.textColor,
        }}
      >
        <button
          onClick={() => {
            changeActivated("project");
          }}
          className={`flex-1 border-b-2 ${
            activated === "project" && styles.boldFont
          }`}
          style={{
            borderColor: activated === "project" ? tm.accentColor : tm.border,
          }}
        >
          프로젝트 관리
        </button>
        <button
          onClick={() => {
            changeActivated("apply");
          }}
          className={`flex-1 border-b-2 ${
            activated === "apply" && styles.boldFont
          }`}
          style={{
            borderColor: activated === "apply" ? tm.accentColor : tm.border,
          }}
        >
          지원 관리
        </button>
        <button
          onClick={() => {
            changeActivated("position");
          }}
          className={`flex-1 border-b-2 ${
            activated === "position" && styles.boldFont
          }`}
          style={{
            borderColor: activated === "position" ? tm.accentColor : tm.border,
          }}
        >
          포지션 관리
        </button>
      </div>

      {/* 1. 프로젝트가 활성화됐을 경우 */}
      {activated === "project" && (
        <>
          <form className="flex flex-col gap-12">
            <div className={styles.inputContainer}>
              <div className={styles.inputName}>
                <h3
                  style={{
                    color: tm.textColor,
                  }}
                >
                  프로젝트명
                </h3>
              </div>
              <div
                className={styles.inputInfoContainer}
                style={{
                  borderColor: tm.border,
                }}
              >
                <input
                  type="text"
                  className={styles.shortInput}
                  style={{
                    backgroundColor: tm.inputColor,
                    color: tm.textColor,
                  }}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputName}>
                <h3
                  style={{
                    color: tm.textColor,
                  }}
                >
                  팀 명
                </h3>
              </div>
              <div
                className={styles.inputInfoContainer}
                style={{
                  borderColor: tm.border,
                }}
              >
                <input
                  type="text"
                  className={styles.shortInput}
                  style={{
                    backgroundColor: tm.inputColor,
                    color: tm.textColor,
                  }}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputName}>
                <h3
                  style={{
                    color: tm.textColor,
                  }}
                >
                  프로젝트 분야
                </h3>
              </div>
              <div
                className={styles.inputInfoContainer}
                style={{
                  borderColor: tm.border,
                }}
              >
                <input
                  type="text"
                  className={styles.shortInput}
                  style={{
                    backgroundColor: tm.inputColor,
                    color: tm.textColor,
                  }}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputName}>
                <pre
                  style={{
                    color: tm.textColor,
                  }}
                >
                  {"프로젝트\n한줄 소개"}
                </pre>
              </div>
              <div
                className={styles.inputInfoContainer}
                style={{
                  borderColor: tm.border,
                }}
              >
                <input
                  type="text"
                  className={styles.longInput}
                  style={{
                    backgroundColor: tm.inputColor,
                    color: tm.textColor,
                  }}
                />
              </div>
            </div>
            <div
              className={styles.inputContainer}
              style={{
                height: "200px",
              }}
            >
              <div className={styles.inputName}>
                <h3
                  style={{
                    color: tm.textColor,
                  }}
                >
                  프로젝트 설명
                </h3>
              </div>
              <div
                className={styles.inputInfoContainer}
                style={{
                  borderColor: tm.border,
                }}
              >
                <textarea
                  className="w-[95%] resize-none h-[130px] rounded-[18px] outline-none p-[10px] font-normal"
                  style={{
                    backgroundColor: tm.inputColor,
                    color: tm.textColor,
                  }}
                ></textarea>
              </div>
            </div>
          </form>

          {/* 버튼 영역 */}
          <div
            className="flex gap-[30px] justify-end font-bold text-xl mt-12 mr-8"
            style={{
              color: tm.textColor,
            }}
          >
            <button
              className="hover:brightness-110"
              style={{
                padding: "22px 38px",
                backgroundColor: tm.accentColor,
                borderRadius: "40px",
              }}
            >
              프로젝트 수정하기
            </button>
            <button
              className="hover:brightness-110"
              style={{
                padding: "22px 30px",
                backgroundColor: tm.cancelBtn,
                borderRadius: "40px",
              }}
            >
              취소
            </button>
          </div>
        </>
      )}
    </section>
  );
}
