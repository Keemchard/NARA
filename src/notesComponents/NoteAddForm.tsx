import React from "react";

const NoteAddForm = ({
  addNotes,
  userTitleInput,
  setUserTitleInput,
  userContentInput,
  setUserContentInput,
}: any) => {
  return (
    <form onSubmit={addNotes} className="flex flex-col w-[330px]">
      <input
        className="m-[5px] p-[7px] bg-[#374151]"
        type="text"
        placeholder="Note Title"
        value={userTitleInput}
        onChange={(e) => {
          setUserTitleInput(e.target.value);
        }}
      />
      <textarea
        rows={10}
        cols={50}
        className="m-[5px] p-[7px] bg-[#374151]  mb-[20px] "
        placeholder="Note Content"
        value={userContentInput}
        onChange={(e) => {
          setUserContentInput(e.target.value);
        }}
      ></textarea>
      <input
        className="p-[10px] border-[#0ED3CF] border-solid border-[2px] m-[5px] mt-[0] mb-[10px]  "
        type="submit"
        value="Add Note"
      />
    </form>
  );
};

export default NoteAddForm;
