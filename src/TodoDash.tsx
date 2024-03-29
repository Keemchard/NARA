import React, { FormEvent, useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InvalidInput from "./components/InvalidInput";
import NoTaskPage from "./components/NoTaskPage";
import TodoList from "./components/TodoList";
import { TodoModel } from "./Types/TodoModel";

const TodoDash = () => {
  const [todos, setTodos] = useState<TodoModel[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [userInput, setUserInput] = useState<string>("");
  const [isAddInputEmpty, setIsAddInputEmpty] = useState<boolean>(false);

  const [allTab, setAllTab] = useState<boolean>(true);
  const [pendingTab, setPendingTab] = useState<boolean>(false);
  const [completedTab, setCompletedTab] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    const newSetOfTodos = [
      { id: Math.random(), title: userInput, isDone: false },
      ...todos,
    ];

    let formattedUserInput = userInput;
    formattedUserInput = formattedUserInput.replace(/\s+/g, "");
    if (formattedUserInput === "") {
      setIsAddInputEmpty(true);
      setTimeout(() => {
        setIsAddInputEmpty(false);
      }, 3000);
    } else {
      setTodos(newSetOfTodos);
      setIsAddInputEmpty(false);
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
    <div className="todo-main-con text-center w-[520px]  ">
      <Header />
      <div className="todo-con bg-[transparent] p-[10px]">
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
            <InvalidInput text="💥Invalid Input!💥" />
          </div>
        )}
        <div className=" flex justify-between p-[5px]">
          <div
            className="All   w-[100%] p-[5px]"
            onClick={() => {
              setAllTab(true);
              setPendingTab(false);
              setCompletedTab(false);
            }}
            style={
              allTab
                ? { color: "#0ED3CF", fontWeight: "bold" }
                : { color: "white" }
            }
          >
            All
          </div>
          <div
            className="Pending   w-[100%] p-[5px]"
            onClick={() => {
              setAllTab(false);
              setPendingTab(true);
              setCompletedTab(false);
            }}
            style={
              pendingTab
                ? { color: "#0ED3CF", fontWeight: "bold" }
                : { color: "white" }
            }
          >
            Pending
          </div>
          <div
            className="Completed   w-[100%] p-[5px]"
            onClick={() => {
              setAllTab(false);
              setPendingTab(false);
              setCompletedTab(true);
            }}
            style={
              completedTab
                ? { color: "#0ED3CF", fontWeight: "bold" }
                : { color: "white" }
            }
          >
            Completed
          </div>
        </div>
        <div className="list-con bg-[#1F2937] w-[100%] h-[55vh] rounded">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            saveEdit={saveEdit}
            doneTodo={doneTodo}
            allTab={allTab}
            pendingTab={pendingTab}
            completedTab={completedTab}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoDash;
