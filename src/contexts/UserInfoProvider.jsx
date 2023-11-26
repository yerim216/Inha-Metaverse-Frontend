import React, { createContext, useState } from "react";

export const UserInfoContext = createContext({
  userInfo: "",
  userInfoSet: "",
});

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const userInfoSet = (val) => {
    setUserInfo(val);
  };
  return (
    <UserInfoContext.Provider value={{ userInfo, userInfoSet }}>
      {children}
    </UserInfoContext.Provider>
  );
}
