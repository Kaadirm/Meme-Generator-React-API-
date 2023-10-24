import "./App.css";
import Header from "./components/Header";
import Meme from "./components/Meme";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Meme />
      </div>
    </>
  );
}

export default App;
