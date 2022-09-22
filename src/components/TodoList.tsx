import React from "react";
import { TodoModel } from "../Types/TodoModel";
import NoTaskPage from "./NoTaskPage";
import Todo from "./Todo";

interface TodolistMod {
  todos: TodoModel[];
  deleteTodo: (id: number) => number | void;
  saveEdit: (id: number, title: string) => string | void;
  doneTodo: (id: number, isDone: boolean) => boolean | void;
  pendingTab: boolean;
  completedTab: boolean;
  allTab: boolean;
}

const TodoList = ({
  todos,
  deleteTodo,
  saveEdit,
  doneTodo,
  allTab,
  pendingTab,
  completedTab,
}: TodolistMod) => {
  return (
    <>
      {todos.length === 0 ? (
        <NoTaskPage />
      ) : (
        <>
          {allTab && (
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
          )}
          {pendingTab && (
            <div>
              {todos
                .filter((items: TodoModel) => {
                  return items.isDone === false;
                })
                .map((item: TodoModel) => {
                  return (
                    <Todo
                      key={item.id}
                      todos={item}
                      deleteTodo={deleteTodo}
                      saveEdit={saveEdit}
                      doneTodo={doneTodo}
                    />
                  );
                })}
            </div>
          )}
          {completedTab && (
            <div>
              {todos
                .filter((items: TodoModel) => {
                  return items.isDone === true;
                })
                .map((item: TodoModel) => {
                  return (
                    <Todo
                      key={item.id}
                      todos={item}
                      deleteTodo={deleteTodo}
                      saveEdit={saveEdit}
                      doneTodo={doneTodo}
                    />
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TodoList;
