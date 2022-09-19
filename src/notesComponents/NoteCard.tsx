import React from "react";

const NoteCard = ({ noteTitle, noteContent, noteDateTime }: any) => {
  return (
    <div className="bg-[black] m-[10px] p-[10px]">
      <h1>{noteTitle}</h1>
      <p>{noteContent}</p>
      <p>{noteDateTime}</p>
    </div>
  );
};

export default NoteCard;
