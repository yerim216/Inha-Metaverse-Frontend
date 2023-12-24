import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "./contexts/ThemeProvider";
import ForMobile from "./components/common/ForMobile";

const root = ReactDOM.createRoot(document.getElementById("root"));
// 초기에 로컬스토리지(recoil-persist)에 아무것도 존재하지 않을 시 오류 발생함. 이에 최초 렌더링 시 임의로라도 null값을 넣게끔 수정.
if (localStorage.getItem("recoil-persist") === null) {
  localStorage.setItem("recoil-persist", JSON.stringify({ userState: null }));
}

// 모바일인지를 감지하는 변수.
let isMobile = navigator.userAgentData.mobile;

root.render(
  <ThemeProvider>{isMobile ? <ForMobile /> : <App />}</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
