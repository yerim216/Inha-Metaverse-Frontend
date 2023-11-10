import React from "react";

export default function FieldBtn({ fieldName, btnBg, textColor }) {
  return (
    <div>
      <button
        className="rounded-[50px] px-[18px] py-[6px] font-bold"
        style={{
          backgroundColor: btnBg,
          color: textColor,
        }}
      >
        {fieldName}
      </button>
    </div>
  );
}
