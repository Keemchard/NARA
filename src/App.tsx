import React, { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InvalidInput from "./components/InvalidInput";
import NoTaskPage from "./components/NoTaskPage";
import TodoList from "./components/TodoList";
import DisplayAll from "./DisplayAll";
import MainHeader from "./MainHeader";
import TodoDash from "./TodoDash";
import { TodoModel } from "./Types/TodoModel";

function App() {
  return (
    <div className="main-con h-[100vh] bg-[#111827]">
      <MainHeader />
      <div className="content bg-[green] h-[93vh] flex items-center justify-center">
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/todo" element={<TodoDash />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
