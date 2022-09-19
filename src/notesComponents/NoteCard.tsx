import React from "react";
import NoteButton from "./NoteButton";

const NoteCard = ({
  noteTitle,
  noteContent,
  noteDateTime,
  deleteNote,
  toggleUpdatePage,
}: any) => {
  return (
    <div className="bg-[#374151] m-[10px] pt-[5px] pr-[5px] p-[10px]  rounded  ">
      <div className="flex justify-end">
        <p className=" text-[13px] top-[3px] right-[10px]">{noteDateTime}</p>
      </div>
      <div className="mb-[20px]">
        <h1 className="text-[25px] font-semibold text-[#0ED3CF] mt-[10px]">
          {noteTitle}
        </h1>
        <p>{noteContent}</p>
      </div>
      <div className="mt-[10px]">
        <NoteButton
          buttonWidth="90px"
          buttonFunct={deleteNote}
          buttontext="Delete"
        />
        <NoteButton
          buttonWidth="90px"
          buttonFunct={toggleUpdatePage}
          buttontext="Open"
        />
      </div>
    </div>
  );
};

export default NoteCard;
