import React from "react";
import todolistLogo from "./todolistLogo.png";
// src\todolistLogo.png
const NoTaskPage = () => {
  return (
    <div className="text-center h-[100%] bg-[#1F2937] flex justify-center items-center">
      <img className="w-[80%]" src={todolistLogo} alt="" />
    </div>
  );
};

export default NoTaskPage;
