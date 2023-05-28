import React from "react";
import "../styles/FilterButton.css";

export default function FilterButton({ item, addFilterItem }) {
  return (
    <button
      onClick={(e) => {
        const targetClassList = e.target.classList;
        if (targetClassList.contains("filterSelected")) {
          e.target.classList.remove("filterSelected");
        } else {
          if (addFilterItem(item) !== false)
            e.target.classList.add("filterSelected");
        }
      }}
    >
      {item}
    </button>
  );
}
