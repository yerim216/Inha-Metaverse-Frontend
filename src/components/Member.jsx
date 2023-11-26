import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function Member({
  memberName,
  activated,
  addManager,
  deleteManager,
}) {
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
      className="border p-1 rounded-lg shrink-0"
      onClick={(e) => {
        if (e.target.style.color === tm.activated) {
          deleteManager();
        } else {
          addManager();
        }
      }}
      style={{
        color: activated ? tm.activated : tm.deactivated,
        borderColor: activated ? tm.activated : tm.deactivated,
      }}
    >
      {memberName}
    </button>
  );
}
