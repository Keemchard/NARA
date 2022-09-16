import React from "react";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <div className="bg-[red] p-[10px] flex">
      <div className="logo bg-[gray] flex-1">
        <Link to="/">Nara</Link>
      </div>
      <div className="menu  flex-[2] flex justify-between">
        <div className="bg-[blue] flex-[2]">
          <ul className="flex justify-around ">
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>Notes</li>
            <li>Display All</li>
          </ul>
        </div>
        <div className="date-time bg-[gray] flex-[1]">Date and time here</div>
      </div>
    </div>
  );
};

export default MainHeader;
