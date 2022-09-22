import React, { useState } from "react";
import { TodoModel } from "../Types/TodoModel";
import InvalidInput from "./InvalidInput";
import TodoButton from "./TodoButton";

interface TodolistMod {
  todos: TodoModel;
  deleteTodo: (id: number) => number | void;
  saveEdit: (id: number, title: string) => string | void;
  doneTodo: (id: number, isDone: boolean) => boolean | void;
}

const Todo = ({ todos, deleteTodo, saveEdit, doneTodo }: TodolistMod) => {
  const { id, title, isDone } = todos;

  const [todoId, setTodoId] = useState<number | null>();
  const [editInput, setEditInput] = useState<string>("");
  const [completed, setCompleted] = useState<any>(isDone);

  const [invalidEdit, setInvalidEdit] = useState<boolean>(false);

  const toggleEdit = (id: number) => {
    setEditInput(title);
    setTodoId(id);
  };

  const cancelEdit = () => {
    setTodoId(null);
  };

  const saveFunct = (id: number, editInput: string) => {
    let formattedEditInput = editInput;
    formattedEditInput = formattedEditInput.replace(/\s+/g, "");

    if (formattedEditInput === "") {
      setInvalidEdit(true);
      setTimeout(() => {
        setInvalidEdit(false);
      }, 3000);
    } else {
      saveEdit(id, editInput);
      setInvalidEdit(false);
    }
  };

  return (
    <div className="bg-[#374151] m-[10px] p-[10px] rounded">
      <div>
        {invalidEdit && <InvalidInput text="🎨Invalid Edit Input!🎨" />}
      </div>
      {todoId === id ? (
        <div className="flex flex-col items-center justify-between ">
          <div className="w-[100%] mb-[10px]">
            <input
              className="p-[3px] pl-[5px] rounded bg-[#111827] w-[100%]"
              type="text"
              value={editInput}
              onChange={(e) => {
                setEditInput(e.target.value);
              }}
            />
          </div>
          <div className="w-[40%] flex justify-between">
            <TodoButton
              buttonName="Cancel"
              buttonColor="green"
              buttonFunction={() => {
                cancelEdit();
              }}
            />
            <TodoButton
              buttonName="Save"
              buttonColor="blue"
              buttonFunction={() => {
                // saveEdit(id, editInput);
                saveFunct(id, editInput);
                setTodoId(null);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="todo-crd flex items-center justify-between">
          <div className="flex w-[60%] text-left">
            <input
              className="bg-[#1F2937]"
              type="checkbox"
              checked={completed}
              onChange={() => {
                setCompleted(!completed);
                doneTodo(id, !completed);
                console.log(todos);
              }}
            />
            {isDone ? (
              <p className="ml-[10px] text-[16px]  text-gray-100 line-through">
                {title}
              </p>
            ) : (
              <p className="ml-[10px] text-[16px] text-[#0ED3CF] font-semibold">
                {title}
              </p>
            )}
          </div>
          <div className="w-[40%] flex justify-between">
            <TodoButton
              buttonName="Edit"
              buttonColor="#325381"
              buttonFunction={() => {
                toggleEdit(id);
              }}
            />
            <TodoButton
              buttonName="Delete"
              buttonColor="red"
              buttonFunction={() => {
                deleteTodo(id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
