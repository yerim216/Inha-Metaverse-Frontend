import React from "react";
import "../styles/FilterButton.css";

export default function FilterButton({
  item,
  addFilterItem,
  colored,
  deleteFilter,
}) {
  return (
    <button
      className={colored && "filterSelected"}
      onClick={(e) => {
        const targetClassList = e.target.classList;
        if (targetClassList.contains("filterSelected")) {
          deleteFilter(item);
        } else {
          addFilterItem(item);
        }
      }}
    >
      {item}
    </button>
  );
}
