import React from "react";

interface buttonModel {
  buttonName: string;
  buttonColor: string;
  buttonFunction: any;
}

const TodoButton = ({
  buttonName,
  buttonColor,
  buttonFunction,
}: buttonModel) => {
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
