import React, { useContext, useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";

export default function CategoryBtn({
  categoryName,
  categoryIndex,
  selected,
  handleAddCategory,
  handleDeleteCategory,
}) {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.createProject);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.createProject);
    else setTm(theme.darkTheme.createProject);
  }, [themeMode]);

  return (
    <div>
      <button
        className="rounded-[50px] px-[18px] py-[6px] font-bold"
        style={{
          backgroundColor: selected ? tm.accentColor : tm.fieldBtnBg,
          color: selected ? tm.accentBtnText : tm.textColor,
        }}
        onClick={() => {
          if (selected) {
            handleDeleteCategory(categoryIndex);
          } else handleAddCategory();
        }}
      >
        {categoryName}
      </button>
    </div>
  );
}
