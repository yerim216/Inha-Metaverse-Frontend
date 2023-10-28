import React from "react";

export default function PlusTodoBtn({ filterName, setIsModalOpen, setStatus }) {
  return (
    <button
      className="mt-2 m-auto"
      onClick={() => {
        setIsModalOpen(true);
        if (filterName === "notStart") {
          setStatus(0);
        } else if (filterName === "inProgress") {
          setStatus(1);
        } else if (filterName === "done") {
          setStatus(2);
        }
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
