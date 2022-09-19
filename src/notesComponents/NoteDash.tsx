import React, { FormEvent, useEffect, useState } from "react";
import "../App.css";
import NoteAddForm from "./NoteAddForm";
import NoteButton from "./NoteButton";
import NoteCard from "./NoteCard";
import NoteUpdatePage from "./NoteUpdatePage";

interface NoteModel {
  id: number;
  noteTitle: string;
  noteContent: string;
  noteDateTime: string;
}

const NoteDash = () => {
  const [notes, setNotes] = useState<NoteModel[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      return JSON.parse(savedNotes);
    } else {
      return [];
    }
  });
  const [userTitleInput, setUserTitleInput] = useState<string>("");
  const [userContentInput, setUserContentInput] = useState<string>("");
  //   const [noteDate, setNoteDate] = useState<string>("");
  const [displayAddNoteForm, setDisplayAddNoteForm] = useState<boolean>(false);
  const [openUpdatePage, setOpenUpdatePage] = useState<boolean>(false);

  const [userEditTitleInput, setUserEditTitleInput] = useState<string>("");
  const [userEditContentInput, setUserEditContentInput] = useState<string>("");
  const [editID, setEditID] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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

  const deleteNote = (id: number) => {
    const filteredNotes = notes.filter((items: NoteModel) => {
      return items.id !== id;
    });
    setNotes(filteredNotes);
  };

  const toggleUpdatePage = (
    id: number,
    title: string,
    content: string,
    date: string
  ) => {
    console.log(id, title, content);

    setEditID(id);
    setUserEditTitleInput(title);
    setUserEditContentInput(content);
    setOpenUpdatePage(!openUpdatePage);
  };

  const saveEditedNote = (id: number, e: FormEvent) => {
    e.preventDefault();
    const editDate = new Date();
    const nDate = `${
      editDate.getMonth() + 1
    }/${editDate.getDate()}/${editDate.getFullYear()}`;
    const nTime = `${editDate.getHours()}:${editDate.getMinutes()}:${editDate.getSeconds()}`;
    const editedNote = notes.map((items: NoteModel) => {
      if (items.id === id) {
        items.noteTitle = userEditTitleInput;
        items.noteContent = userEditContentInput;
        items.noteDateTime = `${nDate} | ${nTime}`;
      }
      return items;
    });
    setNotes(editedNote);
    setOpenUpdatePage(!openUpdatePage);
  };

  return (
    <>
      <div className=" w-[100%]  p-[5px]  ">
        <div className="m-[10px] mt-[0] mb-[30px]  text-center">
          <p className="font-bold text-[35px]">
            NO<span className="text-[#0ED3CF]">TE</span>
          </p>
        </div>
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
                <NoteButton
                  buttontext="Cancel"
                  buttonWidth="120px"
                  buttonRadius="5px"
                  buttonFunct={isToggleAddForm}
                />
              </div>
            </div>
          ) : (
            <div className="h-[70vh] bg-[#1F2937] p-[10px] flex flex-col items-center justify-center">
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
              <div className="note-list-con p-[10px]   bg-[#1F2937]">
                {notes.map((items: NoteModel) => {
                  return (
                    <NoteCard
                      key={items.id}
                      noteTitle={items.noteTitle}
                      noteContent={items.noteContent}
                      noteDateTime={items.noteDateTime}
                      deleteNote={() => {
                        deleteNote(items.id);
                      }}
                      toggleUpdatePage={() => {
                        toggleUpdatePage(
                          items.id,
                          items.noteTitle,
                          items.noteContent,
                          items.noteDateTime
                        );
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-[10px]  flex justify-end ">
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
            {openUpdatePage && (
              <div className="addForm fixed top-[0] left-[0] h-[100vh] w-[100%] flex flex-col items-center justify-center z-[2]">
                <NoteUpdatePage
                  saveEditedNote={(e: any) => {
                    saveEditedNote(editID, e);
                  }}
                  userEditTitleInput={userEditTitleInput}
                  setUserEditTitleInput={setUserEditTitleInput}
                  userEditContentInput={userEditContentInput}
                  setUserEditContentInput={setUserEditContentInput}
                />
                <div>
                  <NoteButton
                    buttontext="Cancel"
                    buttonWidth="120px"
                    buttonRadius="5px"
                    buttonFunct={() => {
                      setOpenUpdatePage(!openUpdatePage);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NoteDash;
