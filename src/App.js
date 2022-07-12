import "./App.css";
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  //hooks for edit below
  const [todoEditing, setTodoEditing] = useState(null); //for id
  const [editingText, setEditingText] = useState(""); //for editing input

  //addTodo function
  const addTodo = (e) => {
    e.preventDefault();
    //Border color must be red if input is invalid
    const addTodoInput = document.querySelector(".add-todo-input");
    if (addTodoInput.value === "") {
      addTodoInput.style.border = "2px solid red";
      setInterval(() => {
        addTodoInput.style.border = "1px solid black";
      }, 2000);
    } else {
      const newTodos = [...todos];
      const theAddedOne = { id: Math.random(), text: inputValue };
      newTodos.push(theAddedOne);
      setTodos(newTodos);
      setInputValue("");
    }
  };

  //deleteTask function
  const deleteTask = (IDofTaskToBeDeleted) => {
    const filteredListOfTodos = todos.filter((todosParam) => {
      return todosParam.id !== IDofTaskToBeDeleted;
    });
    setTodos(filteredListOfTodos);
  };

  //save edited task functoin
  const saveEditedTask = (IDofTaskToBEUpdated) => {
    const updatedTodos = todos.map((todoParam) => {
      if (todoParam.id === IDofTaskToBEUpdated) {
        todoParam.text = editingText;
      }
      return todoParam;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  //cancel the edit function
  const cancelEdit = () => {
    setTodoEditing(
      "it can be anything lol haha, just to have a false value to the ternary operator, thats why this value can be anything except the same id value of the click task"
    );
  };

  //toggle update part as well as set the input to specific value of todo/task
  const toggleUpdate = (IDofTask) => {
    const todoList = todos.map((todoParam) => {
      if (todoParam.id === IDofTask) {
        setEditingText(todoParam.text);
      }
    });
    setTodoEditing(IDofTask);
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <h1>Simple List Task</h1>
          <form onSubmit={addTodo}>
            <input
              className="add-todo-input"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <input
              style={{ backgroundColor: "Orange" }}
              type="submit"
              value="Add"
            />
          </form>
          <div className="list-con">
            <ul>
              {todos.map((todoParam) => {
                return (
                  <li key={todoParam.id}>
                    {/* conditional rendering below */}

                    {todoEditing === todoParam.id ? ( //if true then were going to display/edit out specific todo
                      <div className="list">
                        {/* [SECOND] EDITING PART */}
                        <div>
                          <input
                            className="edit-input"
                            type="text"
                            onChange={(e) => {
                              setEditingText(e.target.value);
                            }}
                            value={editingText}
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              saveEditedTask(todoParam.id);
                            }}
                            style={{ backgroundColor: "green" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              cancelEdit(); //para mag false, then babalik sa [FIRST], which is ung may delete button na part
                            }}
                            style={{ backgroundColor: "gray" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      //if false therefor just display the specific todo in text
                      <div className="list">
                        {/* [FIRST] DELETING PART and TOGGLE EDIT PART*/}
                        <div>
                          <p className="task-name">{todoParam.text}</p>
                        </div>
                        <div>
                          <button
                            className="upd-btn"
                            style={{ backgroundColor: "blue" }}
                            onClick={() => {
                              toggleUpdate(todoParam.id); //para mag true at malipat sa [SECOND] edit part
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="del-btn"
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              deleteTask(todoParam.id); //https://blog.devgenius.io/why-it-is-necessary-to-use-arrow-functions-with-react-event-handler-e0b278710310
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <footer className="foot-hehe">
          <p>&copy; KC | 2022</p>
          <div>Made with &hearts; and lol</div>
        </footer>
      </div>
    </>
  );
}

export default App;
