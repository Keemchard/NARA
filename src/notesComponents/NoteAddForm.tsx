import React from "react";

const NoteAddForm = ({
  addNotes,
  userTitleInput,
  setUserTitleInput,
  userContentInput,
  setUserContentInput,
}: any) => {
  return (
    <form onSubmit={addNotes} className="flex flex-col">
      <input
        className="m-[5px] p-[7px] bg-[green]"
        type="text"
        placeholder="Note Title"
        value={userTitleInput}
        onChange={(e) => {
          setUserTitleInput(e.target.value);
        }}
      />
      <input
        className="m-[5px] p-[7px] bg-[green]"
        type="text"
        placeholder="Note Content"
        value={userContentInput}
        onChange={(e) => {
          setUserContentInput(e.target.value);
        }}
      />
      <input
        className="p-[10px] border-[green] border-solid border-[1px]"
        type="submit"
        value="Add Note"
      />
    </form>
  );
};

export default NoteAddForm;
