import React from "react";

export default function FilteredItem({ filterName, deleteFilterItems, color }) {
  return (
    <div
      style={{
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        color: color,
        gap: "10px",
        cursor: "pointer",
      }}
      onClick={() => {
        deleteFilterItems(filterName);
      }}
    >
      <span>{filterName}</span>X
    </div>
  );
}
