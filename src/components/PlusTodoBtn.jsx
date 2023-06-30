import React from "react";

export default function PlusTodoBtn({ showAddTodo, filterName }) {
  return (
    <button
      className="mt-2 m-auto"
      onClick={() => {
        showAddTodo(filterName);
      }}
    >
      <img
        src="/public_assets/icons/plus.svg"
        alt="plus"
        className="w-4 transition-all duration-300 hover:scale-125"
      />
    </button>
  );
}
