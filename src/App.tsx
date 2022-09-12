import React, { FormEvent, FormEventHandler, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { TodoModel } from "./Types/TodoModel";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const newSetOfTodos = [
      { id: Math.random(), title: userInput, isDone: false },
      ...todos,
    ];
    setTodos(newSetOfTodos);
    setUserInput("");
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter((items: TodoModel) => {
      return items.id !== id;
    });
    setTodos(filteredTodos);
  };

  const saveEdit = (id: number, title: string) => {
    todos.map((item: TodoModel) => {
      if (item.id === id) {
        item.title = title;
      }
    });
  };

  return (
    <div className="main-con h-[100vh] bg-[tomato] flex flex-col items-center justify-center">
      <div className="form-con bg-[green] w-[100%] flex justify-center m-[10px]">
        <form onSubmit={addTodo}>
          <input
            className="border-[2px] border-solid border-black rounded p-[5px] mr-[10px]"
            type="text"
            placeholder="input your task here"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <input
            className="border-[2px] border-solid border-black rounded p-[5px]"
            type="submit"
            value="Add Task"
          />
        </form>
      </div>
      <div className="list-con bg-[aqua] w-[100%]">
        <TodoList todos={todos} deleteTodo={deleteTodo} saveEdit={saveEdit} />
      </div>
    </div>
  );
}

export default App;
