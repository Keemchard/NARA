import React, { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import DisplayAll from "./DisplayAll";
import Extra from "./extraComponent/Extra";
import MainHeader from "./MainHeader";
import NoteDash from "./notesComponents/NoteDash";
import TodoDash from "./TodoDash";

function App() {
  return (
    <div className="main-con h-[auto] bg-[#111827]">
      <MainHeader />
      <hr className="mr-[10px] ml-[10px] bg-[#374151]" />
      <div className="content  h-[auto] pt-[20px] pb-[20px] flex items-center justify-center">
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/todo" element={<TodoDash />} />
          <Route path="/note" element={<NoteDash />} />
          <Route path="/extra" element={<Extra />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
