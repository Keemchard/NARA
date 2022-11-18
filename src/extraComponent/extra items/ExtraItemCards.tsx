import React, { FC } from "react";
import extraModel from "../../Types/extraItemsModel";

const ExtraItemCards: FC<extraModel> = ({ title, short_description, link }) => {
  return (
    <div className="border-[1px] border-[#0ED3CF] p-[20px] w-[100%] rounded-[10px] mb-[20px]">
      <div className="text-[30px] font-bold text-[#0ED3CF]">{title}</div>
      <div>{short_description}</div>
      <div className="mt-[20px] mb-[20px]">
        <a href={link} target="_blank">
          <button className="hover:bg-[#0ED3CF] border-[1px] rounded p-[8px] w-[250px]">{`Go to ${title}`}</button>
        </a>
      </div>
    </div>
  );
};

export default ExtraItemCards;
