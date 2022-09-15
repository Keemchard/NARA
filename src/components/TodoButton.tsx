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
      className="rounded border-[1px] border-solid border-[#111827] w-[100%] pt-[3px] pb-[3px] mr-[3px]"
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
