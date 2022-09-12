import React from "react";
import { TodoModel } from "../Types/TodoModel";
import NoTaskPage from "./NoTaskPage";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, saveEdit }: any) => {
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
          />
        );
      })}
    </div>
  );
};

export default TodoList;
