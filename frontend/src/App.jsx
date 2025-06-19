import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/add" element={<Add/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
    </Routes>
  );
};

export default App;
