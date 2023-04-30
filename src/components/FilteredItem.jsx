import React from "react";

export default function FilteredItem({ filterName, deleteFilterItems }) {
  return (
    <div
      style={{
        fontSize: "16px",
        color: "rgba(112, 144, 176, 1)",
        display: "flex",
        alignItems: "center",
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
