import React, { FormEvent, useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InvalidInput from "./components/InvalidInput";
import NoTaskPage from "./components/NoTaskPage";
import TodoList from "./components/TodoList";
import { TodoModel } from "./Types/TodoModel";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [userInput, setUserInput] = useState<string>("");
  const [isAddInputEmpty, getIsAddInputEmpty] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const newSetOfTodos = [
      { id: Math.random(), title: userInput, isDone: false },
      ...todos,
    ];
    if (userInput === "") {
      getIsAddInputEmpty(true);
      setTimeout(() => {
        getIsAddInputEmpty(false);
      }, 3000);
    } else {
      setTodos(newSetOfTodos);
      getIsAddInputEmpty(false);
    }

    setUserInput("");
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter((items: TodoModel) => {
      return items.id !== id;
    });
    setTodos(filteredTodos);
  };

  const saveEdit = (id: number, title: string) => {
    const editedTodos = todos.map((item: TodoModel) => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    });
    setTodos(editedTodos);
  };

  const doneTodo = (id: number, isDone: boolean) => {
    const completedTodo = todos.map((item: TodoModel) => {
      if (item.id === id) {
        item.isDone = isDone;
      }
      return item;
    });
    setTodos(completedTodo);
  };

  return (
    <div className="main-con h-[100vh] bg-[#111827] flex flex-col items-center justify-center">
      <Header />
      <div className="todo-con bg-[transparent] w-[500px] p-[10px]">
        <div className="form-con bg-[transparent]  mb-[10px] pt-[10px] pb-[10px]">
          <form onSubmit={addTodo} className="w-[100%] flex justify-between">
            <input
              className="border-[2px] border-solid border-black rounded p-[7px] mr-[10px] w-[70%] bg-[#374151]"
              type="text"
              placeholder="input your task here"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            <input
              className="border-[2px] border-solid border-[#0ED3CF] rounded p-[5px] w-[25%]"
              type="submit"
              value="Add Task"
            />
          </form>
        </div>
        {isAddInputEmpty && (
          <div className="invalid   text-center">
            <InvalidInput />
          </div>
        )}
        <div className="list-con bg-[#1F2937] w-[100%] h-[500px] rounded">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            saveEdit={saveEdit}
            doneTodo={doneTodo}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
