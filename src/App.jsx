import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Contr from "./page/Contr";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/controller" element={<Contr />} />
    </Routes>
  );
};

export default App;
