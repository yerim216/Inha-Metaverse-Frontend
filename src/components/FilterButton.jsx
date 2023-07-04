import React from "react";
import "../styles/FilterButton.css";

export default function FilterButton({
  item,
  addFilterItem,
  addFilterIndex,
  colored,
  deleteFilter,
  deleteFilterIndex,
  index,
}) {
  return (
    <button
      className={colored && "filterSelected"}
      onClick={(e) => {
        const targetClassList = e.target.classList;
        if (targetClassList.contains("filterSelected")) {
          deleteFilter(item);
          deleteFilterIndex(index);
        } else {
          addFilterItem(item);
          addFilterIndex(index);
        }
      }}
    >
      {item}
    </button>
  );
}
