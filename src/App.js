import "./App.css";
import React, { useState } from "react";

//components
import Todo from "./components/Todo.js";

function App() {
  const myTodo = {
    id: 0, //it can be Math.random() too
    text: "Clean the house",
  };
  //state [the "todos" variable is basically the one who holds the data we passed in]
  const [todos, setTodos] = useState([]); // initially may value sya ng "myTodo" object && the "setTodos" is a function to update the "todos" variable on which naka destructure ito
  const [inputValue, setInputValue] = useState(""); // this is for onChange, first, the "inputValue" holds an empty string, then we have the "setInputValue" on which will update the "inputValue", in our case this is what the user will type
  //hooks for edit below
  const [todoEditing, setTodoEditing] = useState(null); //the "todoEditing" will gonna hold the todo id, initially i set it to null
  //[BELOW]were also going to want to keep track of the text that were going to change the todo that were editing to
  const [editingText, setEditingText] = useState(""); //this will hold the input html tag value for update

  //addTodo function
  const addTodo = (e) => {
    e.preventDefault();
    //////////////Border color must be red if input is invalid (empty string even with multiple spaces
    const addTodoInput = document.querySelector(".add-todo-input");
    if (addTodoInput.value === "") {
      addTodoInput.style.border = "2px solid red";
      setInterval(() => {
        addTodoInput.style.border = "1px solid black";
      }, 2000);
    } else {
      const newTodos = [...todos]; // "newTodos" is a variable to hold previous todos
      const theAddedOne = { id: Math.random(), text: inputValue }; // "theAddedOne is a variable that holds the newly added todo"
      newTodos.push(theAddedOne); //then i push the newly added todo to the previous todo
      setTodos(newTodos); //then i use the "setTodos" function to update the "todos" on which i put the "newTodos" as an argument which holds the previous and newly added todos
      setInputValue(""); // i just set the input to an empty string every time macclick ang add button
    }
    //////////////
  };

  //deleteTask function
  const deleteTask = (IDofTaskToBeDeleted) => {
    const filteredListOfTodos = todos.filter((todosParam) => {
      return todosParam.id !== IDofTaskToBeDeleted; //this will return task that the id is not equal to the deleted (task clicked) one || ififilter nya ung id na hindi equal
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
    setTodoEditing(null); //so that the id will return to null after updating the task
  };

  //cancel the edit function
  const cancelEdit = (IDofTask) => {
    const cancelEdit = todos.map((todoParam) => {
      if (todoParam.id === IDofTask) {
        setEditingText(todoParam.text);
      }
      return todoParam;
    });
    setTodos(cancelEdit);
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
              value={inputValue} //if walang onChange this is not typable it is because, initially the "inputValue" is declared as an empty string (naka "useState" sa taas)
              onChange={(e) => {
                //naglagay ako ng onChange, then i set the "setInputValue" on which the function to update my "inputValue" to the current data that the user is typing
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
                            type="text"
                            // placeholder={todoParam.text}
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
                              cancelEdit(todoParam.id); //para mag false, then babalik sa [FIRST], which is ung may delete button na part
                            }}
                            style={{ backgroundColor: "gray" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      //if false therfor just display the specific todo in text
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
                            // onClick={() => {
                            //   setTodoEditing(todoParam.id); //para mag true at malipat sa [SECOND] edit part
                            // }}
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
