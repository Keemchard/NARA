import React, { FormEvent, useState } from "react";
import "../App.css";
import NoteAddForm from "./NoteAddForm";
import NoteCard from "./NoteCard";

interface NoteModel {
  id: number;
  noteTitle: string;
  noteContent: string;
  noteDateTime: string;
}

const NoteDash = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [userTitleInput, setUserTitleInput] = useState<string>("");
  const [userContentInput, setUserContentInput] = useState<string>("");
  const [noteDate, setNoteDate] = useState<string>("");
  const [displayAddNoteForm, setDisplayAddNoteForm] = useState<boolean>(false);

  const isToggleAddForm = () => {
    setDisplayAddNoteForm(!displayAddNoteForm);
  };

  const date = new Date();

  const addNotes = (e: FormEvent) => {
    e.preventDefault();

    const nDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const nTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const newSetOfNotes = [
      {
        id: Math.random(),
        noteTitle: userTitleInput,
        noteContent: userContentInput,
        noteDateTime: `${nDate} | ${nTime}`,
      },
      ...notes,
    ];
    setNotes(newSetOfNotes);
    isToggleAddForm();
  };

  return (
    <>
      <div className="bg-[green] w-[100%] p-[15px]">
        {notes.length === 0 ? (
          displayAddNoteForm ? (
            <div className="addForm fixed top-[0] left-[0] h-[100vh] w-[100%] flex flex-col items-center justify-center">
              <div>
                <NoteAddForm
                  addNotes={addNotes}
                  userTitleInput={userTitleInput}
                  setUserTitleInput={setUserTitleInput}
                  userContentInput={userContentInput}
                  setUserContentInput={setUserContentInput}
                />
              </div>
              <div>
                <button
                  onClick={isToggleAddForm}
                  className="p-[10px] border-[black] border-solid border-[1px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[60vh] bg-[black] p-[10px] flex flex-col items-center justify-center">
              <button
                onClick={isToggleAddForm}
                className="p-[10px] border-[green] border-solid border-[1px]"
              >
                Add note
              </button>
            </div>
          )
        ) : (
          <div>
            {displayAddNoteForm && (
              <div className="addForm fixed top-[0] left-[0] h-[100vh] w-[100%] flex flex-col items-center justify-center">
                <div>
                  <NoteAddForm
                    addNotes={addNotes}
                    userTitleInput={userTitleInput}
                    setUserTitleInput={setUserTitleInput}
                    userContentInput={userContentInput}
                    setUserContentInput={setUserContentInput}
                  />
                </div>
                <div>
                  <button
                    onClick={isToggleAddForm}
                    className="p-[10px] border-[black] border-solid border-[1px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="">
              {notes.map((items: NoteModel) => {
                return (
                  <NoteCard
                    key={items.id}
                    noteTitle={items.noteTitle}
                    noteContent={items.noteContent}
                    noteDateTime={items.noteDateTime}
                  />
                );
              })}
              <button
                onClick={isToggleAddForm}
                className="p-[10px] border-[black] border-solid border-[1px]"
              >
                Add note
              </button>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default NoteDash;

{
  /* <form onSubmit={addNotes} className="flex flex-col">
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
                </form> */
}
