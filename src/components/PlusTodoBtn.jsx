import React from "react";

export default function PlusTodoBtn({ showAddTodo, filterName }) {
  return (
    <button
      className="border border-black rounded-lg w-full opacity-0 transition-all duration-300 hover:opacity-100 mt-2"
      onClick={() => {
        showAddTodo(filterName);
      }}
    >
      +
    </button>
  );
}
