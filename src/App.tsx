import React, { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import DisplayAll from "./DisplayAll";
import MainHeader from "./MainHeader";
import TodoDash from "./TodoDash";

function App() {
  return (
    <div className="main-con h-[100vh] bg-[#111827]">
      <MainHeader />
      <div className="content bg-[gray] h-[90vh] flex items-center justify-center">
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/todo" element={<TodoDash />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
