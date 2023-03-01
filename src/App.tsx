import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import FullBook from "./components/FullBook";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book/:id" element={<FullBook />} />
      </Routes>
    </div>
  );
};

export default App;
