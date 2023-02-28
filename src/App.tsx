import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import { useAppSelector } from "./store/hooks";
import "./App.scss";

const App: React.FC = () => {
  const { status } = useAppSelector((state) => state.books);

  return (
    <div className="container">
      <Header />
      {status === "loading" ? <Loader /> : <Main />}
    </div>
  );
};

export default App;
