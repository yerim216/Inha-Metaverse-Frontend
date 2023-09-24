import React, { createContext, useState } from "react";

export const ThemeProvider = createContext({
  userInfo: "",
  userInfoSet: "",
});

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [themeMode, setThemeMode] = useState("light");
  const userInfoSet = (val) => {
    setUserInfo(val);
  };
  return (
    <ThemeProvider.Provider value={{ userInfo, userInfoSet }}>
      {children}
    </ThemeProvider.Provider>
  );
}
