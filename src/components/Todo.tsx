import React, { useState } from "react";
import { TodoModel } from "../Types/TodoModel";
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
  const [completed, setCompleted] = useState<boolean>(false);

  const toggleEdit = (id: number) => {
    setEditInput(title);
    setTodoId(id);
  };

  const cancelEdit = () => {
    setTodoId(null);
  };

  return (
    <div className="bg-[gray] m-[10px] p-[10px] ">
      {todoId === id ? (
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              value={editInput}
              onChange={(e) => {
                setEditInput(e.target.value);
              }}
            />
          </div>
          <div>
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
                saveEdit(id, editInput);
                setTodoId(null);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => {
                setCompleted(!completed);
                doneTodo(id, !completed);
                console.log(todos);
              }}
            />
            {isDone ? (
              <p className="ml-[10px] text-[20px]">{title} Done</p>
            ) : (
              <p className="ml-[10px] text-[20px]">{title} Hindi pa done</p>
            )}
          </div>
          <div>
            <TodoButton
              buttonName="Edit"
              buttonColor="lightBlue"
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
