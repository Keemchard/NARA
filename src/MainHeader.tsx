import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowUp, FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import DateNTime from "./MainHeadComponent/DateNTime";
import naraLogo from "./naraDashLogoSmall.png";

const MainHeader = () => {
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);

  const openMenu = () => {
    setOpenDropDown(!openDropdown);
  };

  return (
    <div className="main-head p-[10px] flex items-center">
      <div className="logo flex-1">
        <Link to="/">
          <img className="logo-img w-[120px] " src={naraLogo} alt="Logo" />
        </Link>
      </div>
      <div className="menu  flex-[1] flex justify-between items-center">
        <div className="dropdown   flex-[1] relative flex justify-end">
          <button
            onClick={() => {
              openMenu();
            }}
            className="mr-[10px] rounded border-[#374151] border-solid border-[1px] p-[7px] pl-[10px] pr-[10px] w-[100%] flex items-center justify-around"
          >
            What To Display? {openDropdown ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {openDropdown && (
            <ul className="drop absolute top-[40px] left-[0] p-[10px] w-[80%] bg-[#1F2937] mt-[5px]">
              <Link to="/todo">
                <li
                  onClick={openMenu}
                  className="bg-[#374151] p-[5px] mb-[5px] flex items-center justify-between"
                >
                  Todo <FaArrowRight />
                </li>
              </Link>
              <li
                onClick={openMenu}
                className="bg-[#374151] p-[5px] mb-[5px] flex items-center justify-between"
              >
                Notes <FaArrowRight />
              </li>
              <Link to="/">
                <li
                  onClick={openMenu}
                  className="bg-[#374151] p-[5px] mb-[5px] flex items-center justify-between"
                >
                  Display All <FaArrowRight />
                </li>
              </Link>
              <li
                onClick={openMenu}
                className="bg-[#374151] p-[5px] mb-[5px] flex items-center justify-between"
              >
                Bored? click this! <FaArrowRight />
              </li>
            </ul>
          )}
        </div>
        <div className="date-time ">
          <DateNTime />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
