import React from "react";

export default function PlusTodoBtn({ showAddTodo, filterName }) {
  return (
    <button
      className="mt-2 m-auto"
      onClick={() => {
        showAddTodo(filterName);
        // 스크롤 맨 위로 변경
        const scrollContainer = document.querySelector(
          `#toDoSection_${filterName}_scroll`
        );
        scrollContainer.scrollIntoView({ behavior: "smooth", block: "start" });
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
