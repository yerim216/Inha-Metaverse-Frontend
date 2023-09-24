import React, { createContext, useState } from "react";

export const ThemeContext = createContext({
  themeMode: "",
  themeModeSet: "",
});

export default function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const themeModeSet = (theme) => {
    setThemeMode(theme);
  };
  return (
    <ThemeContext.Provider value={{ themeMode, themeModeSet }}>
      {children}
    </ThemeContext.Provider>
  );
}
