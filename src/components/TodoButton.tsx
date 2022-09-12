import React from "react";

const TodoButton = ({ buttonName, buttonColor, buttonFunction }: any) => {
  return (
    <button
      className="rounded border-[2px] border-solid border-[black] m-[10px] w-[70px]"
      style={{ backgroundColor: `${buttonColor}` }}
      onClick={() => {
        buttonFunction();
      }}
    >
      {buttonName}
    </button>
  );
};

export default TodoButton;
