import React from "react";

export default function Member({
  memberName,
  activated,
  addManager,
  deleteManager,
}) {
  return (
    <button
      className="border p-1 rounded-lg shrink-0"
      onClick={(e) => {
        if (e.target.style.color === "white") {
          deleteManager();
        } else {
          addManager();
        }
      }}
      style={{
        color: activated ? "white" : "inherit",
      }}
    >
      {memberName}
    </button>
  );
}
