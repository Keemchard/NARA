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
      className="rounded border-[2px] border-solid border-[black] w-[60px] pt-[3px] pb-[3px]"
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
