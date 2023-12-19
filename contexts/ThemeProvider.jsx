import React, { createContext, useEffect, useState } from "react";

export const ThemeModeContext = createContext();

export default function ThemeProvider({ children }) {
  const theme = localStorage.getItem("theme");

  const [themeMode, setThemeMode] = useState(theme || "light");

  useEffect(() => {
    const body = document.body;
    if (themeMode === "light") {
      body.style.backgroundColor = "light";
    } else {
      body.style.backgroundColor = "black";
    }
  }, [themeMode]);

  const toggleTheme = () => {
    const body = document.body;
    if (themeMode === "light") {
      body.style.backgroundColor = "black";
      setThemeMode("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.style.backgroundColor = "white";
      setThemeMode("light");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}
