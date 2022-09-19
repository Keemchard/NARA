import React from "react";
import NoteDash from "./notesComponents/NoteDash";
import TodoDash from "./TodoDash";

const DisplayAll = () => {
  return (
    <div className="display-all flex w-[100%]  p-[10px] pt=[0]">
      <div className="flex-[1]">
        <TodoDash />
      </div>
      <div className="flex-[2.5] w-[100%]">
        <NoteDash />
      </div>
    </div>
  );
};

export default DisplayAll;
