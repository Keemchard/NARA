import React from "react";
import "./Todo.css";

const Todo = ({ id, text, completed }) => {
  return (
    <div className="todo-div">
      <input type="checkbox" checked={completed} />
      <p>{text}</p>
    </div>
  );
};

export default Todo;
