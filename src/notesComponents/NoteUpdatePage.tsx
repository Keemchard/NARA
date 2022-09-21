import React from "react";

const NoteUpdatePage = ({
  saveEditedNote,
  userEditTitleInput,
  setUserEditTitleInput,
  userEditContentInput,
  setUserEditContentInput,
}: any) => {
  return (
    <form onSubmit={saveEditedNote} className="flex flex-col w-[360px]">
      <input
        className="m-[5px] p-[7px] bg-[#111827] border-[#0ED3CF] border-solid border-[1px]"
        type="text"
        value={userEditTitleInput}
        onChange={(e) => {
          setUserEditTitleInput(e.target.value);
        }}
      />
      <textarea
        rows={10}
        cols={50}
        className="m-[5px] p-[7px] bg-[#111827] mb-[20px] border-[#0ED3CF] border-solid border-[1px]"
        value={userEditContentInput}
        onChange={(e) => {
          setUserEditContentInput(e.target.value);
        }}
      ></textarea>
      <input
        className="p-[10px] border-[#0ED3CF] border-solid border-[2px] m-[5px] mt-[0] mb-[10px] "
        type="submit"
        value="Edit Note"
      />
    </form>
  );
};

export default NoteUpdatePage;
