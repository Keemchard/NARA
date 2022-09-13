import React from "react";
import { TodoModel } from "../Types/TodoModel";
import NoTaskPage from "./NoTaskPage";
import Todo from "./Todo";

interface TodolistMod {
  todos: TodoModel[];
  deleteTodo: (id: number) => number | void;
  saveEdit: (id: number, title: string) => string | void;
  doneTodo: (id: number, isDone: boolean) => boolean | void;
}

const TodoList = ({ todos, deleteTodo, saveEdit, doneTodo }: TodolistMod) => {
  return todos.length === 0 ? (
    <NoTaskPage />
  ) : (
    <div>
      {todos.map((items: TodoModel) => {
        return (
          <Todo
            key={items.id}
            todos={items}
            deleteTodo={deleteTodo}
            saveEdit={saveEdit}
            doneTodo={doneTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
