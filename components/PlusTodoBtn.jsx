import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function PlusTodoBtn({ filterName, setIsModalOpen, setStatus }) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.board);
  useEffect(() => {
    if (themeMode === "light") {
      setTm(theme.lightTheme.board);
    } else {
      setTm(theme.darkTheme.board);
    }
  }, [themeMode]);

  return (
    <button
      className="mt-2 m-auto"
      onClick={() => {
        setIsModalOpen(true);
        if (filterName === "notStart") {
          setStatus(0);
        } else if (filterName === "inProgress") {
          setStatus(1);
        } else if (filterName === "done") {
          setStatus(2);
        }
      }}
    >
      <img
        // src="/public_assets/icons/plus.svg"
        src={`/public_assets/icons/plus${
          themeMode === "light" ? "_accent" : ""
        }.svg`}
        alt="plus"
        className="w-4 transition-all duration-300 hover:scale-125"
      />
    </button>
  );
}
