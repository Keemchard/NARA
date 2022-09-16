import React, { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import DisplayAll from "./DisplayAll";
import MainHeader from "./MainHeader";
import TodoDash from "./TodoDash";

function App() {
  return (
    <div className="main-con h-[auto] bg-[#111827]">
      <MainHeader />
      {/* <hr className="mr-[10px] ml-[10px] bg-[#374151]" /> */}
      <div className="content bg-[gray] h-[auto] pt-[20px] pb-[20px] flex items-center justify-center">
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/todo" element={<TodoDash />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
