import React, { FormEvent, useState } from "react";
import "../App.css";
import NoteAddForm from "./NoteAddForm";
import NoteButton from "./NoteButton";
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

  const addNotes = (e: FormEvent) => {
    e.preventDefault();
    const date = new Date();
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
    setUserTitleInput("");
    setUserContentInput("");
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
                {/* <button
                  onClick={isToggleAddForm}
                  className="p-[10px] border-[black] border-solid border-[1px]"
                >
                  Cancel
                </button> */}
                <NoteButton
                  buttontext="Cancel"
                  buttonWidth="120px"
                  buttonRadius="5px"
                  buttonFunct={isToggleAddForm}
                />
              </div>
            </div>
          ) : (
            <div className="h-[60vh] bg-[black] p-[10px] flex flex-col items-center justify-center">
              <NoteButton
                buttontext="+"
                btnTextSize="45px"
                buttonWidth="100px"
                buttonHeight="100px"
                buttonRadius="50%"
                buttonFunct={isToggleAddForm}
              />
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
                  <NoteButton
                    buttontext="Cancel"
                    buttonWidth="120px"
                    buttonRadius="5px"
                    buttonFunct={isToggleAddForm}
                  />
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
              <NoteButton
                buttontext="+"
                btnTextSize="20px"
                buttonWidth="50px"
                buttonHeight="50px"
                buttonRadius="50%"
                buttonFunct={isToggleAddForm}
              />
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
