import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers/Routers";

function App() {
  return (
    <BrowserRouter>
      <Routers></Routers>
    </BrowserRouter>
  );
}

export default App;
